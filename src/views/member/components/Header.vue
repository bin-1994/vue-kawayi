<template>
    <div>
        <main-header></main-header>
        <div class="member-wrapper wrapper">
            <div class="h-inner" style="background-image: url('https://i.loli.net/2019/06/08/5cfb6788cf27747855.png');">
                <div class="h-gradient"></div>
                <div class="h-user">
                    <div class="h-info clearfix">
                        <div class="h-avatar">
                            <img :src="avatar">
                            <div class="avatar-cover">更换头像</div>
                        </div>
                        <div class="h-basic">
                            <div>
                                <span class="h-name">{{ $store.state.userInfo.nickname }}</span>
                                <span class="h-gender"></span>
                            </div>
                            <div class="h-basic-spacing">
                                <input class="h-sign" placeholder="编辑个性签名" maxlength="60">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="member-wrapper wrapper">
            <div class="member-nav">
                <div class="tab-links">
                    <router-link :to="item.link" v-for="(item, index) in tabList" :key="index" class="tab-item" exact="exact">
                        <span :class="['iconfont', item.icon]"></span>
                        <span>{{ item.title }}</span>
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import MainHeader from '../../../components/header/Header'
export default {
    name: 'MemberHeader',
    data() {
        return {
            tabList: [
                // {title: '主页', link: '/member', icon: 'icon-ic-home'},
                // {title: '赞助', link: '/member/vip', icon: 'icon-ic-vip'},
                {title: '订阅', link: '/member/bangumi', icon: 'icon-ic-love'},
                // {title: '点评', link: '/member/review', icon: 'icon-ic-star'},
                // {title: '评论', link: '/member/comment', icon: 'icon-ic-comment'},
                // {title: '设置', link: '/member/setting', icon: 'icon-ic-setting'},
            ]
        }
    },
    computed: {
        avatar() {
            return 'https://tvax3.sinaimg.cn/large/be297bc5ly1gat2rmqijjj20jg0jg4a6.jpg'
        }
    },
    components: {
        MainHeader
    }
}
</script>

<style lang="scss">
    .wrapper {
        width: 1100px;
        margin: 0 auto;
        position: relative;
    }
    .col-full {
        background-color: #fff;
        box-shadow: 0 0 0 1px #eee;
        border-radius: 2px;
        padding: 20px;
    }
    @media (min-width: 1420px) {
        .wrapper {
            width: 1280px;
        }
    }
    .member-wrapper {
        position: relative;
        .h-inner {
            background-position: 50%;
            background-size: cover;
            transition: background-image .2s ease,background-size 1s ease;
            padding-top: 116px;
        }
        .h-gradient {
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 84px;
            background-image: url("../../../assets/images/gradient.png");
            background-repeat: repeat-x;
        }
        .h-user {
            position: relative;
            z-index: 1;
        }
        .h-info {
            margin-left: 20px;
            padding-bottom: 16px;
        }
        .h-avatar {
            position: relative;
            float: left;
            width: 64px;
            height: 64px;
            border: 2px solid hsla(0,0%,100%,.4);
            border-radius: 52px;
            &:hover .avatar-cover {
                opacity: 1;
            }
            img {
                width: 64px;
                height: 64px;
                background: #fff;
                border-radius: 48px;
            }
            .avatar-cover {
                position: absolute;
                top: 0;
                left: 0;
                width: 64px;
                height: 64px;
                background: rgba(0,0,0,.6);
                font-size: 12px;
                color: #fff;
                line-height: 64px;
                text-align: center;
                opacity: 0;
                border-radius: 50%;
                transition: opacity .2s;
                cursor: pointer;
            }
        }
        .h-basic {
            float: left;
            color: #fff;
            font-size: 0;
            margin: 10px 0 0 20px;
            .h-name {
                display: inline-block;
                margin-right: 5px;
                font-weight: 700;
                line-height: 18px;
                font-size: 18px;
                vertical-align: middle;
            }
            .h-basic-spacing {
                margin-top: 8px;
                .h-sign {
                    background: transparent;
                    border-radius: 4px;
                    border: none;
                    box-shadow: none;
                    color: #d6dee4;
                    font-size: 12px;
                    font-family: Microsoft Yahei;
                    line-height: 26px;
                    height: 26px;
                    margin-left: -5px;
                    padding: 0 5px;
                    position: relative;
                    top: -1px;
                    width: 730px;
                    &::-webkit-input-placeholder {
                        color:#d6dee4;
                    }
                    &:hover {
                        background: hsla(0,0%,100%,.2);
                        box-shadow: 0 0 0 1px hsla(0,0%,100%,.5);
                    }
                    &:focus {
                        background: #fff;
                        box-shadow: inset 0 2px 4px rgba(35,54,86,.3);
                        color: #6d757a;
                    }
                }
            }
        }
    }
    .member-nav {
        background: #fff;
        height: 66px;
        box-shadow: 0 0 0 1px #eee;
        border-radius: 0 0 4px 4px;
        padding: 0 20px;
        margin-bottom: 10px;
        .tab-links {
            display: inline-block;
            vertical-align: middle;
            .tab-item {
                display: inline-block;
                line-height: 66px;
                position: relative;
                margin-right: 31px;
                &.router-link-active {
                    color: #00a1d6;
                }
                .iconfont {
                    display: inline-block;
                    width: 20px;
                    font-size: 20px;
                    margin-right: 4px;
                    vertical-align: middle;
                    &.icon-ic-home {
                        color: #00c091;
                    }
                    &.icon-ic-vip {
                        color: #fb7299;
                    }
                    &.icon-ic-love {
                        color: #ff5d47;
                    }
                    &.icon-ic-star {
                        color: #f3a034;
                    }
                    &.icon-ic-comment {
                        color: #3bd3d3;
                    }
                    &.icon-ic-setting {
                        color: #23c9ed;
                    }
                }
                span {
                    vertical-align: middle;
                    font-size: 13px;
                }
            }
        }
    }
</style>