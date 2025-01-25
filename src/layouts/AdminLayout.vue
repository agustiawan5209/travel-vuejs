<script setup>
import { ref, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const router = useRouter();
// Fungsi Untuk menghandle ketika tombol sidebar di klik
const isSidebarVisible = ref(false);

function toggleSidebar() {
  isSidebarVisible.value = !isSidebarVisible.value;
}

// Fungsi untuk mengecek apakah layar besar atau tidak
const isLargeScreen = computed(() => window.innerWidth >= 768);

window.addEventListener('resize', () => {
  isSidebarVisible.value = window.innerWidth >= 768;
});

// fungsi untuk logout
function logout() {
  router.push('/');
}

</script>

<template>
  <div class="min-h-screen flex flex-col">
    <!-- Header -->
    <header class="bg-gray-800 text-white p-4 flex justify-between items-center">
      <h1 class="text-2xl font-bold">Admin Dashboard</h1>
      <button class="bg-primary px-4 py-2 rounded" @click="logout">Logout</button>
      <button class="md:hidden bg-primary px-4 py-2 rounded" @click="toggleSidebar">Menu</button>
    </header>

    <!-- Main Content -->
    <div class="flex flex-1">
      <!-- Sidebar -->
      <transition name="slide-left">
        <aside v-show="isSidebarVisible || isLargeScreen" class="bg-primary text-white w-64 p-6 md:block">
          <nav>
            <ul>
              <li class="mb-4">
                <a href="#"
                  class="block py-2 px-4 text-base md:text-lg rounded hover:bg-gray-700 hover:text-gray-300 transition duration-300">Dashboard</a>
              </li>
              <li class="mb-4">
                <a href="#"
                  class="block py-2 px-4 text-base md:text-lg rounded hover:bg-gray-700 hover:text-gray-300 transition duration-300">Users</a>
              </li>
              <li class="mb-4">
                <a href="#"
                  class="block py-2 px-4 text-base md:text-lg rounded hover:bg-gray-700 hover:text-gray-300 transition duration-300">Settings</a>
              </li>
            </ul>
          </nav>
        </aside>
      </transition>

      <!-- Tambahkan transition -->
      <router-view v-slot="{ Component }">
        <transition name="fade">
          <component :is="Component" />
        </transition>
      </router-view>
    </div>
  </div>
</template>

<style>
/* Efek transisi fade */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Efek transisi slide-left */
.slide-left-enter-active,
.slide-left-leave-active {
  transition: transform 0.3s ease;
}

.slide-left-enter-from,
.slide-left-leave-to {
  transform: translateX(-100%);
}

/* Loader styling */
.loader {
  border: 8px solid #f3f3f3;
  border-top: 8px solid #3498db;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>