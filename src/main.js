import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import BaseWrapper from "@/base/BaseWrapper.vue";
import PrimeVue from 'primevue/config';
import "primevue/resources/themes/lara-light-indigo/theme.css";
import "primevue/resources/primevue.min.css";

const app = createApp(App);

app.component('base-wrapper', BaseWrapper)
app.use(router)
app.use(PrimeVue)
app.mount('#app')
