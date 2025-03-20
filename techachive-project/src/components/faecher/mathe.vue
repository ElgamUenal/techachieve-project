<template>
  <div class="container">
    <!-- Haupttitel mit Icon -->
    <h1><i class="fas fa-book-open"></i> Mathematik Materialien</h1>

    <!-- Dropdown für Themen -->
    <label for="thema"><i class="fas fa-cogs"></i> Thema auswählen:</label>
    <select id="thema" v-model="selectedThema" @change="ladeMaterialien" :disabled="loading">
      <option value="">Wähle ein Thema</option>
      <option v-for="thema in themen" :key="thema.id" :value="thema.id">{{ thema.name }}</option>
    </select>

    <!-- Ladeanzeige -->
    <div v-if="loading" class="loader">Lade Daten...</div>

    <!-- Liste der Materialien -->
    <h2><i class="fas fa-folder"></i> Materialien</h2>
    <ul>
      <li v-for="material in materialien" :key="material.id" @click="oeffnePDF(material.link)">
        <i class="fas fa-file-alt"></i> {{ material.name }} - {{ material.typ }}
      </li>
    </ul>

    <!-- Fehlermeldung, falls keine Daten gefunden wurden -->
    <div v-if="errorMessage" class="error-message">
      <i class="fas fa-exclamation-triangle"></i> {{ errorMessage }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'Mathe',
  data() {
    return {
      themen: [], // Array für die Themen (z.B. Algebra, Geometrie, etc.)
      materialien: [], // Array für die Materialien
      selectedThema: null, // Das ausgewählte Thema
      loading: false, // Ladezustand für Daten
      errorMessage: null, // Fehlernachricht bei fehlgeschlagenem API-Aufruf
    };
  },
  methods: {
    // Lade die Themen für Mathematik
    async ladeThemen() {
      this.loading = true;
      this.errorMessage = null;
      try {
        const response = await fetch('http://localhost:3000/themen/1'); // Hier gehe ich davon aus, dass 1 die ID für Mathematik ist
        if (!response.ok) {
          throw new Error('Fehler beim Laden der Themen');
        }
        const themen = await response.json();
        this.themen = themen;
      } catch (error) {
        this.errorMessage = error.message;
      } finally {
        this.loading = false;
      }
    },

    // Lade die Materialien basierend auf dem ausgewählten Thema
    async ladeMaterialien() {
      if (!this.selectedThema) return;

      this.loading = true;
      this.errorMessage = null;
      try {
        // Beispiel-Daten (können durch eine API-Abfrage ersetzt werden)
        const materialien = [
          { id: 1, name: "Übung 1", typ: "Übung", link: "/materialen/B1-Lineare-Funktionen-und-Gleichungen.pdf", themaId: 1 },
          { id: 2, name: "Theorieblatt", typ: "Theorie", link: "", themaId: 2 },
        ];

        // Filtere die Materialien basierend auf dem ausgewählten Thema
        this.materialien = materialien.filter(material => material.themaId === this.selectedThema);
      } catch (error) {
        this.errorMessage = error.message;
      } finally {
        this.loading = false;
      }
    },

    // Öffne die PDF-Datei in einem neuen Tab
    oeffnePDF(link) {
      if (link) {
        window.open(link, '_blank');
      } else {
        this.errorMessage = "Keine Datei verfügbar.";
      }
    },
  },
  mounted() {
    this.ladeThemen(); // Lade die Themen beim ersten Laden der Seite
  },
};
</script>

<style scoped>
/* Styling für das Layout */
body {
  color: white;
  background-color: #f4f4f9; /* Heller Hintergrund */
  font-family: 'Arial', sans-serif;
}

.container {
  max-width: 800px;
  margin: 50px auto;
  padding: 20px;
  background-color: #2c3e50;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

h1, h2 {
  color: #ecf0f1;
  text-align: center;
  font-weight: bold;
}

h1 i, h2 i {
  margin-right: 8px; /* Abstand für das Icon */
}

label {
  display: block;
  margin-top: 20px;
  color: #ecf0f1;
  font-size: 18px;
}

select {
  margin: 10px 0;
  padding: 12px;
  width: 100%;
  font-size: 16px;
  border: none;
  border-radius: 6px;
  background-color: #34495e;
  color: white;
}

select:focus {
  outline: none;
  border: 2px solid #4CAF50;
}

ul {
  list-style-type: none;
  padding: 0;
}

ul li {
  padding: 12px;
  margin: 5px 0;
  background-color: #ecf0f1;
  border-radius: 6px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  font-size: 16px;
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

ul li i {
  margin-right: 10px;
}

ul li:hover {
  background-color: #bdc3c7;
}

ul li:active {
  background-color: #95a5a6;
}

/* Ladeanzeige */
.loader {
  text-align: center;
  color: #3498db;
  font-size: 18px;
  font-weight: bold;
}

/* Fehlermeldung */
.error-message {
  color: #e74c3c;
  background-color: #f9d6d5;
  padding: 15px;
  margin-top: 20px;
  border-radius: 6px;
  display: flex;
  align-items: center;
}

.error-message i {
  margin-right: 10px;
}
</style>