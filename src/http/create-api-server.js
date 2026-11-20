import LRU from 'lru-cache'

const baseURL = 'http://127.0.0.1:9090/api'

export function createApi () {
    let api = {}
    api.onServer = true
    api.cachedList = new LRU({
        // 最大1000条缓存
        max: 1000,
        // 2小时缓存
        maxAge: 1000 * 60 * 2 
    })
    api.url = baseURL
    return api
}