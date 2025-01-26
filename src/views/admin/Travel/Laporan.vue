<script setup>
import { ref, onMounted } from 'vue';
import axios from '../../../axios';
import Modal from '../../../components/Modal.vue';
import FlashMessage from '../../../components/FlashMessage.vue';
import FormTravel from './Form.vue';
import EditTravel from './Edit.vue';
const isLoading = ref(false);
if (isLoading.value) {
  setTimeout(() => {
    isLoading.value = false;
  }, 3000);
}

const jadwalTravel = ref([]);
const requestMessage = ref('')
const itemID = ref('');


// fungsi untuk menampilkan data
const displayJadwalTravel = async () => {
  try {
    const response = await axios.get('/api/travel');
    jadwalTravel.value = response.data.data;
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


</script>

<template>
  
  <div class="max-w-7xl bg-white rounded-sm px-2 md:px-6 py-1.5 md:py-10">
    <div class="flex flex-col">
      <div class="-m-1.5 overflow-x-auto">
        
        <FlashMessage :message="requestMessage" v-if="requestMessage" />

        <!-- Tampilkan Semua item -->
        <div class="p-1.5 min-w-full inline-block align-middle">
          <div class="overflow-hidden">
            <table class="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th scope="col" class="text-center px-6 py-3 text-xs font-medium text-gray-500 uppercase">No. </th>
                  <th scope="col" class="text-center px-6 py-3 text-xs font-medium text-gray-500 uppercase">Destinasi</th>
                  <th scope="col" class="text-center px-6 py-3 text-xs font-medium text-gray-500 uppercase">Tanggal</th>
                  <th scope="col" class="text-center px-6 py-3 text-xs font-medium text-gray-500 uppercase">Jam</th>
                  <th scope="col" class="text-center px-6 py-3 text-xs font-medium text-gray-500 uppercase">Harga Tiket</th>
                  <th scope="col" class="text-center px-6 py-3 text-xs font-medium text-gray-500 uppercase">Jumlah Penumpang</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200">
                <tr v-for="(item, index) in jadwalTravel" :key="index" class="hover:bg-gray-100">
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-center font-medium text-gray-800">{{ index + 1 }}</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-800">{{ item.destinasi }}</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-800">{{ item.tanggal }}</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-800">{{ item.waktu }}</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-800">{{ item.harga_tiket }}</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-800">{{ item.booking.length }}</td>
                  
                
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>