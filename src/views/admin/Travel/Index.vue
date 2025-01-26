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


// Modal Tambah Data
const ModalAddData = ref(false);
const ModalEditData = ref(false);
const EditItem = ref({});
const closeModalData = () => {
  ModalAddData.value = false;
  ModalEditData.value = false;
  displayJadwalTravel();
};

const showModalEdit = (item) => {
  ModalEditData.value = true;
  EditItem.value = item;
};
//


// variabel modal hapus data
const deleteModal = ref(false)
const IdItem = ref('')

const showDeleteModal = (id) => {
  IdItem.value = id
  deleteModal.value = true
}

const closeModalDelete = () => {
  deleteModal.value = false
}


// Fungsi Hapus Data
const deleteData = async () => {
  try {
    const response = await axios.delete(`/api/travel/${IdItem.value}`);
    displayJadwalTravel();
    closeModalDelete();
    requestMessage.value = response.data.message;
  } catch (error) {
    console.log(error.response?.data?.message || "Failed to delete data");
    console.log(error.response)
  }
};

</script>

<template>


<!-- Modal untuk tambah data -->
<Modal :show="ModalAddData" @close="closeModalData">
   <FormTravel @close="closeModalData" />
  </Modal>
<Modal :show="ModalEditData" @close="closeModalData">
   <EditTravel @close="closeModalData" :jadwal="EditItem" />
  </Modal>
  
  <div class="max-w-7xl bg-white rounded-sm px-2 md:px-6 py-1.5 md:py-10">
    <div class="flex flex-col">
      <div class="-m-1.5 overflow-x-auto">
        
        <FlashMessage :message="requestMessage" v-if="requestMessage" />

        <button @click="ModalAddData = true" type="button"
          class="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none">
          Tambah Data
        </button>
        <!-- Tampilkan Semua item -->
        <div class="p-1.5 min-w-full inline-block align-middle">
          <div class="overflow-hidden">
            <table class="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th scope="col" class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">No. </th>
                  <th scope="col" class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Destinasi</th>
                  <th scope="col" class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Tanggal</th>
                  <th scope="col" class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Jam</th>
                  <th scope="col" class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Harga Tiket</th>
                  <th scope="col" class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Kuota Penumpang</th>
                  <th scope="col" class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Aksi</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200">
                <tr v-for="(item, index) in jadwalTravel" :key="index" class="hover:bg-gray-100">
                  <td class="px-6 py-4 text-center whitespace-nowrap text-sm font-medium text-gray-800">{{ index + 1 }}</td>
                  <td class="px-6 py-4 text-center whitespace-nowrap text-sm text-gray-800">{{ item.destinasi }}</td>
                  <td class="px-6 py-4 text-center whitespace-nowrap text-sm text-gray-800">{{ item.tanggal }}</td>
                  <td class="px-6 py-4 text-center whitespace-nowrap text-sm text-gray-800">{{ item.waktu }}</td>
                  <td class="px-6 py-4 text-center whitespace-nowrap text-sm text-gray-800">{{ item.harga_tiket }}</td>
                  <td class="px-6 py-4 text-center whitespace-nowrap text-sm text-gray-800">{{ item.kuota }}</td>
                  <td class="px-6 py-4 text-center whitespace-nowrap text-sm text-gray-800">
                   <div class="flex gap-4">
                    <button type="button" @click="showModalEdit(item)"
                    class="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-green-600 hover:text-green-800 focus:outline-none focus:text-green-800 disabled:opacity-50 disabled:pointer-events-none">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                      stroke="currentColor" class="size-6">
                      <path stroke-linecap="round" stroke-linejoin="round"
                        d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                    </svg>

                  </button>
                  <button type="button" @click="showDeleteModal(item.id)"
                  class="inline-flex items-center gap-x-2 text-sm cursor-pointer font-semibold rounded-lg border border-transparent text-red-600 hover:text-red-800 focus:outline-none focus:text-red-800 disabled:opacity-50 disabled:pointer-events-none"><svg
                    xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="size-6">
                    <path stroke-linecap="round" stroke-linejoin="round"
                      d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                  </svg>
                </button>
                   </div>
                  </td>
                
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- modal untuk hapus data -->
  <Modal :show="deleteModal" @close="closeModalDelete">
    <div class="flex flex-col max-w-full gap-2 p-6 rounded-md shadow-md bg-gray-50 text-gray-800">
      <h2 class="flex items-center gap-2 text-xl font-semibold leading-tight tracking-wide">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"
          class="w-6 h-6 fill-current shrink-0 text-violet-600">
          <path
            d="M451.671,348.569,408,267.945V184c0-83.813-68.187-152-152-152S104,100.187,104,184v83.945L60.329,348.568A24,24,0,0,0,81.432,384h86.944c-.241,2.636-.376,5.3-.376,8a88,88,0,0,0,176,0c0-2.7-.135-5.364-.376-8h86.944a24,24,0,0,0,21.1-35.431ZM312,392a56,56,0,1,1-111.418-8H311.418A55.85,55.85,0,0,1,312,392ZM94.863,352,136,276.055V184a120,120,0,0,1,240,0v92.055L417.137,352Z">
          </path>
          <rect width="32" height="136" x="240" y="112"></rect>
          <rect width="32" height="32" x="240" y="280"></rect>
        </svg>
        <span>Apakah anda yakin ingin menghapus</span>
      </h2>
      <!-- <p class="flex-1 text-gray-600">Mauris et lorem at elit tristique dignissim et ullamcorper elit. In sed feugiat mi. Etiam ut lacinia dui.</p> -->
      <div class="flex flex-col justify-end gap-3 mt-6 sm:flex-row">
        <button class="px-6 py-2 rounded-sm shadow-sm bg-violet-600 text-gray-50 cursor-pointer" type="button"
          @click="deleteData()">Ya</button>
      </div>
    </div>
  </Modal>
</template>