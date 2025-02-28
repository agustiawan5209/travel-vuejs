import {
    createRouter,
    createWebHistory
} from "vue-router";
import {
    ref
} from "vue";
// State loading global
export const isLoading = ref(false);

// Layout
import AdminLayout from "../layouts/AdminLayout.vue";
import MainLayout from "../layouts/MainLayout.vue";
import UserLayout from "../layouts/UserLayout.vue";

// Komponen
import About from "../views/About.vue";
import Home from "../views/Home.vue";
import Login from "../auth/Login.vue";
import Register from "../auth/Register.vue";


// Komponen Admin
import DashboardAdmin from "../views/admin/Dashboard.vue";
import JadwalTravelIndex from "../views/admin/Travel/Index.vue";
import JadwalLaporanTravel from "../views/admin/Travel/Laporan.vue";

// Komponen User
import UserDashboard from "../views/users/Dashboard.vue";
import Checkout from "../views/users/Checkout.vue";
import Invoice from "../components/Invoice.vue";

const routes = [

    // Guest
    {
        path: '/',
        component: MainLayout,
        children: [
            // AUTH
            {
                path: '',
                name: 'home',
                component: Home,
                meta: {
                    breadcrumb: 'Home',
                }
            },
            {
                path: '/login',
                name: 'login',
                component: Login,
                meta: {
                    breadcrumb: 'Login',
                }
            },

            {
                path: '/register',
                name: 'register',
                component: Register,
                meta: {
                    breadcrumb: 'Register',
                }
            },
            {
                path: '/about',
                name: 'about',
                component: About,
                meta: {
                    breadcrumb: 'About',
                }
            },

            {
                path: '/checkout/:id/:travel',
                name: 'checkout',
                beforeEnter: (to, from, next) => {
                    const isLoggedIn = !!localStorage.getItem('user');
                    if (isLoggedIn) {
                        next(); // Allow to enter route
                    } else {
                        next('/login'); // Go to '/login';
                    }
                },
                component: Checkout
            },
        ],
        
    },
    {
        path: '/invoice/:id',
        name: 'user.invoice',
        component: Invoice,
    },

    // USER
    {
        path: '/user/:id',
        component: UserLayout,
        beforeEnter: (to, from, next) => {
            const isLoggedIn = !!localStorage.getItem('user');
            if (isLoggedIn) {
                const user = JSON.parse(localStorage.getItem('user'));
                if(user.role == 'penumpang') {
                    next(); // Allow to enter route
                }else {
                    localStorage.removeItem('user');
                    localStorage.removeItem('token');
                    next('/login'); // Go to '/login';
                }
            } else {
                next('/login'); // Go to '/login';
            }
        },
        children: [
            {
                path: 'dashboard',
                name: 'user.dashboard',
                component: UserDashboard,
            },
           

        ],
    },


    // Admin
    {
        path: '/admin',
        component: AdminLayout,
        beforeEnter: (to, from, next) => {
            const isLoggedIn = !!localStorage.getItem('user');
            if (isLoggedIn) {
                const user = JSON.parse(localStorage.getItem('user'));
                if(user.role == 'admin') {
                    next(); // Allow to enter route
                }else {
                    localStorage.removeItem('user');
                    localStorage.removeItem('token');
                    next('/login'); // Go to '/login';
                }
            } else {
                next('/login'); // Go to '/login';
            }
        },
        meta: {
            breadcrumb: 'Admin',
        },
        children: [{
                path: 'dashboard',
                name: 'dashboard',
                component: DashboardAdmin,

                meta: {
                    breadcrumb: 'Dashboard',
                }
            },
            {
                path: 'travel',
                name: 'travel.index',
                component: JadwalTravelIndex,
                meta: {
                    breadcrumb: 'Jadwal travel',
                }
            },
            {
                path: 'travel/laporan',
                name: 'travel.laporan',
                component: JadwalLaporanTravel,
                meta: {
                    breadcrumb: 'Laporan Jadwal travel',
                }
            }
            // End Router Destinasi
        ]
    }

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