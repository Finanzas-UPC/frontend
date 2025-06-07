<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { bondService } from '../services/bond.service.ts';
import type { Bond } from '../models/bond.entity.ts';

const router = useRouter();
const bonds = ref<Bond[]>([]); // Especifica el tipo Bond[]
const userId = Number(localStorage.getItem('userId'));

console.log('User ID:', userId); // Imprime el userId en la consola

const loadBonds = async () => {
  const res = await bondService.getByUser(userId);
  bonds.value = res.data;
};

const goToAdd = () => router.push('/bonds/add');
const view = (id: number) => router.push(`/bonds/${id}`);
const edit = (id: number) => router.push(`/bonds/${id}/edit`);

onMounted(loadBonds);

console.log(bonds.value);
</script>
<template>
  <div>
    <h2>Mis Bonos</h2>
    <pv-button label="Agregar Bono" icon="pi pi-plus" @click="goToAdd" />
    <pv-datatable :value="bonds" v-if="bonds.length">
      <pv-column field="name" header="Nombre" />
      <pv-column field="amount" header="Valor Nominal" />
      <pv-column field="interestRate" header="Tasa (%)" />
      <pv-column header="Acciones">
        <template #body="{ data }">
          <pv-button icon="pi pi-eye" text @click="view(data.id)" />
          <pv-button icon="pi pi-pencil" text @click="edit(data.id)" />
        </template>
      </pv-column>
    </pv-datatable>
  </div>
</template>

<style scoped>
</style>