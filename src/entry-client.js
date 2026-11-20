import Vue from 'vue'
import { createApp } from './main'

const { app, router, store } = createApp()

Vue.mixin({
    beforeRouteUpdate (to, from, next) {
        if (to.name == 'Classify') {
            return false
        }

        if (to.name == 'WebPlay') {
            let id = to.params.id.substring(2)
            store.commit('bangumi/SET_EP_INFO', id)
            return next()
        }
        const { asyncData } = this.$options
        if (asyncData) {
            asyncData({store: this.$store, route: to}).then(next).catch(next)
        } else {
            next()
        }
    }
})

if (window.__INITIAL_STATE__) {
    store.replaceState(window.__INITIAL_STATE__)
}

router.onReady(() => {
    router.beforeResolve((to, from, next) => {
        const matched = router.getMatchedComponents(to)
        const prevMatched = router.getMatchedComponents(from)

        let diffed = false
        const activated = matched.filter((c, i) => {
            return diffed || (diffed = (prevMatched[i] !== c))
        })

        if (!activated.length) {
            return next()
        }

        Promise.all(activated.map(c => {
            if (c.asyncData) {
                return c.asyncData({ store, route: to })
            }
        })).then(next).catch(next)
    })
    app.$mount('#app', true)
})


function getChromeVersion() {
    var arr = navigator.userAgent.split(' '); 
    var chromeVersion = '';
    for(var i=0;i < arr.length;i++){
        if(/chrome/i.test(arr[i]))
        chromeVersion = arr[i]
    }
    if(chromeVersion){
        return Number(chromeVersion.split('/')[1].split('.')[0]);
    } else {
        return false;
    }
}

if (process.env.NODE_ENV == 'production') {
    document.oncontextmenu = function() {
        return false
    }
    // if ("ActiveXObject" in window){
    //     document.body.innerHTML = '<div style="width: 100%; height: 30px; line-height: 30px; font-size: 24px; text-align: center;">为了保障你的账号安全和最佳预览体验，网站已不支持IE浏览器和部分古老浏览器的访问，建议您使用现代高级浏览器访问。</div>';
    // }
    if (getChromeVersion() < 86) {
        document.body.innerHTML = '<div style="width: 100%; height: 30px; line-height: 30px; font-size: 24px; text-align: center;">为了保障你的账号安全和最佳预览体验，网站已不支持低版本浏览器的访问，建议您使用Chrome高版本浏览器访问。</div>';
    }
    if (!document.domain.match(/[www|w|x|z].kawayi.[cc|one]/g)) {
        window.location.href = 'https://www.kawayi.cc'
    }
}

