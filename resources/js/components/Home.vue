<script setup lang="ts">
import { useAuthStore } from "@/stores/useAuthStore";

const auth = useAuthStore();
</script>
<template>
    <div>
        <h1>Toto je domovsky priecinok</h1>
        <p v-if="auth.isAuthenticated">Vitame vas, {{ auth.user?.email }}!</p>
        <p v-else>Prosím, prihláste sa.</p>
    </div>
</template>
