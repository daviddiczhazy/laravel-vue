<script setup lang="ts">
import axios from "axios";
import { onMounted, ref } from "vue";
import { useAuthStore } from "@/stores/useAuthStore";

const users = ref([]);
const auth = useAuthStore();

const fetchUsers = async () => {
    try {
        const response = await axios.get("api/users");
        users.value = response.data.data; // Assuming the API returns data in this format
        console.log("Fetched users:", users.value);
    } catch (error) {
        console.error("Error fetching users:", error);
    }
};

onMounted(() => {
    if (auth.isAuthenticated) {
        fetchUsers();
    }
});
</script>
<template>
    <div>
        <h1>Zoznam používateľov</h1>
    </div>
    <ul class="mt-4">
        <li
            v-for="user in users"
            :key="user.id"
            class="mb-4 text-capitalize text-gray-500"
        >
            {{ user.firstname }}
        </li>
    </ul>
</template>
