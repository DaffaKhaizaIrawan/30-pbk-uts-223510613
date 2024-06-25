// src/main.js
import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import { createPinia } from 'pinia';
import { Quasar } from 'quasar';
import 'quasar/dist/quasar.sass';
import './index.css';

import App from './App.vue';
import Post from './views/Posts.vue';
import Todo from './views/Todos.vue';
import Album from './views/Album.vue';


const routes = [
    { path: '/', component: Post },
    { path: '/todo', component: Todo },
    { path: '/album', component: Album },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

const pinia = createPinia();

createApp(App).use(router).use(pinia).use(Quasar).mount('#app');
