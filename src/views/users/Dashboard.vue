<template>
  <div class="container mx-auto py-8 px-5">
    <h2 class="text-3xl font-bold mb-6 text-center">Dashboard</h2>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <CardDashboard v-for="booking in bookings" :key="booking.id" :id="booking.id" :tujuan="booking.jadwal.destinasi"
        :tanggal="booking.tanggal" :status="booking.payment.status" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import axios from '../../axios';
import CardDashboard from '../../components/CardDashboard.vue';
const userData = computed(() => {
  return JSON.parse(localStorage.getItem('user'));
});
const bookings = ref([]);

const getBookings = async () => {
  try {
    const response = await axios.get('/api/booking', { user_id: userData.value.id });
    bookings.value = response.data.data;
    console.log(response.data.data);
  } catch (error) {
    console.error(error.response?.data?.message || 'Failed to load data');
  }
};

onMounted(() => {
  getBookings();
});
</script>
