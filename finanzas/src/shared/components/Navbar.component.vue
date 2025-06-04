<script setup lang="ts">
import {useRouter} from "vue-router";
import {ref} from "vue";
import { nextTick } from 'vue'
import store from "./store.ts";

const router = useRouter()
const menu = ref()

const items = [
  {
    label: 'Cerrar sesión',
    icon: 'pi pi-sign-out',
    command: () => { logout(); }
  }
]

const toggle = (event: any) => {
  menu.value.toggle(event);
};

const logout = () => {
  store.dispatch('logout').then(() => {
    nextTick(() => {
      router.push('/login');
    })
  })
}

</script>

<template>
  <header>
    <nav class="nav-container" id="navbar">
      <div class="nav-logo">
        <img src="/assets/images/logo.png" width="50px" height="50px" alt="software logo" />
        <p>BonoApp</p>
      </div>
      <div class="desktop-menu">
        <pv-button @click="logout"
                   text
                   icon="pi pi-sign-out"
                   style="color: white; font-size: 20px;"
                   aria-label="log out"/>
      </div>
      <div class="mobile-menu">
        <pv-button icon="pi pi-bars"
                   text
                   style="color: white; font-size: 20px;"
                   @click="toggle"/>
        <pv-menu ref="menu"
                 id="overlay_menu"
                 :model="items"
                 :popup="true"
                 />
      </div>
    </nav>
  </header>
</template>

<style scoped>
.nav-container {
  display: flex;
  height: 75px;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: var(--primary-color-dark);
}

.desktop-menu {
  display: flex;
  align-items: center;
}

.mobile-menu {
  display: none;
}

.nav-sections {
  display: flex;
  gap: 30px;
  list-style: none;
  margin-right: 50px;
}

.nav-sections li a {
  text-decoration: none;
  font-weight: 100;
  font-size: 24px;
  color: var(--background-color);
}

.nav-sections li:hover {
  transform: scale(1.1);
}

.nav-logo {
  display: flex;
  align-items: center;
}

.nav-logo img {
  margin: 10px;
}

.nav-logo p {
  font-size: 24px;
  color: var(--background-color);
}

@media (max-width: 768px) {
  .desktop-menu {
    display: none;
  }
  .mobile-menu {
    display: block;
  }
}

</style>