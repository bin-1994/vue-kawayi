<template>
    <div class="nav-user-center">
        <div class="user-con" v-if="!USER_INFO">
            <div class="item">
                <a href="/login" target="_blank" rel="noopener noreferrer" class="nav-name">
                    <img :src="avatar" class="logout-face">
                    登录
                </a>
            </div>
            <div class="item">
                <a href="/register" target="_blank" rel="noopener noreferrer" class="nav-name">注册</a>
            </div>
        </div>
        <div class="user-con" v-else>
            <div class="item">
                <a class="user-avatar" href="/member/bangumi" target="_blank">
                    <img src="https://tvax3.sinaimg.cn/large/be297bc5ly1gat2rmqijjj20jg0jg4a6.jpg">
                </a>
            </div>
            <!-- <div class="item history-wrap">
                <span class="nav-name">历史</span>
                <div class="history-drop-list-wrap">
                    <a :href="`/bangumi/play/ep${item.ep_id}`" target="_blank" class="history-item" v-for="item in historyList" :key="item.media_id">
                        <div class="history-title">{{ item.title }}</div>
                        <div class="history-info">{{ epIndex(item.ep_index) }}</div>
                    </a>
                    <div class="history-empty" v-show="historyList.length === 0">历史记录空空如也</div>
                    <div class="history-bottom" @click="clearHistory" v-show="historyList.length > 0">清除历史</div>
                </div>
            </div> -->
        </div>
        <div class="user-con">
            <div class="item history-wrap">
                <span class="nav-name">历史</span>
                <div class="history-drop-list-wrap">
                    <a :href="`/bangumi/play/ep${item.ep_id}`" target="_blank" class="history-item" v-for="item in historyList" :key="item.media_id">
                        <div class="history-title">{{ item.title }}</div>
                        <div class="history-info">{{ showTime(item.timestamp, item.duration) }}</div>
                    </a>
                    <div class="history-empty" v-show="historyList.length === 0">历史记录空空如也</div>
                    <div class="history-bottom" @click="clearHistory" v-show="historyList.length > 0">清除历史</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Avatar from '../../assets/images/avatar.jpg'
import { formatTime } from '../../utils/format'
export default {
    name: 'UserCenter',
    data(){
        return {
            avatar: Avatar,
            historyList: []
        }
    },
    mounted() {
        let history = window.localStorage &&  window.localStorage.getItem('player-history')
        this.historyList = (history ? JSON.parse(history) : [])
    },
    methods: {
        clearHistory() {
            this.historyList = []
            window.localStorage.removeItem('player-history')
        },
        showTime(time, duration) {
            return `${formatTime(time)} / ${formatTime(duration)}`
        }
    },
    computed: {
        ...mapGetters(['USER_INFO'])
    },
}
</script>

<style lang="scss">
    .nav-user-center {
        display: flex;
        flex-shrink: 0;
        .user-con {
            display: flex;
            align-items: center;
            .item {
                position: relative;
                display: flex;
                margin-left: 12px;
                cursor: pointer;
                padding: 10px 0;
                .nav-name {
                    color: #212121;
                    display: flex;
                    align-items: center;
                }
                .logout-face {
                    width: 32px;
                    height: 32px;
                    border-radius: 50%;
                    display: inline-block;
                    margin-right: 5px;
                    border: 1px solid silver;
                }
                .user-avatar {
                    width: 36px;
                    height: 36px;
                    border-radius: 50%;
                    position: relative;
                    margin-right: 10px;
                    img {
                        position: absolute;
                        top: 0;
                        width: 100%;
                        height: 100%;
                        border-radius: 50%;
                        transition: .2s;
                    }
                }
            }
            .history-wrap {
                position: relative;
                display: block;
                &:hover .history-drop-list-wrap {
                    display: block;
                }
                .history-drop-list-wrap {
                    z-index: 200;
                    position: absolute;
                    width: 270px;
                    min-height: 180px;
                    right: -20px;
                    top: 50px;
                    background-color: #fff;
                    border-radius: 0 0 10px 10px;
                    box-shadow: 0 10px 10px 0 rgba(0,0,0,.16);
                    overflow: hidden;
                    display: none;
                    .history-item {
                        display: block;
                        padding: 5px 15px;
                        line-height: 22px;
                        &:hover {
                            background-color: #f4f4f4;
                            .history-title {
                                color: #00a1d6;
                            }
                        }
                        .history-title {
                            font-size: 14px;
                        }
                        .history-info {
                            color: #999;
                            font-size: 12px;
                        }
                    }
                    .history-bottom {
                        background-color: #f4f4f4;
                        transform-origin: center center;
                        text-align: center;
                        padding: 12px 0;
                        &:hover {
                            color: #00a1d6;
                        }
                    }
                    .history-empty {
                        color: #999;
                        text-align: center;
                        line-height: 170px;
                        font-size: 14px;
                    }
                }
            }
        }
    }
</style>