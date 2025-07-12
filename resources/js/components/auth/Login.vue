<template>
    <div class="max-w-md mx-auto mt-16 bg-white p-6 rounded shadow">
        <h2 class="text-2xl font-bold mb-4">Prihlásenie</h2>

        <form @submit.prevent="handleLogin">
            <div class="mb-4">
                <label for="email" class="block font-semibold">Email</label>
                <input
                    id="email"
                    type="email"
                    v-model="email"
                    required
                    class="w-full border px-3 py-2 rounded mt-1"
                />
            </div>

            <div class="mb-4">
                <label for="password" class="block font-semibold">Heslo</label>
                <input
                    id="password"
                    type="password"
                    v-model="password"
                    required
                    class="w-full border px-3 py-2 rounded mt-1"
                />
            </div>

            <div v-if="auth.error" class="text-red-600 mb-4">
                {{ auth.error }}
            </div>

            <button
                type="submit"
                :disabled="auth.loading"
                class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
                {{ auth.loading ? "Prihlasovanie..." : "Prihlásiť sa" }}
            </button>
        </form>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/useAuthStore";

const email = ref("");
const password = ref("");
const auth = useAuthStore();
const router = useRouter();

const handleLogin = async () => {
    await auth.login(email.value, password.value);
    console.log("AUTH status", auth.isAuthenticated, auth.user, auth.token);
    if (auth.isAuthenticated) {
        router.push("/");
    }
};
</script>
