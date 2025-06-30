import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "index",
      redirect: {
        name: "login",
      },
    },
    {
      path: "/login",
      name: "login",
      component: () => import("@/views/login/LoginView.vue"),
    },
    {
      path: "/home",
      name: "home",
      component: () => import("@/views/home/HomeView.vue"),
    },
    {
      path: "/documents",
      name: "documents",
      component: () => import("@/views/documents/DocumentsView.vue"),
    },
    {
      path: "/form/:typeform/:id",
      name: "form",
      component: () => import("@/views/formulario/FormularioView.vue"),
    },
    {
      path: "/logout",
      name: "logout",
      redirect: {
        name: "login",
      },
    },
  ],
});

export default router;
