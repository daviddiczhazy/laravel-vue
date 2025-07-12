<script setup lang="ts">
import { computed, ref } from "vue";
import { useAuthStore } from "@/stores/useAuthStore";

const email = ref("");
const password = ref("");
const auth = useAuthStore();

const handleLogin = async () => {
    await auth.login(email.value, password.value);
};

const isLogged = computed(() => auth.isAuthenticated);
</script>

<template>
    <div class="max-w-md mx-auto mt-16 bg-white p-6 rounded shadow">
        <h2 class="text-2xl font-bold mb-4">Stránka prihlásenia</h2>

        <div v-if="isLogged">
            <p class="text-green-600">Úspešne prihlásený!</p>
            <p class="text-red-600 cursor-pointer" @click="auth.logout">
                Odhlásiť sa
            </p>
        </div>
        <div v-else>
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
                    <label for="password" class="block font-semibold"
                        >Heslo</label
                    >
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
        <p class="mt-4">
            <router-link
                to="/zabudnute-heslo"
                class="text-blue-600 hover:underline"
            >
                Zabudli ste heslo?
            </router-link>
        </p>
    </div>
</template>
