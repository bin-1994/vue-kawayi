import { fetch } from '../../utils/axios'

const state = () => ({
    followList: [],
    timeline: [],
    rankList: [],
    bannerList: [],
    onlineList: [],
    dynamicList: [],
})

const getters = {
    TIMELINE: state => state.timeline
}

const actions = {
    async FETCH_BANNER (ctx) {
        try {
            const res = await fetch(`/banner`)
            if (0 === res.code) {
                ctx.commit('SET_BANNER', res.result.list)
            }
        } catch(error) {
            console.log("请求banner错误")
        }
    },
    FETCH_FOLLOW (ctx, cookie) {
        // if (ctx.rootState.userInfo) {
            return fetch(`/bangumi/follow`, {page: 1, size: 7}, cookie).then(res => {
                if (0 === res.code) {
                    ctx.commit('SET_FOLLOW', res.result.list)
                }
            })
        // }
    },
    async FETCH_TIMELINE (ctx) {
        const res = await fetch(`/bangumi/list`, {is_new: 1, order: 1, area: 1, category: 1})
        ctx.commit('SET_TIMELIMT', res.result.list)
    },
    async FETCH_ONLINE (ctx) {
        const res = await fetch(`/bangumi/list`, {order: 0, sort: 0})
        ctx.commit('SET_ONLINE', res.result.list)
    },
    async FETCH_RANK (ctx, params) {
        const res = await fetch(`/rank`, {page: 0, size: params.top})
        ctx.commit('SET_RANK', res.result.list)
    },
    async FETCH_DYNAMIC (ctx) {
        try {
            const res = await fetch(`/bangumi/list`, {page: 1, size: 10, state: 2, area: 1, order: 1})
            ctx.commit('SET_DYNAMIC', res.result.list)
        } catch(error) {

        }
        
    },
}

const mutations = {
    SET_BANNER (state, list) {
        state.bannerList = list
    },
    SET_TIMELIMT (state, list) {
        state.timeline = list
    },
    SET_ONLINE (state, list) {
        state.onlineList = list
    },
    SET_FOLLOW (state, list) {
        state.followList = list
    },
    SET_RANK (state, list) {
        state.rankList = list
    },
    SET_DYNAMIC (state, list) {
        state.dynamicList = list
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}