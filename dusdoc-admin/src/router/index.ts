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
      component: () => import("@/views/auth/LoginView.vue"),
    },
    {
      path: "/dashboard",
      name: "dashboard",
      redirect: {
        name: "funcionarios",
      },
      meta: {
        requireAuth: true,
      },
    },
    {
      path: "/funcionarios",
      name: "funcionarios",
      component: () => import("@/views/funcionarios/FuncionariosView.vue"),
      meta: {
        requireAuth: true,
      },
    },
    // {
    //   path: "/executions",
    //   name: "executions",
    //   component: () => import("@/views/EmptyView.vue"),
    //   meta: {
    //     requireAuth: true,
    //   },
    // },
    // {
    //   path: "/scheduled",
    //   name: "scheduled",
    //   component: () => import("@/views/EmptyView.vue"),
    //   meta: {
    //     requireAuth: true,
    //   },
    // },
  ],
});

export default router;
