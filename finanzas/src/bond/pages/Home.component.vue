<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { bondService } from '../services/bond.service.ts';
import type { Bond } from '../models/bond.entity.ts';
import {useStore} from "vuex";
import BondCard from '../components/BondCard.component.vue';
import {useToast} from "primevue/usetoast";
import AddBondDialog from '../components/AddBondDialog.component.vue';

const store = useStore();
const bonds = ref<Bond[]>([]);
const showAddDialog = ref(false);
const toast = useToast();

const loadBonds = async () => {
  const res = await bondService.getByUserId(Number(store.getters.getUserId));
  bonds.value = res.data;
};

const openAddBondDialog = () => {
  showAddDialog.value = true;
};

const saveBond = async (newBond: Bond) => {
  try {
    const res = await bondService.create(newBond);
    bonds.value.push(res.data);
    showAddDialog.value = false;
    toast.add({ severity: 'success', summary: 'Éxito', detail: 'Bono agregado correctamente.', life: 3000 });
  } catch (error) {
    toast.add({ severity: 'error', summary: 'Error', detail: 'No se pudo guardar el bono.', life: 3000 });
  }
};

onMounted(loadBonds);
</script>

<template>
  <div>
    <h2 class="text-center">Listado de bonos</h2>
    <div class="bond-container">
      <div class="bond-grid">
        <BondCard v-for="bond in bonds" :key="bond.id" :bond="bond" />
      </div>
    </div>
    <div class="text-center mt-4">
      <pv-button class="px-8 py-3" label="Agregar Bono" @click="openAddBondDialog"/>
    </div>
  </div>
  <AddBondDialog v-model:visible="showAddDialog" @save="saveBond"/>
  <pv-toast position="bottom-right"/>
</template>

<style scoped>
.bond-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 16px;
  box-sizing: border-box;
}

.bond-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1rem;
}

</style>