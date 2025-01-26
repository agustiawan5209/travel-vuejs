<script setup>
import { ref, onMounted } from 'vue';
import CardTravel from '../components/CardTravel.vue';
import axios from '../axios'
import SpinningDots from '../components/SpinningDots.vue';
const isLoading = ref(false)
if (isLoading.value) {
  setTimeout(() => {
    isLoading.value = false;
  }, 3000);
}

const travelSchedules = ref({});


// fungsi untuk menampilkan data
const displayJadwalTravel = async () => {
    try {
        const response = await axios.get('/api/travel');
        travelSchedules.value = response.data.data;
        
    } catch (error) {
        console.log(error.response?.data?.message || "Failed to load data");
    } finally {
        isLoading.value = false;
    }
};

// Menampilkan data ketika komponen dimount
onMounted(async () => {
  isLoading.value = true;
  displayJadwalTravel();
  
});

console.log(travelSchedules.value)
</script>

<template>
    <section id="header" class=" container mx-auto py-4 px-5">
        <div
            class=" bg-gradient-to-r from-purple-400 via-purple-500 to-purple-600 flex flex-col items-center justify-center min-h-[60vh] text-white">
            <div class="flex flex-col md:flex-row items-center justify-between w-full px-4 md:px-10">
                <div class="md:w-1/2 p-4">
                    <h1 class="text-4xl font-bold mb-4">Selamat di Website Kami</h1>
                    <p class="text-lg">
                        Jelajahi tempat luar biasa di seluruh dunia dengan kami. kami selalu menyiapkan paket dan pengalaman yang tidak terlupakan
                    </p>
                    <div class="flex justify-between w-full mt-8">
                        <a href="#travel-schedule"
                            class="px-6 py-2 bg-white text-purple-600 font-semibold rounded-lg hover:bg-purple-600 hover:text-white">Mulai</a>
                    </div>
                </div>
                <div class="md:w-1/2 p-4 relative">
                    <img :src="'/public/image/—Pngtree—cruise ship ocean liner_14612961.png'" alt="Travel Image"
                        class="w-0 sm:w-full h-auto rounded-lg absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                </div>
            </div>
        </div>
    </section>

    <!-- Card product travel Schedul -->
    <section id="travel-schedule" class="container mx-auto py-8 px-5" v-if="isLoading == false">
        <h2 class="text-3xl font-bold mb-6 text-center">Jadwal Travel</h2>
        <div class="grid grid-cols-1 gap-8">
            <CardTravel v-for="schedule in travelSchedules" :key="schedule.id" :image="schedule.image"
                :destinasi="schedule.destinasi" :harga_tiket="schedule.harga_tiket" :kuota="schedule.kuota"
                :tanggal="schedule.tanggal" :waktu="schedule.waktu" />
        </div>
    </section>
    <div class=" flex justify-center items-center bg-primary" v-else>
        <SpinningDots />
    </div>
</template>
