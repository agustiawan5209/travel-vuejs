<script setup>
import { isLoading } from '../router';
import { computed } from 'vue';

const userData = computed(() => {
    return JSON.parse(localStorage.getItem('user'));
});
const isLoggedIn = computed(() => {
    return localStorage.getItem('user') ? true : false;
});

</script>

<template>

    <!-- Navbar -->
    <nav class="bg-white border-b border-gray-400 z-[9999] ">
        <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
            <a href="https://flowbite.com/" class="flex items-center space-x-3 rtl:space-x-reverse">
                <img src="/public/image/pngwing.com.png" class="h-8" alt="Flowbite Logo" />
                <span class="self-center text-xs md:text-2xl font-semibold md:whitespace-nowrap">Travel Vue.Js </span>
            </a>
            <button data-collapse-toggle="navbar-default" type="button"
                class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 "
                aria-controls="navbar-default" aria-expanded="false">
                <span class="sr-only">Open main menu</span>
                <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                    viewBox="0 0 17 14">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M1 1h15M1 7h15M1 13h15" />
                </svg>
            </button>
            <div class="hidden w-full md:block md:w-auto" id="navbar-default">
                <ul
                    class="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white">
                    <li>
                        <router-link to="/"
                            class="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-purple-700 md:p-2"
                            exact exact-active-class="text-white bg-purple-700">
                            Home
                        </router-link>
                    </li>
                    <li>
                        <router-link to="/about"
                            class="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-purple-700 md:p-2"
                            exact-active-class="text-white bg-purple-700">
                            About
                        </router-link>
                    </li>
                    <li v-if="isLoggedIn">
                        <router-link :to="{name: 'user.dashboard', params: { id: userData.id }}"
                            class="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-purple-700 md:p-2"
                            exact-active-class="text-white bg-purple-700">
                            Dashboard
                        </router-link>
                    </li>
                    <li v-else>
                        <router-link to="/login"
                            class="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-purple-700 md:p-2"
                            exact-active-class="text-white bg-purple-700">
                            Login
                        </router-link>
                    </li>
                    
                </ul>

            </div>
        </div>
    </nav>

</template>