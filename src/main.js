import Vue from 'vue'
import App from './App.vue'
import Meta from 'vue-meta'
import Toast from './components/toast/Toast'
import VueLazyload from 'vue-lazyload'
import { createRouter } from './router'
import { createStore } from './store'
import { sync } from 'vuex-router-sync'

Vue.use(Meta)
Vue.use(Toast)
Vue.use(VueLazyload)

export function createApp () {
    const router = createRouter()
    const store = createStore()

    sync(store, router)

    const app = new Vue({
        router,
        store,
        render: h => h(App)
    })

    return {app, router, store}
}