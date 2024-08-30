import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {path: '', name: 'main', component: () => import('../components/Main.vue')},
  {path: '/admin', name: 'admin', component: () => import('../components/Admin/Admin.vue')},
]

const router = createRouter({
  routes,
  history: createWebHistory(),

})

export default router;
