<script setup>
import { ref, defineEmits, defineProps, watch } from 'vue';
import axios from '../../../axios';

// Emit event untuk menutup modal
const emit = defineEmits(['close']);

// State untuk pesan error
const message = ref('');

// State untuk data form
const FormInputData = ref({
    destinasi: '',
    tanggal: '',
    waktu: '',
    harga_tiket: '',
    kuota: '',
});

// Fungsi untuk submit data
const SubmitData = async () => {
    await axios.get('/sanctum/csrf-cookie'); // Pastikan Sanctum cookie ter-set
    try {
        // Buat FormData untuk mengirim data termasuk file
        const formData = new FormData();
        formData.append('destinasi', FormInputData.value.destinasi || '');
        formData.append('tanggal', FormInputData.value.tanggal);
        formData.append('waktu', FormInputData.value.waktu);
        formData.append('harga_tiket', FormInputData.value.harga_tiket);
        formData.append('kuota', FormInputData.value.kuota);

        // Kirim permintaan ke API
        const response = await axios.post(`/api/travel/`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        // Emit event close jika berhasil
        emit('close');
    } catch (error) {
        console.error('Error:', error.response?.data || error.message);
        // Tampilkan pesan error
        message.value = error.response?.data?.message || 'Gagal mengupdate data.';
    }
};
</script>


<template>
    <div class="bg-white p-8 rounded-lg shadow-md w-full">
        <h2 class="text-lg font-semibold mb-4">Form Data</h2>
        <form @submit.prevent="SubmitData">
            <div v-if="message" class="mt-4 text-red-600">{{ message }}</div>
            <div class="mb-4">
                <label for="destinasi" class="block text-sm font-medium text-gray-700 capitalize">destinasi</label>
                <input type="text" id="destinasi" name="destinasi" v-model="FormInputData.destinasi" required
                    class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
            </div>
            <div class="mb-4">
                <label for="destinasi" class="block text-sm font-medium text-gray-700 capitalize">tanggal</label>
                <input type="date" id="tanggal" name="tanggal" v-model="FormInputData.tanggal" required
                    class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
            </div>
            <div class="mb-4">
                <label for="waktu" class="block text-sm font-medium text-gray-700 capitalize">waktu</label>
                <input type="time" id="waktu" name="waktu" v-model="FormInputData.waktu" required
                    class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
            </div>
            <div class="mb-4">
                <label for="harga_tiket" class="block text-sm font-medium text-gray-700 capitalize">harga_tiket</label>
                <input type="number" id="harga_tiket" name="harga_tiket" v-model="FormInputData.harga_tiket" required
                    class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
            </div>
            <div class="mb-4">
                <label for="kuota" class="block text-sm font-medium text-gray-700 capitalize">kuota Penumpang</label>
                <input type="number" id="kuota" name="kuota" v-model="FormInputData.kuota" required
                    class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
            </div>
            <div class="flex justify-end">
                <button type="submit"
                    class="py-2 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none">Save</button>
            </div>
        </form>
    </div>
</template>