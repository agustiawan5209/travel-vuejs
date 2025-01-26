<script setup>
import { ref, onMounted } from 'vue';
import axios from '../../../axios';
import Modal from '../../../components/Modal.vue';
import FlashMessage from '../../../components/FlashMessage.vue';
import FormEdit from './Form.vue';


const isLoading = ref(false);
if (isLoading.value) {
  setTimeout(() => {
    isLoading.value = false;
  }, 3000);
}

const destinasi = ref([]);
const requestMessage = ref('')
const itemID = ref('');


// fungsi untuk menampilkan data
const displayDestinasi = async () => {
  try {
    const response = await axios.get('/api/destinasi');
    destinasi.value = response.data;
  } catch (error) {
    console.log(error.response?.data?.message || "Failed to load data");
  } finally {
    isLoading.value = false;
  }
};

// Menampilkan data ketika komponen dimount
onMounted(async () => {
  isLoading.value = true;
  displayDestinasi();
});

// Modal Tambah Data
const ModalShowData = ref(false);

const closeModalData = () => {
  ModalShowData.value = false;
};


// Handle File Change
const handleFileChange = (e) => {
  FormInputData.value.image = e.target.files[0];
}

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
    const response = await axios.delete(`/api/destinasi/${IdItem.value}`);
    displayDestinasi();
    closeModalDelete();
    requestMessage.value = response.data.message;
  } catch (error) {
    console.log(error.response?.data?.message || "Failed to delete data");
    console.log(error.response)
  }
};


// fungsi untuk mengedit data
const showEditModal = (item) => {
  FormInputData.value.deskripsi = item.deskripsi;
  FormInputData.value.nama = item.nama;
  ModalShowData.value = true;

  itemID.value = item.id;
};

const FormInputData = ref({
  image: '',
  nama: '',
  deskripsi: '',
});

// Fungsi  Simpan data
const submitData = async () => {
  const createFormInputData = () => {
    const formdata = new FormData();
    formdata.append('image', FormInputData.value.image);
    formdata.append('nama', FormInputData.value.nama);
    formdata.append('deskripsi', FormInputData.value.deskripsi);
    return formdata;
  };

  try {
    await axios.get('/sanctum/csrf-cookie');
    if (itemID.value) {

      const response = await axios.put(`/api/destinasi/${itemID.value}`, createFormInputData(), {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      requestMessage.value = response.data.message;
    } else {
      const response = await axios.post('/api/destinasi', createFormInputData(), {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      requestMessage.value = response.data.message;
    }
    displayDestinasi();

    closeModalData();
  } catch (error) {
    console.log(error)
    console.log(error.response?.data?.message || "Failed to save data");
  }
};

</script>

<template>

  <!-- end Edit Modal -->
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

  <!-- Modal untuk tambah data -->
  <Modal :show="ModalShowData" @close="closeModalData">
    <div class="bg-white p-8 rounded-lg shadow-md w-full">
      <h2 class="text-lg font-semibold mb-4">Tambah Data</h2>
      <form @submit.prevent="submitData">
        <!-- <div v-if="message" class="mt-4 text-green-600">{{ message }}</div> -->
        <div class="mb-4">
          <input type="file" accept="image/*" @change="handleFileChange"
            class="block w-full mb-4 border border-gray-400 p-3" />
        </div>
        <div class="mb-4">
          <label for="nama" class="block text-sm font-medium text-gray-700">Nama</label>
          <input type="text" id="nama" name="nama" v-model="FormInputData.nama" required
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
        </div>
        <div class="mb-4">
          <label for="deskripsi" class="block text-sm font-medium text-gray-700">Deskripsi</label>
          <textarea id="deskripsi" name="deskripsi" rows="3" v-model="FormInputData.deskripsi"
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"></textarea>
        </div>
        <div class="flex justify-end">
          <button type="button" @click="closeModalData"
            class="py-2 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-gray-600 hover:text-gray-800 focus:outline-none focus:text-gray-800 disabled:opacity-50 disabled:pointer-events-none">Cancel</button>
          <button type="submit"
            class="py-2 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none">Save</button>
        </div>
      </form>
    </div>
  </Modal>
  <div class="max-w-7xl bg-white rounded-sm px-2 md:px-6 py-1.5 md:py-10">
    <div class="flex flex-col">
      <div class="-m-1.5 overflow-x-auto">

        <FlashMessage :message="requestMessage" v-if="requestMessage" />

        <button @click="ModalShowData = true" type="button"
          class="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none">
          Tambah Data
        </button>
        <!-- Tampilkan Semua item -->
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
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                    <img :src="item.image" alt="image" class="w-10 h-10 rounded-full">
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{{ item.nama }}</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{{ item.deskripsi }}</td>
                  <td class="px-6 py-4 whitespace-nowrap text-end text-sm font-medium">
                    <div class="flex gap-4">
                      <button type="button" @click="showEditModal(item)"
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
</template>