<script setup>
import { ref } from 'vue';
import {toggleRegister, showRegister} from "../registerHelper.js"

const username = ref('');
const email = ref('');
const password = ref('');
const successMessage = ref('');
const errorMessage = ref('');

async function register() {
    const response = await fetch('http://localhost:3000/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            username: username.value,
            email: email.value,
            password: password.value
        }),
    });
    const result = await response.json();
    if (result.success) {
        successMessage.value = 'Registrierung erfolgreich!';
        errorMessage.value = '';
    } else {
        errorMessage.value = 'Fehler: ' + result.message;
        successMessage.value = '';
    }
}
</script>

<template>
  <div class="background">
    <div class="shape"></div>
    <div class="shape"></div>
  </div>

  <form @submit.prevent="register">
    <h3>Registrierung</h3>

    <label for="username">Benutzername</label>
    <input v-model="username" type="text" placeholder="Benutzername" id="username">

    <label for="email">E-Mail</label>
    <input v-model="email" type="email" placeholder="E-Mail" id="email">

    <label for="password">Passwort</label>
    <input v-model="password" type="password" placeholder="Passwort" id="password">

    <!-- Anmelde- und Registrierungsbuttons -->
  <button @click="toggleRegister">
      {{ showRegister ? 'Zur Anmeldung' : 'Zur Registrierung' }}
    </button>

    <button type="submit">Registrieren</button>

    <p v-if="successMessage" class="success">{{ successMessage }}</p>
    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
  </form>
</template>

<style scoped>


</style>