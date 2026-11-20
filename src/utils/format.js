function timeZone(time) {
    return time.setTime(time.getTime() + 60 * (time.getTimezoneOffset() + 480) * 1000), time
}

export function formatNum(number) {
    return "number" != typeof number && (number = Number(number)),
  void 0 === number || isNaN(number) || number <= 0 ? 0 : Math.abs(number) <= 10000 ? number : Math.abs(number) <= 100000000 ? Math.round(number / 1000) / 10 + "万" : Math.round(number  / 10000000) / 10 + "亿"
}

export function formatTime(second) {
    const add0 = (num) => num < 10 ? `0${num}` : num
    const hour = Math.floor(second / 3600)
    const min = Math.floor((second - hour * 3600) / 60)
    return ([hour, min]).map(add0).join(':')
}

export function formatEp(index, type) {
    // let ep = (1 != type) ? '集' : '话'
    return isNaN(index) ? index : `第${index}话`
}

export function formatDate(timestamp) {
    if (timestamp) {
        let date = timeZone(new Date(timestamp * 1000))
        return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`
    }
}

export function formatFriendlyTime(time) {
    let current = timeZone(new Date),
        differ = current.getTime() - time.getTime(),
        yesterday = timeZone(new Date(current.getTime() - 86400000)),
        yesterdayStr = timeZone(new Date(''.concat(yesterday.getFullYear(), '/').concat(yesterday.getMonth() + 1, '/').concat(yesterday.getDate(), '00:00:00')))
    return differ < 60000 ? '刚刚' : differ < 3600000 ? ''.concat(Math.round(differ / 60000), '分钟前') : differ < 86400000 ? ''.concat(Math.round(differ / 3600000), '小时前') : time.getTime() > yesterdayStr.getTime() ? '昨天' : function(time, symbol, i, n, thisYear) {
        symbol = void 0 === symbol ? '/' : symbol,
        n = void 0 !== n
        let year = time.getFullYear(),
            month = time.getMonth() + 1,
            day = time.getDate()
        if (n && (month = month < 10 ? '0'.concat(month) : month.toString(), day = day < 10 ? '0'.concat(day) : day.toString(), i)) {
            let hours = time.getHours(),
                minute = time.getMinutes()
            return n && (hours = hours < 10 ? '0'.concat(hours) : hours.toString(), minute = minute < 10 ? '0'.concat(minute) : minute.toString()), (thisYear ? year + symbol : '') + month + symbol + day + ' ' + hours + ':' + minute
        }
        return (thisYear ? year + symbol : '') + month + symbol + day
        }(time, '-', false, true, current.getFullYear() !== time.getFullYear())
}

export function formatType(type) {
    return 2 === type ? `电视剧` : `动画`
}