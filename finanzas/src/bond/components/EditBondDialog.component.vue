<script setup lang="ts">
import dayjs from 'dayjs';
import {ref, watch} from 'vue';
import type { Bond } from "../models/bond.entity.ts";
import {
  getCapitalizationDays,
  getCapitalizationLabel
} from "../../shared/utils/capitalization.ts";
import {
  capitalizationOptions,
  currencyOptions, frequencyOptions,
  graceTypeOptions,
  interestTypeOptions
} from "../../shared/utils/options.ts";
import {getFrequencyLabel, getFrequencyValue} from "../../shared/utils/frecuency.ts";
const props = defineProps({
  visible: {
    type: Boolean,
    required: true,
  },
  bond: {
    type: Object as () => Bond,
    required: true
  }
});

const emit = defineEmits(['update:visible', 'save']);

const localVisible = ref(props.visible);

const name = ref(props.bond.name);
const nominalValue = ref(props.bond.nominalValue);
const marketValue = ref(props.bond.marketValue);
const duration = ref(props.bond.duration);
const frequency = ref(getFrequencyLabel(props.bond.frequency));
const interestType = ref(props.bond.interestType);
const interestRate = ref(props.bond.interestRate);
const capitalization = ref(getCapitalizationLabel(props.bond.capitalization));
const gracePeriodType = ref(props.bond.gracePeriodType);
const gracePeriodDuration = ref(props.bond.gracePeriodDuration);
const discountRate = ref(props.bond.discountRate);
const emissionDate = ref(props.bond.emissionDate);
const currency = ref(props.bond.currency);
const primeRate = ref(props.bond.primeRate);
const structuringRate = ref(props.bond.structuringRate);
const placementRate = ref(props.bond.placementRate);
const floatRate = ref(props.bond.floatRate);
const cavaliRate = ref(props.bond.cavaliRate);

watch(() => props.visible, (val) => {
  localVisible.value = val;
});

watch(localVisible, (val) => {
  emit('update:visible', val);
});

const closeDialog = () => {
  localVisible.value = false;
};

const handleUpdate = () => {
  if (!name.value || nominalValue.value <= 0 || duration.value <= 0 || discountRate.value <= 0) {
    alert('Completa todos los campos correctamente.');
    return;
  }

const updatedBond: Bond = {
  ...props.bond,
  name: name.value,
  nominalValue: nominalValue.value,
  marketValue: marketValue.value,
  duration: duration.value,
  frequency: getFrequencyValue(frequency.value),
  gracePeriodType: gracePeriodType.value,
  gracePeriodDuration: gracePeriodDuration.value,
  discountRate: discountRate.value,
  emissionDate: dayjs(emissionDate.value).isValid() ? dayjs(emissionDate.value).format('DD-MM-YYYY') : emissionDate.value,
  interestType: interestType.value,
  interestRate: interestRate.value,
  capitalization: getCapitalizationDays(capitalization.value),
  primeRate: primeRate.value,
  structuringRate: structuringRate.value,
  placementRate: placementRate.value,
  floatRate: floatRate.value,
  cavaliRate: cavaliRate.value,
  currency: currency.value
};

emit('save', updatedBond);
closeDialog();
};
</script>

