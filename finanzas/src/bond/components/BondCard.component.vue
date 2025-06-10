<script setup lang="ts">
import {useStore} from "vuex";
import {computed} from "vue";
import {useRouter} from "vue-router";
import type {Bond} from "../models/bond.entity.js";
import {formatCurrency} from "../../shared/utils/currencyFormatter.ts";

const store = useStore();
const currency = computed(() => store.getters.getCurrency);
const router = useRouter();

defineProps<{
  bond: Bond;
}>();

const viewBond = (id: number) => {
  router.push(`/bond/details/${id}`);
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
      <p><strong>Plazo:</strong> {{ bond.duration }} años</p>
    </template>
    <template #footer>
      <div class="flex gap-3">
        <pv-button class="flex-1" label="Ver" @click="bond.id !== undefined && viewBond(bond.id)"></pv-button>
        <pv-button class="flex-1" variant="text" label="Editar" @click=""></pv-button>
      </div>
    </template>
  </pv-card>
</template>

<style scoped>

</style>