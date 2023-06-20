import { createApp,defineAsyncComponent } from 'vue'
import App from './App.vue'
import { createStore } from 'vuex'
import router from './router'
import BaseWrapper from "@/base/BaseWrapper.vue";
import OrderList from "@/components/OrderList.vue";
import PrimeVue from 'primevue/config';
import "primevue/resources/themes/lara-light-indigo/theme.css";
import "primevue/resources/primevue.min.css";


//MODAL COMPO
const SaveOrderModal = defineAsyncComponent(() =>
    import('@/components/SaveOrderModal.vue')
)


//store
const store = createStore({
    state() {
        return {
            selectedProducts: [],
        }
    },
    mutations: {
        updateSelectedProducts(state, payload) {
            state.selectedProducts.push(payload)
        },

    },
    getters: {
        getSelectedProducts(state) {
            return state.selectedProducts
        },
    },
})

const app = createApp(App);

app.component('base-wrapper', BaseWrapper)
app.component('order-list', OrderList)
app.component('save-order', SaveOrderModal)
app.use(router)
app.use(PrimeVue)
app.use(store)
app.mount('#app')
