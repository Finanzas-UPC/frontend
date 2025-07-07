<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { AuthenticationService } from "../services/authentication.service.ts";
import { useToast } from "primevue/usetoast";


const username = ref<string>('');
const password = ref<string>('');
const confirmPassword = ref<string>('');
const selectedRole = ref<string>('Emisor');
const error = ref<string>('');

const authenticationService = new AuthenticationService();
const router = useRouter();

const options = [
    'Emisor',
    'Bonista'
];

const toast = useToast();


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

  if (selectedRole.value === '') {
    error.value = 'Debes seleccionar un rol';
    return;
  }
  switch(selectedRole.value) {
    case 'Emisor':
      selectedRole.value = 'ROLE_BOND_ISSUER';
      break;
    case 'Bonista':
      selectedRole.value = 'ROLE_BONDHOLDER';
      break;
  }

  try {
    const response = await authenticationService.signUp(username.value, password.value, selectedRole.value);
    if (response.status === 201) {
      // Muestra el toast
      toast.add({
        severity: 'success',
        summary: 'Registro exitoso',
        detail: 'Te estamos redirigiendo a iniciar sesión.',
        life: 2000
      });

      setTimeout(() => {
        router.push('/home');
      }, 2000);
    }
  } catch (err) {
    error.value = 'Error al registrar. Inténtalo nuevamente';
  }
};
</script>

<template>
  <pv-toast />
  <div class="container">
    <div class="left">
      <img src="/assets/images/logo.png" style="width: 350px; height: 350px;" alt="software logo" />
    </div>
    <div class="right">
      <pv-card class="signup-card" style="width: 550px; height: 690px;">
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

            <div class="role-selection">
              <label class="role-label">Selecciona tu rol</label>
              <div class="role-options">
                <div class="flex flex-col gap-1">
                  <pv-select-button name="selection" :options="options" v-model="selectedRole" :allow-empty="false" default-value="Emisor" />
                </div>
              </div>
            </div>
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
  animation: fade-in-up 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(40px) scale(0.98);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

a {
  text-align: center;
}

.role-selection {
  margin: 0 auto;
  width: 80%;
  text-align: center;
}

.role-label {
  display: block;
  margin-bottom: 1rem;
}

.role-options {
  display: flex;
  justify-content: center;
  gap: 7rem;
  align-items: center;
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
