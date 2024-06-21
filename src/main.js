import { createApp } from 'vue';
import App from './App.vue';
import './index.css'
import 'flowbite';
import router from './router';  // Importez le router
import axios from 'redaxios';  // Importez la configuration axios
import { startTokenRefreshInterval } from './refreshToken';  // Importez la fonction de rafraîchissement du jeton

const app = createApp(App);

// axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');


app.use(router);  // Utilisez le router
app.mount('#app');

startTokenRefreshInterval();  // Démarrez l'intervalle de rafraîchissement du jeton