import { defineStore } from "pinia";
import axios from "axios";

interface User {
  id: number;
  name: string;
  email: string;
}

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null as User | null,
    token: localStorage.getItem("token") || null,
    loading: false,
    error: null as string | null,
  }),

  getters: {
    isAuthenticated: (state) => !!state.token && state.user !== null,
  },

  actions: {
    async login(email: string, password: string) {
      this.loading = true;
      this.error = null;

      try {
        await axios.get("/sanctum/csrf-cookie");
        const response = await axios.post("/login", {
          email,
          password,
        });
        this.token = response.data.token;
        localStorage.setItem("token", this.token as string);

        axios.defaults.headers.common["Authorization"] = `Bearer ${this.token}`;

        await this.fetchUser();
      } catch (error: any) {
        this.error = error.response?.data?.message || "Login failed";
        this.token = null;
      } finally {
        this.loading = false;
      }
    },

    async fetchUser() {
      try {
        const response = await axios.get("/api/user");
        this.user = response.data;
      } catch {
        this.user = null;
      }
    },

    async logout() {
      try {
        await axios.post("/logout");
      } catch {}

      this.token = null;
      this.user = null;
      localStorage.removeItem("token");
      delete axios.defaults.headers.common["Authorization"];
    },

    async init() {
      await axios.get("/sanctum/csrf-cookie");
      if (this.token) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${this.token}`;
        await this.fetchUser();
      }
    },
  },
});
