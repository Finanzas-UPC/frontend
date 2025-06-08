<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useStore } from 'vuex';
import { bondService } from '../services/bond.service.ts';
import type { Bond } from '../models/bond.entity.ts';
import {useRouter} from "vue-router";

const store = useStore();
const currency = computed(() => store.getters.getCurrency);

const router = useRouter();

const viewBond = (id: number) => {
  router.push(`/bond/details/${id}`);
};

const bonds = ref<Bond[]>([]);

const loadBonds = async () => {
  const res = await bondService.getByUser(Number(store.getters.getUserId));
  bonds.value = res.data;
};

const formattedAmount = (amount: number) => {
  switch (currency.value) {
    case 'USD':
      return `$ ${amount}`;
    case 'EUR':
      return `€ ${amount}`;
    case 'PEN':
      return `S/. ${amount}`;
    default:
      return amount.toString();
  }
};

onMounted(loadBonds);
</script>


<template>
  <div>
    <h2>Listado de bonos</h2>
    <div class="bond-container">
      <div class="bond-grid">
        <div class="bond-card" v-for="bond in bonds" :key="bond.id">
          <p><strong>Valor nominal:</strong> {{ formattedAmount(bond.amount) }}</p>
          <p><strong>Plazo:</strong> {{ bond.duration }} años</p>
          <p><strong>Fecha de emisión:</strong> {{ bond.emissionDate }}</p>
          <div class="bond-actions">
            <button class="action-button" @click="bond.id !== undefined && viewBond(bond.id)">Ver</button>
            <button class="action-button" @click="">Editar</button>
          </div>
        </div>
      </div>
    </div>
    <pv-button label="Agregar Bono" @click="" class="add-bond-button"/>
  </div>
</template>

<style scoped>
h2 {
  text-align: center;
  margin-bottom: 20px;
}

.bond-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 16px;
  box-sizing: border-box;
}

.bond-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  margin-top: 16px;
}

.bond-card {
  background-color: #ffffff;
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  text-align: center;
  box-sizing: border-box;
}

.bond-card p {
  margin: 8px 0;
}

.bond-actions {
  display: flex;
  justify-content: space-evenly;
  flex-wrap: nowrap;
  gap: 16px;
  margin-top: 16px;
}

.action-button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  flex: 1;
  max-width: 190px;
}

.action-button:hover {
  background-color: #0056b3;
}

.add-bond-button {
  display: flex;
  justify-content: center;
  margin: 16px auto;
  padding: 22px 54px;
  font-size: 16px;
  max-width: 100%;
  width: fit-content;
  box-sizing: border-box;
}

@media (max-width: 768px) {
  .bond-grid {
    grid-template-columns: 1fr;
  }

  .bond-actions {
    flex-direction: column;
    align-items: center;
  }

  .action-button {
    max-width: 80%;
    width: 100%;
  }
}

</style>