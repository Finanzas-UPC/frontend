<script setup lang="ts">
import store from "./shared/components/store.ts";
import Navbar from './shared/components/Navbar.component.vue';
import ConfigurationDialog from './shared/components/ConfigurationDialog.component.vue';
import {ref} from "vue";

const showConfig = ref(false);
</script>

<template>
  <Navbar v-if="store.getters.isAuthenticated"
                   @open-config="showConfig = true" />
  <ConfigurationDialog v-model:visible="showConfig" />
  <router-view/>
</template>

<style scoped>
</style>
