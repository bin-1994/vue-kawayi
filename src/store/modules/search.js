import { fetch } from '../../utils/axios'

export default {
    namespaced: true,
    state: () => ({
        searchList: [],
        total: 0,
        pages: 0,
        loadState: 'loading'
    }),
    getters: {
        SEARCH_LIST: state => state.searchList,
        LOAD_STATE: state => state.loadState
    },
    actions: {
        FETCH_SEARCH_LIST(ctx, params) {
            let query = {
                keyword: params.keyword,
                page: params.page || 1,
                pagesize: 20,
            }
            ctx.commit('SET_LOAD_STATE', 'loading')
            return fetch(`/search`, query).then(res => {
                ctx.commit('SET_SEARCH_LIST', res.result)
                ctx.commit('SET_LOAD_STATE', 'loaded')
            })
        },
    },
    mutations: {
        SET_SEARCH_LIST(state, result) {
            state.searchList = result.list
            state.total = result.page.total
            state.pages = Math.ceil(result.page.total / result.page.size)
        },
        SET_LOAD_STATE(state, text) {
            state.loadState = text
        }
    }
}