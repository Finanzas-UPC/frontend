<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { useStore } from 'vuex';
import { getCapitalizationDays, getCapitalizationLabel } from "../utils/capitalization.ts";
import { interestTypeOptions, capitalizationOptions } from "../utils/options.ts";
import { configurationService } from "../services/configuration.service.ts";
import type { Configuration } from "../models/configuration.entity.ts";

const store = useStore();
const props = defineProps({
  visible: {
    type: Boolean,
    required: true,
  }
});
const emit = defineEmits(['update:visible']);
const dialogVisible = computed({
  get: () => props.visible,
  set: (val: boolean) => emit('update:visible', val),
});

let configuration: Configuration = {
  id: 0,
  userId: parseInt(store.getters.getUserId ?? '0'),
  currency: '',
  interestType: '',
  capitalization: 30,
};

// Reactive references for form values
const currency = ref('');
const interestRateType = ref('');
const selectedCapitalization = ref('');

// Function to fetch and load configuration values
const loadValues = () => {
  const userId = store.getters.getUserId;
  if (!userId) return;

  configurationService.getByUserId(userId)
      .then(response => {
        if (response.data) {
          configuration = response.data;
          currency.value = response.data.currency ?? '';
          interestRateType.value = response.data.interestType ?? '';
          selectedCapitalization.value = getCapitalizationLabel(response.data.capitalization) ?? '';
          store.dispatch('updateCurrency', response.data.currency);
          store.dispatch('updateInterestRateType', response.data.interestType);
          store.dispatch('updateCapitalization', getCapitalizationLabel(response.data.capitalization));
        }
      })
      .catch(error => {
        console.error('Error al cargar la configuración:', error);
      });
};

// Watch for dialog visibility and load configuration when opened
watch(dialogVisible, (newVal) => {
  if (newVal) {
    loadValues();
  }
});

// Watch for changes in the logged-in user and reload configuration
watch(() => store.getters.getUserId, () => {
  loadValues();
});

// Save updated configuration
const handleSave = () => {
  const updatedConfig: Configuration = {
    ...configuration,
    currency: currency.value,
    interestType: interestRateType.value,
    capitalization: getCapitalizationDays(selectedCapitalization.value),
  };

  if (!configuration.id) {
    console.error('No configuration ID found. Cannot update.');
    return;
  }

  configurationService.update(configuration.id, updatedConfig)
      .then((response) => {
        configuration.currency = currency.value;
        configuration.interestType = interestRateType.value;
        configuration.capitalization = getCapitalizationDays(selectedCapitalization.value);
        store.dispatch('updateCurrency', response.data.currency);
        store.dispatch('updateInterestRateType', response.data.interestType);
        store.dispatch('updateCapitalization', selectedCapitalization.value);
        reloadPage();
        closeDialog();
      })
      .catch(error => {
        console.error('Error al actualizar la configuración:', error);
      });
};

const closeDialog = () => {
  dialogVisible.value = false;
};

const reloadPage = () => {
  window.location.reload();
};
</script>

<template>
  <pv-dialog v-model:visible="dialogVisible" modal :style="{ width: '30rem' }">
    <template #header>
      <h4>Configuración</h4>
    </template>
    <div class="text-center mb-4">
      <div class="flex items-center mb-4">
        <pv-ifta-label style="margin: 0 auto; width: 80%;">
          <pv-select v-model="currency"
                     :options="['PEN', 'USD', 'EUR']"
                     placeholder="Selecciona una moneda"
                     style="width: 100%;"
          />
          <label for="currency" class="font-semibold w-24">Moneda</label>
        </pv-ifta-label>
      </div>
      <div class="flex items-center mb-4">
        <pv-ifta-label style="margin: 0 auto; width: 80%;">
          <pv-select v-model="interestRateType"
                     :options="interestTypeOptions"
                     class="w-full mb-3" />
          <label for="interestRateType" class="font-semibold w-24">Tipo de tasa de interés</label>
        </pv-ifta-label>
      </div>
      <div class="flex items-center mb-4">
        <pv-ifta-label style="margin: 0 auto; width: 80%;">
          <pv-select v-model="selectedCapitalization"
                     :options="interestRateType === 'EFECTIVA' ? ['No Aplica'] : capitalizationOptions"
                     class="w-full mb-3"
                     :disabled="interestRateType === 'EFECTIVA'"
          />
          <label for="capitalization" class="font-semibold w-24">Capitalización</label>
        </pv-ifta-label>
      </div>
    </div>
    <template #footer>
      <div class="flex w-full gap-3">
        <pv-button class="flex-1" label="Guardar" severity="info" @click="handleSave" />
        <pv-button class="flex-1" label="Cancelar" variant="text" severity="danger" @click="closeDialog" />
      </div>
    </template>
  </pv-dialog>
</template>

<style scoped>
</style>