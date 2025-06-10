<script setup lang="ts">
import dayjs from 'dayjs';
import { ref, watch} from 'vue';
import type { Bond } from "../models/bond.entity.ts";
import { useStore } from "vuex";

const store = useStore();
const userId = Number(store.getters.getUserId);
const interestRateType = store.getters.getInterestRateType;
const capitalization = Number(store.getters.getCapitalization);
const currency = store.getters.getCurrency;

const props = defineProps({
  visible: {
    type: Boolean,
    required: true,
  }
});

const emit = defineEmits(['update:visible', 'save']);

const name = ref("");
const amount = ref(0);
const marketValue = ref(0);
const duration = ref(0);
const frequency = ref(0);
const interestRate = ref(0);
const gracePeriodType = ref(""); // TOTAL, PARCIAL, NINGUNO
const gracePeriodDuration = ref(0);
const marketRate = ref(0);
const emissionDate = ref(""); // DD-MM-YYYY format

const localVisible = ref(props.visible);

watch(() => props.visible, (val) => {
  localVisible.value = val;
});
watch(localVisible, (val) => {
  emit('update:visible', val);
  if (!val) {
    name.value = "";
    amount.value = 0;
    marketValue.value = 0;
    duration.value = 0;
    frequency.value = 1;
    interestRate.value = 0;
    gracePeriodType.value = "";
    gracePeriodDuration.value = 0;
    marketRate.value = 0;
    emissionDate.value = "";
  }
});

const closeDialog = () => {
  localVisible.value = false;
};

const handleSave = () => {
  if (!name.value || amount.value <= 0 || duration.value <= 0 || frequency.value <= 0 || marketRate.value <= 0) {
    alert('Completa todos los campos correctamente.');
    return;
  }

  const bond: Bond = {
    id: 0,
    userId,
    name: name.value,
    amount: amount.value,
    marketValue: marketValue.value,
    duration: duration.value,
    frequency: frequency.value,
    gracePeriodType: gracePeriodType.value,
    gracePeriodDuration: gracePeriodDuration.value,
    marketRate: marketRate.value,
    emissionDate: dayjs(emissionDate.value).format('DD-MM-YYYY'),
    interestType: interestRateType,
    interestRate: interestRate.value,
    capitalization: capitalization
  };

  emit('save', bond);
  closeDialog();
};
</script>

<template>
  <pv-dialog v-model:visible="localVisible" modal :style="{ width: '30rem' }">
    <template #header>
      <div class="flex flex-column">
        <h5 class="m-1">Añadir bono</h5>
        <span class="m-1">Información sobre el bono</span>
      </div>
    </template>

    <div class="mb-3">
      <pv-ifta-label style="width: 100%">
        <pv-input-text id="name" v-model="name" style="width: 100%" />
        <label for="name" class="font-semibold w-24">Nombre</label>
      </pv-ifta-label>
    </div>

    <div class="mb-3">
      <pv-ifta-label style="width: 100%">
        <pv-input-number v-model="amount" locale="en-US" :min="0" input-id="amount" style="width: 100%" />
        <label for="amount" class="font-semibold w-24">Monto ({{ currency }})</label>
      </pv-ifta-label>
    </div>

    <div class="mb-3">
      <pv-ifta-label style="width: 100%">
        <pv-input-number v-model="marketValue" locale="en-US" :min="0" input-id="marketValue" style="width: 100%" />
        <label for="marketValue" class="font-semibold w-24">Valor de mercado ({{ currency }})</label>
      </pv-ifta-label>
    </div>

    <div class="mb-3">
      <pv-ifta-label style="width: 100%">
        <pv-input-number v-model="duration" locale="en-US" :min="0" input-id="duration" style="width: 100%" />
        <label for="duration" class="font-semibold w-24">Duración (años)</label>
      </pv-ifta-label>
    </div>

    <div class="mb-3">
      <pv-ifta-label style="width: 100%">
        <pv-input-number v-model="frequency" locale="en-US" :min="1" input-id="frequency" style="width: 100%" />
        <label for="frequency" class="font-semibold w-24">Frecuencia (por año)</label>
      </pv-ifta-label>
    </div>

    <div class="mb-3">
      <pv-ifta-label style="width: 100%">
        <pv-input-number v-model="interestRate" locale="en-US" :min="0" input-id="interestRate" :minFractionDigits="0" :maxFractionDigits="4" style="width: 100%" />
        <label for="interestRate" class="font-semibold w-24">Tasa de interés (%)</label>
      </pv-ifta-label>
    </div>

    <div class="mb-3">
      <pv-ifta-label style="width: 100%">
        <pv-select v-model="gracePeriodType" :options="['Ninguno', 'Total', 'Parcial']" style="width: 100%" />
        <label for="gracePeriodType" class="font-semibold w-24">Tipo de gracia</label>
      </pv-ifta-label>
    </div>

    <div class="mb-3">
      <pv-ifta-label style="width: 100%">
        <pv-input-number v-model="gracePeriodDuration" :disabled="gracePeriodType === 'Ninguno'" locale="en-US" :min="0" input-id="gracePeriodDuration" style="width: 100%" />
        <label for="gracePeriodDuration" class="font-semibold w-24">Duración periodo de gracia</label>
      </pv-ifta-label>
    </div>

    <div class="mb-3">
      <pv-ifta-label style="width: 100%">
        <pv-input-number v-model="marketRate" locale="en-US" :min="0" input-id="marketRate" :minFractionDigits="0" :maxFractionDigits="4" style="width: 100%" />
        <label for="marketRate" class="font-semibold w-24">Tasa de mercado (%)</label>
      </pv-ifta-label>
    </div>

    <div class="mb-3">
      <pv-ifta-label style="width: 100%">
        <pv-datepicker v-model="emissionDate" date-format="dd-mm-yy" input-id="emissionDate" style="width: 100%" />
        <label for="emissionDate" class="font-semibold w-24">Fecha de emisión</label>
      </pv-ifta-label>
    </div>

    <template #footer>
      <div class="flex flex-row gap-4 w-full justify-content-center">
        <pv-button label="Añadir" style="width: 6rem" @click="handleSave" />
        <pv-button label="Cancelar" severity="danger" variant="text" @click="closeDialog" />
      </div>
    </template>
  </pv-dialog>
</template>

<style scoped>
</style>