<<template>
    <div class="bangumi-index-wrapper">
        <main-header></main-header>
        <div class="bangumi-index-body clearfix">
            <div class="filter-body">
                <sort-banner :hash="hash"></sort-banner>
                <ul :class="['bangumi-list', 'clearfix', {'no-data': 'loaded' === state && 0 === list.length}]">
                    <bangumi-item v-show="'loaded' === state" v-for="item in list" :key="item.media_id" :item="item" :sort-type="parseInt(hash.order) || 0"></bangumi-item>
                    <loading :state="state" :data="loadingData"></loading>
                    <li class="no-data-wrapper" v-if="'loaded' === state && 0 === list.length">
                        <span>没有这样的番剧哦~</span>
                        <div class="reset-btn" @click="resetHash()">重置筛选</div>
                    </li>
                </ul>
                <pagination v-show="'loaded' === state" :count="total" :curr-page="parseInt(hash.page)" :total-pages="pages" @change="pageChange"></pagination>
            </div>
            <filter-wrapper></filter-wrapper>
        </div>
    </div>
</template>

<script>
import MainHeader from '../../components/header/Header'
import FilterModule from '../../store/modules/fillter'
import SortBanner from './components/SortBanner'
import FilterWrapper from './components/FilterWrapper'
import BangumiItem from './components/BangumiItem'
import Pagination from '../../components/common/Pagination'
import Loading from '../../components/common/Loading'
import Bus from '../../utils/eventbus'
import { fetch } from '../../utils/axios'
export default {
    name: 'MovieIndex',
    metaInfo() {
        return {
            title: '索引',
        }
    },
    asyncData(ctx) {
        ctx.store.registerModule('filter', FilterModule)
        
        return Promise.all([
            ctx.store.dispatch('filter/FETCH_FILTERS'),
        ])
    },
    data() {
        return {
            hash: {},
            state: 'loading',
            list: [],
            total: 0,
            pages: 0,
        }
    },
    watch: {
        hash: {
            handler(value) {
                this.setHash()
                this.fetchList()
            },
            deep: true
        }
    },
    computed: {
        FILTERS() {
            return this.$store.state.filter.filters
        },
        ORDERS() {
            return this.$store.state.filter.orders
        },
        loadingData() {
            return 'loading' === this.state ? [] : this.list
        }
    },
    created() {
        Bus.$on('FILTER_CHANGE', param => {
            let hash = this.hash
            for (let i in param) {
                param.hasOwnProperty(i) && (hash[i] = param[i])
            }
            this.hash = hash
        })
    },
    mounted() {
        this.parseHash()
    },
    methods: {
        resetHash() {
            let params = {}
            this.FILTERS.forEach(item => {
                let value = (item.list[0] && item.list[0].value) ? item.list[0].value : 0
                value = isNaN(Number(value)) ? value : Number(value)
                params[item.key] = value
            })
            params.order = this.ORDERS[0].key || 0
            params.sort = 0
            params.page = 1
            this.hash = params
            Bus.$emit('FILTER_RESET')
        },
        setHash() {
            let hash = []
            for (let i in this.hash) {
                hash.push(`${i}=${encodeURIComponent(this.hash[i])}`)
            }
            window.location.href = `#${hash.join('&')}`
        },
        parseHash() {
            let hashStr = window.location.hash.substr(1)
            let param = {}
            if (hashStr && 'string' == typeof hashStr) {
                hashStr.split('&').forEach(item => {
                    if (item) {
                        let kvp = item.split('=')
                        let decodeKvp = decodeURIComponent(kvp[1])
                        decodeKvp.indexOf('{') > -1 && (decodeKvp = JSON.parse(decodeKvp))
                        param[kvp[0]] = decodeKvp
                    }
                })
            }
            if ('{}' !== JSON.stringify(param)) {
                for (let i in param) {
                    if (param.hasOwnProperty(i)) {
                        param[i] = isNaN(Number(param[i])) ? param[i] : Number(param[i])
                    }
                }
                this.hash = param
                Bus.$emit('FILTER_INIT', this.hash)
            } else {
                this.resetHash()
            }
        },
        fetchList() {
            this.state = 'loading'
            let params = Object.assign({}, this.hash, {
                size: 20
            })
            fetch(`/bangumi/list`, params).then(res => {
                this.total = res.result.page.total || 0
                
                this.list = res.result.list || []
                this.pages = Math.ceil(this.total / params.size)
                this.state = 'loaded'
            }).catch(() => {
                this.state = 'error'
            })
        },
        pageChange(page) {
            this.hash.page !== page && this.$set(this.hash, 'page', page)
            let top = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0
            0 !== document.documentElement.scrollTop ? document.documentElement.scrollTop = top : document.body.scrollTop = top
        }
    },
    destroyed () {
      // 注销模块
      this.$store.unregisterModule('filter')
    },
    components: {
        MainHeader,
        SortBanner,
        FilterWrapper,
        BangumiItem,
        Pagination,
        Loading
    }
}
</script>

<style lang="scss">
    .bangumi-index-wrapper {
        .bangumi-index-body {
            width: 1160px;
            margin: 0 auto;
            .filter-body {
                position: relative;
                padding: 20px 0;
                width: 900px;
                float: left;
            }
            .filter-wrapper {
                float: left;
                width: 260px;
                padding-top: 20px;
            }
            .no-data-wrapper {
                padding-top: 360px;
                position: relative;
                width: 100%;
                height: 500px;
                background-repeat: no-repeat;
                background-position: center 74px;
                background-image: url(../../assets/images/bgm-nodata-filter.png);
                span {
                    display: block;
                    position: absolute;
                    top: 310px;
                    left: 0;
                    width: 100%;
                    height: 20px;
                    line-height: 20px;
                    font-size: 14px;
                    color: #99a2aa;
                    text-align: center;
                    font-family: PingFangSC-Regular;
                }
                .reset-btn {
                    position: relative;
                    display: block;
                    width: 160px;
                    height: 40px;
                    margin: 0 auto;
                    border-radius: 4px;
                    color: #fff;
                    background-color: #00a1d6;
                    text-align: center;
                    line-height: 40px;
                    font-size: 14px;
                    font-family: PingFangSC-Regular;
                    cursor: pointer
                }
            }
            .no-data .load-state {
                display: none;
            }
            .load-state {
                height: 500px;
                font-size: 12px;
            }
        }
    }
    @media screen and (max-width: 1400px) {
        .bangumi-index-wrapper 
        .bangumi-index-body {
            width: 980px;
            .filter-body {
                width: 720px;
            }
        }
    }
</style>