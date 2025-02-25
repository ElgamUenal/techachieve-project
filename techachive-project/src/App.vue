<template>
  <div id="app">
    <HelloWorld />
  </div>
</template>

<script>
// Importiere die HelloWorld-Komponente
import HelloWorld from './components/HelloWorld.vue';

export default {
  name: 'App',
  components: {
    HelloWorld, // Registrierung der HelloWorld-Komponente
  },
};
</script>

<style>
/* Hier kannst du globale Styles hinzufügen, falls gewünscht */
#app {
  text-align: center;
}
</style>
