import { createApp } from 'vue';
import App from './App.vue';
import router from './router'; // Hier den Router importieren

const app = createApp(App);
app.use(router);
app.mount('#app');
