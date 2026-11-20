import { createApi } from 'create-api'
import axios from 'axios'

const api = createApi()

const instance = axios.create({
    baseURL: api.url,
    headers: {
        'cookie': api.cookie || ''
    }
})

if (api.onServer) {
    warmCache()
}

function warmCache () {
    setTimeout(warmCache, 1000 * 60 * 15)
}

export function cacheFetch (url, params) {
    const cache = api.cachedList
    if (cache && cache.has(url)) {
        return Promise.resolve(cache.get(url))
    } else {
        return new Promise((resolve, reject) => {
            instance.get(url, {params: params}).then(res => {
                const data = res.data
                if (data) data.__lastUpdated = Date.now()
                cache && cache.set(url, data)
                resolve(data)
            }, reject).catch(reject)
        })
    }
}

export function fetch (url, params, cookie = {}) {
    return new Promise((resolve, reject) => {
        instance.get(url, {params: params, headers: {'Cookie': cookie}}).then(res => {
            resolve(res.data)
        }, reject).catch(reject)
    })
}

export function post (url, params = {}) {
    return new Promise((resolve, reject) => {
        instance.post(url, params).then(res => {
            resolve(res.data)
        }, reject).catch(reject)
    })
}