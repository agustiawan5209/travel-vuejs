<template>
    <div class="flex items-center justify-center min-h-[80vh] bg-gradient-to-r from-purple-400 via-purple-500 to-purple-600">
        <div class="bg-white p-8 rounded-lg shadow-md w-80">
            <h2 class="text-2xl font-bold mb-6 text-center">Login</h2>
            <form @submit.prevent="handleLogin">
                <div class="mb-4">
                    <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
                    <input type="email" id="email" v-model="email" required class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                </div>
                <div class="mb-6">
                    <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
                    <input type="password" id="password" v-model="password" required class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                </div>
                <button type="submit" class="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Login</button>
            </form>
            <div class="mt-4 text-center">
                <p class="text-sm">
                    Don't have an account?
                    <router-link to="/register" class="text-indigo-600 hover:text-indigo-500">Register</router-link>
                </p>
            </div>
        </div>
    </div>

</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            email: '',
            password: ''
        };
    },
    methods: {
        async handleLogin() {
            try {
                // const response = await axios.post('https://your-api-endpoint.com/login', {
                //     email: this.email,
                //     password: this.password
                // });
                // const token = response.data.token;
                // // Save the token to localStorage or Vuex store
                // localStorage.setItem('token', token);
                // Redirect to another page or perform other actions
                this.$router.push('/admin/dashboard');
            } catch (error) {
                console.error('Login failed:', error);
                // Handle error, show notification, etc.
            }
        }
    }
};
</script>


<style scoped>
/* No additional styles needed as Tailwind CSS is used */
</style>
