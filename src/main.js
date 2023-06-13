import { createApp } from 'vue'
import App from './App.vue'
import BaseWrapper from "@/base/BaseWrapper.vue";

const app = createApp(App);

app.component('base-wrapper', BaseWrapper)
app.mount('#app')
