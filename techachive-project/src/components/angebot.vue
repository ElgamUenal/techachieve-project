<template>
    <div class="container">
      <h1>📚 Nachhilfebörse</h1>
  
      <!-- Suchfeld -->
      <div class="search-container">
        <input type="number" placeholder="Maximaler Preis (€)" v-model="search" />
        <button @click="search">Suchen</button>
      </div>
  
      <h2>📖 Nachhilfe-Angebot erstellen</h2>
      <form @submit.prevent="handleSubmitAngebot">
        <input type="text" placeholder="Name" v-model="name" required />
        <input type="text" placeholder="Fach" v-model="fach" required />
        <input type="number" placeholder="Preis (€)" v-model="preis" required />
        <input type="number" placeholder="Stunden" v-model="stunden" required />
        <textarea placeholder="Beschreibung" v-model="beschreibung" required />
        <button type="submit">Angebot hinzufügen</button>
      </form>
  
      <h2>📚 Alle Angebote</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Fach</th>
            <th>Preis (€)</th>
            <th>Stunden</th>
            <th>Beschreibung</th>
            <th>Aktionen</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="angebot in filteredData" :key="angebot.id">
            <td>{{ angebot.name }}</td>
            <td>{{ angebot.fach }}</td>
            <td>{{ angebot.preis }}€</td>
            <td>{{ angebot.stunden }} Stunden</td>
            <td>{{ angebot.beschreibung }}</td>
            <td>
              <button class="delete-btn" @click="handleDeleteAngebot(angebot.id)">
                Löschen
              </button>
              <button class="request-btn" @click="handleRequestNachhilfe(angebot.id, angebot.stunden)">
                Nachhilfe anfragen
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  
  export default {
    data() {
      return {
        angebote: [],
        name: "",
        fach: "",
        preis: "",
        beschreibung: "",
        stunden: "",
        search: ""
      };
    },
    computed: {
      filteredData() {
        return this.angebote.filter((angebot) => {
          return angebot.preis <= parseFloat(this.search) || !this.search;
        });
      }
    },
    methods: {
      fetchAngebote() {
        axios
          .get("http://localhost:3000/angebote")
          .then((response) => {
            this.angebote = response.data;
          })
          .catch((error) => console.error(error));
      },
      handleSubmitAngebot() {
        axios
          .post("http://localhost:3000/angebote", {
            name: this.name,
            fach: this.fach,
            preis: parseFloat(this.preis),
            beschreibung: this.beschreibung,
            stunden: parseInt(this.stunden)
          })
          .then(() => {
            this.fetchAngebote();
            this.name = "";
            this.fach = "";
            this.preis = "";
            this.beschreibung = "";
            this.stunden = "";
          })
          .catch((error) => console.error("Fehler beim Hinzufügen:", error));
      },
      handleDeleteAngebot(id) {
        axios
          .delete(`http://localhost:3000/angebote/${id}`)
          .then(() => {
            this.angebote = this.angebote.filter((angebot) => angebot.id !== id);
          })
          .catch((error) => console.error("Fehler beim Löschen:", error));
      },
      handleRequestNachhilfe(id, verfügbareStunden) {
        const stunden = prompt(`Wie viele Stunden möchtest du buchen? (Max: ${verfügbareStunden})`);
  
        if (stunden && !isNaN(stunden) && parseInt(stunden) > 0 && parseInt(stunden) <= verfügbareStunden) {
          axios
            .put(`http://localhost:3000/angebote/${id}/reduce`, {
              stunden: verfügbareStunden - parseInt(stunden)
            })
            .then((response) => {
              this.fetchAngebote();
              alert(`Du hast erfolgreich ${stunden} Stunden gebucht.`);
            })
            .catch((error) => {
              console.error("Fehler bei der Anfrage:", error);
              alert("Fehler bei der Anfrage.");
            });
        } else {
          alert("Bitte eine gültige Anzahl von Stunden eingeben.");
        }
      }
    },
    mounted() {
      this.fetchAngebote();
    }
  };
  </script>
  
  <style scoped>
  .container {
    background: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  h1,
  h2 {
    color: #333;
  }
  
  input,
  textarea {
    width: 100%;
    padding: 10px;
    margin: 10px 0;
    border: 1px solid #ddd;
    border-radius: 4px;
  }
  
  button {
    background-color: #28a745;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #218838;
  }
  
  table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
  }
  
  th,
  td {
    border: 1px solid #ddd;
    padding: 12px;
    text-align: left;
  }
  
  th {
    background-color: #f8f9fa;
  }
  
  .delete-btn {
    background-color: #dc3545;
  }
  
  .request-btn {
    background-color: #007bff;
  }
  
  .delete-btn:hover {
    background-color: #c82333;
  }
  
  .request-btn:hover {
    background-color: #0056b3;
  }
  
  .search-container {
    margin-bottom: 20px;
  }
  
  .search-container input {
    width: calc(100% - 120px);
    margin-right: 10px;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
  }
  
  .search-container button {
    padding: 10px 20px;
  }
  </style>
  