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

const avatar = ref<File | null>(null);

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

function onFileChange(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
        avatar.value = target.files[0];
    }
}

async function handleAvatarUpload() {
    if (!avatar.value) return;

    const formData = new FormData();
    formData.append("avatar", avatar.value);
    formData.append("email", "admin@a");
    formData.append("firstname", "Min");
    formData.append("lastname", "Ad");

    try {
        await axios.post("/api/user/update-profile", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });

        alert("Avatar úspešne nahratý ✅");
        fetchUser(); // znovu načíta user po uploade
    } catch (error) {
        console.error("Chyba pri nahrávaní avataru:", error);
    }
}

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
        <div v-if="user?.avatar" class="mb-4">
            <img
                :src="`${user?.avatar?.image}`"
                alt="Avatar"
                class="w-24 h-24 rounded-full"
            />
        </div>
        <div class="mb-4">
            <label class="block mb-1 font-semibold">Zmeniť avatar:</label>
            <input type="file" @change="onFileChange" class="mb-2" />
            <button
                @click="handleAvatarUpload"
                class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
                Nahrať
            </button>
        </div>
        <hr class="mb-4" />
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
