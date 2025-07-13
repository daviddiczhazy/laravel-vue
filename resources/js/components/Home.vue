<script setup lang="ts">
import { useAuthStore } from "@/stores/useAuthStore";

const auth = useAuthStore();
</script>
<template>
    <div>
        <h1 class="text-xl font-semibold text-gray-800 mb-6">
            Vitajte na stránke DeMi Vue Zadania
        </h1>
        <p v-if="auth.isAuthenticated">Vitame vas!</p>
        <p v-else>Prosím, prihláste sa.</p>
    </div>
</template>
