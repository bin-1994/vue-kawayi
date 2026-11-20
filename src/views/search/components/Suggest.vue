<template>
    <div class="suggest-wrap">
            <div class="history" v-show="'' == keyword && historyList.length > 0">
                <div class="header">
                    <div class="title">搜索历史</div>
                    <div class="clear" @click="handleClearHistory">清空</div>
                </div>
                <div class="history-wrap" :style="{maxHeight: foldVisible && isFold ? '92px' : '172px'}">
                    <div class="histories" ref="histories">
                        <div class="history-item"  v-for="(item, index) in historyList" :key="index" @click="clickSearch(item.keyword)">
                        <div class="history-text">{{ item.keyword }}</div>
                        <div class="close" @click="deleteHistory(index, $event)">
                            <svg data-v-fb29674c="" viewBox="0 0 1024 1024" width="14" height="14"><path data-v-fb29674c="" d="M512 64.303538c-247.25636 0-447.696462 200.440102-447.696462 447.696462
              0 247.254314 200.440102 447.696462 447.696462 447.696462s447.696462-200.440102
              447.696462-447.696462S759.25636 64.303538 512 64.303538zM710.491727 665.266709c12.491499
              12.491499 12.489452 32.729425-0.002047 45.220924-6.246261 6.246261-14.429641 9.370415-22.611997
              9.370415s-16.363689-3.121084-22.60995-9.366322L512 557.222971 358.730221 710.491727
              c-6.246261 6.246261-14.429641 9.366322-22.611997 9.366322s-16.365736-3.125177-22.611997-9.370415
              c-12.491499-12.491499-12.491499-32.729425 0-45.220924l153.268756-153.266709L313.50725 358.730221
              c-12.491499-12.491499-12.489452-32.729425 0.002047-45.220924s32.729425-12.495592 45.220924-0.004093
              l153.268756 153.268756 153.268756-153.268756c12.491499-12.491499 32.729425-12.487406 45.220924
              0.004093s12.493545 32.729425 0.002047 45.220924L557.225017 512 710.491727 665.266709z"></path></svg>
                        </div>
                    </div>
                    </div>
                    
                </div>
                <div class="history-fold-wrap" v-if="foldVisible" @click="toggleFold">
                    <div class="fold-text">{{ isFold ? '展开更多' : '收起' }}</div>
                    <svg data-v-fb29674c="" viewBox="0 0 12 12" :class="['fold-icon', isFold ? 'fold' : '']"><path data-v-fb29674c="" fill-rule="evenodd" clip-rule="evenodd" d="M5.46967 9.17678C5.76256 9.46967 6.23744 9.46967 6.53033 9.17678L10.7286 4.97855
            C10.9238 4.78329 10.9238 4.46671 10.7286 4.27145C10.5333 4.07618 10.2167 4.07618 10.0214 4.27145L6 8.29289
            L1.97855 4.27145C1.78329 4.07618 1.46671 4.07618 1.27145 4.27145
            C1.07618 4.46671 1.07618 4.78329 1.27145 4.97855L5.46967 9.17678Z"></path></svg>
                </div>
            </div>
        <div class="hotword-wrap" v-show="'' == keyword">
            <div class="header">
                <div class="title">热搜</div>
            </div>
            <div class="hotword-list-wrap">
                <div class="hotword-list">
                    <div class="hotword-item" v-for="(item, index) in hotList.slice(0, 5)" :key="index" @click="clickSearch(item.keyword)">
                        <div :class="['rank', {'top': index < 3}]">{{ index + 1 }}</div>
                        <div class="hotword">{{ item.keyword }}</div>
                    </div>
                </div>
                <div class="hotword-list">
                    <div class="hotword-item" v-for="(item, index) in hotList.slice(5, 10)" :key="index" @click="clickSearch(item.keyword)">
                        <div class="rank">{{ index + 6 }}</div>
                        <div class="hotword">{{ item.keyword }}</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="keyword-wrap" v-show="'' !== keyword">
            <div :class="['keyword-item', {'focus': suggestFocus == index}]" v-for="(item, index) in suggestList" :key="item.media_id" @click="clickSearch(item.title)" v-html="replaceEm(item.title)"></div>
        </div>
    </div>
</template>

