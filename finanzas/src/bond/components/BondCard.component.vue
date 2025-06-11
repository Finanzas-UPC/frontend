<script setup lang="ts">
import {useStore} from "vuex";
import {computed} from "vue";
import {useRouter} from "vue-router";
import type {Bond} from "../models/bond.entity.js";
import {formatCurrency} from "../../shared/utils/currencyFormatter.ts";

const store = useStore();
const currency = computed(() => store.getters.getCurrency);
const router = useRouter();

const props = defineProps<{
  bond: Bond;
}>();

const emit = defineEmits<{
  (e: 'edit', bond: Bond): void;
  (e: 'delete', bondId: number): void;
}>();

const viewBond = (id: number) => {
  router.push(`/bond/details/${id}`);
};

const handleEdit = () => {
  emit('edit', props.bond);
};

const handleDelete = () => {
  emit('delete', Number(props.bond.id));
};
</script>

<template>
  <pv-card>
    <template #header>
      <h5 class="text-center m-3 p-0">{{ bond.name }}</h5>
    </template>
    <template #subtitle>
      <p class="text-center m-0 p-0">{{ bond.emissionDate }}</p>
    </template>
    <template #content>
      <p><strong>Valor nominal:</strong> {{ formatCurrency(bond.amount, currency) }}</p>
      <p><strong>Valor de mercado:</strong> {{ formatCurrency(bond.marketValue, currency) }}</p>
      <p><strong>Plazo:</strong> {{ bond.duration }} años</p>
    </template>
    <template #footer>
      <div class="flex gap-3">
        <pv-button class="flex-1" icon="pi pi-search" severity="info" variant="text" label="Ver" @click="bond.id !== undefined && viewBond(bond.id)"/>
        <pv-button class="flex-1" icon="pi pi-pencil" severity="secondary" variant="text" label="Editar" @click="handleEdit"/>
        <pv-button class="flex-1" icon="pi pi-trash" severity="danger" variant="text" label="Eliminar" @click="handleDelete"/>
      </div>
    </template>
  </pv-card>
</template>

<style scoped>

</style>