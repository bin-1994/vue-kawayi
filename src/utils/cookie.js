const getSecond = (time) => {
    let number = 1 * time.substring(1, time.length),
        text = time.substring(0, 1),
        expires = 0
    if ('s' === text) {
        // 秒
        expires = 1000 * number
    } else if ('h' === text) {
        // 时
        expires = 60 * number * 60 * 1000
    } else if ('d' === text) {
        // 天
        expires = 24 * number * 60 * 60 * 1000
    } else if ('y' === text) {
        // 年
        expires = 365 * number * 24 * 60 * 60 * 1000
    } else {
        expires = void 0
    }
    return expires
}

const setCookie = (key, value, time) => {
    let expires = getSecond(time)
    let date = new Date()
    const domain = document.domain.match(/[^\.]*\.[^.]*$/)[0]
    date.setTime(date.getTime() + 1 * expires)
    document.cookie = `${key}=${value};expires=${date.toGMTString()};path=/;domain=.${domain}`
}

const getCookie = (key) => {
    let reg = new RegExp(`(^| )${key}=([^;]*)(;|$)`),
    match = document.cookie.match(reg)
    return match ? unescape(match[2]) : null
}

const deleteCookie = (key) => {
    let date = new Date()
    date.setTime(date.getTime() - 1)
    let value = getCookie(key)
    const domain = document.domain.match(/[^\.]*\.[^.]*$/)[0]
    null != value && (document.cookie = `${key}=${value};expires=${date.toGMTString()};path=/;domain=.${domain}`)
}

export default {
    set: setCookie,
    get: getCookie,
    delete: deleteCookie
}