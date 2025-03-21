<template>
  <div id="app">
    <!-- Navigationsleiste -->
    <nav>
      <div class="menu">
        <p class="website_name">TechAchieve</p>
        <div class="menu_links">
          <router-link to="/" class="link">Home</router-link>
          <router-link to="/Nachhilfe" class="link">Nachhilfe</router-link>
          <router-link to="/mitschriften" class="link">Mitschriften</router-link>
          <router-link to="/contacts" class="link">About</router-link>
          <router-link to="/faecher" class="link">faecher</router-link> 
          <router-link to="/angebot" class="link">Angebot</router-link>      
          <router-link to="/login" class="link">Login</router-link>    
          <router-link to="/register" class="link">Register</router-link>        
    
  
        </div>
      </div>
    </nav>
    <div v-if="loggedIn" class="navbar">
      <h1>Meine App</h1>
      <button @click="logout" class="logout-button">Logout</button>
    </div>
    <!-- Anmelde- und Registrierungsformulare -->
    <RegisterForm v-if="showRegister && !loggedIn" />
    <LoginForm v-if="!showRegister && !loggedIn" @login-success="loginSuccess" />

    <!-- Chat-Komponente -->
    <ChatComponent v-if="loggedIn" :userId="currentUser" />
    <!-- Routenkomponenten werden hier angezeigt -->
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
};

import { ref, onMounted } from 'vue';
import LoginForm from './components/LoginForm.vue';
import RegisterForm from './components/RegisterForm.vue';
import ChatComponent from './components/ChatComponent.vue';

import {showRegister, toggleRegister} from "./registerHelper.js"

const loggedIn = ref(false);
const currentUser = ref(null);

function loginSuccess(userId) {
    loggedIn.value = true;
    currentUser.value = userId;
}

function logout() {
    loggedIn.value = false;
    currentUser.value = null;
    localStorage.removeItem('authToken'); // Token entfernen
}

onMounted(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
        fetch('http://localhost:3000/validateToken', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                loggedIn.value = true;
                currentUser.value = data.userId;
            } else {
                localStorage.removeItem('authToken');
            }
        });
    }
});


</script>

<style>
/* Globale Styles */
body {
  margin: 0;
  padding: 0;
  font-family: 'Arial', sans-serif;
  background-color: #f1f1f1;
}

#app {
  text-align: center;
}

/* Navigationsleiste */
nav {
  background-color: #333;
  padding: 10px 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.menu {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
}

.website_name {
  color: #fff;
  font-size: 24px;
  font-weight: bold;
  margin: 0;
  margin-right: 40px; 
}

.menu_links {
  display: flex;
  gap: 20px;
}


.link {
  color: #fff;
  text-decoration: none;
  font-size: 16px;
  transition: color 0.3s ease;
}

.link:hover {
  color: #ff9d87;
}

.router-link-exact-active {
  color: #ff9d87;
  border-bottom: 2px solid #ff9d87;
}

@media (max-width: 768px) {
  .menu {
    flex-direction: column;
    align-items: flex-start;
  }
  .menu_links {
    margin-top: 10px;
    gap: 15px;
  }
  .link {
    font-size: 14px;
  }
}
</style>

<style scoped>

.logout-button {
  background-color: #dc3545; /* Rote Farbe für den Logout-Button */
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
}

</style>

<!-- GLOBAL STYLES -->
<style >


body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
}

button {
  margin-top: 2rem;
  width: 100%;
  background-color: #ffffff;
  color: #080710 !important;
  padding: 15px 0;
  font-size: 18px;
  font-weight: 600;
  border-radius: 5px;
  cursor: pointer;
  z-index: 20; /* Setz einen Z-Index für den Button, höher als der des Formulars */
}

button:hover {
  opacity: 0.9;
} 


form {
  width: 80vw;
  max-width: 30rem;
  background-color: rgba(255, 255, 255, 0.13);
  position: absolute;
  transform: translate(-50%, -50%);
  top: 50%;
  left: 50%;
  border-radius: 10px;
  backdrop-filter: blur(10px);
  border: 2px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 0 40px rgba(8, 7, 16, 0.6);
  padding: 50px 35px;
  z-index: 10; /* Setz einen Z-Index für das Formular */
}

form * {
  font-family: 'Poppins', sans-serif;
  color: #ffffff;
  letter-spacing: 0.5px;
  outline: none;
  border: none;
}

form h3 {
  font-size: 32px;
  font-weight: 500;
  line-height: 42px;
  text-align: center;
  margin-top: 1rem;
  margin-bottom: 1rem;
}

label {
  display: block;
  margin-top: 30px;
  font-size: 16px;
  font-weight: 500;
}

input {
  display: block;
  height: 50px;
  width: 100%;
  background-color: rgba(255, 255, 255, 0.07);
  border-radius: 3px;
  margin-top: 8px;
  font-size: 14px;
  font-weight: 300;
}

input::placeholder {
  padding-left: 1rem;
}

::placeholder {
  color: #e5e5e5;
}

.success {
  color: green;
  margin-top: 20px;
}

.error {
  color: red;
  margin-top: 20px;
}


.background {
  width: 430px;
  height: 520px;
  position: absolute;
  transform: translate(-50%, -50%);
  left: 50%;
  top: 50%;
}

.background .shape {
  height: 200px;
  width: 200px;
  position: absolute;
  border-radius: 50%;
}



.shape:first-child {
  background: linear-gradient(#c82333, #c82333);
  left: -150px;
  top: -80px;
}

.shape:last-child {
  background: linear-gradient(to right, #c82333, #c82333);
  right: -120px;
  bottom: -80px;
}



</style>