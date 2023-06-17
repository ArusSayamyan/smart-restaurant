import { createRouter, createWebHistory } from 'vue-router'
import WaitersPage from "@/pages/WaitersPage.vue";
import ManagerPage from "@/pages/ManagerPage.vue";
import HomePage from "@/pages/HomePage.vue";
import CreateOrder from "@/pages/CreateOrder.vue";
import MainTables from "@/pages/MainTables.vue";

//components



const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            component: HomePage
        },
        {
            path: '/waiter',
            component: WaitersPage
        },
        {
            path: '/manager',
            component: ManagerPage
        },
        {
            path: '/createOrder',
            component: CreateOrder
        },
        {
            path: '/tables',
            component: MainTables
        },
    ]
})


export default router;