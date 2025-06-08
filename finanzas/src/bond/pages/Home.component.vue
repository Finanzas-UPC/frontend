<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { bondService } from '../services/bond.service.ts';
import type { Bond } from '../models/bond.entity.ts';

const bonds = ref<Bond[]>([]); // Especifica el tipo Bond[]
const userId = Number(localStorage.getItem('userId'));

const loadBonds = async () => {
  const res = await bondService.getByUser(userId);
  bonds.value = res.data;

  // Log duration and emissionDate for each bond
  bonds.value.forEach(bond => {
    console.log(`Bond ID: ${bond.id}, Duration: ${bond.duration}, Emission Date: ${bond.emissionDate}`);
  });
};


onMounted(loadBonds);
</script>

<template>
  <div>
    <h2>Listado de bonos</h2>
    <div class="bond-container">
      <div class="bond-grid">
        <div class="bond-card" v-for="bond in bonds" :key="bond.id">
          <p><strong>Valor nominal:</strong> {{ bond.amount }}</p>
          <p><strong>Plazo:</strong> {{ bond.duration }}</p>
          <p><strong>Fecha de emisión:</strong> {{ bond.emissionDate }}</p>
          <div class="bond-actions">
            <button class="action-button" @click="">Ver</button>
            <button class="action-button" @click="">Editar</button>
          </div>
        </div>
      </div>
    </div>
    <pv-button label="Agregar Bono" @click="" class="add-bond-button"/>
  </div>
</template>

<style scoped>
h2 {
  text-align: center;
  margin-top: 16px;
  color: #333;
}

.bond-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 16px;
}

.bond-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  margin-top: 16px;
}

.bond-card {
  background-color: #ffffff;
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.bond-card p {
  margin: 8px 0;
}

.bond-actions {
  display: flex;
  justify-content: center;
  gap: 40px;
  margin-top: 16px;
}

.action-button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  width: 80%;
  max-width: 180px;
  box-sizing: border-box;
}

.action-button:hover {
  background-color: #0056b3;
}

.add-bond-button {
  display: flex;
  justify-content: center;
  margin: 16px auto;
  padding: 22px 54px;
  font-size: 16px;
}
</style>