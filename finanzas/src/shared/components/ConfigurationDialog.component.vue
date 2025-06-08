<script setup lang="ts">
import { computed, ref } from 'vue';

const props = defineProps({
  visible: {
    type: Boolean,
    required: true,
  }
});
const emit = defineEmits(['update:visible', 'currency-updated']);
const dialogVisible = computed({
  get: () => props.visible,
  set: (val: boolean) => emit('update:visible', val)
});
const displayCapitalization = computed({
  get: () => {
    return interestRateType.value === 'Efectiva' ? 'No aplica' : capitalization.value;
  },
  set: (val: string) => {
    capitalization.value = val;
  }
});

const currency = ref(localStorage.getItem('currency') || 'PEN');
const interestRateType = ref(localStorage.getItem('interestRateType') || 'Nominal');
const capitalization = ref(localStorage.getItem('capitalization') || 'Mensual');

const handleSave = () => {
  localStorage.setItem('currency', currency.value);
  localStorage.setItem('interestRateType', interestRateType.value);
  localStorage.setItem('capitalization', displayCapitalization.value);
  emit('currency-updated', currency.value);
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
                     :options="['Nominal', 'Efectiva']"
                     label="Tipo de tasa de interés"
                     class="w-full mb-3" />
          <label for="interestRateType" class="font-semibold w-24">Tipo de tasa de interés</label>
        </pv-ifta-label>
      </div>
      <div class="flex items-center mb-4">
        <pv-ifta-label style="margin: 0 auto; width: 80%;">
          <pv-select v-model="displayCapitalization"
                     :options="interestRateType === 'Efectiva' ? ['No aplica'] : ['Diaria', 'Quincenal', 'Mensual', 'Bimestral', 'Trimestral', 'Cuatrimestral', 'Semestral', 'Anual']"
                     label="Capitalización"
                     class="w-full mb-3"
                     :disabled="interestRateType === 'Efectiva'"
          />
          <label for="capitalization" class="font-semibold w-24">Capitalización</label>
        </pv-ifta-label>
      </div>
    </div>
    <template #footer>
      <div class="flex flex-row gap-4 w-full justify-content-center">
        <pv-button label="Guardar" severity="info" @click="handleSave" />
        <pv-button label="Cancelar" severity="danger" @click="closeDialog" />
      </div>
    </template>
  </pv-dialog>
</template>

<style scoped>

</style>