<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import {AuthenticationService} from "../services/authentication.service.ts";
import type {LoginResponse} from "../models/auth.entity.ts";
import store from "../../shared/components/store.ts";

const username = ref<string>("");
const password = ref<string>("");
const error = ref<boolean>(false);

const authenticationService = new AuthenticationService();
const router = useRouter();

const login = async () => {
  error.value = false;

  if (!username.value || !password.value) {
    error.value = true;
    return;
  }

  try {
    const response = await authenticationService.signIn(username.value, password.value);
    const loginResponse = {
      ...response.data,
      userId: response.data.id, // Map 'id' to 'userId'
    } as LoginResponse;

    await store.dispatch('login', {
      token: loginResponse.token,
      userId: Number(loginResponse.userId),
    });

    await router.push('/home');
  } catch (e) {
    error.value = true;
  }
};
</script>

<template>
  <div class="container">
    <div class="left">
      <img src="/assets/images/logo.png" style="width: 350px; height: 350px;" alt="software logo" />
    </div>
    <div class="right">
      <pv-card class="login-card" style="width: 550px; height: 560px;">
        <template #title>
          <h3>Iniciar Sesión</h3>
          <p v-if="error">Usuario o contraseña incorrectos</p>
        </template>
        <template #content>
          <div class="login-form">
            <div class="card flex justify-center">
              <pv-ifta-label style="margin: 0 auto; width: 80%;">
                <pv-icon-field style="margin: 0 auto;">
                  <pv-input-icon class="pi pi-user" />
                  <pv-input-text id="username" v-model="username" variant="filled" style="width: 100%;" type="text"/>
                </pv-icon-field>
                <label for="username">Usuario</label>
              </pv-ifta-label>
            </div>
            <div class="card flex justify-center">
              <pv-ifta-label style="margin: 0 auto; width: 80%;">
                <pv-icon-field style="margin: 0 auto;">
                  <pv-input-icon class="pi pi-key" />
                  <pv-input-text id="password"
                                 v-model="password"
                                 variant="filled"
                                 style="width: 100%;"
                                 type="password"
                  />
                </pv-icon-field>
                <label for="password">Contraseña</label>
              </pv-ifta-label>
            </div>
            <pv-button @click="login" label="Acceder" style="margin: 0 auto; width: 60%;" />
            <router-link to="/signup"
                         style="text-decoration: none; color:var(--text-color);">
              ¿No tienes cuenta? <u>Regístrate aquí</u>
            </router-link>
          </div>
        </template>
      </pv-card>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  height: 100vh;
}

.left {
  width: 50%;
  height: 100%;
  background-image: url("/assets/images/heroimage.jpg");
  background-size: cover;
  background-position: center;
  display: flex;
  justify-content: center;
  align-items: center;
}

.right {
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
}

h3 {
  text-align: center;
}

p {
  text-align: center;
  font-weight: 400;
  color: var(--error-color);
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.login-card {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1), 0 6px 20px rgba(0, 0, 0, 0.1);
}

a {
  text-align: center;
}

@media (max-width: 768px) {
  .left {
    display: none;
  }

  .right {
    width: 100%;
    padding: 5px;
  }
}
</style>