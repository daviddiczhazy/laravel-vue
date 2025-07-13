import { defineStore } from "pinia";
import axios from "axios";

export const useOrderStore = defineStore("order", {
  state: () => ({
    orders: [] as any[],
    loading: false,
    statusHistory: [] as any[],
  }),

  actions: {
    async fetchOrders() {
      this.loading = true;
      try {
        const response = await axios.get("/api/orders");
        this.orders = response.data.data ?? response.data;
      } catch (error) {
        console.error("Chyba pri načítaní objednávok", error);
      } finally {
        this.loading = false;
      }
    },

    async deleteOrder(id: number) {
      try {
        await axios.delete(`/api/orders/${id}`);
        this.orders = this.orders.filter((order) => order.id !== id);
      } catch (error) {
        console.error("Chyba pri mazaní objednávky:", error);
        throw error;
      }
    },

    async fetchStatusHistory(orderId: number) {
      try {
        const response = await axios.get(
          `/api/orders/${orderId}/status-history`
        );
        this.statusHistory = response.data.data ?? [];
      } catch (error) {
        console.error("Chyba pri načítaní histórie:", error);
      }
    },
  },
});
