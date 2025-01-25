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
const routes = [{
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