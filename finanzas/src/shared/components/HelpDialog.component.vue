<script setup lang="ts">
import {defineProps, defineEmits, computed} from 'vue';
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
</script>

<template>
  <pv-dialog v-model:visible="dialogVisible" modal :style="{ width: '30rem' }">
    <template #header>
      <h4>¿Cómo utilizar la aplicación?</h4>
    </template>
    <div>
      <ul>
        <li>
          <strong>Configuración Inicial:</strong> Antes de comenzar, asegúrate de configurar tu moneda, tipo de interés y capitalización en el diálogo de configuración.
        </li>
        <li>
          <strong>Ingresar un bono:</strong> Utiliza el formulario principal para ingresar los detalles del bono, incluyendo el valor nominal, valor de mercado, tasa de interés y el período de tiempo, gastos, etc.
        </li>
        <li>
          <strong>Ver Resultados:</strong> Una vez ingresados los datos, la aplicación calculará el flujo de caja, TCEA, TREA y otros indicadores financieros relevantes.
        </li>
      </ul>
      <p>Para ayuda adicional, contacta al soporte técnico a través del <a href="mailto:soporte.tecnico@bonoapp.com">correo</a>.</p>
    </div>
  </pv-dialog>
</template>

<style scoped>

</style>