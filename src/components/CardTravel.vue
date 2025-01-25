<template>
    <div class="bg-white rounded-lg shadow-lg overflow-hidden">
        <img :src="image" alt="Destination Image" class="w-full h-48 object-cover">
        <div class="p-6">
            <h3 class="text-xl font-semibold mb-2">{{ title }}</h3>
            <p class="text-gray-600 mb-4">Price: {{ price }}</p>
            <p class="text-gray-600 mb-4">Passenger Quota: {{ quota }}</p>
            <p class="text-gray-600 mb-4">Description: {{ description }}</p>
            <button class="px-6 py-2 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700">Book Now</button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'CardTravel',
    props: {
        image: {
            type: String,
            required: true
        },
        title: {
            type: String,
            required: true
        },
        price: {
            type: String,
            required: true
        },
        quota: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        }
    }
}
</script>