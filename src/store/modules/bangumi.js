import { fetch } from '../../utils/axios'

export default {
    namespaced: true,
    state: () => ({
        mediaInfo: [],
        epIndex: 0,
        epInfo: [],
        seasonFollowed: false,
        reviewed: [],
        userState: {},
        simpleMode: false,
    }),
    getters: {
        MEDIA_INFO: state => state.mediaInfo,
        EP_INDEX: state => state.epIndex,
        EP_INFO: state => state.epInfo,
        MEDIA_FOLLOW: state => state.seasonFollowed,
        USER_SCORE: state => state.reviewed,
        USER_STATE: state => state.userState,
        SIMPLE_MODE: state => state.simpleMode
    },
    actions: {
        async FETCH_MEDIA_INFO(ctx, params) {
            let data = {}
            if (params.viewType == 'play') {
                data.ep_id = params.id
            } else {
                data.id = params.id
            }
            const res = await fetch(`/bangumi/media`, data, params.cookie)
            ctx.commit('SET_MEDIA_INFO', res.result)
            'play' == params.viewType && ctx.commit('SET_EP_INFO', params.id)
        },
        async FETCH_USER_STATE(ctx, params) {
            // let data = {}
            // return 'ep' === params.viewType ? data.ep_id = params.id : data.media_id = params.id,
            // fetch(`/user/state`, data, params.cookie).then(res => {
            //     if (0 === res.code) {
            //         ctx.commit('SET_FOLLOW_STATE', res.result.progress && res.result.progress.media_id ? true : false)
            //         ctx.commit('SET_REVIEW_STATE', res.result.review.review_id ? true : false)
            //         ctx.commit('SET_USER_STATE', res.result ||{})
            //     }
            // })
            const res = await fetch(`/user/state`, {id: params.id}, params.cookie)
            if (0 === res.code) {
                ctx.commit('SET_FOLLOW_STATE', res.result.progress && res.result.progress.media_id ? true : false)
                ctx.commit('SET_REVIEW_STATE', res.result.review.review_id ? true : false)
                ctx.commit('SET_USER_STATE', res.result ||{})
            }
        },
        // 改变订阅状态
        CHANGE_MEDIA_FOLLOW(ctx, follow_state) {
            ctx.commit('SET_FOLLOW_STATE', follow_state)
        },
        // 改变订阅进度
        CHANGE_PROGRESS(ctx, param) {
            Object.assign(ctx.state.userState.progress, param)
        },
        CHANGE_EP_MODE(ctx) {
            ctx.commit('SET_EP_MODE')
        }
    },
    mutations: {
        SET_MEDIA_INFO(state, info) {
            state.mediaInfo = info
        },
        SET_EP_INFO(state, id) {
            let epList = state.mediaInfo.episodes,
                find = false,
                mode = 0
            epList.forEach((item, index) => {
                if (item.ep_id == id) {
                    find = true
                    state.epIndex = index
                    state.epInfo = item
                }
                if (item.title == '') {
                    mode++
                }
                state.mediaInfo.episodes[index].i = index
            })
            !find && epList[0] && (state.epInfo = epList[0])
            if (mode == epList.length) {
                state.simpleMode = true
            }
        },
        SET_FOLLOW_STATE(state, follow) {
            state.seasonFollowed = follow
        },
        SET_REVIEW_STATE(state, review) {
            state.reviewed = review
        },
        SET_USER_STATE(state, userState) {
            state.userState = userState
        },
        SET_EP_MODE(state) {
            state.simpleMode = !state.simpleMode
        }
    }
}