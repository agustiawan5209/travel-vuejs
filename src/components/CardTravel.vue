<template>
    <div class="bg-white rounded-lg shadow-lg overflow-hidden">
        <div class="p-6 flex items-center justify-between">
            <div class="block">
                <h3 class="text-xl font-semibold mb-2">{{ destinasi }}</h3>
                <p class="text-gray-600 mb-4">Harga Tiket: {{ formatRupiah(harga_tiket) }}</p>
                <p class="text-gray-600 mb-4">Jumlah Kuota: {{ kuota }}</p>
                <p class="text-gray-600 mb-4">Tanggal/Waktu: {{ tanggal }} / {{waktu}}</p>
            </div>
            <button class="px-6 py-2 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700">Pesan Sekarang</button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'CardTravel',
    props: {
        destinasi: {
            type: String,
            required: true
        },
        harga_tiket: {
            type: String,
            required: true
        },
        kuota: {
            type: Number,
            required: true
        },
        tanggal:{
            type: String,
            required :true,
        },
        waktu:{
            type: String,
            required :true,
        }
    },
    methods: {
        formatRupiah(number) {
            return new Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR",
            }).format(number);
        }
    }
}
</script>