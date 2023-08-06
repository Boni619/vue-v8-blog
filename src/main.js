import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import VueAwesomePaginate from "vue-awesome-paginate"
import "vue-awesome-paginate/dist/style.css"

// Vuetify
import { registerPlugins } from '@/plugins'

const app = createApp(App);
app.use(router)
registerPlugins(app)
app.mount('#app')
