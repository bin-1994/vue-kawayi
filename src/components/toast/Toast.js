import Toast from './Toast.vue'

const plugin = {}
plugin.install = Vue => {
    if (typeof window !== 'undefined') {
        const constructor = Vue.extend(Toast)
        const element = new constructor()
        element.$mount(document.createElement('div'))
        document.body.appendChild(element.$el)
        Vue.prototype.$toast = (message, duration = 1500) => {
            element.message = message
            element.visible = true
            setTimeout(() => {
                element.visible = false
            }, duration)
        }
    }
    
}

export default plugin