<template>
    <div v-if="visible" class="flex justify-between items-center my-2 bg-primary text-sm text-white rounded-lg p-4" role="alert" tabindex="-1"
        aria-labelledby="hs-solid-color-success-label">
        <div class="">
            <span id="hs-solid-color-success-label" class="font-bold">Success</span> {{ message }}

        </div>
        <button @click="closeAlert"
            class="text-gray-50 hover:text-white">
            <span class="sr-only">Close</span>
            <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
        </button>
    </div>
</template>

<script>
export default {
    props: {
        message: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            visible: true
        };
    },
    methods: {
        closeAlert() {
            this.visible = false;
        }
    }
}
</script>