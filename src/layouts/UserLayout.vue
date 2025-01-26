<script setup>
import axios from '../axios';
import { isLoading } from '../router';
import Navbar from './Navbar.vue';
import { ref, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const userData = computed(() => {
    return JSON.parse(localStorage.getItem('user'));
});

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
const logout = async () => {
    try {
        await axios.post('/api/logout');
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        router.push('/');
    } catch (error) {
        console.error("Error during logout:", error);

    }
}
</script>
<template>
    <Navbar />
    <div class="container mx-auto">
        <div class="min-h-screen max-w-full py-4 md:py-10  flex flex-col">
            <!-- Main Content -->
            <div class="flex flex-1 shadow-2xl">
                <!-- Sidebar -->

                <main class="flex-1 bg-gray-100 p-6">
                    <button
                        class="block py-2 px-4 text-base md:text-lg rounded bg-primary text-white hover:bg-gray-700 hover:text-gray-300 transition duration-300"
                        @click="logout">Logout</button>
                    <nav aria-label="breadcrumb" class="mb-4">
                        <ol class="flex items-center whitespace-nowrap">
                            <li v-for="(crumb, index) in breadcrumbs" :key="index" class="inline-flex items-center">
                                <!-- Tampilkan sebagai link jika bukan breadcrumb terakhir -->
                                <router-link v-if="index < breadcrumbs.length - 1" :to="crumb.path"
                                    class="flex items-center text-sm text-gray-500 hover:text-blue-600 focus:outline-none focus:text-blue-600">
                                    {{ crumb.breadcrumb }}
                                </router-link>
                                <!-- Breadcrumb terakhir tidak menjadi link -->
                                <span v-else
                                    class="inline-flex items-center text-sm font-semibold text-gray-800 truncate">
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
    </div>
    <!-- Footer -->
    <footer class=" divide-y bg-white border-t shadow-2xl">

        <div class="py-6 text-center bg-primary text-white text-base">Travel Vue.js ©2025. All rights reserved.</div>
    </footer>
</template>