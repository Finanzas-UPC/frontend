<script setup lang="ts">
import dayjs from 'dayjs';
import {computed, ref, watch} from 'vue';
import type { Bond } from "../models/bond.entity.ts";
import { useStore } from "vuex";
import {
  getCapitalizationDays,
  getCapitalizationLabel
} from "../../shared/utils/capitalization.ts";
import {formatText} from "../../shared/utils/textFormatter.ts";
import {capitalizationOptions, graceTypeOptions, interestTypeOptions} from "../../shared/utils/options.ts";

const store = useStore();
const currency = computed(() => store.getters.getCurrency);

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
const amount = ref(props.bond.amount);
const marketValue = ref(props.bond.marketValue);
const duration = ref(props.bond.duration);
const frequency = ref(props.bond.frequency);
const interestType = ref(formatText(props.bond.interestType));
const interestRate = ref(props.bond.interestRate);
const capitalization = ref(getCapitalizationLabel(props.bond.capitalization));
const gracePeriodType = ref(formatText(props.bond.gracePeriodType));
const gracePeriodDuration = ref(props.bond.gracePeriodDuration);
const marketRate = ref(props.bond.marketRate);
const emissionDate = ref(props.bond.emissionDate);

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
  if (!name.value || amount.value <= 0 || duration.value <= 0 || frequency.value <= 0 || marketRate.value <= 0) {
    alert('Completa todos los campos correctamente.');
    return;
  }

  const updatedBond: Bond = {
    ...props.bond,
    name: name.value,
    amount: amount.value,
    marketValue: marketValue.value,
    duration: duration.value,
    frequency: frequency.value,
    gracePeriodType: gracePeriodType.value,
    gracePeriodDuration: gracePeriodDuration.value,
    marketRate: marketRate.value,
    emissionDate: dayjs(emissionDate.value).isValid() ? dayjs(emissionDate.value).format('YYYY-MM-DD') : emissionDate.value,
    interestType: interestType.value,
    interestRate: interestRate.value,
    capitalization: getCapitalizationDays(capitalization.value)
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
        <pv-select v-model="capitalization" :options="interestType === 'Efectiva' ? ['No aplica'] : capitalizationOptions"
                   :disabled="interestType === 'Efectiva'"
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
        <pv-datepicker v-model="emissionDate" date-format="dd-mm-yy" show-icon input-id="emissionDate" style="width: 100%" />
        <label for="emissionDate" class="font-semibold w-24">Fecha de emisión</label>
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