import {
    createRouter,
    createWebHistory
} from "vue-router";
import { ref } from "vue";
// State loading global
export const isLoading = ref(false);


// Komponen

import About from "../views/About.vue";
import Home from "../views/Home.vue";
import Login from "../auth/Login.vue";
import Register from "../auth/Register.vue";
const routes = [
    // AUTH

    {
        path: '/login',
        name: 'login',
        component: Login,
    },

    {
        path: '/register',
        name: 'register',
        component: Register,
    },
    
    // Guest
    {
        path: '/',
        name: 'home',
        component: Home,
    },
    {
        path: '/about',
        name: 'about',
        component: About,
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})


// Tambahkan loading state pada perubahan rute
router.beforeEach((to, from, next) => {
    isLoading.value = true;
    next();
  });
  
  router.afterEach(() => {
    isLoading.value = false;
  });
  
export default router;