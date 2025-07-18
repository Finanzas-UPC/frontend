<script setup lang="ts">
import dayjs from 'dayjs';
import {computed, ref, watch} from 'vue';
import type { Bond } from "../models/bond.entity.ts";
import { useStore } from "vuex";
import { getCapitalizationLabel} from "../../shared/utils/capitalization.ts";
import {
  capitalizationOptions,
  frequencyOptions,
  graceTypeOptions,
  interestTypeOptions
} from "../../shared/utils/options.ts";
import {getFrequencyLabel, getFrequencyValue} from "../../shared/utils/frecuency.ts";
import {useToast} from "primevue/usetoast";

const store = useStore();
const userId = Number(store.getters.getUserId);
const interestRateType = computed(() => store.getters.getInterestRateType);
const capitalization = computed(() => store.getters.getCapitalization);
const currency = computed(() => store.getters.getCurrency);
const isBondIssuer = computed(() => store.getters.getIsBondIssuer);

const props = defineProps({
  visible: {
    type: Boolean,
    required: true,
  }
});

const emit = defineEmits(['update:visible', 'save']);

const name = ref("");
const nominalValue = ref(0);
const marketValue = ref(0);
const duration = ref(0);
const frequency = ref(30);
const interestRate = ref(0);
const gracePeriodType = ref("NINGUNO"); // TOTAL, PARCIAL, NINGUNO
const gracePeriodDuration = ref(0);
const discountRate = ref(0);
const emissionDate = ref(""); // DD-MM-YYYY format
const primeRate = ref(0);
const structuringRate = ref(0);
const placementRate = ref(0);
const floatRate = ref(0);
const cavaliRate = ref(0);

const selectedFrequencyLabel = ref(getFrequencyLabel(frequency.value));
watch(selectedFrequencyLabel, (newLabel) => {
  frequency.value = getFrequencyValue(newLabel);
});

const localVisible = ref(props.visible);
watch(() => props.visible, (val) => {
  localVisible.value = val;
});

const toast = useToast();
const errors = ref<{ [key: string]: string }>({});

const validateForm = () => {
  errors.value = {};
  if (!name.value) errors.value.name = "Nombre es requerido.";
  if (nominalValue.value <= 0) errors.value.nominalValue = "Valor nominal debe ser mayor que 0.";
  if (marketValue.value <= 0) errors.value.marketValue = "Valor de mercado debe ser mayor que 0.";
  if (duration.value <= 0) errors.value.duration = "Duración debe ser mayor que 0.";
  if (interestRate.value <= 0) errors.value.interestRate = "Tasa de interés debe ser mayor que 0.";
  if (gracePeriodType.value !== "NINGUNO" && gracePeriodDuration.value <= 0) {
    errors.value.gracePeriodDuration = "Duración del periodo de gracia debe ser mayor que 0.";
  }
  if (discountRate.value <= 0) errors.value.discountRate = "Tasa de descuento debe ser mayor que 0.";
  if (!emissionDate.value) errors.value.emissionDate = "Fecha de emisión es requerida.";
  return Object.keys(errors.value).length === 0;
};

watch(localVisible, (val) => {
  emit('update:visible', val);
  if (!val) {
    name.value = "";
    nominalValue.value = 0;
    marketValue.value = 0;
    duration.value = 0;
    frequency.value = 1;
    selectedFrequencyLabel.value = getFrequencyLabel(frequency.value);
    interestRate.value = 0;
    gracePeriodType.value = "NINGUNO";
    gracePeriodDuration.value = 0;
    discountRate.value = 0;
    emissionDate.value = "";
  }
});

const closeDialog = () => {
  localVisible.value = false;
};

