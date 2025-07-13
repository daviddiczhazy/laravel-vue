<template>
    <div v-if="auth.isAuthenticated">
        <div class="flex justify-between items-center mb-6">
            <h1 class="text-xl font-bold">Zoznam objednávok</h1>
            <router-link
                to="/orders/create"
                class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
                Pridať objednávku
            </router-link>
        </div>

        <!-- Spinner počas načítavania -->
        <div
            v-if="orderStore.loading"
            class="flex justify-center items-center h-32"
        >
            <ProgressSpinner />
        </div>
        <div v-else class="overflow-x-auto">
            <table class="w-full table-auto border">
                <thead class="bg-gray-100">
                    <tr>
                        <th class="px-4 py-2">Meno zákazníka</th>
                        <th class="px-4 py-2">Adresa zákazníka</th>
                        <th class="px-4 py-2">Kategória</th>
                        <th class="px-4 py-2">Status</th>
                        <th class="px-4 py-2">Dátum</th>
                        <th class="px-4 py-2"></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="order in orderStore.orders" :key="order.id">
                        <td class="border px-4 py-2">
                            <strong> {{ order?.customer_name }}</strong>
                        </td>
                        <td class="border px-4 py-2">
                            {{ order?.customer_address }}
                        </td>

                        <td class="border px-4 py-2">
                            {{ order.category?.name || "—" }}
                        </td>
                        <td class="border px-4 py-2">
                            {{ order.current_status?.name || "—" }}
                        </td>
                        <td class="border px-4 py-2">
                            {{ dayjs(order.due_date).format("DD.MM.YYYY") }}
                        </td>
                        <td class="border px-4 py-2">
                            <div class="flex justify-between">
                                <button
                                    @click="
                                        router.push(`/orders/${order.id}/edit`)
                                    "
                                    class="bg-blue-600 text-white p-2 rounded hover:bg-blue-700 flex items-center justify-center mr-0.5"
                                    title="Upraviť"
                                >
                                    <i class="pi pi-pencil cursor-pointer"></i>
                                </button>

                                <button
                                    @click="openStatusHistory(order.id)"
                                    class="bg-purple-600 text-white p-2 rounded hover:bg-purple-700 flex items-center justify-center mr-0.5"
                                    title="Zobraziť históriu"
                                >
                                    <i class="pi pi-history"></i>
                                </button>

                                <button
                                    @click="viewInvoice(order.id)"
                                    class="bg-yellow-600 text-white p-2 rounded hover:bg-yellow-700 flex items-center justify-center mr-0.5"
                                    title="Zobraziť faktúru"
                                >
                                    <i class="pi pi-file-pdf"></i>
                                </button>

                                <button
                                    @click="confirmDelete(order.id)"
                                    class="bg-red-600 text-white p-2 rounded hover:bg-red-700 flex items-center justify-center"
                                    title="Zmazať"
                                >
                                    <i class="pi pi-trash"></i>
                                </button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
    <div v-else>
        <p class="text-red-500">
            Nemáte prístup k tejto stránke. Prosím,
            <router-link to="/login-page" class="underline"
                >prihláste sa</router-link
            >.
        </p>
    </div>

    <div
        v-if="showConfirm"
        class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
        <div class="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm">
            <h2 class="text-lg font-semibold mb-4">Potvrdiť zmazanie</h2>
            <p>Určite chceš zmazať túto objednávku?</p>

            <div class="flex justify-end mt-6 space-x-2">
                <button
                    @click="showConfirm = false"
                    class="px-4 py-2 border rounded hover:bg-gray-100"
                >
                    Zrušiť
                </button>
                <button
                    @click="deleteOrder"
                    class="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                >
                    Zmazať
                </button>
            </div>
        </div>
    </div>
    <Dialog v-model:visible="showHistory" header="História statusov" modal>
        <ul>
            <li v-for="(item, index) in orderStore.statusHistory" :key="index">
                {{ item?.status?.name }} —
                {{ dayjs(item?.created_at).format("DD.MM.YYYY HH:mm") }}
            </li>
        </ul>
    </Dialog>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import dayjs from "dayjs";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/useAuthStore";
import { useOrderStore } from "@/stores/useOrderStore";
import ProgressSpinner from "primevue/progressspinner";

import Dialog from "primevue/dialog";

const router = useRouter();
const auth = useAuthStore();
const orderStore = useOrderStore();

const showConfirm = ref(false);
const orderToDelete = ref<number | null>(null);

const showHistory = ref(false);
const selectedOrderId = ref<number | null>(null);

const confirmDelete = (id: number) => {
    orderToDelete.value = id;
    showConfirm.value = true;
};

const deleteOrder = async () => {
    if (!orderToDelete.value) return;
    try {
        await orderStore.deleteOrder(orderToDelete.value);
        showConfirm.value = false;
        orderToDelete.value = null;
    } catch (err) {
        console.error("Chyba pri mazaní:", err);
    }
};

const viewInvoice = (orderId: number) => {
    const url = `/api/orders/${orderId}/generate-pdf`;
    window.open(url, "_blank");
};

const openStatusHistory = async (orderId: number) => {
    selectedOrderId.value = orderId;
    await orderStore.fetchStatusHistory(orderId);
    showHistory.value = true;
};

onMounted(() => {
    orderStore.fetchOrders();
});
</script>
