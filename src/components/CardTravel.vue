<template>
    <div class="bg-white rounded-lg shadow-lg overflow-hidden">
      <div class="p-6 flex items-center justify-between">
        <div class="block">
          <h3 class="text-xl font-semibold mb-2">{{ destinasi }}</h3>
          <p class="text-gray-600 mb-4">Harga Tiket: {{ formatRupiah(harga_tiket) }}</p>
          <p class="text-gray-600 mb-4">Jumlah Kuota: {{ kuota }}</p>
          <p class="text-gray-600 mb-4">Tanggal/Waktu: {{ tanggal }} / {{ waktu }}</p>
        </div>
        <router-link
          :to="{ name: 'checkout', params: {id: id, travel: destinasi } }"
          class="px-6 py-2 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700"
        >
          Pesan Sekarang
        </router-link>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  
  // Props
  defineProps({
    id: {
      type: Number,
      required: true,
    },
    destinasi: {
      type: String,
      required: true,
    },
    harga_tiket: {
      type: Number,
      required: true,
    },
    kuota: {
      type: Number,
      required: true,
    },
    tanggal: {
      type: String,
      required: true,
    },
    waktu: {
      type: String,
      required: true,
    },
  });
  
  // Reactive Data
  const user = ref(null);
  
  // Methods
  const formatRupiah = (number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
    }).format(number);
  };
  

  </script>
  