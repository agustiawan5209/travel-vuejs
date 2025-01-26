<script setup>
import { isLoading } from '../router';
import Navbar from './Navbar.vue';
import { computed } from 'vue';
const userData = computed(() => {
    return JSON.parse(localStorage.getItem('user'));
});

</script>
<template>
 <Navbar />

  <!-- Content -->
  <main>
    <!-- Tampilkan loading spinner -->
    <div v-if="isLoading" class="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-white z-50">
      <div class="loader"></div>
    </div>

    <!-- Tambahkan transition -->
    <router-view v-slot="{ Component }">
      <transition name="fade">
        <component :is="Component" />
      </transition>
    </router-view>
  </main>


  <!-- Footer -->
  <footer class=" divide-y bg-white border-t shadow-2xl">
    
    <div class="py-6 text-center bg-primary text-white text-base">Travel Vue.js ©2025. All rights reserved.</div>
  </footer>
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