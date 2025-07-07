<script setup lang="ts">
import store from './shared/utils/store.ts';
import Navbar from './shared/components/Navbar.component.vue';
import ConfigurationDialog from './shared/components/ConfigurationDialog.component.vue';
import { ref } from 'vue';
import HelpDialogComponent from './shared/components/HelpDialog.component.vue';

const showConfig = ref(false);
const showHelp = ref(false);

const handleCurrency= (newCurrency: string) => {
  store.dispatch('updateCurrency', newCurrency);
};
</script>

<template>
  <Navbar v-if="store.getters.isAuthenticated" @open-config="showConfig = true" @open-help="showHelp = true" />
  <ConfigurationDialog v-model:visible="showConfig" @currency-updated="handleCurrency" />
  <HelpDialogComponent v-model:visible="showHelp" />
  <router-view />
</template>