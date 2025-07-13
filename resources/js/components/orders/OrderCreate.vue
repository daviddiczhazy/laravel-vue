<template>
    <div class="max-w-lg mx-auto mt-10 space-y-6">
        <h2 class="text-2xl font-bold">Vytvoriť objednávku</h2>

        <div>
            <label class="block mb-1">Názov</label>
            <InputText v-model="order.name" class="w-full border-form" />
        </div>

        <div>
            <label class="block mb-1 b">Popis</label>
            <Textarea
                v-model="order.description"
                rows="4"
                class="w-full border-form"
            />
        </div>

        <div>
            <label class="block mb-1">Kategória</label>
            <Dropdown
                v-model="order.category_id"
                :options="categories"
                optionLabel="name"
                optionValue="id"
                placeholder="Vyber kategóriu"
                class="w-full border-form"
            />
            <small class="underline text-blue-500">
                <RouterLink to="/categories/create"
                    >Vytvorenie kategórie</RouterLink
                ></small
            >
        </div>

        <div>
            <label class="block mb-1">Status</label>
            <Dropdown
                v-model="order.current_status"
                :options="statuses"
                optionLabel="name"
                :optionValue="(option) => option"
                placeholder="Vyber status"
                class="w-full border-form"
            />
        </div>

        <div>
            <label class="block mb-1">Meno zákazníka</label>
            <InputText
                v-model="order.customer_name"
                class="w-full border-form"
            />
        </div>

        <div>
            <label class="block mb-1">Adresa zákazníka</label>
            <Textarea
                v-model="order.customer_address"
                rows="3"
                class="w-full border-form"
            />
        </div>

        <div>
            <label class="block mb-1">Dátum splatnosti</label>
            <Calendar
                v-model="order.due_date"
                class="w-full border-form"
                showIcon
                dateFormat="yy-mm-dd"
            />
        </div>
        <div class="flex justify-between items-center mb-6 pb-4">
            <Button
                label="Vytvoriť objednávku"
                class="btn btn-blue border-button"
                @click="submitOrder"
            />
            <router-link
                to="/orders"
                class="bg-red-400 text-white px-4 py-2 rounded hover:bg-red-600"
            >
                Naspäť na zoznam
            </router-link>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import axios from "axios";

import InputText from "primevue/inputtext";
import Textarea from "primevue/textarea";
import Dropdown from "primevue/dropdown";
import Button from "primevue/button";

import Calendar from "primevue/calendar";
import { useRouter } from "vue-router";
const router = useRouter();

const order = ref({
    name: "",
    description: "",
    category_id: null,
    current_status: {
        name: "",
        value: "",
    },
    customer_name: "",
    customer_address: "",
    due_date: "",
});

const categories = ref([]);
const statuses = ref([]);

const fetchMeta = async () => {
    const [catRes, statRes] = await Promise.all([
        axios.get("/api/order-categories"),
        axios.get("/api/order-statuses"),
    ]);
    categories.value = catRes.data.data ?? catRes.data;
    statuses.value = statRes.data.data ?? statRes.data;
};

const submitOrder = async () => {
    try {
        await axios.post("/api/orders", order.value);
        router.push("/orders");
    } catch (err) {
        console.error("Chyba pri vytváraní:", err);
        alert("Chyba pri vytváraní objednávky.");
    }
};

onMounted(() => {
    fetchMeta();
});
</script>

<style scoped>
.border-form {
    border: 1px solid #ddd;
    padding: 4px;
}
.border-button {
    border: 1px solid #ddd;
    padding: 8px 16px;
    background-color: #f0f0f0;
    cursor: pointer;
}
</style>
