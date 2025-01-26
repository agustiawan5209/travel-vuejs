<script setup>
import { ref, computed, onMounted } from "vue";
import axios from "../../axios";
import { useRoute, useRouter } from "vue-router";

const isLoading =ref(false)
const userData = computed(() => {
    return JSON.parse(localStorage.getItem('user'));
});
// Mendapatkan parameter route
const route = useRoute();
const router = useRouter();

const id = route.params.id;
const travel = ref({});
// Mock data untuk pengguna dan tiket
// fungsi untuk menampilkan data
const displayJadwalTravel = async () => {
    try {
        const response = await axios.get(`/api/travel/${id}`);
        travel.value = response.data.data;
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


// Fungsi format rupiah
const formatRupiah = (number) =>
    new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
    }).format(number);

    const tanggal = new Date();
// Fungsi untuk mengirim data pemesanan
const submitOrder = async () => {
    console.log(userData.value.id)
    try {
        await axios.get('/sanctum/csrf-cookie');
        const response = await axios.post("/api/checkout", {
            user_id: userData.value.id,
            jadwal_id : travel.value.id,
            tanggal: tanggal.toISOString().split('T')[0],
            total_bayar: travel.value.harga_tiket,
        });

        alert(response.data.message);
        router.push({name: 'user.dashboard', params:{id: userData.value.id}})
    } catch (error) {
        console.error(error.response?.data || error.message);
        alert("Gagal mengonfirmasi pesanan.");
    }
};
</script>

<template>
    <div class="min-h-[80vh] flex justify-center items-center">
        <div class="max-w-full md:w-[800px] p-6 bg-white rounded-lg shadow-md">
            <h1 class="text-2xl font-bold mb-4">Checkout Tiket Travel</h1>

            <!-- Informasi Pengguna -->
            <div class="mb-4">
                <h2 class="text-lg font-semibold">Informasi Pengguna</h2>
                <p><strong>Nama:</strong> {{ userData.name }}</p>
            </div>

            <!-- Tiket yang Dipesan -->
            <div class="mb-4">
                <h2 class="text-lg font-semibold">Detail Tiket</h2>
                <ul class="list-disc list-inside">
                    <li class="text-xl font-semibold mb-2">{{ travel.destinasi }}</li>
                    <li class="text-gray-600 mb-4">Jumlah Kuota: {{ travel.kuota }}</li>
                    <li class="text-gray-600 mb-4">Tanggal/Waktu: {{ travel.tanggal }} / {{ travel.waktu }}</li>
                </ul>
                <p class="mt-2 font-semibold">
                    Total: {{ formatRupiah(travel.harga_tiket) }}
                </p>
            </div>

            <!-- Form Konfirmasi -->
            <div>
                <h2 class="text-lg font-semibold mb-2">Konfirmasi Pembayaran</h2>
                <form @submit.prevent="submitOrder">
                    <button type="submit" class="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
                        Konfirmasi Pembayaran
                    </button>
                </form>
            </div>
        </div>
    </div>
</template>

<style scoped>
/* Tambahkan styling tambahan jika diperlukan */
</style>