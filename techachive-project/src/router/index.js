import { createRouter, createWebHistory } from 'vue-router';
import HelloWorld from '@/components/HelloWorld.vue';
import Mitschriften from '@/components/mitschriften.vue';
import Nachhilfe from '@/components/Nachhilfe.vue';
import Facher from '@/components/faecher.vue'
import Mathe from  '@/components/faecher/mathe.vue';
import angebot from '@/components/angebot.vue';
import RegisterForm from '@/components/RegisterForm.vue';
import LoginForm from '@/components/LoginForm.vue';
import Kalender from '@/components/Kalender.vue';
const routes = [
  { path: '/', component: HelloWorld }, // HelloWorld wird nur für die Startseite angezeigt
  { path: '/mitschriften', component: Mitschriften },
  {path: '/Nachhilfe', component: Nachhilfe },
  {path: '/faecher', component: Facher },
  {path: '/mathe', component: Mathe },
  {path: '/angebot', component: angebot },
  {path: '/register', component: RegisterForm },
  {path: '/login', component: LoginForm },
  {path: '/kalender', component: Kalender },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;