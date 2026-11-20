import { createApp } from './main'

export default context => {
    return new Promise((resolve, reject) => {
        const {app, router, store} = createApp()
        const meta = app.$meta()

        // const { url } = context
        // const { fullPath } = router.resolve(url).router

        // if (fullPath !== url) {
        //     return reject({ url: fullPath })
        // }

        router.push(context.url)

        router.onReady(() => {
            const matchedComponents = router.getMatchedComponents()
            // 如果匹配不到, 返回404
            if (!matchedComponents.length) {
                return reject({ code: 404 })
            }
            // 对所有匹配的路由组件调用 `asyncData()`
            Promise.all(matchedComponents.map(Component => {
                if (Component.asyncData) {
                    return Component.asyncData({
                        store,
                        route: router.currentRoute,
                        cookie: context.cookie
                    })
                }
            })).then(() => {
                context.state = store.state
                context.meta = meta
                resolve(app)
            }).catch(reject)
        })
    })
}