const handleSave = () => {
  if (!validateForm()) {
    console.log('Validation failed:', {
      name: name.value,
      nominalValue: nominalValue.value,
      duration: duration.value,
      frequency: frequency.value,
      discountRate: discountRate.value
    });
    toast.add({ severity: 'error', summary: 'Error', detail: 'Completa todos los campos correctamente.', life: 3000 });
    return;
  }

  const bond: Bond = {
    id: 0,
    userId,
    name: name.value,
    nominalValue: nominalValue.value,
    marketValue: marketValue.value,
    duration: duration.value,
    frequency: frequency.value,
    gracePeriodType: gracePeriodType.value,
    gracePeriodDuration: gracePeriodDuration.value,
    discountRate: discountRate.value,
    emissionDate: dayjs(emissionDate.value).format('DD-MM-YYYY'),
    interestType: interestRateType.value,
    interestRate: interestRate.value,
    capitalization: capitalization.value,
    currency: currency.value,
    primeRate: primeRate.value ?? 0,
    structuringRate: structuringRate.value ?? 0,
    placementRate: placementRate.value ?? 0,
    floatRate: floatRate.value ?? 0,
    cavaliRate: cavaliRate.value ?? 0
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
      <pv-message style="margin-top: 5px;" size="small" v-if="errors['name']" severity="error">{{ errors['name'] }}</pv-message>
    </div>

    <div class="mb-3">
      <pv-ifta-label style="width: 100%">
        <pv-input-number v-model="nominalValue" locale="en-US" :min="0" :max="9999999" input-id="nominalValue" style="width: 100%" />
        <label for="nominalValue" class="font-semibold w-24">Valor nominal ({{ currency }})</label>
      </pv-ifta-label>
      <pv-message style="margin-top: 5px;" size="small" v-if="errors['nominalValue']" severity="error">{{ errors['nominalValue'] }}</pv-message>
    </div>

    <div class="mb-3">
      <pv-ifta-label style="width: 100%">
        <pv-input-number v-model="marketValue" locale="en-US" :min="0" :max="9999999" input-id="marketValue" style="width: 100%" />
        <label for="marketValue" class="font-semibold w-24">Valor de mercado ({{ currency }})</label>
      </pv-ifta-label>
      <pv-message style="margin-top: 5px;" size="small" v-if="errors['marketValue']" severity="error">{{ errors['marketValue'] }}</pv-message>
    </div>

    <div class="mb-3">
      <pv-ifta-label style="width: 100%">
        <pv-input-number v-model="duration" locale="en-US" :min="0" :max="99" input-id="duration" style="width: 100%" />
        <label for="duration" class="font-semibold w-24">Duración (años)</label>
      </pv-ifta-label>
      <pv-message style="margin-top: 5px;" size="small" v-if="errors['duration']" severity="error">{{ errors['duration'] }}</pv-message>
    </div>

    <div class="mb-3">
      <pv-ifta-label style="width: 100%">
        <pv-select v-model="selectedFrequencyLabel"
                       :options="frequencyOptions"
                       style="width: 100%" />
        <label class="font-semibold w-24">Frecuencia del cupón</label>
      </pv-ifta-label>
    </div>

    <div class="mb-3">
      <pv-ifta-label style="width: 100%">
        <pv-input-text :model-value="interestRateType" :options="interestTypeOptions" disabled style="width: 100%" />
        <label class="font-semibold w-24">Tipo de tasa de interés</label>
      </pv-ifta-label>
    </div>

    <div class="mb-3">
      <pv-ifta-label style="width: 100%">
        <pv-input-number v-model="interestRate" locale="en-US" :min="0" :max="100" input-id="interestRate" :minFractionDigits="0" :maxFractionDigits="4" style="width: 100%" />
        <label for="interestRate" class="font-semibold w-24">Tasa de interés (%)</label>
      </pv-ifta-label>
      <pv-message style="margin-top: 5px;" size="small" v-if="errors['interestRate']" severity="error">{{ errors['interestRate'] }}</pv-message>
    </div>

    <div class="mb-3">
      <pv-ifta-label style="width: 100%">
        <pv-input-text :model-value="interestRateType === 'EFECTIVA' ? 'No aplica' : getCapitalizationLabel(capitalization)"
                       :options="interestRateType === 'EFECTIVA' ? ['No aplica'] : capitalizationOptions"
                       disabled style="width: 100%" />
        <label class="font-semibold w-24">Capitalización</label>
      </pv-ifta-label>
    </div>

    <div class="mb-3">
      <pv-ifta-label style="width: 100%">
        <pv-select v-model="gracePeriodType" :options="graceTypeOptions" style="width: 100%" />
        <label for="gracePeriodType" class="font-semibold w-24">Tipo de gracia</label>
      </pv-ifta-label>
    </div>

    <div class="mb-3">
      <pv-ifta-label style="width: 100%">
        <pv-input-number v-model="gracePeriodDuration" :disabled="gracePeriodType === 'NINGUNO'" locale="en-US" :min="0" :max="99" input-id="gracePeriodDuration" style="width: 100%" />
        <label for="gracePeriodDuration" class="font-semibold w-24">Duración del periodo de gracia</label>
      </pv-ifta-label>
      <pv-message style="margin-top: 5px;" size="small" v-if="errors['gracePeriodDuration']" severity="error">{{ errors['gracePeriodDuration'] }}</pv-message>
    </div>

    <div class="mb-3">
      <pv-ifta-label style="width: 100%">
        <pv-input-text :model-value="currency" disabled style="width: 100%" />
        <label class="font-semibold w-24">Moneda</label>
      </pv-ifta-label>
    </div>

    <div class="mb-3">
      <pv-ifta-label style="width: 100%">
        <pv-input-number v-model="discountRate" locale="en-US" :min="0" :max="100" input-id="discountRate" :minFractionDigits="0" :maxFractionDigits="4" style="width: 100%" />
        <label for="discountRate" class="font-semibold w-24">Tasa de descuento (%)</label>
      </pv-ifta-label>
      <pv-message style="margin-top: 5px;" size="small" v-if="errors['discountRate']" severity="error">{{ errors['discountRate'] }}</pv-message>
    </div>

    <div class="mb-3">
      <pv-ifta-label style="width: 100%">
        <pv-datepicker v-model="emissionDate" date-format="dd-mm-yy" show-icon input-id="emissionDate" style="width: 100%" />
        <label for="emissionDate" class="font-semibold w-24">Fecha de emisión</label>
      </pv-ifta-label>
      <pv-message style="margin-top: 5px;" size="small" v-if="errors['emissionDate']" severity="error">{{ errors['emissionDate'] }}</pv-message>
    </div>

    <div class="mb-3">
      <pv-ifta-label style="width: 100%">
        <pv-input-number v-model="primeRate" locale="en-US" :min="0" :max="100" input-id="primeRate" :minFractionDigits="0" :maxFractionDigits="4" style="width: 100%" />
        <label for="primeRate" class="font-semibold w-24">Prima de riesgo (%)</label>
      </pv-ifta-label>
    </div>

    <div class="mb-3" v-if="isBondIssuer">
      <pv-ifta-label style="width: 100%">
        <pv-input-number v-model="structuringRate" locale="en-US" :min="0" :max="100" input-id="structuringRate" :minFractionDigits="0" :maxFractionDigits="4" style="width: 100%" />
        <label for="structuringRate" class="font-semibold w-24">Tasa de estructuración (%)</label>
      </pv-ifta-label>
    </div>

    <div class="mb-3" v-if="isBondIssuer">
      <pv-ifta-label style="width: 100%">
        <pv-input-number v-model="placementRate" locale="en-US" :min="0" :max="100" input-id="placementRate" :minFractionDigits="0" :maxFractionDigits="4" style="width: 100%" />
        <label for="placementRate" class="font-semibold w-24">Tasa de colocación (%)</label>
      </pv-ifta-label>
    </div>

    <div class="mb-3">
      <pv-ifta-label style="width: 100%">
        <pv-input-number v-model="floatRate" locale="en-US" :min="0" :max="100" input-id="floatRate" :minFractionDigits="0" :maxFractionDigits="4" style="width: 100%" />
        <label for="floatRate" class="font-semibold w-24">Tasa de flotación (%)</label>
      </pv-ifta-label>
    </div>

    <div class="mb-3">
      <pv-ifta-label style="width: 100%">
        <pv-input-number v-model="cavaliRate" locale="en-US" :min="0" :max="100" input-id="cavaliRate" :minFractionDigits="0" :maxFractionDigits="4" style="width: 100%" />
        <label for="cavaliRate" class="font-semibold w-24">Tasa de Cavali (%)</label>
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