<template>
  <pv-dialog v-model:visible="localVisible" modal :style="{ width: '30rem' }">
    <template #header>
      <div class="flex flex-column">
        <h5 class="m-1">Editar bono</h5>
        <span class="m-1">Modificar los datos del bono</span>
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
        <pv-select v-model="frequency"
                   :options="frequencyOptions"
                   style="width: 100%" />
        <label class="font-semibold w-24">Frecuencia del cupón</label>
      </pv-ifta-label>
    </div>

    <div class="mb-3">
      <pv-ifta-label style="width: 100%">
        <pv-select v-model="interestType" :options="interestTypeOptions" style="width: 100%" />
        <label for="interestType" class="font-semibold w-24">Tipo de tasa de interés</label>
      </pv-ifta-label>
    </div>

    <div class="mb-3">
      <pv-ifta-label style="width: 100%">
        <pv-input-number v-model="interestRate" locale="en-US" :min="0" input-id="interestRate" :minFractionDigits="0" :maxFractionDigits="4" style="width: 100%" />
        <label for="interestRate" class="font-semibold w-24">Tasa de interés (%)</label>
      </pv-ifta-label>
    </div>

    <div class="mb-3">
      <pv-ifta-label style="width: 100%;">
        <pv-select v-model="capitalization"
                   :options="interestType === 'EFECTIVA' ? ['No aplica'] : capitalizationOptions"
                   :disabled="interestType === 'EFECTIVA'"
                   style="width: 100%;"
        />
        <label for="capitalization" class="font-semibold w-24">Capitalización</label>
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
        <pv-input-number v-model="gracePeriodDuration" :disabled="gracePeriodType === 'NINGUNO'" locale="en-US" :min="0" input-id="gracePeriodDuration" style="width: 100%" />
        <label for="gracePeriodDuration" class="font-semibold w-24">Duración periodo de gracia</label>
      </pv-ifta-label>
    </div>

    <div class="mb-3">
      <pv-ifta-label style="width: 100%">
        <pv-input-number v-model="discountRate" locale="en-US" :min="0" input-id="discountRate" :minFractionDigits="0" :maxFractionDigits="4" style="width: 100%" />
        <label for="discountRate" class="font-semibold w-24">Tasa de descuento (%)</label>
      </pv-ifta-label>
    </div>

    <div class="mb-3">
      <pv-ifta-label style="width: 100%">
        <pv-datepicker v-model="emissionDate" date-format="dd-mm-yy" show-icon input-id="emissionDate" style="width: 100%" />
        <label for="emissionDate" class="font-semibold w-24">Fecha de emisión</label>
      </pv-ifta-label>
    </div>

    <div class="mb-3">
      <pv-ifta-label style="width: 100%">
        <pv-select v-model="currency" :options="currencyOptions" style="width: 100%" />
        <label for="currency" class="font-semibold w-24">Moneda</label>
      </pv-ifta-label>
    </div>

    <div class="mb-3">
      <pv-ifta-label style="width: 100%">
        <pv-input-number v-model="primeRate" locale="en-US" :min="0" input-id="primeRate" :minFractionDigits="0" :maxFractionDigits="4" style="width: 100%" />
        <label for="primeRate" class="font-semibold w-24">Prima de riesgo (%)</label>
      </pv-ifta-label>
    </div>

    <div class="mb-3">
      <pv-ifta-label style="width: 100%">
        <pv-input-number v-model="structuringRate" locale="en-US" :min="0" input-id="structuringRate" :minFractionDigits="0" :maxFractionDigits="4" style="width: 100%" />
        <label for="structuringRate" class="font-semibold w-24">Tasa de estructuración (%)</label>
      </pv-ifta-label>
    </div>

    <div class="mb-3">
      <pv-ifta-label style="width: 100%">
        <pv-input-number v-model="placementRate" locale="en-US" :min="0" input-id="placementRate" :minFractionDigits="0" :maxFractionDigits="4" style="width: 100%" />
        <label for="placementRate" class="font-semibold w-24">Tasa de colocación (%)</label>
      </pv-ifta-label>
    </div>

    <div class="mb-3">
      <pv-ifta-label style="width: 100%">
        <pv-input-number v-model="floatRate" locale="en-US" :min="0" input-id="floatRate" :minFractionDigits="0" :maxFractionDigits="4" style="width: 100%" />
        <label for="floatRate" class="font-semibold w-24">Tasa de flotación (%)</label>
      </pv-ifta-label>
    </div>

    <div class="mb-3">
      <pv-ifta-label style="width: 100%">
        <pv-input-number v-model="cavaliRate" locale="en-US" :min="0" input-id="cavaliRate" :minFractionDigits="0" :maxFractionDigits="4" style="width: 100%" />
        <label for="cavaliRate" class="font-semibold w-24">Tasa de Cavali (%)</label>
      </pv-ifta-label>
    </div>

    <template #footer>
      <div class="flex flex-row gap-4 w-full justify-content-center">
        <pv-button label="Actualizar" style="width: 6rem" @click="handleUpdate" />
        <pv-button label="Cancelar" severity="secondary" variant="text" @click="closeDialog" />
      </div>
    </template>
  </pv-dialog>
</template>

<style scoped>
</style>