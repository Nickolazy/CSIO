import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './plugins/router'
import App from './App.vue'

import './css/normalize.css'
import './css/general.css'
import './css/main.css'
import './css/form.css'

import './css/media/media-general.css'
import './css/media/media-header.css'

import './css/media/media-banner.css'
import './css/media/media-about-us.css'

import './css/media/media-courses.css'
import './css/media/media-teachers.css'
import './css/media/media-news.css'
import './css/media/media-leave-request.css'
import './css/media/media-footer.css'

import './css/popup-windows/popup-windows-all.css'
import './css/popup-windows/radio-select-elements.css'

import './css/popup-windows/courses-search-input.css'
import './css/popup-windows/courses-drop-sidebar.css'
import './css/popup-windows/courses-drop-sidebar-click.css'

import "./css/popup-windows/webinars-seminars-drop-sidebar.css"
import './css/popup-windows/timetable-sidebar.css'
import './css/popup-windows/info-table-sidebar.css'
import './css/popup-windows/webinar-drop-sidebar.css'

import './css/popup-windows/teacher-drop-sidebar.css'

import './css/popup-windows/news-events-drop-sidebar.css'

import './css/popup-windows/media/media-all.css'
import './css/popup-windows/media/media-courses-drop-sidebar-click.css'
import './css/popup-windows/media/media-courses-drop-sidebar.css'
import './css/popup-windows/media/media-news-events-drop-sidebar.css'
import './css/popup-windows/media/media-teacher-drop-sidebar.css'
import './css/popup-windows/media/media-webinar-drop-sidebar.css'
import './css/popup-windows/media/media-webinars-seminars-drop-sidebar.css'

const pinia = createPinia();

const app = createApp(App)
app.use(pinia)
app.use(router)
app.mount('#app')
