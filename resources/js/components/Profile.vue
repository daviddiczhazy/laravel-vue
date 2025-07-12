<script setup lang="ts">
import { useAuthStore } from "@/stores/useAuthStore";
import axios from "axios";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
const auth = useAuthStore();
const router = useRouter();

interface Userdata {
    id: number;
    email: string;
    firstname: string;
    lastname: string;
}

const user = ref<Userdata | null>(null);

const fetchUser = async () => {
    try {
        const response = await axios.get("api/user");
        user.value = response.data.data; // Assuming the API returns data in this format
        console.log("Fetched users:", user.value);
    } catch (error) {
        console.error("Error fetching users:", error);
    }
};

onMounted(() => {
    if (auth.isAuthenticated) {
        fetchUser();
    }
});
</script>
<template>
    <div>
        <h1 class="text-xl font-bold mb-8">Váš profil</h1>
    </div>
    <div
        v-if="auth.isAuthenticated"
        class="max-w-md mx-auto mt-16 bg-white p-6 rounded shadow"
    >
        <p class="mb-4">Email: {{ user?.email }}</p>
        <p class="mb-4">Meno: {{ user?.firstname }}</p>
        <p class="mb-4">Priezvisko: {{ user?.lastname }}</p>
        <button
            @click="router.push('/change-password')"
            class="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
            Zmeniť heslo
        </button>
    </div>
</template>
