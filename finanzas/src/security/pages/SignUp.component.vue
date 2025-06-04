<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import {AuthenticationService} from "../services/authentication.service.ts";

const username = ref<string>('');
const password = ref<string>('');
const confirmPassword = ref<string>('');
const error = ref<string>('');

const authenticationService = new AuthenticationService();
const router = useRouter();

const register = async () => {
  error.value = '';

  if (!username.value || !password.value || !confirmPassword.value) {
    error.value = 'Todos los campos son obligatorios';
    return;
  }

  if (password.value !== confirmPassword.value) {
    error.value = 'Las contraseñas no coinciden';
    return;
  }

  try {
    await authenticationService.signUp(username.value, password.value);
    await router.push('/home');
  } catch (err) {
    error.value = 'Error al registrar. Inténtalo nuevamente';
  }
};
</script>

<template>
  <div class="container">
    <div class="left">
      <img src="/assets/images/logo.png" style="width: 350px; height: 350px;" alt="software logo" />
    </div>
    <div class="right">
      <pv-card class="signup-card" style="width: 550px; height: 620px;">
        <template #title>
          <h3>Crear cuenta</h3>
          <p v-if="error">{{ error }}</p>
        </template>
        <template #content>
          <div class="signup-form">
            <pv-ifta-label style="margin: 0 auto; width: 80%;">
              <pv-icon-field>
                <pv-input-icon class="pi pi-user" />
                <pv-input-text v-model="username" variant="filled" style="width: 100%;" type="text" />
              </pv-icon-field>
              <label>Usuario</label>
            </pv-ifta-label>

            <pv-ifta-label style="margin: 0 auto; width: 80%;">
              <pv-icon-field>
                <pv-input-icon class="pi pi-key" />
                <pv-input-text v-model="password" variant="filled" style="width: 100%;" type="password" />
              </pv-icon-field>
              <label>Contraseña</label>
            </pv-ifta-label>

            <pv-ifta-label style="margin: 0 auto; width: 80%;">
              <pv-icon-field>
                <pv-input-icon class="pi pi-check" />
                <pv-input-text v-model="confirmPassword" variant="filled" style="width: 100%;" type="password" />
              </pv-icon-field>
              <label>Confirmar Contraseña</label>
            </pv-ifta-label>

            <pv-button @click="register" label="Registrarse" style="margin: 0 auto; width: 60%;" />
            <router-link to="/login"
                         style="text-decoration: none; color:var(--text-color);">
              ¿Ya tienes cuenta? <u>Inicia sesión</u>
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

.signup-form {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.signup-card {
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
