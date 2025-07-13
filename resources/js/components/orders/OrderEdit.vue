<template>
    <div v-if="dataReady" class="max-w-lg mx-auto mt-8 space-y-4">
        <h2 class="text-xl font-bold">Upraviť objednávku</h2>

        <div>
            <label class="block text-sm font-medium mb-1">Meno zákazníka</label>
            <input
                v-model="orderName"
                type="text"
                class="w-full border border-gray-300 rounded px-3 py-2"
            />
        </div>

        <div>
            <label class="block text-sm font-medium mb-1"
                >Adresa zákazníka</label
            >
            <textarea
                v-model="orderAddress"
                rows="3"
                class="w-full border border-gray-300 rounded px-3 py-2"
            ></textarea>
        </div>

        <div>
            <label class="block mb-1">Status</label>
            <Dropdown
                v-model="orderStatus"
                :options="statuses"
                optionLabel="name"
                optionValue="value"
                placeholder="Vyber status"
                class="w-full border-form"
            />
        </div>

        <div>
            <label class="block text-sm font-medium mb-1"
                >Dátum splatnosti</label
            >
            <input
                v-model="orderDueDate"
                type="date"
                class="w-full border border-gray-300 rounded px-3 py-2"
            />
        </div>

        <button
            @click="updateOrder"
            :disabled="loading"
            class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center justify-center gap-2 disabled:opacity-60"
        >
            <span
                v-if="loading"
                class="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"
            ></span>
            <span>{{ loading ? "Ukladám..." : "Uložiť zmeny" }}</span>
        </button>
    </div>
    <div v-else>
        <p class="max-w-lg mx-auto mt-8 space-y-4 text-blue-500">
            Načítavam údaje...
        </p>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "axios";
import Dropdown from "primevue/dropdown";

const route = useRoute();
const router = useRouter();

interface Status {
    name?: string;
    value: string;
}

interface Order {
    customer_name: string;
    customer_address: string;
    due_date: string;
    current_status: {
        name?: string;
        value: string;
        color?: string;
        slug?: string;
    };
}
const order = ref<Order | null>();
const loading = ref(false);
const dataReady = ref(false);
const orderName = ref("");
const orderAddress = ref("");
const orderDueDate = ref("");
const orderStatus = ref("");

const statuses = ref([]);

const fetchMeta = async () => {
    const [statRes] = await Promise.all([axios.get("/api/order-statuses")]);
    statuses.value = statRes.data.data ?? statRes.data;
};

const getStatusNameByValue = (value: string) => {
    return statuses.value.find((statusValue: Status) => {
        if (statusValue.value === value) {
            return statusValue.name;
        }
    });
};

const fetchOrder = async () => {
    try {
        const response = await axios.get(`/api/orders/${route.params.id}`);
        order.value = response.data.data ?? response.data;
        dataReady.value = true;

        orderName.value = order.value?.customer_name ?? "";
        orderAddress.value = order.value?.customer_address ?? "";
        orderDueDate.value = order.value?.due_date ?? "";
        orderStatus.value = order.value?.current_status?.value ?? "";
    } catch (err) {
        console.error("Chyba pri načítaní objednávky", err);
    }
};

const updateOrder = async () => {
    loading.value = true;
    order.value = {
        ...order.value,
        customer_name: orderName.value,
        customer_address: orderAddress.value,
        due_date: orderDueDate.value,
        current_status: {
            value: orderStatus.value ?? "",
        },
    };
    try {
        await axios.put(`/api/orders/${route.params.id}`, order.value);
        router.push("/orders");
    } catch (err) {
        console.error("Chyba pri ukladaní objednávky", err);
    } finally {
        loading.value = false;
    }
};

onMounted(() => {
    fetchOrder();
    fetchMeta();
});
</script>
<style scoped>
.border-form {
    border: 1px solid #ddd;
    padding: 4px;
}
</style>
