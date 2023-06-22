import { createRouter, createWebHistory } from 'vue-router'
import WaitersPage from "@/pages/WaitersPage.vue";
import ManagerPage from "@/pages/ManagerPage.vue";
import HomePage from "@/pages/HomePage.vue";
import CreateOrder from "@/pages/CreateOrder.vue";
import OrderDetails from "@/pages/OrderDetails.vue";

//components



const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            component: HomePage
        },
        {
            path: '/waiter/:id',
            component: WaitersPage,
        },
        {
            path: '/manager',
            component: ManagerPage
        },
        {
            path: '/waiter/:id/createOrder',
            component: CreateOrder
        },
        {
            path: '/order',
            component: OrderDetails
        },
    ]
})


export default router;