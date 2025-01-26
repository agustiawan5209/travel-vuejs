<script setup>
import { ref, defineEmits, defineProps, watch } from 'vue';
import axios from '../../../axios';

// Emit event untuk menutup modal
const emit = defineEmits(['close']);

// Props untuk menerima data destinasi
const props = defineProps({
    destinasi: {
        type: Object,
        default: () => ({
            id: '',
            image: '',
            nama: '',
            deskripsi: '',
        }),
        required: true,
    },
});

// State untuk pesan error
const message = ref('');

// State untuk data form
const FormUbahData = ref({
    image: '',
    nama: props.destinasi.nama,
    deskripsi: props.destinasi.deskripsi,
});

// Watch untuk memastikan props berubah langsung ke FormUbahData
watch(
    () => props.destinasi,
    (newDestinasi) => {
        FormUbahData.value.nama = newDestinasi.nama;
        FormUbahData.value.deskripsi = newDestinasi.deskripsi;
    },
    { immediate: true }
);

// Fungsi untuk menangani perubahan file
const handleFileChange = (e) => {
    FormUbahData.value.image = e.target.files[0];
};

// Fungsi untuk submit data
const submitUbahData = async () => {
    await axios.get('/sanctum/csrf-cookie'); // Pastikan Sanctum cookie ter-set
    try {
        // Buat FormData untuk mengirim data termasuk file
        const formData = new FormData();
        formData.append('image', FormUbahData.value.image || '');
        formData.append('nama', FormUbahData.value.nama);
        formData.append('deskripsi', FormUbahData.value.deskripsi);

        // Kirim permintaan ke API
        const response = await axios.put(`/api/destinasi/${props.destinasi.id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        console.log('Response:', response.data);
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
        <h2 class="text-lg font-semibold mb-4">Ubah Data</h2>
        <form @submit.prevent="submitUbahData">
            <div v-if="message" class="mt-4 text-red-600">{{ message }}</div>
            <div class="mb-4">
                <input type="file" accept="image/*" @change="handleFileChange"
                    class="block w-full mb-4 border border-gray-400 p-3" />
            </div>
            <div class="mb-4">
                <label for="nama" class="block text-sm font-medium text-gray-700">Nama</label>
                <input type="text" id="nama" name="nama" v-model="FormUbahData.nama" required
                    class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
            </div>
            <div class="mb-4">
                <label for="deskripsi" class="block text-sm font-medium text-gray-700">Deskripsi</label>
                <textarea id="deskripsi" name="deskripsi" rows="3" v-model="FormUbahData.deskripsi"
                    class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"></textarea>
            </div>
            <div class="flex justify-end">
                <button type="submit"
                    class="py-2 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none">Save</button>
            </div>
        </form>
    </div>
</template>