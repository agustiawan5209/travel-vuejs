<script setup>
import CardBasic from '../../components/CardBasic.vue';
</script>

<template>
  <!-- Main Dashboard Content -->
  <main class="flex-1 bg-gray-100 p-6">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <!-- Card 1 -->
        <CardBasic></CardBasic>
        <CardBasic></CardBasic>
        <CardBasic></CardBasic>
    </div>
</main>
</template>
