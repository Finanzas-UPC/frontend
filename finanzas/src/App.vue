<script setup lang="ts">
import store from './shared/utils/store.ts';
import Navbar from './shared/components/Navbar.component.vue';
import ConfigurationDialog from './shared/components/ConfigurationDialog.component.vue';
import { ref } from 'vue';

const showConfig = ref(false);

const handleCurrency= (newCurrency: string) => {
  store.dispatch('updateCurrency', newCurrency);
};
</script>

<template>
  <Navbar v-if="store.getters.isAuthenticated" @open-config="showConfig = true" />
  <ConfigurationDialog v-model:visible="showConfig" @currency-updated="handleCurrency" />
  <router-view />
</template>