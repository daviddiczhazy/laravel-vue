<script setup lang="ts">
import axios from "axios";
import { onMounted, ref } from "vue";
import { useAuthStore } from "@/stores/useAuthStore";
import ProgressSpinner from "primevue/progressspinner";
interface User {
    id: number;
    firstname: string;
    lastname: string;
    email: string;
    is_admin: boolean;
}

const users = ref<User[]>([]);
const auth = useAuthStore();
const loading = ref(true);

const fetchUsers = async () => {
    try {
        const response = await axios.get("api/users");
        users.value = response.data.data; // Assuming the API returns data in this format
        console.log("Fetched users:", users.value);
    } catch (error) {
        console.error("Error fetching users:", error);
    } finally {
        loading.value = false;
    }
};

onMounted(() => {
    if (auth.isAuthenticated) {
        fetchUsers();
    }
});
</script>
<template>
    <div v-if="auth.isAuthenticated" class="p-6">
        <h1 class="text-2xl font-bold mb-6">Používatelia</h1>

        <div v-if="loading" class="flex justify-center items-center h-32">
            <ProgressSpinner />
        </div>

        <table v-else class="min-w-full border border-gray-300 text-left">
            <thead class="bg-gray-100">
                <tr>
                    <th class="px-4 py-2 border">ID</th>
                    <th class="px-4 py-2 border">Meno</th>
                    <th class="px-4 py-2 border">Email</th>
                    <th class="px-4 py-2 border">Admin</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="user in users" :key="user.id">
                    <td class="px-4 py-2 border">{{ user.id }}</td>
                    <td class="px-4 py-2 border">
                        {{ user.firstname }} {{ user.lastname }}
                    </td>
                    <td class="px-4 py-2 border">{{ user.email }}</td>
                    <td class="px-4 py-2 border">
                        <span
                            :class="
                                user.is_admin
                                    ? 'text-green-600'
                                    : 'text-gray-500'
                            "
                        >
                            {{ user.is_admin ? "Áno" : "Nie" }}
                        </span>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    <div v-else class="p-6">
        <h1 class="text-2xl font-bold mb-6">Prístup zamietnutý</h1>
        <p>
            Prosím, prihláste sa ako administrátor pre zobrazenie používateľov.
        </p>
    </div>
</template>