<script>
import { fetch } from '../../../utils/axios'
export default {
    name: 'Suggest',
    props: {
        keyword: {
            type: String,
            default: '',
        },
        suggestFocus: {
            type: Number,
            default: -1
        }
    },
    data() {
        return {
            historyList: [],
            suggestList: [],
            hotList: [],
            foldVisible: false,
            isFold: true
        }
    },
    watch: {
        keyword(value) {
            '' != value && this.loadSuggest()
        }
    },
    mounted() {
        this.fetchHotword()
        this.readHistory()
        this.$nextTick(() => {
            this.$refs.histories && (this.foldVisible = this.$refs.histories.clientHeight > 80)
        })
    },
    methods: {
        loadSuggest() {
            fetch('/search/suggest', {keyword: this.keyword}).then(res => {
                if (0 === res.code) {
                    this.suggestList = res.result.list || []
                    this.$emit('updateSuggest', this.suggestList)
                }
            })
        },
        fetchHotword() {
            fetch(`/search/hotword`).then(res => {
                if (0 === res.code) {
                    this.hotList = res.result.list
                }
            })
        },
        replaceEm(title) {
            return title.replace(new RegExp(this.keyword, 'g'), `<em class="keyword">${this.keyword}</em>`)
        },
        // chickHandle(keyword) {
        //     if (this.$route.name == 'Search') {
        //         this.$router.replace({path: `/search`, query: {keyword: keyword}})
        //     } else {
        //         let url = this.$router.resolve({
        //             path: '/search',
        //             query: {keyword: this.keyword}
        //         })
        //         window.open(url .href, '_blank')
        //     }
        // }
        readHistory() {
            this.historyList = JSON.parse(window.localStorage.getItem('search_history')) || []
            this.$emit('updateHistory', this.historyList)
        },
        deleteHistory(index, event) {
            event.stopPropagation()
            this.historyList.splice(index, 1)
            window.localStorage.setItem('search_history', JSON.stringify(this.historyList))
            this.$emit('updateHistory', this.historyList)
            0 === this.historyList.length && document.querySelector('.search-keyword').focus()
        },
        handleClearHistory() {
            this.historyList = []
            this.foldVisible = false
            window.localStorage.setItem('search_history', '[]')
        },
        clickSearch(keyword) {
            this.$emit('searchEvent', keyword)
        },
        toggleFold() {
            this.isFold = !this.isFold
        }
    }
}
</script>

<style lang="scss">
    .suggest-wrap {
        position: absolute;
        width: 100%;
        border: 1px solid #e5e9ef;
        background-color: #fff;
        border-radius: 2px;
        margin-top: 5px;
        box-shadow: rgba(0, 0, 0, 0.16) 0px 2px 4px;
        padding: 10px 0;
        font-size: 14px;
        z-index: 99999;
        box-sizing: border-box;
        .header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0 16px;
            .title {
                height: 24px;
                font-weight: 600;
                font-size: 16px;
                line-height: 24px;
            }
            .clear {
                font-size: 12px;
                line-height: 15px;
                height: 15px;
                color: #999;
                cursor: pointer;
            }
        }
        .hotword-wrap {
            // padding: 0 20px;
            // max-height: 84px;
            overflow: hidden;
            .hotword-list-wrap {
                display: flex;
                .hotword-list {
                    flex: 1;
                    max-width: 244px;
                    &:first-child {
                        margin-right: 10px;
                    }
                    .hotword-item {
                        box-sizing: border-box;
                        height: 38px;
                        display: flex;
                        align-items: center;
                        cursor: pointer;
                        padding-left: 16px;
                        &:hover {
                            background-color: #f4f4f4;
                            outline: none;
                        }
                        .rank {
                            width: 15px;
                            min-width: 15px;
                            word-break: initial;
                            height: 17px;
                            line-height: 17px;
                            text-align: center;
                            font-weight: 500;
                            font-size: 500;
                            font-size: 14px;
                            margin-right: 7px;
                            color: #999;
                            &.top {
                                color: #212121;
                            }
                        }
                        .hotword {
                            font-size: 14px;
                            line-height: 17px;
                            height: 17px;
                            margin-right: 6px;
                            white-space: nowrap;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            letter-spacing: 0;
                        }
                    }
                }
            }
        }
        .keyword-wrap {
            .keyword-item {
                padding: 0 16px;
                height: 32px;
                line-height: 32px;
                cursor: pointer;
                word-break: break-all;
                display: block;
                color: #222;
                position: relative;
                box-sizing: border-box;
                em {
                    color: #f25d8e;
                    font-style: normal;
                }
                &.focus,
                &:hover {
                    background-color: #f4f4f4;
                }
            }
        }
        .history-wrap {
            max-height: 92px;
            padding: 0 16px;
            overflow: hidden;
            .histories {
                display: flex;
                flex-wrap: wrap;
                // padding-top: 12px;
                margin-top: 12px;
                margin-right: -10px;
                margin-bottom: 4px;
            }
            .history-item {
                position: relative;
                box-sizing: border-box;
                height: 30px;
                padding: 7px 10px 8px 10px;
                font-size: 12px;
                line-height: 15px;
                background-color: #f4f4f4;
                border-radius: 4px;
                margin-right: 10px;
                margin-bottom: 10px;
                cursor: pointer;
                &:hover, &.focus {
                    color: #00a1d6;
                }
                &:hover .close {
                    display: block;
                }
                .history-text {
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    max-width: 96px;
                }
                .close {
                    display: none;
                    box-sizing: border-box;
                    position: absolute;
                    width: 16px;
                    height: 16px;
                    top: -6px;
                    right: -6px;
                    padding: 2px;
                    &:hover {
                        color: #00a1d6;
                    }
                    svg {
                        width: 14px;
                        height: 14px;
                        fill: #ccc;
                    }
                }
            }
        }
        .history-fold-wrap {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 64px;
            margin: 0 auto;
            margin-bottom: 14px;
            .fold-text {
                font-size: 12px;
                line-height: 15px;
                color: #999;
                cursor: pointer;;
            }
        }
        .fold-icon {
            width: 12px;
            height: 12px;
            fill: #999;
            cursor: pointer;
            transform: rotate(180deg);
            margin-left: 2px;
            &.fold {
                transform: rotate(0deg);
            }
        }
    }
</style>