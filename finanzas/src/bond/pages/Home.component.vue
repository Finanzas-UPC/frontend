<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { bondService } from '../services/bond.service.ts';
import type { Bond } from '../models/bond.entity.ts';
import {useStore} from "vuex";
import BondCard from '../components/BondCard.component.vue';
import {useToast} from "primevue/usetoast";
import AddBondDialog from '../components/AddBondDialog.component.vue';
import EditBondDialog from '../components/EditBondDialog.component.vue';

const store = useStore();
const bonds = ref<Bond[]>([]);
const selectedBond = ref<Bond | null>(null);
const showAddDialog = ref(false);
const showEditDialog = ref(false);
const toast = useToast();

const loadBonds = async () => {
  const res = await bondService.getByUserId(Number(store.getters.getUserId));
  bonds.value = res.data;
};

const openAddBondDialog = () => {
  showAddDialog.value = true;
};

const openEditBondDialog = (bond: Bond) => {
  showEditDialog.value = true;
  selectedBond.value = { ...bond };
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

const updateBond = async (bond: Bond) => {
  try {
    if (!bond.id) {
      toast.add({ severity: 'error', summary: 'Error', detail: 'Bono no encontrado.', life: 3000 });
      return;
    }
    await bondService.update(bond.id, bond);
    const index = bonds.value.findIndex(b => b.id === bond.id);
    if (index !== -1) {
      bonds.value[index] = bond;
    }
    showEditDialog.value = false;
    toast.add({ severity: 'success', summary: 'Éxito', detail: 'Bono actualizado.', life: 3000 });
  } catch {
    toast.add({ severity: 'error', summary: 'Error', detail: 'No se pudo actualizar el bono.', life: 3000 });
  }
};

const deleteBond = async (bondId: number) => {
  try {
    await bondService.delete(bondId);
    bonds.value = bonds.value.filter(b => b.id !== bondId);
    showEditDialog.value = false;
    toast.add({ severity: 'success', summary: 'Eliminado', detail: 'Bono eliminado correctamente.', life: 3000 });
  } catch {
    toast.add({ severity: 'error', summary: 'Error', detail: 'No se pudo eliminar el bono.', life: 3000 });
  }
};

onMounted(loadBonds);
</script>

<template>
  <div>
    <h2 class="text-center">Listado de bonos</h2>
    <div class="bond-container">
      <div class="bond-grid">
        <BondCard v-for="bond in bonds" :key="bond.id"
                  :bond="bond"
                  @edit="openEditBondDialog"
                  @delete="deleteBond"
        />
      </div>
    </div>
    <div class="text-center mt-4">
      <pv-button class="px-8 py-3" label="Agregar Bono" @click="openAddBondDialog"/>
    </div>
  </div>
  <AddBondDialog v-model:visible="showAddDialog"
                 @save="saveBond"
  />
  <EditBondDialog v-if="selectedBond" v-model:visible="showEditDialog"
      :bond="selectedBond"
      @save="updateBond"
  />
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