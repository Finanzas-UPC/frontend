<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { bondService } from '../services/bond.service.ts';
import { UserService } from '../../shared/services/user.service.ts';
import type {BondMetrics} from "../models/bondmetrics.entity.ts";
import type {CashFlowItem} from "../models/cashflow.entity.ts";

const route = useRoute();
const metrics = ref<BondMetrics | null>(null);
const cashflow = ref<CashFlowItem[]>([]);
const roles = ref<string[]>([]);
const isBondIssuer = ref(false);

const userService = new UserService();

const loadMetrics = async () => {
  const bondId = Number(route.params.id);
  if (!isNaN(bondId)) {
    const res = await bondService.getMetricsByBondId(bondId);
    metrics.value = res.data;
  }
};

const loadCashFlow = async () => {
  const bondId = Number(route.params.id);
  if (!isNaN(bondId)) {
    const res = await bondService.getCashflowByBondId(bondId);
    cashflow.value = res.data;
  }
};

const checkBondIssuerRole = async () => {
  const userId = Number(localStorage.getItem('userId'));
  if (!isNaN(userId)) {
    try {
      const res = await userService.getUserDetails(userId);
      roles.value = res.data.roles || [];
      isBondIssuer.value = roles.value.includes('ROLE_BOND_ISSUER');
    } catch (error) {
      console.error("Failed to fetch user details:", error);
      roles.value = [];
      isBondIssuer.value = false;
    }
  } else {
    console.warn("Invalid userId in localStorage");
    roles.value = [];
    isBondIssuer.value = false;
  }
};

onMounted(async () => {
  await checkBondIssuerRole();
  await loadMetrics();
  await loadCashFlow();
});
</script>

<template>
  <h2>Detalles del bono</h2>
  <div class="metrics-wrapper" v-if="metrics">
    <div class="metrics-container">
      <div class="metric-card" v-if="!isBondIssuer">
        <p class="label">Duración</p>
        <p class="value">{{ metrics.duration }}</p>
      </div>
      <div class="metric-card">
        <p class="label" v-if="!isBondIssuer">Convexidad</p>
        <p class="value">{{ metrics.convexity }}</p>
      </div>
      <div class="metric-card" v-if="!isBondIssuer">
        <p class="label">Duración modificada</p>
        <p class="value">{{ metrics.modifiedDuration }}</p>
      </div>
      <div class="metric-card" v-if="isBondIssuer">
        <p class="label">TCEA</p>
        <p class="value">{{ metrics.tcea * 100 }} %</p>
      </div>
      <div class="metric-card" v-if="!isBondIssuer">
        <p class="label">TREA</p>
        <p class="value">{{ metrics.trea * 100 }} %</p>
      </div>
    </div>
  </div>

  <div class="cashflow-wrapper" v-if="cashflow.length">
    <h3>Flujo de caja</h3>
    <pv-datatable
        :value="cashflow"
        paginator
        :rows="50"
        :rowsPerPageOptions="[5, 10, 25, 50]"
    >
      <pv-column field="paymentDate" header="Fecha programada" />
      <pv-column field="isGracePeriod" header="Periodo de Gracia">
        <template #body="slotProps">
          {{ slotProps.data.isGracePeriod ? 'Sí' : 'No' }}
        </template>
      </pv-column>
      <pv-column field="initialBalance" header="Saldo Inicial" />
      <pv-column field="interest" header="Cupon (Interés)" />
      <pv-column field="amortization" header="Amortización" />
      <pv-column field="finalBalance" header="Saldo Final" />
      <pv-column field="totalPayment" header="Cuota" />
      <pv-column v-if="isBondIssuer" field="issuerCashFlow" header="Flujo Emisor" />
      <pv-column v-if="!isBondIssuer" field="bondHolderCashFlow" header="Flujo Bonista" />
    </pv-datatable>

  </div>
</template>

<style scoped>
h2, h3 {
  text-align: center;
  margin-bottom: 20px;
}

.metrics-wrapper, .cashflow-wrapper {
  padding: 0 16px;
  box-sizing: border-box;
  width: 80%;
  margin: 0 auto;
}

.metrics-container {
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
  max-width: 1200px;
  margin: 0 auto;
}

.metric-card {
  background-color: #ffffff;
  padding: 8px 12px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  flex: 1;
  min-width: 150px;
  text-align: center;
}

.label {
  font-weight: bold;
  margin-bottom: 8px;
  color: #555;
}

.value {
  font-size: 18px;
  color: #000;
}
</style>