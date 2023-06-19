import { createApp,defineAsyncComponent } from 'vue'
import App from './App.vue'
import router from './router'
import BaseWrapper from "@/base/BaseWrapper.vue";
import OrderList from "@/components/OrderList.vue";
import PrimeVue from 'primevue/config';
import "primevue/resources/themes/lara-light-indigo/theme.css";
import "primevue/resources/primevue.min.css";

const SaveOrderModal = defineAsyncComponent(() =>
    import('@/components/SaveOrderModal.vue')
)

const app = createApp(App);

app.component('base-wrapper', BaseWrapper)
app.component('order-list', OrderList)
app.component('save-order', SaveOrderModal)
app.use(router)
app.use(PrimeVue)
app.mount('#app')
