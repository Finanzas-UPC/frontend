<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { bondService } from '../services/bond.service.ts';
import type { BondMetrics } from '../models/bondmetrics.entity.ts';
import type { CashflowItem } from '../models/cashflow.entity.ts';

const route = useRoute();
const metrics = ref<BondMetrics | null>(null);
const cashflow = ref<CashflowItem[]>([]);

const loadMetrics = async () => {
  const bondId = Number(route.params.id);
  if (!isNaN(bondId)) {
    const res = await bondService.getMetricsByBondId(bondId);
    metrics.value = res.data;
  }
};

const loadCashflow = async () => {
  const bondId = Number(route.params.id);
  if (!isNaN(bondId)) {
    const res = await bondService.getCashflowByBondId(bondId);
    cashflow.value = res.data.map((item: any) => ({
      date: item.paymentDate,
      gracePeriod: item.isGracePeriod ? 'Sí' : 'No',
      initialBalance: item.initialBalance,
      interest: item.interest,
      amortization: item.amortization,
      finalBalance: item.finalBalance,
      quota: item.totalPayment,
      bondholderFlow: item.bondHolderCashFlow,
      updatedFlow: item.discountedFlow,
      flowByTerm: item.discountedFlowTimesPeriod,
      convexityFactor: item.convexityFactor,
    }));
  }
};

onMounted(() => {
  loadMetrics();
  loadCashflow();
});
</script>

<template>
  <h2>Detalles del bono</h2>
  <div class="metrics-wrapper" v-if="metrics">
    <div class="metrics-container">
      <div class="metric-card">
        <p class="label">Duración</p>
        <p class="value">{{ metrics.duration }}</p>
      </div>
      <div class="metric-card">
        <p class="label">Convexidad</p>
        <p class="value">{{ metrics.convexity }}</p>
      </div>
      <div class="metric-card">
        <p class="label">Duración modificada</p>
        <p class="value">{{ metrics.modifiedDuration }}</p>
      </div>
      <div class="metric-card">
        <p class="label">TCEA</p>
        <p class="value">{{ metrics.tcea }} %</p>
      </div>
      <div class="metric-card">
        <p class="label">TREA</p>
        <p class="value">{{ metrics.trea }} %</p>
      </div>
    </div>
  </div>

  <div class="cashflow-wrapper" v-if="cashflow.length">
    <h3>Flujo de caja</h3>
    <table class="cashflow-table">
      <thead>
      <tr>
        <th>Fecha programada</th>
        <th>Periodo de Gracia</th>
        <th>Saldo Inicial</th>
        <th>Cupon (Interés)</th>
        <th>Amortización</th>
        <th>Saldo Final</th>
        <th>Cuota</th>
        <th>Flujo Emisor (Bonista)</th>
        <th>Flujo Actualizado</th>
        <th>Flujo por Plazo</th>
        <th>Factor de Convexidad</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="row in cashflow" :key="row.date">
        <td>{{ row.date }}</td>
        <td>{{ row.gracePeriod }}</td>
        <td>{{ row.initialBalance }}</td>
        <td>{{ row.interest }}</td>
        <td>{{ row.amortization }}</td>
        <td>{{ row.finalBalance }}</td>
        <td>{{ row.quota }}</td>
        <td>{{ row.bondholderFlow }}</td>
        <td>{{ row.updatedFlow }}</td>
        <td>{{ row.flowByTerm }}</td>
        <td>{{ row.convexityFactor }}</td>
      </tr>
      </tbody>
    </table>
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

.cashflow-table {
  width: 100%;
  border-collapse: collapse;
  margin: 20px 0;
}

.cashflow-table th, .cashflow-table td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: center;
}

.cashflow-table th {
  background-color: #f4f4f4;
  font-weight: bold;
}
</style>