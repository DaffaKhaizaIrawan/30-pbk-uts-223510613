import { createRouter, createWebHistory } from "vue-router";

const Post = () => import("../views/Posts.vue");

const routes = [
    { path: "/", component: Post},
    { path: "/todo", component: () => import("../views/Todos.vue")}
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;