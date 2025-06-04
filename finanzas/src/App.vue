<script setup lang="ts">
import store from "./shared/components/store.ts";
import NavbarComponent from './shared/components/Navbar.component.vue';
</script>

<template>
  <NavbarComponent v-if="store.getters.isAuthenticated"/>
  <router-view/>
</template>

<style scoped>
</style>
