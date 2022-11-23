import { createApp } from 'vue'
import App from './App.vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import '/src/style/style.scss'

const app = createApp(App)

app
    .use(VueAxios, axios)
    .mount('#app')
