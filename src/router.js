import { createRouter, createWebHistory } from 'vue-router';
import Login from './components/Login.vue';
import Student from './components/Student.vue';


const routes = [
  { path: '/', component: Login },
  { path: '/login', component: Login },
  { 
    path: '/students', 
    component: Student,
    meta: { requiresAuth: true }  // Ajoute la métadonnée pour la protection de la route
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

// Garde de navigation globale
router.beforeEach((to, from, next) => {
  const loggedIn = localStorage.getItem('token');
  if (to.matched.some(record => record.meta.requiresAuth) && !loggedIn) {
    next('/login');
  } else {
    next();
  }
});

export default router;
