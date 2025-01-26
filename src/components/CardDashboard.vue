<template>
  <div class="bg-white rounded-lg shadow-lg overflow-hidden">
    <div class="px-6 pt-6 pb-10">
      <h3 class="text-xl font-semibold mb-2">{{ tujuan }}</h3>
      <p class="text-gray-600 mb-4">Tanggal Keberangkatan: {{ tanggal }}</p>
      <p class="text-gray-600 mb-4">Status Pembayaran: {{ status }}</p>
      <router-link 
          :to="{ name: 'user.invoice', params: { id: id,tujuan: tujuan, tanggal: tanggal } }"
          class="px-6 py-2 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700"
        >
          Cetak Invoice
        </router-link>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';

// Props
defineProps({
  id: {
    type: String,
    required: true,
  },
  tujuan: {
    type: String,
    required: true,
  },
  tanggal: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
});
</script>

<style scoped>
/* Add any custom styles here */
</style>

