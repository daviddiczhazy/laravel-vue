<template>
    <div class="max-w-md mx-auto mt-10 space-y-4">
        <h2 class="text-xl font-bold mb-4">Vytvoriť kategóriu</h2>

        <div>
            <label class="block mb-1">Názov kategórie</label>
            <InputText v-model="name" class="w-full border-form" />
        </div>

        <Button label="Pridať" class="border-button" @click="createCategory" />
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import axios from "axios";
import InputText from "primevue/inputtext";
import Button from "primevue/button";
import { useRouter } from "vue-router";

const name = ref("");
const router = useRouter();

const createCategory = async () => {
    try {
        await axios.post("/api/order-categories", { name: name.value });
        name.value = "";
        router.push("/orders/create");
    } catch (error: any) {
        console.error(error);
        alert("Chyba pri vytváraní kategórie");
    }
};
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
