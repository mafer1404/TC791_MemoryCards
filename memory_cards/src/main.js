import { createApp } from 'vue'
import { createRouter, createWebHistory } from "vue-router";
import HomePage from "./components/MemoryGame.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", name: "HomePage", component: HomePage },
  ],
});

const app = createApp(HomePage);
app.use(router);
app.mount("#app");