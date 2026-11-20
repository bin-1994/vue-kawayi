import { fetch } from '../../utils/axios'

const state = () => ({
    filters: [],
    orders: [],
    total: 0,
    pages: 0,
    dataList: []
})

const actions = {
    async FETCH_FILTERS ({ commit, state }) {
        const res = await fetch(`/bangumi/filter`)
        0 === res.code && commit('SET_FILTERS', res.result)
    },
    FETCH_DATA_LIST({ commit, state }, param) {
        return fetch(`/bangumi/list`, param).then(res => {
            if (0 === res.code) {
                let count = res.result.page.total || 0
                let data = {
                    list: res.result.list || [],
                    count: count,
                    pages: Math.ceil(count / param.size)
                }
                commit('SET_PAGE_DATA', data)
            }
        })
    }
}

const mutations = {
    SET_FILTERS (state, list) {
        let filters = list.filter || [],
            data = []
        filters.map(item => {
            let arr = {
                title: item.title,
                key: item.key,
                list: item.items.map(val => {
                    return {
                        value: isNaN(Number(val.value)) ? val.value : Number(val.value),
                        name: val.name
                    }
                })
            }
            'style' === arr.key && (arr.line = 10), 'year' !== arr.key || (arr.free = true)
            data.push(arr)
        })
        state.filters = data
        let orders = list.order && list.order.items ? list.order.items : []
        state.orders = orders.map(item => {
            return {
                title: item.name,
                key: Number(item.value),
                sort: item.sort || '0'
            }
        })
    },
    SET_PAGE_DATA(state, data) {
        state.total = Number(data.count) || 0
        state.dataList = data.list || []
        state.pages = Number(data.pages) || 0
    }
}

export default {
    namespaced: true,
    state: state,
    actions: actions,
    mutations: mutations
}