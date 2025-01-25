<script setup>
import CardTravel from '../components/CardTravel.vue';

const travelSchedules = [
    {
        id: 1,
        image: '/public/image/andi-hasbi-jaya-AouNcNtdDLc-unsplash.jpg',
        title: 'Destination 1',
        price: '$1000',
        quota: 50,
        description: 'Enjoy a wonderful trip to Destination 1 with beautiful scenery and amazing experiences.'
    },
    {
        id: 2,
        image: '/public/image/datingjungle-s7ky-xBtrNY-unsplash.jpg',
        title: 'Destination 2',
        price: '$1500',
        quota: 30,
        description: 'Discover the beauty of Destination 2 with our exclusive travel package.'
    },
    {
        id: 3,
        image: '/public/image/pat-whelen-8nxYytwnNBU-unsplash.jpg',
        title: 'Destination 3',
        price: '$2000',
        quota: 40,
        description: 'Experience the adventure of a lifetime at Destination 3 with our premium travel package.'
    }
];
</script>

<template>
    <section id="header" class=" container mx-auto py-4 px-5">
        <div
            class=" bg-gradient-to-r from-purple-400 via-purple-500 to-purple-600 flex flex-col items-center justify-center min-h-[60vh] text-white">
            <div class="flex flex-col md:flex-row items-center justify-between w-full px-4 md:px-10">
                <div class="md:w-1/2 p-4">
                    <h1 class="text-4xl font-bold mb-4">Welcome to Our Travel Site</h1>
                    <p class="text-lg">
                        Discover amazing places around the world with us. We offer the best travel packages and
                        experiences to
                        make your journey unforgettable.
                    </p>
                    <div class="flex justify-between w-full mt-8">
                        <button
                            class="px-6 py-2 bg-white text-purple-600 font-semibold rounded-lg hover:bg-purple-600 hover:text-white">Get
                            Started</button>
                        <button
                            class="px-6 py-2 bg-white text-purple-600 font-semibold rounded-lg hover:bg-purple-600 hover:text-white">Learn
                            More</button>
                    </div>
                </div>
                <div class="md:w-1/2 p-4 relative">
                    <img :src="'/public/image/—Pngtree—cruise ship ocean liner_14612961.png'" alt="Travel Image"
                        class="w-0 sm:w-full h-auto rounded-lg absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                </div>
            </div>
        </div>
    </section>

    <!-- Card product travel Schedul -->
    <section id="travel-schedule" class="container mx-auto py-8 px-5">
        <h2 class="text-3xl font-bold mb-6 text-center">Travel Schedules</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <CardTravel v-for="schedule in travelSchedules" :key="schedule.id" :image="schedule.image"
                :title="schedule.title" :price="schedule.price" :quota="schedule.quota"
                :description="schedule.description" />
        </div>
    </section>
</template>
