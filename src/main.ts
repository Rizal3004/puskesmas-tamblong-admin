import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import { VueQueryPlugin } from '@tanstack/vue-query'
import ToastPlugin from 'vue-toast-notification'
import App from './App.vue'
import router from './router'
// Import one of the available themes
// import 'vue-toast-notification/dist/theme-default.css';
import 'vue-toast-notification/dist/theme-bootstrap.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(VueQueryPlugin)
app.use(ToastPlugin)

app.mount('#app')
