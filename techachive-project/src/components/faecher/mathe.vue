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

    <!-- Materialien Tabelle -->
    <h2><i class="fas fa-folder"></i> Materialien</h2>
    <table v-if="materialien.length > 0">
      <thead>
        <tr>
          <th>Name</th>
          <th>Typ</th>
          <th>Aktion</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="material in materialien" :key="material.id">
          <td>{{ material.name }}</td>
          <td>{{ material.typ }}</td>
          <td>
            <button @click="oeffnePDF(material.dateipfad)">
              <i class="fas fa-eye"></i> Öffnen
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Fehlermeldung, falls keine Daten gefunden wurden -->
    <div v-if="errorMessage" class="error-message">
      <i class="fas fa-exclamation-triangle"></i> {{ errorMessage }}
    </div>

    <!-- Formular zum Hochladen von Materialien -->
    <h3><i class="fas fa-upload"></i> Neues Material hochladen</h3>
    <form @submit.prevent="hochladenMaterial" enctype="multipart/form-data">
      <label for="materialName">Name des Materials:</label>
      <input type="text" id="materialName" v-model="newMaterial.name" required />

      <label for="materialType">Typ des Materials:</label>
      <input type="text" id="materialType" v-model="newMaterial.typ" required />

      <label for="file">Datei hochladen:</label>
      <input type="file" id="file" @change="handleFileUpload" required />

      <button type="submit" :disabled="loading">Hochladen</button>
    </form>
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
      newMaterial: { // Neues Material
        name: '',
        typ: '',
        dateipfad: null, // Hier speichern wir die Datei, wenn sie hochgeladen wird
      },
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

  console.log('Lade Materialien für Thema:', this.selectedThema);

  this.loading = true;
  this.errorMessage = null;
  try {
    const response = await fetch('http://localhost:3000/api/materialien');
    if (!response.ok) {
      throw new Error(`Fehler beim Laden der Materialien: ${response.status} ${response.statusText}`);
    }
    const materialien = await response.json();

    console.log('Geladene Materialien:', materialien); // Alle Materialien ausgeben

    // Jetzt verwenden wir 'thema_id' anstelle von 'themaId'
    this.materialien = materialien.filter(material => material.thema_id === Number(this.selectedThema)); // Nur Materiale mit thema_id filtern

    console.log('Gefilterte Materialien:', this.materialien);
  } catch (error) {
    console.error('Fehler:', error);
    this.errorMessage = error.message;
  } finally {
    this.loading = false;
  }
},
    // Öffne die PDF-Datei in einem neuen Tab
    oeffnePDF(dateipfad) {
      if (dateipfad) {
        console.log('Dateipfad zum Öffnen:', dateipfad);  // Zum Debuggen den Dateipfad in der Konsole anzeigen
        window.open(dateipfad, '_blank');
      } else {
        this.errorMessage = "Keine Datei verfügbar.";
      }
    },

    // Handle File Upload
    handleFileUpload(event) {
      const file = event.target.files[0];
      if (file) {
        this.newMaterial.dateipfad = file; // Setze die Datei in das Material
      }
    },

    // Material hochladen
    async hochladenMaterial() {
  if (!this.newMaterial.name || !this.newMaterial.typ || !this.newMaterial.dateipfad || !this.selectedThema) {
    this.errorMessage = 'Alle Felder müssen ausgefüllt sein.';
    return;
  }

  const formData = new FormData();
  formData.append('name', this.newMaterial.name);
  formData.append('typ', this.newMaterial.typ);
  formData.append('thema_id', this.selectedThema); // Füge die thema_id hinzu
  formData.append('datei', this.newMaterial.dateipfad);

  this.loading = true;
  try {
    const response = await fetch('http://localhost:3000/api/materialien', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Fehler beim Hochladen des Materials');
    }

    const material = await response.json();
    this.materialien.push(material); // Füge das hochgeladene Material der Liste hinzu

    // Reset form
    this.newMaterial = { name: '', typ: '', dateipfad: null };
  } catch (error) {
    console.error('Fehler:', error);
    this.errorMessage = error.message;
  } finally {
    this.loading = false;
  }
}
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
  background-color: #f4f4f9;
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
  margin-right: 8px;
}

label {
  display: block;
  margin-top: 20px;
  color: #ecf0f1;
  font-size: 18px;
}

select, input[type="text"], input[type="file"] {
  margin: 10px 0;
  padding: 12px;
  width: 100%;
  font-size: 16px;
  border: none;
  border-radius: 6px;
  background-color: #34495e;
  color: white;
}

select:focus, input[type="text"]:focus, input[type="file"]:focus {
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

.loader {
  text-align: center;
  color: #3498db;
  font-size: 18px;
  font-weight: bold;
}

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
