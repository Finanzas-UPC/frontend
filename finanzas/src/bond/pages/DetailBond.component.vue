<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { bondService } from '../services/bond.service.ts';
import type { BondMetrics } from '../models/bondmetrics.entity.ts';

const route = useRoute();
const metrics = ref<BondMetrics>({
  id: 0,
  bondId: 0,
  duration: 0,
  convexity: 0,
  totalDurationConvexity: 0,
  modifiedDuration: 0,
  tcea: 0,
  trea: 0,
});

const loadMetrics = async () => {
  const bondId = Number(route.params.id);
  if (!isNaN(bondId)) {
    const res = await bondService.getMetricsByBondId(bondId);
    metrics.value = res.data;
  }
};

onMounted(loadMetrics);
</script>

```vue
<template>
  <h2>Detalles del bono</h2>
  <div class="metrics-wrapper">
    <div class="metrics-container">
      <div class="metric-card">
        <p class="label">Duración</p>
        <p class="value">{{ metrics.duration }}</p>
      </div>
      <div class="metric-card">
        <p class="label">Convexidad</p>
        <p class="value">{{ metrics.convexity }}</p>
      </div>
      <div class="metric-card">
        <p class="label">Duración modificada</p>
        <p class="value">{{ metrics.modifiedDuration }}</p>
      </div>
      <div class="metric-card">
        <p class="label">TCEA</p>
        <p class="value">{{ metrics.tcea }} %</p>
      </div>
      <div class="metric-card">
        <p class="label">TREA</p>
        <p class="value">{{ metrics.trea }} %</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
h2 {
  text-align: center;
  margin-bottom: 20px;
}

.metrics-wrapper {
  padding: 0 16px;
  box-sizing: border-box;
}

.metrics-container {
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
  max-width: 1200px;
  margin: 0 auto;
}

.metric-card {
  background-color: #ffffff;
  padding: 8px 12px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  flex: 1;
  min-width: 150px;
  text-align: center;
}

.label {
  font-weight: bold;
  margin-bottom: 8px;
  color: #555;
}

.value {
  font-size: 18px;
  color: #000;
}
</style>
