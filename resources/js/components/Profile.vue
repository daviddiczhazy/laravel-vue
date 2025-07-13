<script setup lang="ts">
import { useAuthStore } from "@/stores/useAuthStore";
import axios from "axios";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import Dialog from "primevue/dialog";

const auth = useAuthStore();
const router = useRouter();
const loading = ref(false);

interface Userdata {
    id: number;
    email: string;
    firstname: string;
    lastname: string;
    avatar?: {
        image: string;
    };
}

const avatar = ref<File | null>(null);
const user = ref<Userdata | null>(null);
const showConfirm = ref(false);
const dataReady = ref(false);

const fetchUser = async () => {
    try {
        const response = await axios.get("api/user");
        user.value = response.data.data; // Assuming the API returns data in this format
        dataReady.value = true;
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
        loading.value = true;
        await axios.post("/api/user/update-profile", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        fetchUser();
    } catch (error) {
        console.error("Chyba pri nahrávaní avataru:", error);
    } finally {
        loading.value = false;
    }
}

const handleLogout = () => {
    auth.logout();
    showConfirm.value = false;
    router.push({ name: "home" });
};

onMounted(() => {
    if (auth.isAuthenticated) {
        fetchUser();
    }
});
</script>
<template>
    <Dialog v-model:visible="showConfirm" header="Potvrdenie odhlásenia" modal>
        <p>Ste si istý, že chcete odhlásiť?</p>
        <div class="flex justify-end mt-4">
            <button
                @click="showConfirm = false"
                class="bg-gray-300 text-gray-800 px-4 py-2 rounded mr-2"
            >
                Zrušiť
            </button>
            <button
                @click="handleLogout"
                class="bg-red-600 text-white px-4 py-2 rounded"
            >
                Odhlásiť sa
            </button>
        </div>
    </Dialog>
    <p
        v-if="!dataReady"
        class="max-w-xl mx-auto text-blue-500 px-4 py-2 rounded"
    >
        Načítavam údaje...
    </p>
    <div
        v-if="auth.isAuthenticated"
        class="max-w-xl mx-auto mt-16 bg-white p-6 rounded shadow"
    >
        <h1 class="text-xl font-bold mb-8">Váš profil</h1>
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
                <span
                    v-if="loading"
                    class="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"
                ></span>
                <span>{{ loading ? "Nahrávam..." : "Nahrať" }}</span>
            </button>
        </div>
        <hr class="mb-4" />
        <p class="mb-4">Email: {{ user?.email }}</p>
        <p class="mb-4">Meno: {{ user?.firstname }}</p>
        <p class="mb-4">Priezvisko: {{ user?.lastname }}</p>
        <button
            @click="router.push('/change-password')"
            class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 mb-4"
        >
            Zmeniť heslo
        </button>

        <hr class="mb-4" />

        <button
            @click="showConfirm = true"
            class="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
            Odhlásiť sa
        </button>
    </div>
</template>
