<template>
    <div>
      <!-- Tombol Cetak PDF -->
      <button @click="printInvoice" class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
        Cetak Invoice ke PDF
      </button>
  
      <!-- Container Invoice -->
      <div id="invoice" class="p-6 bg-white border border-gray-300 rounded-md mt-4">
        <h1 class="text-2xl font-bold text-center">Invoice</h1>
        <p class="text-center text-gray-500">Nomor Invoice: {{ invoice.number }}</p>
        <p class="text-center text-gray-500">Tanggal: {{ invoice.date }}</p>
  
        <div class="mt-6">
          <h2 class="text-lg font-semibold">Informasi Pelanggan:</h2>
          <p>Nama: {{ userData.name }}</p>
          <p>Email: {{ userData.email }}</p>
        </div>
  
        <div class="mt-6">
          <h2 class="text-lg font-semibold">Detail Produk:</h2>
          <table class="w-full border-collapse border border-gray-300 text-left mt-2">
            <thead>
              <tr>
                <th class="border border-gray-300 px-2 py-1">Produk</th>
                <th class="border border-gray-300 px-2 py-1">Harga</th>
                <th class="border border-gray-300 px-2 py-1">Kuantitas</th>
                <th class="border border-gray-300 px-2 py-1">Subtotal</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="border border-gray-300 px-2 py-1">{{ invoice.items.destinasi }}</td>
                <td class="border border-gray-300 px-2 py-1">{{ formatCurrency(invoice.items.harga_tiket) }}</td>
                <td class="border border-gray-300 px-2 py-1">1</td>
                <td class="border border-gray-300 px-2 py-1">{{ formatCurrency(invoice.items.harga_tiket) }}</td>
              </tr>
            </tbody>
          </table>
        </div>
  
        <div class="mt-6 text-right">
          <h2 class="text-lg font-semibold">Total:</h2>
          <p class="text-2xl font-bold text-blue-600">
            {{ formatCurrency(invoice.total) }}
          </p>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, defineProps, onMounted, computed } from "vue";
  import axios from "../axios";
  import { useRoute } from "vue-router";
  
  const invoice = ref({
    number: "",
    date: "",
    items: [],
    total: 0,
  });
  
  const route = useRoute();
  
  const getInvoice = async () => {
    try {
      const response = await axios.get(`/api/booking/${route.params.id}`);
      const item = response.data.data;
      invoice.value.date = item.tanggal;
      invoice.value.number = `INV-00${item.id}`;
      invoice.value.items = item.jadwal;
      invoice.value.total = item.payment.total_bayar;
    } catch (error) {
      console.log(error);
    }
  };
  
  const userData = computed(() => {
    return JSON.parse(localStorage.getItem("user"));
  });
  
  onMounted(() => {
    getInvoice();
  });
  
  // Fungsi untuk memformat angka menjadi format mata uang
  const formatCurrency = (value) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(value);
  };
  
  // Fungsi untuk mencetak invoice
  const printInvoice = () => {
    // Clone elemen invoice
    const invoiceElement = document.getElementById("invoice").cloneNode(true);
  
    // Buat jendela baru untuk mencetak
    const printWindow = window.open("", "_blank", "width=800,height=600");
  
    if (printWindow) {
      // Tambahkan elemen invoice ke dalam jendela baru
      printWindow.document.write(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Cetak Invoice</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 0; padding: 20px; }
            #invoice { max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ccc; border-radius: 8px; }
            table { width: 100%; border-collapse: collapse; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
            th { background-color: #f4f4f4; }
          </style>
        </head>
        <body>
          ${invoiceElement.outerHTML}
        </body>
        </html>
      `);
  
      // Cetak halaman dan tutup jendela setelahnya
      printWindow.document.close();
      printWindow.focus();
      printWindow.print();
      printWindow.close();
    }
  };
  </script>
  
  <style scoped>
  #invoice {
    max-width: 600px;
    margin: auto;
  }
  </style>
  