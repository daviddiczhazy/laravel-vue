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
  {
    path: "/orders",
    name: "orders",
    component: () => import("@/components/orders/OrdersTable.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/orders/create",
    name: "order-create",
    component: () => import("@/components/orders/OrderCreate.vue"),
    meta: { requiresAuth: true },
  },

  {
    path: "/categories/create",
    name: "category-create",
    component: () => import("@/components/orders/CategoryCreate.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/orders/:id/edit",
    name: "order-edit",
    component: () => import("@/components/orders/OrderEdit.vue"),
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
