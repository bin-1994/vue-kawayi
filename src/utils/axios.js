import axios from 'axios'
import qs from 'qs'

let baseURL = (typeof window === 'undefined') ? 'http://127.0.0.1:9090/api' : '/api'

const instance = axios.create({
    baseURL: baseURL,
    timeout: 60 * 1000,
    withCredentials: true
})

// instance.interceptors.response.use((response) => {
//     console.log(response.config.headers.Cookie)
//     return response
// }, (error) => {
//     return Promise.reject(error)
// })

export function fetch (url, params, cookie) {
    let config = {
        url: url,
        params,
        method: 'GET',
        headers: {}
    }
    if (cookie) {
        config.headers['Cookie'] = cookie
    }
    return new Promise((resolve, reject) => {
        instance(config).then(res => {
            resolve(res.data)
        }, reject).catch(reject)
    })
}

export function post (url, params, cookie) {
    let config = {
        url: url,
        data: qs.stringify(params, {arrayFormat: 'brackets'}),
        method: 'POST',
        headers: {}
    }
    if (cookie) {
        config.headers['Cookie'] = cookie
    }
    return new Promise((resolve, reject) => {
        instance(config)
        .then(res => {
            resolve(res.data)
        }).catch(err => {
            reject(err)
        })
    })
}