<template>
    <div class="max-w-md mx-auto mt-10 space-y-4">
        <h2 class="text-xl font-bold mb-4">Vytvoriť kategóriu</h2>

        <div>
            <label class="block mb-1">Názov kategórie</label>
            <InputText v-model="name" class="w-full border-form" />
        </div>

        <button
            label="Pridať"
            class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center justify-center gap-2 disabled:opacity-60"
            @click="createCategory"
        >
            <span
                v-if="loading"
                class="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"
            ></span>
            <span>{{ loading ? "Pridávam..." : "Pridať kategóriu" }}</span>
        </button>
    </div>
    <div v-if="showcategories" class="max-w-md mx-auto mt-10 space-y-4">
        <h2 class="text-md font-bold mb-4">Existujúce kategórie:</h2>
        <div v-if="categories.length === 0">
            <p class="text-gray-500">Žiadne kategórie</p>
        </div>
        <div v-else class="flex flex-wrap">
            <span
                v-for="category in categories"
                :key="category?.id"
                class="px-2 py-1 mr-2 rounded border border-gray-500 font-mono text-gray-500"
                >{{ category?.name }}</span
            >
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import axios from "axios";
import InputText from "primevue/inputtext";
import { useRouter } from "vue-router";

const name = ref("");
const router = useRouter();
const loading = ref(false);
const showcategories = ref(false);

const categories = ref([]);

const createCategory = async () => {
    try {
        loading.value = true;
        await axios.post("/api/order-categories", { name: name.value });
        name.value = "";
        router.push("/orders/create");
    } catch (error: any) {
        console.error(error);
        alert("Chyba pri vytváraní kategórie");
    } finally {
        loading.value = false;
    }
};

const fetchCategories = async () => {
    try {
        const response = await axios.get("/api/order-categories");
        showcategories.value = true;
        categories.value = response.data.data ?? response.data;
    } catch (error) {
        console.error("Chyba pri načítaní kategórií:", error);
    }
};

onMounted(() => {
    fetchCategories();
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
