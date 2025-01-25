<template>
    <!-- Navbar -->
    <nav class="bg-white border-gray-200 ">
        <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
            <a href="https://flowbite.com/" class="flex items-center space-x-3 rtl:space-x-reverse">
                <img src="/public/image/pngwing.com.png" class="h-8" alt="Flowbite Logo" />
                <span class="self-center text-2xl font-semibold whitespace-nowrap">Travel Vue.Js</span>
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
                    class="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white ">
                    <li>
                        <a href="#"
                            class="block py-2 px-3 text-white bg-purple-700 rounded-sm md:bg-transparent md:text-purple-700 md:p-0 "
                            aria-current="page">Home</a>
                    </li>
                    <li>
                        <a href="#"
                            class="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-purple-700 md:p-0">About</a>
                    </li>
                    <li>
                        <a href="#"
                            class="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-purple-700 md:p-0">Services</a>
                    </li>
                    <li>
                        <a href="#"
                            class="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-purple-700 md:p-0">Pricing</a>
                    </li>
                    <li>
                        <a href="#"
                            class="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-purple-700 md:p-0">Contact</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>

    <!-- Content -->
    <main>
        <slot />
    </main>


    <!-- Footer -->
    <footer class=" divide-y bg-white border-t shadow-2xl">
        <div class="container flex flex-col justify-between py-10 mx-auto space-y-8 lg:flex-row lg:space-y-0">
            <div class="lg:w-1/3">
                <a rel="noopener noreferrer" href="#" class="flex justify-center space-x-3 lg:justify-start">
                    <!-- <ApplicationLogo class="w-10 object-cover"/> -->
                </a>
            </div>
            <div class="grid grid-cols-2 text-sm gap-x-3 gap-y-8 lg:w-2/3 sm:grid-cols-2">
                <div class="space-y-3">
                    <h3 class="tracking-wide uppercase font-semibold">Jadwal Pelayanan Puskesmas</h3>
                    <ul class="space-y-5">
                        <li>
                            <a rel="noopener noreferrer" href="#">Senin-Kamis : 07.30-15.00 WIB</a>
                        </li>
                        <li>
                            <a rel="noopener noreferrer" href="#">Jumat : 07.30-15.30 WIB</a>
                        </li>
                        <li>
                            <a rel="noopener noreferrer" href="#">Unit Pelayanan Bersalin 24 Jam</a>
                        </li>
                    </ul>
                </div>
                <div class="space-y-3">
                    <h3 class="uppercase">Hubungi Kami</h3>
                    <ul class="space-y-1">
                        <li class="flex gap-4">
                            <!-- <font-awesome-icon :icon="['fas', 'location-dot']"/> -->
                        </li>
                        <li class="flex gap-4">
                            <!-- <font-awesome-icon :icon="['fas', 'phone']"/> -->
                            <span>+62 85255814561</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="py-6 text-sm text-center bg-primary">UPT Puskesmas Karassing© {{ Year }}. All rights reserved.</div>
    </footer>
</template>