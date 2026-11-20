<template>
    <div class="footer-wrap">
        <div class="footer k-wrap">
            <div class="footer-copyright">
                <p>{{ version }}</p>
            </div>
            <div class="footer-link">
                <a :href="item.link" v-for="(item, index) in link" :key="index">{{ item.title }}</a>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Footer',
    data() {
        return {
            link: [],
        }
    },
    computed: {
        version() {
            return `Ver：0.2.1 · 卡哇伊 ${new Date().getFullYear()}`
        }
    },
    mounted() {
        this.link = [
            // {title: '联系我们', link: 'javasrcpt:void(0);'},
            // {title: '帮助中心', link: 'javasrcpt:void(0);'},
            // {title: '意见反馈', link: 'javasrcpt:void(0);'},
            {title: '联系邮箱(email)', link: 'mailto:kwymoe@hotmail.com'},
        ]
    }
}
</script>

<style lang="scss">
    .footer-wrap {
        // margin-top: 40px;
        width: 100%;
        max-height: 200px;
        background-color: #f7f8f9;
        .footer {
            padding: 36px 24px;
            max-width: 2078px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin: 0 auto;
            .footer-link {
                display: flex;
                justify-content: space-between;
                a {
                    margin-left: 20px;
                    font-size: 14px;
                    color: #99a2aa;
                    line-height: 28px;
                    &:hover {
                        color: #333;
                    }
                }
            }
            .footer-copyright {
                font-size: 12px;
                line-height: 24px;
                margin-top: 8px;
                text-align: left;
                color: #99a2aa;
            }
        }
    }
</style>