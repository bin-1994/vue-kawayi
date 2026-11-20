<template>
    <div>
        <member-header></member-header>
        <div class="wrapper">
            <div class="col-full">
                <div class="sub-tabs">
                    <span>我的订阅</span>
                    <ul class="filter-content">
                        <li :class="['filter-item', {on: index == current}]" v-for="(item, index) in stateList" :key="index" @click="chickHanlder(index)">{{ item }}</li>
                    </ul>
                </div>
                <ul class="bangumi-list clearfix">
                    <bangumi-item  v-for="item in followList" :key="item.media_id" :item="item" @cmd="runCmd"></bangumi-item>
                    <li class="follow-empty" v-show="0 == total && 0 == followList.length"><p>{{ message }}</p></li>
                    <li class="loading" v-show="loading"></li>
                </ul>
                <pagination :count="total" :curr-page="parseInt(page)" :total-pages="pages" @change="pageChange"></pagination>
            </div>
        </div>
    </div>
    
</template>

<script>
import MemberHeader from './components/Header'
import BangumiItem from './components/BangumiItem'
import Pagination from '../../components/common/Pagination'
import { fetch, post } from '../../utils/axios'
export default {
    name: 'Bangumi',
    metaInfo () {
        return {
            title: `我的订阅`,
            htmlAttrs: {
                style: 'background-color:#f4f5f7'
            }
        }
    },
    data() {
        return {
            stateList: ['全部', '想看', '在看', '看过'],
            current: 0,
            followList: [],
            page: 1,
            size: 15,
            pages: 0,
            total: 0,
            loading: false,
            message: ''
        }
    },
    watch: {
        current () {
            this.page = 1
            this.fetchList()
        }
    },
    mounted() {
        this.fetchList()
    },
    methods: {
        chickHanlder(index) {
            this.current = index
        },
        fetchList() {
            let params = {
                page: this.page,
                size: this.size,
                state: this.current || 0
            }
            this.loading = true
            fetch(`/follow/list`, params).then(res => {
                this.loading = false
                if (0 === res.code) {
                    this.followList = res.result.list
                    this.total = res.result.page.total

                    if (0 === this.total && 0 === this.followList.length) {
                        this.message = 1 === this.current ? `没有任何想看的番呢` : 2 === this.current ? `近期没有在看的番哎 >﹏ <` : 3 === this.current ? `还没有看完过一部番 (:з」∠)` : `你暂时还没有追番哦~~`
                    }
                    this.pages = Math.ceil(this.total / this.size)
                }
            }).catch(err => {
                this.loading = false
            })
        },
        runCmd(event, data) {
            'follow' === event ? this.doFollow(data) : 'state' === event && this.doState(data)
        },
        doFollow(data) {
            post('/follow/del', data).then(res => {
                if (0 === res.code) {
                    this.fetchList()
                }
                this.$toast(res.message)
            }).catch(() => {
                this.$toast('出错了')
            })
        },
        doState(data) {
            post('/follow/edit', data).then(res => {
                if (0 === res.code) {
                    this.fetchList()
                }
                this.$toast(res.message)
            }).catch(() => {
                this.$toast('出错了')
            })
        },
        pageChange (page) {
            this.page = page
            this.fetchList()
        }
    },
    components: {
        MemberHeader,
        BangumiItem,
        Pagination
    }
}
</script>

<style lang="scss">
    .sub-tabs {
        position: relative;
        display: flex;
        justify-content: space-between;
        align-content: space-between;
        margin-bottom: 20px;
        span {
            font-family: MicrosoftYaHei;
            font-size: 20px;
            color: #222;
            line-height: 26px;
        }
        .filter-content {
            font-size: 14px;
            color: #212121;
            .filter-item {
                position: relative;
                display: inline-block;
                line-height: 26px;
                margin-left: 20px;
                transition: color .2s ease,background-color .2s ease;
                &:hover {
                    cursor: pointer;
                    color: #00a1d6;
                }
                &.on {
                    color: #00a1d6;
                    border-bottom: 1px solid #00a1d6;
                    &:before {
                        content: '';
                        display: block;
                        position: absolute;
                        left: 50%;
                        margin-left: -3px;
                        bottom: 0;
                        width: 0;
                        height: 0;
                        border-bottom: 3px solid #00a1d6;
                        border-top: 0;
                        border-left: 3px dashed transparent;
                        border-right: 3px dashed transparent;
                    }
                }
            }
        }
    }
    .bangumi-list {
        position: relative;
        min-height: 140px;
        padding-bottom: 10px;
        .follow-empty {
            display: block;
            padding: 344px 0 80px;
            width: 100%;
            border-radius: 4px;
            color: #6d757a;
            overflow: hidden;
            text-align: center;
            background-image: url("../../assets/images/nodata.png");
            background-position: center 120px;
            background-repeat: no-repeat;
            p {
                padding: 0;
                margin: 0;
                font-size: 14px;
                line-height: 16px;
                color: #6d757a;
            }
        }
        .loading {
            display: block;
            width: 100%;
            height: 140px;
            background-repeat: no-repeat;
            background-position: center center;
            background-image: url('../../assets/images/loadTV.gif');
        }
    }
</style>