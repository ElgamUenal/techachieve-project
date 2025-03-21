<template>
    <div class="chat-container">
      <!-- Logout-Button oben rechts -->
  
  
      <!-- Chat-Nachrichten -->
      <div id="chat">
        <div v-for="msg in messages" :key="msg">{{ msg }}</div>
      </div>
  
      <!-- Nachrichten-Eingabe -->
      <div id="messageInput">
        <input v-model="message" type="text" placeholder="Gib deine Nachricht ein...">
        <button @click="sendMessage">Senden</button>
      </div>
    </div>
  </template>
  
  <style scoped>
  .chat-container {
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
  }
  
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    border-bottom: 1px solid #ccc;
  }
  
  #chat {
    flex: 1;
    padding: 10px;
    overflow-y: auto;
  }
  
  #messageInput {
    display: flex;
    padding: 10px;
  }
  
  input {
    flex: 1;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  
  button {
    padding: 10px 20px;
    margin-left: 10px;
    border: none;
    background-color: #28a745;
    color: white;
    border-radius: 5px;
    cursor: pointer;
  }
  
  .logout-button {
    background-color: #dc3545; /* Rote Farbe für den Logout-Button */
  }
  </style>