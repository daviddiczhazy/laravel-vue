<template>
    <div class="p-10 text-center">
        <h1 class="text-2xl font-bold mb-4">Counter: {{ counter.count }}</h1>
        <button
            @click="counter.increment"
            class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
            Increment
        </button>
    </div>
</template>

<script setup lang="ts">
import { useCounterStore } from "./stores/counter";

const counter = useCounterStore();
</script>
