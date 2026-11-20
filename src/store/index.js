import Vue from 'vue'
import Vuex from 'vuex'
import BangumiModule from './modules/bangumi'
import { fetch } from '../utils/axios'

Vue.use(Vuex)

export function createStore () {
    return new Vuex.Store({
        state: {
            userInfo: null
        },
        getters: {
            USER_INFO: state => state.userInfo
        },
        actions: {
            FETCH_USER ({commit, state}, cookie) {
                if (cookie) {
                    return fetch(`/user/info`, {}, cookie).then(res => {
                        if (0 == res.code) {
                            commit('SET_USER_INFO', res.result)
                        }
                    })
                }
            }
        },
        mutations: {
            SET_USER_INFO (state, info) {
                state.userInfo = info
            }
        },
        modules: {bangumi: BangumiModule}
    })
}