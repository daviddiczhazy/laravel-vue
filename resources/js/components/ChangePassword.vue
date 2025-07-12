<template>
    <div class="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
        <h2 class="text-xl font-bold mb-4">Zmena hesla</h2>

        <form @submit.prevent="changePassword">
            <div class="mb-4">
                <label class="block mb-1">Aktuálne heslo</label>
                <input
                    type="password"
                    v-model="current_password"
                    class="w-full border rounded p-2"
                    required
                />
            </div>

            <div class="mb-4">
                <label class="block mb-1">Nové heslo</label>
                <input
                    type="password"
                    v-model="password"
                    class="w-full border rounded p-2"
                    required
                />
            </div>

            <div class="mb-4">
                <label class="block mb-1">Potvrdenie nového hesla</label>
                <input
                    type="password"
                    v-model="password_confirmation"
                    class="w-full border rounded p-2"
                    required
                />
            </div>

            <button
                type="submit"
                class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
                Zmeniť heslo
            </button>

            <p v-if="success" class="text-green-600 mt-4">
                Heslo bolo úspešne zmenené.
            </p>
            <p v-if="error" class="text-red-600 mt-4">{{ error }}</p>
        </form>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import axios from "axios";

const current_password = ref("");
const password = ref("");
const password_confirmation = ref("");
const success = ref(false);
const error = ref("");

const changePassword = async () => {
    success.value = false;
    error.value = "";

    try {
        await axios.put("/user/password", {
            current_password: current_password.value,
            password: password.value,
            password_confirmation: password_confirmation.value,
        });

        success.value = true;
        current_password.value = "";
        password.value = "";
        password_confirmation.value = "";
    } catch (err: any) {
        error.value =
            err.response?.data?.message || "Nepodarilo sa zmeniť heslo.";
    }
};
</script>
