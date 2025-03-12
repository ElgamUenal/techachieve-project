import { createRouter, createWebHistory } from 'vue-router';
import HelloWorld from '@/components/HelloWorld.vue';
import Mitschriften from '@/components/mitschriften.vue';
import Nachhilfe from '@/components/Nachhilfe.vue';
import Facher from '@/components/faecher.vue'
import Mathe from  '@/components/faecher/mathe.vue';

const routes = [
  { path: '/', component: HelloWorld }, // HelloWorld wird nur für die Startseite angezeigt
  { path: '/mitschriften', component: Mitschriften },
  {path: '/Nachhilfe', component: Nachhilfe },
  {path: '/faecher', component: Facher },
  {path: '/mathe', component: Mathe }


];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;