import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './plugins/router'
import App from './App.vue'

import './css/general.css'
import './css/normalize.css'

import './css/main.css'
import './css/header-media.css'

const pinia = createPinia();

const app = createApp(App)
app.use(pinia)
app.use(router)
app.mount('#app')
