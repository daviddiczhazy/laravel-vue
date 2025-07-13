<template>
    <div class="container mx-auto max-w-3xl">
        <header class="flex justify-between items-center mt-4 mb-8">
            <router-link to="/">
                <div
                    class="text-2xl font-bold border border-solid border-2 border-gray-800 rounded-md px-2 py-1 hover:bg-gray-100 transition duration-300"
                >
                    DEMI VUE
                </div></router-link
            >

            <nav class="font-mono uppercase">
                <router-link to="/users" class="mr-6">Použítelia</router-link>
                <router-link to="/orders" class="mr-6">Objednávky</router-link>
            </nav>
            <div>
                <router-link v-if="!auth.isAuthenticated" to="/login-page"
                    ><i class="pi pi-user"></i> Prihlásenie</router-link
                >
                <router-link v-else to="/profile"
                    ><i class="pi pi-user"></i> Profil</router-link
                >
            </div>
        </header>

        <router-view />
    </div>
</template>

<script setup lang="ts">
import { useAuthStore } from "@/stores/useAuthStore";

const auth = useAuthStore();
</script>
