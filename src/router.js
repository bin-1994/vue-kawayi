import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import Layout from './views/Layout.vue'

export function createRouter () {
    return new Router({
        mode: 'history',
        routes: [
            {path: '/', component: Layout, children: [
                {path: '/', name: 'Home', component: () => import(/* webpackChunkName: "home" */ './views/home/Home.vue')},
                {path: '/bangumi/media/:id(md\\d+)', name: 'Media', component: () => import(/* webpackChunkName: "media" */ './views/bangumi/media/Media.vue')},
                {path: '/bangumi/play/:id', name: 'WebPlay', component: () => import(/* webpackChunkName: "webplay" */ './views/bangumi/webplay/WebPlay.vue')},
                {path: '/classify', name: 'Classify', component: () => import(/* webpackChunkName: "index" */ './views/movie/Index.vue')},
                {path: '/login', name: 'Login', component: () => import(/* webpackChunkName: "login" */ './views/passport/Login.vue')},
                {path: '/register', name: 'Register', component: () => import(/* webpackChunkName: "register" */ './views/passport/Register.vue')},
                {path: '/search', name: 'Search', component: () => import(/* webpackChunkName: "search" */ './views/search/Search.vue')},
                {path: '/ranking', name: 'Ranking', component: () => import(/* webpackChunkName: "ranking" */ './views/ranking/Rank.vue')},

                {path: '/member', name: 'Member', component: () => import(/* webpackChunkName: "member" */ './views/member/Home.vue')},
                {path: '/member/vip', name: 'Vip', component: () => import(/* webpackChunkName: "vip" */ './views/member/Vip.vue')},
                {path: '/member/bangumi', name: 'Bangumi', component: () => import(/* webpackChunkName: "bangumi" */ './views/member/Bangumi.vue')},
            ]}
        ]
    })
}