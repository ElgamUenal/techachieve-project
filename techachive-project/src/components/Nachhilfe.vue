<template>
  <div class="container">
    <h1>📚 Nachhilfebörse</h1>

    <!-- Suchfeld -->
    <div class="search-container">
      <input
        type="number"
        placeholder="Maximaler Preis (z.B. 10)"
        v-model="search"
      />
      <button @click="search">Suchen</button>
    </div>

    <h2>📖 Nachhilfe-Angebot erstellen</h2>
    <form @submit.prevent="handleSubmitAngebot">
      <input
        type="text"
        placeholder="Name"
        v-model="name"
        required
      />
      <input
        type="text"
        placeholder="Fach"
        v-model="fach"
        required
      />
      <input
        type="number"
        placeholder="Preis (€)"
        v-model="preis"
        required
      />
      <input
        type="number"
        placeholder="Stunden"
        v-model="stunden"
        required
      />
      <textarea
        placeholder="Beschreibung"
        v-model="beschreibung"
        required
      />
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
            <!-- Button zum Reduzieren der Stunden -->
            <button class="reduce-btn" @click="handleReduceStunden(angebot.id)">
              Stunden reduzieren
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
    handleReduceStunden(id) {
      const stunden = prompt("Wie viele Studen willst du Nachhilfe?");
     
      if (stunden && !isNaN(stunden) && parseInt(stunden) > 0) {
        axios
          .put(`http://localhost:3000/angebote/${id}/reduce`, {
            stunden: parseInt(stunden)
          })
          .then((response) => {
            this.fetchAngebote();
            alert(response.data.message);
          })
          .catch((error) => {
            console.error("Fehler beim Reduzieren der Stunden:", error);
            alert("Fehler beim Reduzieren der Stunden.");
          });
      } else {
        alert("Bitte eine gültige Zahl für die Stunden angeben.");
      }
    }
  },
  mounted() {
    this.fetchAngebote();
  }
};
</script>

<style scoped>
body {
  font-family: Arial, sans-serif;
  background-color: black; /* Dunkelgrau statt Schwarz */
  margin: 0;
  padding: 20px;
  color: #e0e0e0; /* Hellgrau für Text */
}

h1,
h2 {
  color: #64b5f6; /* Pastellblau */
}

.container {
  background-color: #1a1a1a; /* Dunkelgrau statt Schwarz */
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(255, 255, 255, 0.1);
  color: #e0e0e0; /* Hellgrau für Text */
}

form {
  margin-bottom: 20px;
}

input,
textarea {
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #64b5f6; /* Pastellblau */
  border-radius: 4px;
  background-color: #2d2d2d; /* Dunkelgrau */
  color: #e0e0e0; /* Hellgrau */
}

input:focus,
textarea:focus {
  outline: none;
  border-color: #81c784; /* Pastellgrün */
}

button {
  background-color: #81c784; /* Pastellgrün */
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #64b5f6; /* Pastellblau */
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

th,
td {
  border: 1px solid #64b5f6; /* Pastellblau */
  padding: 12px;
  text-align: left;
}

th {
  background-color: #2d2d2d; /* Dunkelgrau */
  color: #64b5f6; /* Pastellblau */
}

.delete-btn,
.reduce-btn {
  background-color: #e57373; /* Pastellrot */
  color: white;
  padding: 5px 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-right: 5px;
}

.delete-btn:hover,
.reduce-btn:hover {
  background-color: #ef5350; /* Helleres Pastellrot */
}

.search-container {
  margin-bottom: 20px;
}

.search-container input {
  width: calc(100% - 120px);
  margin-right: 10px;
  padding: 10px;
  border: 1px solid #64b5f6; /* Pastellblau */
  border-radius: 4px;
  background-color: #2d2d2d; /* Dunkelgrau */
  color: #e0e0e0; /* Hellgrau */
}

.search-container button {
  padding: 10px 20px;
  background-color: #81c784; /* Pastellgrün */
}

.search-container button:hover {
  background-color: #64b5f6; /* Pastellblau */
}
</style>