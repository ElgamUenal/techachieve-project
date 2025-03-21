<template>
  <div class="container" >
    <h1>📚 Nachhilfebörse</h1>

    <!-- Nachhilfeanfrage hinzufügen -->
    <h2 class="h4 mt-3">📝 Nachhilfe-Anfrage erstellen</h2>
    <form @submit.prevent="handleSubmitAnfrage">
      <div class="mb-3">
        <input
          type="text"
          placeholder="Name"
          v-model="nachhilfeanfragename"
          class="form-control"
          required
        />
      </div>
      <div class="mb-3">
        <input
          type="text"
          placeholder="Fach"
          v-model="anfrageFach"
          class="form-control"
          required
        />
      </div>
      <div class="mb-3">
        <textarea
          placeholder="Beschreibung"
          v-model="anfrageBeschreibung"
          class="form-control"
          required
        ></textarea>
      </div>
      <div class="mb-3">
        <input
          type="number"
          placeholder="Budget (€)"
          v-model="budget"
          class="form-control"
          required
        />
      </div>
      <button type="submit" class="btn btn-success w-100">Anfrage hinzufügen</button>
    </form>

    <!-- Tabelle der Nachhilfenachhilfeanfragen -->
    <h2 class="h4 mt-3">📝 Nachhilfe-nachhilfeanfragen</h2>
    <table class="table table-striped mt-3">
      <thead>
        <tr>
          <th>Name</th>
          <th>Fach</th>
          <th>Budget (€)</th>
          <th>Beschreibung</th>
          <th>Aktionen</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="anfrage in nachhilfeanfragen" :key="anfrage.id">
          <td>{{ anfrage.name }}</td>
          <td>{{ anfrage.fach }}</td>
          <td>{{ anfrage.budget }}€</td>
          <td>{{ anfrage.beschreibung }}</td>
          <td>
            <button
              @click="handleDeleteAnfrage(anfrage.id)"
              class="btn btn-danger btn-sm"
            >
              Löschen
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
      nachhilfeanfragen: [], // Liste der Nachhilfenachhilfeanfragen
      nachhilfeanfragename: "", // Name der Anfrage
      anfrageFach: "", // Fach der Anfrage
      anfrageBeschreibung: "", // Beschreibung der Anfrage
      budget: "", // Budget der Anfrage
    };
  },
  created() {
    this.fetchnachhilfeanfragen(); // nachhilfeanfragen beim Laden der Komponente abrufen
  },
  methods: {
    // nachhilfeanfragen vom Server abrufen
    async fetchnachhilfeanfragen() {
      try {
        const response = await axios.get("http://localhost:3000/nachhilfeanfragen");
        this.nachhilfeanfragen = response.data;
      } catch (error) {
        console.error("Fehler beim Abrufen der nachhilfeanfragen:", error);
      }
    },
    // Neue Anfrage hinzufügen
    async handleSubmitAnfrage() {
      try {
        const response = await axios.post("http://localhost:3000/nachhilfeanfragen", {
          name: this.nachhilfeanfragename,
          fach: this.anfrageFach,
          beschreibung: this.anfrageBeschreibung,
          budget: parseFloat(this.budget),
        });
        this.nachhilfeanfragen.push(response.data); // Neue Anfrage zur Liste hinzufügen
        this.resetForm(); // Formular zurücksetzen
      } catch (error) {
        console.error("Fehler beim Hinzufügen der Anfrage:", error);
      }
    },
    // Anfrage löschen
    async handleDeleteAnfrage(id) {
      try {
        await axios.delete(`http://localhost:3000/nachhilfeanfragen/${id}`);
        this.nachhilfeanfragen = this.nachhilfeanfragen.filter((anfrage) => anfrage.id !== id); // Anfrage aus der Liste entfernen
      } catch (error) {
        console.error("Fehler beim Löschen der Anfrage:", error);
      }
    },
    // Formular zurücksetzen
    resetForm() {
      this.nachhilfeanfragename = "";
      this.anfrageFach = "";
      this.anfrageBeschreibung = "";
      this.budget = "";
    },
  },
};
</script>

<style scoped>

.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  color: white;
}

h1, h2 {
  color: #333;

}

tr{
  color: black;
}
td{
  color: white;

}
.form-control {
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  color: white;

}

.btn {
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.btn-success {
  background-color: #28a743;
  color: white;
}

.btn-success:hover {
  background-color: #218838;
}

.btn-danger {
  background-color: #dc3343;
  color: white;
}

.btn-danger:hover {
  background-color: #c82333;
}

.table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

.table th, .table td {
  border: 1px solid #ddd;
  padding: 12px;
  text-align: left;
}

.table th {
  background-color: #f8f9fa;
}
</style>