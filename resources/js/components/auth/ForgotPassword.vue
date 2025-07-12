<template>
    <div class="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
        <h2 class="text-xl font-bold mb-4">Zabudnuté heslo</h2>

        <form @submit.prevent="submit">
            <div class="mb-4">
                <label class="block mb-1">Email</label>
                <input
                    type="email"
                    v-model="email"
                    class="w-full border rounded p-2"
                    required
                />
            </div>

            <button
                class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
                Odoslať link na obnovu hesla
            </button>

            <p v-if="message" class="text-green-600 mt-4">{{ message }}</p>
            <p v-if="error" class="text-red-600 mt-4">{{ error }}</p>
        </form>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import axios from "axios";

const email = ref("");
const message = ref("");
const error = ref("");

const submit = async () => {
    message.value = "";
    error.value = "";

    try {
        await axios.get("/sanctum/csrf-cookie"); // pre CSRF token
        await axios.post("/forgot-password", { email: email.value });

        message.value = "Na email ti bol odoslaný odkaz na reset hesla.";
    } catch (err: any) {
        error.value =
            err.response?.data?.message || "Chyba pri odosielaní e-mailu.";
    }
};
</script>
