<template>
    <div class="container mx-auto max-w-2xl">
        <header class="flex justify-between items-center mt-4 mb-8">
            <router-link to="/">
                <h1 class="text-3xl font-bold">Vue zadanie</h1></router-link
            >

            <nav>
                <router-link to="/users" class="mr-4">Použítelia</router-link>

                <router-link to="/profile">Profil</router-link>
            </nav>
            <div>
                <router-link to="/login-page">Prihlásenie</router-link>
            </div>
        </header>

        <router-view />
    </div>
</template>

<script setup lang="ts">
// nič sem netreba
</script>
