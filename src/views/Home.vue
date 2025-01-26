<script setup>
import { ref, onMounted } from 'vue';
import CardTravel from '../components/CardTravel.vue';
import axios from '../axios';
import SpinningDots from '../components/SpinningDots.vue';

const isLoading = ref(false);
const travelSchedules = ref([]);
const uniqueDestinations = ref([]);

// Fungsi untuk menampilkan data
const displayTravelSchedules = async () => {
    isLoading.value = true; // Tampilkan loading saat memuat data
    try {
        const response = await axios.get('/api/travel');

        // Validasi respons untuk memastikan data ada
        const schedules = response?.data?.data || [];
        travelSchedules.value = schedules;

        // Ekstraksi destinasi unik
        uniqueDestinations.value = Array.from(
            new Set(schedules.map(schedule => schedule.destinasi))
        );
    } catch (error) {
        console.error(
            error.response?.data?.message || 'Failed to load travel schedules'
        );
    } finally {
        isLoading.value = false; // Matikan loading setelah selesai
    }
};

// Menampilkan data ketika komponen dimount
onMounted(() => {
    displayTravelSchedules();
});

// Data untuk form pencarian
const searchForm = ref({
    destinasi: '',
    tanggal: '',
    waktu: '',
    kuota: '',
});
const searchResults = ref([]);
// Fungsi untuk melakukan pencarian jadwal travel
const searchTravelSchedule = () => {
    
    const query = Object.entries(searchForm.value).reduce((result, [key, value]) => {
        if (value && value.toString().trim() !== '') {
            result[key] = value;
        }
        return result;
    }, {});

    if (Object.keys(query).length > 0) {
        searchResults.value = travelSchedules.value.filter(schedule =>
            Object.entries(query).every(([key, value]) => {
                if (key === 'kuota') {
                    return schedule[key] >= Number(value); // Cek kuota minimal
                }
                return String(schedule[key]).toLowerCase().includes(value.toLowerCase());
            })
        );
    } else {
        // Tampilkan semua data jika query kosong
        displayTravelSchedules();
    }
};

const resetSearchForm = () => {
        searchResults.value = []
}
</script>

<template>
    <section id="header" class="container mx-auto py-4 px-5">
        <div
            class="bg-gradient-to-r from-purple-400 via-purple-500 to-purple-600 flex flex-col items-center justify-center min-h-[60vh] text-white">
            <div class="flex flex-col md:flex-row items-center justify-between w-full px-4 md:px-10">
                <div class="md:w-1/2 p-4">
                    <h1 class="text-4xl font-bold mb-4">Selamat di Website Kami</h1>
                    <p class="text-lg">
                        Jelajahi tempat luar biasa di seluruh dunia dengan kami. kami selalu menyiapkan paket dan
                        pengalaman yang tidak terlupakan
                    </p>
                    <div class="flex justify-between w-full mt-8">
                        <a href="#travel-schedule"
                            class="px-6 py-2 bg-white text-purple-600 font-semibold rounded-lg hover:bg-purple-600 hover:text-white">Mulai</a>
                    </div>
                    <!-- Form Pencarian -->
                    <section id="search" class="container mx-auto py-8 px-5">
                        <h2 class="text-3xl font-bold mb-6 text-center">Cari Jadwal Travel</h2>
                        <form class="flex flex-col gap-4" @submit.prevent="searchTravelSchedule">
                            <div class="flex flex-col gap-2">
                                <label for="destinasi" class="text-lg">Destinasi</label>
                                <select id="destinasi" name="destinasi" v-model="searchForm.destinasi"
                                    class="px-4 py-2 border border-gray-300 rounded-lg bg-white text-black">
                                    <option value="">Pilih Destinasi</option>
                                    <option v-for="destination in uniqueDestinations" :key="destination" :value="destination">
                                        {{ destination }}
                                    </option>
                                </select>
                            </div>
                            <div class="flex flex-col gap-2">
                                <label for="tanggal" class="text-lg">Tanggal</label>
                                <input type="date" id="tanggal" name="tanggal" v-model="searchForm.tanggal"
                                    class="px-4 py-2 border border-gray-300 rounded-lg bg-white text-black">
                            </div>
                            <div class="flex flex-col gap-2">
                                <label for="waktu" class="text-lg">Waktu</label>
                                <input type="time" id="waktu" name="waktu" v-model="searchForm.waktu"
                                    class="px-4 py-2 border border-gray-300 rounded-lg bg-white text-black">
                            </div>
                            <div class="flex flex-col gap-2">
                                <label for="kuota" class="text-lg">Kuota</label>
                                <input type="number" id="kuota" name="kuota" v-model="searchForm.kuota"
                                    class="px-4 py-2 border border-gray-300 rounded-lg bg-white text-black">
                            </div>
                            <button type="submit"
                                class="px-6 py-2 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700">Cari</button>
                            <button type="reset" @click="resetSearchForm"
                                class="px-6 py-2 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700">reset</button>
                        </form>
                    </section>
                </div>
                <div class="md:w-1/2 p-4 relative">
                    <img :src="'/public/image/—Pngtree—cruise ship ocean liner_14612961.png'" alt="Travel Image"
                        class="w-0 sm:w-full h-auto rounded-lg absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                </div>
            </div>
        </div>
    </section>

    <!-- Card product travel schedule -->
    <section id="travel-schedule" class="container mx-auto py-8 px-5" v-if="!isLoading">
        <h2 class="text-3xl font-bold mb-6 text-center">Jadwal Travel</h2>
        <div class="grid grid-cols-1 gap-8" v-if="searchResults.length < 1">
            <CardTravel v-for="schedule in travelSchedules" :key="schedule.id" :id="schedule.id"
                :destinasi="schedule.destinasi" :harga_tiket="schedule.harga_tiket" :kuota="schedule.kuota"
                :tanggal="schedule.tanggal" :waktu="schedule.waktu" />
        </div>
        <div class="grid grid-cols-1 gap-8" v-else>
            <CardTravel v-for="schedule in searchResults" :key="schedule.id" :id="schedule.id"
                :destinasi="schedule.destinasi" :harga_tiket="schedule.harga_tiket" :kuota="schedule.kuota"
                :tanggal="schedule.tanggal" :waktu="schedule.waktu" />
        </div>

    </section>
    <div class="flex justify-center items-center bg-primary" v-else>
        <SpinningDots />
    </div>
</template>
