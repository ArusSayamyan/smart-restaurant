import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import BaseWrapper from "@/base/BaseWrapper.vue";

const app = createApp(App);

app.component('base-wrapper', BaseWrapper)
app.use(router)
app.mount('#app')
