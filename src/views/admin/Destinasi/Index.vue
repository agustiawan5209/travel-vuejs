<script setup>
import { ref , onMounted} from 'vue';
import axios from '../../../axios';
const isLoading = ref(false);
if (isLoading.value) {
  setTimeout(() => {
    isLoading.value = false;
  }, 3000);
}

const destinasi = ref([]);

onMounted(async () => {
    isLoading.value = true;
    try {
        const response = await axios.get('/api/destinasi');
        destinasi.value = response.data;
    } catch (error) {
        console.log(error.response?.data?.message || "Failed to load data");
    } finally {
        isLoading.value = false;
    }
});

</script>
<template>

    <div class="max-w-7xl bg-white rounded-sm px-2 md:px-6 py-1.5 md:py-10">
        <div class="flex flex-col">
            <div class="-m-1.5 overflow-x-auto">
              <div class="p-1.5 min-w-full inline-block align-middle">
                <div class="overflow-hidden">
                  <table class="min-w-full divide-y divide-gray-200">
                    <thead>
                      <tr>
                        <th scope="col" class="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">No. </th>
                        <th scope="col" class="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Image</th>
                        <th scope="col" class="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Nama</th>
                        <th scope="col" class="px-6 py-3 text-end text-xs font-medium text-gray-500 uppercase">Deskripsi</th>
                        <th scope="col" class="px-6 py-3 text-end text-xs font-medium text-gray-500 uppercase">Aksi</th>
                      </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-200">
                      <tr v-for="(item, index) in destinasi" :key="index" class="hover:bg-gray-100">
                        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">{{ index + 1 }}</td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{{item.nama}}</td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{{ item.nama }}</td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{{ item.deskripsi }}</td>
                        <td class="px-6 py-4 whitespace-nowrap text-end text-sm font-medium">
                          <button type="button" class="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-800 focus:outline-none focus:text-blue-800 disabled:opacity-50 disabled:pointer-events-none">Delete</button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
    </div>
</template>