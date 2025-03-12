<template>
    <div class="container">
      <h1>Mathematik Materialien</h1>
      
      <!-- Dropdown für Fächer -->
      <label for="fach">Fach auswählen:</label>
      <select id="fach" v-model="selectedFach" @change="ladeThemen">
        <option value="">Wähle ein Fach</option>
        <option v-for="fach in faecher" :key="fach.id" :value="fach.id">{{ fach.name }}</option>
      </select>
      
      <!-- Dropdown für Themen -->
      <label for="thema">Thema auswählen:</label>
      <select id="thema" v-model="selectedThema" @change="ladeMaterialien">
        <option value="">Wähle ein Thema</option>
        <option v-for="thema in themen" :key="thema.id" :value="thema.id">{{ thema.name }}</option>
      </select>
  
      <!-- Liste der Materialien -->
      <h2>Materialien</h2>
      <ul>
        <li v-for="material in materialien" :key="material.id">
          {{ material.name }} - {{ material.typ }}
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  export default {
    name: 'Mathe',
    data() {
      return {
        faecher: [],        // Array für die Fächer
        themen: [],         // Array für die Themen
        materialien: [],    // Array für die Materialien
        selectedFach: null, // Das ausgewählte Fach
        selectedThema: null // Das ausgewählte Thema
      };
    },
    methods: {
      // Lade die Fächer von der API
      async ladeFaecher() {
        const response = await fetch('http://localhost:3000/api/faecher');
        const faecher = await response.json();
        this.faecher = faecher;
      },
  
      // Lade die Themen basierend auf dem ausgewählten Fach
      async ladeThemen() {
        if (!this.selectedFach) return;
        const response = await fetch(`http://localhost:3000/api/themen/${this.selectedFach}`);
        const themen = await response.json();
        this.themen = themen;
      },
  
      // Lade die Materialien basierend auf dem ausgewählten Thema
      async ladeMaterialien() {
        if (!this.selectedThema) return;
        const response = await fetch(`http://localhost:3000/api/materialien/${this.selectedThema}`);
        const materialien = await response.json();
        this.materialien = materialien;
      }
    },
    mounted() {
      this.ladeFaecher();  // Lade die Fächer, wenn die Komponente gemountet wird
    }
  };
  </script>
  
  <style scoped>
  /* Füge hier deine Styles hinzu */
  .container {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
  }
  
  h1 {
    text-align: center;
    color: #4CAF50;
  }
  
  select {
    margin: 10px 0;
    padding: 10px;
    width: 100%;
  }
  
  ul {
    list-style-type: none;
    padding: 0;
  }
  
  ul li {
    padding: 8px;
    margin: 5px 0;
    background-color: #f9f9f9;
    border-radius: 4px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  }
  
  ul li:hover {
    background-color: #f1f1f1;
  }
  </style>
  