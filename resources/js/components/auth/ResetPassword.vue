<template>
    <div class="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
        <h2 class="text-xl font-bold mb-4">Obnovenie hesla</h2>
        <form @submit.prevent="submit">
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
                <label class="block mb-1">Potvrdenie hesla</label>
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
                Obnoviť heslo
            </button>

            <p v-if="message" class="text-green-600 mt-4">{{ message }}</p>
            <p v-if="error" class="text-red-600 mt-4">{{ error }}</p>
        </form>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "axios";

const route = useRoute();
const router = useRouter();

const token = ref("");
const email = ref("");
const password = ref("");
const password_confirmation = ref("");

const message = ref("");
const error = ref("");

onMounted(() => {
    token.value = (route.query.token as string) || "";
    email.value = (route.query.email as string) || "";
});

const submit = async () => {
    try {
        await axios.get("/sanctum/csrf-cookie");
        await axios.post("/reset-password", {
            token: token.value,
            email: email.value,
            password: password.value,
            password_confirmation: password_confirmation.value,
        });

        message.value = "Heslo bolo úspešne obnovené. Môžete sa prihlásiť.";
        setTimeout(() => router.push("/login"), 2000);
    } catch (err: any) {
        error.value = err.response?.data?.message || "Chyba pri obnove hesla.";
    }
};
</script>
