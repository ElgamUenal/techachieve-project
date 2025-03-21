<script setup>
import { ref } from 'vue';

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

    if (response.ok) {
        const result = await response.json();
        if (result.success) {
            successMessage.value = 'Registrierung erfolgreich!';
            errorMessage.value = '';
        } else {
            errorMessage.value = 'Fehler: ' + result.message;
            successMessage.value = '';
        }
    } else {
        errorMessage.value = 'Fehler: ' + response.statusText;
        successMessage.value = '';
    }
}

</script>

<template>
  <div class="register-container">
    <h1>Registrierung</h1>
    <input v-model="username" type="text" placeholder="Benutzername">
    <input v-model="email" type="email" placeholder="E-Mail">
    <input v-model="password" type="password" placeholder="Passwort">
    <button @click="register">Registrieren</button>
    
    <p v-if="successMessage" class="success">{{ successMessage }}</p>
    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
  </div>
</template>

<style scoped>

.register-container {
  display: flex;
  flex-direction: column;
  width: 300px;
  margin: auto;
  margin-top: 100px;
}

input, button {
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

button {
  background-color: #007bff;
  color: white;
  cursor: pointer;
}

.success {
  color: green;
}

.error {
  color: red;
}
</style>