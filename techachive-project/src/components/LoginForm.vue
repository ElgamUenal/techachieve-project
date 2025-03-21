<script setup>
import { ref } from 'vue';
import { defineEmits } from 'vue';
import {toggleRegister, showRegister} from "../registerHelper.js"


const username = ref('');
const password = ref('');
const errorMessage = ref('');
const users = ref([]); // Benutzerliste
const selectedUser = ref(null); // Der ausgewählte Benutzer
const showUsers = ref(true); // Anzeige der Benutzer nach Login
const emit = defineEmits(['login-success']);

// Login-Funktion
async function login() {
    const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            username: username.value,
            password: password.value
        }),
    });

    if (!response.ok) {
        try {
            const result = await response.json();
            errorMessage.value = result.message || 'Login fehlgeschlagen';
        } catch (error) {
            errorMessage.value = 'Fehler bei der Verarbeitung der Antwort';
        }
        return;
    }

    try {
        const result = await response.json();
        if (result.success) {
            // Login erfolgreich, Benutzerliste abrufen
            localStorage.setItem('authToken', result.token); // Token im Local Storage speichern
            fetchUsers();
            emit('login-success', result.userId); // Login-Event auslösen
        } else {
            errorMessage.value = 'Login fehlgeschlagen';
        }
    } catch (error) {
        console.error('Fehler beim Parsen der Antwort:', error);
        errorMessage.value = 'Fehler beim Parsen der Antwort';
    }
}

// Benutzer abrufen
async function fetchUsers() {
    const token = localStorage.getItem('authToken');
    const response = await fetch('http://localhost:3000/users', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    const result = await response.json();
    if (result.success) {
        users.value = result.users;
    } else {
        errorMessage.value = 'Fehler beim Abrufen der Benutzer';
    }
}

// Benutzer auswählen
function selectUser(user) {
    selectedUser.value = user;
    console.log('Ausgewählter Benutzer:', selectedUser.value);
    // Hier kannst du dann den Chat-Mechanismus starten
    startChat(user);
}

// Chat starten
function startChat(user) {
    // Hier kannst du den Chat starten, indem du z.B. den Chat-View anzeigst
    alert(`Chat mit ${user.username} gestartet!`);
    // Du könntest z.B. eine andere Seite anzeigen oder einen Chat-Container aktivieren.
}
</script>

<template>
  <div class="background">
    <div class="shape"></div>
    <div class="shape"></div>
  </div>

  <form @submit.prevent="login">
    <h3>Login Here</h3>

    <label for="username">Username</label>
    <input v-model="username" type="text" placeholder="Email or Phone" id="username">

    <label for="password">Password</label>
    <input v-model="password" type="password" placeholder="Password" id="password">

    
    <!-- Anmelde- und Registrierungsbuttons -->
    <button @click="toggleRegister">
      {{ showRegister ? 'Zur Anmeldung' : 'Zur Registrierung' }}
    </button>


    <button type="submit">Log In</button>

    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>

    <!-- Benutzerliste nach erfolgreichem Login -->
    <div v-if="showUsers && users.length > 0">
      <h2>Benutzer</h2>
      <ul>
        <li v-for="user in users" :key="user.id" @click="selectUser(user)">
          {{ user.username }}
        </li>
      </ul>
    </div>

    <!-- Chat-Anzeige, wenn ein Benutzer ausgewählt wurde -->
    <div v-if="selectedUser">
      <h3>Chat mit: {{ selectedUser.username }}</h3>
      <div class="chat-container">
        <p>Chat mit {{ selectedUser.username }} wird angezeigt...</p>
      </div>
    </div>
  </form>
</template>

<style scoped>
/*

.social {
  margin-top: 30px;
  display: flex;
}

.social div {
  background-color: rgba(255, 255, 255, 0.27);
  color: #eaf0fb;
  text-align: center;
  width: 150px;
  border-radius: 3px;
  padding: 5px 10px 10px 5px;
}

.social div:hover {
  background-color: rgba(255, 255, 255, 0.47);
}

.social .fb {
  margin-left: 25px;
}

.social i {
  margin-right: 4px;
}

.error {
  color: red;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  padding: 8px;
  cursor: pointer;
  border: 1px solid #ddd;
  margin: 5px 0;
}

li:hover {
  background-color: #f0f0f0;
}

.chat-container {
  margin-top: 20px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
} */
</style>
