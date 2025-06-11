<script setup lang="ts">
import { computed, ref } from 'vue';
import { useStore } from 'vuex';
import { getCapitalizationLabel} from "../utils/capitalization.ts";
import {interestTypeOptions, capitalizationOptions} from "../utils/options.ts";

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

const currency = ref(store.getters.getCurrency);
const interestRateType = ref(store.getters.getInterestRateType);
const selectedCapitalization = ref(getCapitalizationLabel(store.getters.getCapitalization));

const handleSave = () => {
  store.dispatch('updateCurrency', currency.value);
  store.dispatch('updateInterestRateType', interestRateType.value);
  store.dispatch('updateCapitalization', selectedCapitalization.value);
  closeDialog();
};

const closeDialog = () => {
  dialogVisible.value = false;
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
                     :options="interestRateType === 'Efectiva' ? ['No aplica'] : capitalizationOptions"
                     class="w-full mb-3"
                     :disabled="interestRateType === 'Efectiva'"
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