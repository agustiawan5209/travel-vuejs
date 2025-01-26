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

// Fungsi untuk menampilkan breadcrumbs
const breadcrumbs = computed(() => {
  const route = useRoute();
  const matchedRoutes = route.matched;
  return matchedRoutes.map((route) => ({
    path: route.path,
    breadcrumb: route.meta.breadcrumb,
  }))
})

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
                <router-link :to="{ name: 'dashboard' }"
                  class="block py-2 px-4 text-base md:text-lg rounded hover:bg-gray-700 hover:text-gray-300 transition duration-300">Dashboard</router-link>
              </li>
              <li class="mb-4">
                <router-link :to="{ name: 'destinasi.index' }"
                  class="block py-2 px-4 text-base md:text-lg rounded hover:bg-gray-700 hover:text-gray-300 transition duration-300">Destinasi
                </router-link>
              </li>
              <li class="mb-4">
                <a href="#"
                  class="block py-2 px-4 text-base md:text-lg rounded hover:bg-gray-700 hover:text-gray-300 transition duration-300">Settings</a>
              </li>
            </ul>
          </nav>
        </aside>
      </transition>

      <main class="flex-1 bg-gray-100 p-6">
        <nav aria-label="breadcrumb" class="mb-4">
          <ol class="flex items-center whitespace-nowrap">
            <li v-for="(crumb, index) in breadcrumbs" :key="index" class="inline-flex items-center">
              <!-- Tampilkan sebagai link jika bukan breadcrumb terakhir -->
              <router-link v-if="index < breadcrumbs.length - 1" :to="crumb.path"
                class="flex items-center text-sm text-gray-500 hover:text-blue-600 focus:outline-none focus:text-blue-600">
                {{ crumb.breadcrumb }}
              </router-link>
              <!-- Breadcrumb terakhir tidak menjadi link -->
              <span v-else class="inline-flex items-center text-sm font-semibold text-gray-800 truncate">
                {{ crumb.breadcrumb }}
              </span>
              <!-- Separator kecuali untuk breadcrumb terakhir -->
              <span v-if="index < breadcrumbs.length - 1" class="mx-1">/</span>
            </li>
          </ol>
        </nav>


        <router-view v-slot="{ Component }">
          <!-- Tambahkan transition -->
          <transition name="fade">
            <component :is="Component" />
          </transition>
        </router-view>
      </main>
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