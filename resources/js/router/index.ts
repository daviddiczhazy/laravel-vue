import { createRouter, createWebHistory } from "vue-router";
//import { useAuthStore } from "@/stores/useAuthStore";

const routes = [
  {
    path: "/",
    name: "home",
    component: () => import("@/components/Home.vue"),
  },
  {
    path: "/login-page",
    name: "login-page",
    component: () => import("@/components/auth/LoginPage.vue"),
  },
  {
    path: "/profile",
    name: "profile",
    component: () => import("@/components/Profile.vue"),
  },
  {
    path: "/users",
    name: "users",
    component: () => import("@/components/Users.vue"),
  },
  {
    path: "/change-password",
    name: "change-password",
    component: () => import("@/components/ChangePassword.vue"),
  },
  {
    path: "/zabudnute-heslo",
    name: "zabudnute-heslo",
    component: () => import("@/components/auth/ForgotPassword.vue"),
    meta: { guestOnly: true },
  },
  {
    path: "/reset-password",
    name: "reset-password",
    component: () => import("@/components/auth/ResetPassword.vue"),
    meta: { guestOnly: true },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
