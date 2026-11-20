<template>
    <div :class="['header-molude', {'fixed-top': navFixed}]">
        <div class="main-header">
            <div class="header-content">
                <main-nav></main-nav>
                <main-search v-if="showSearch"></main-search>
                <user-center></user-center>
            </div>
        </div>
    </div>
</template>

<script>
import MainNav from './Nav'
import MainSearch from './Search'
import UserCenter from './UserCenter'
import History from './History'
export default {
    name: 'MainHeader',
    props: {
        showSearch: {
            type: Boolean,
            default: true
        },
    },
    data() {
        return {
            navFixed: false
        }
    },
    mounted() {
        window.addEventListener('scroll', this.handleScroll)
    },
    destroyed() {
        window.removeEventListener('scroll', this.handleScroll)
    },
    methods: {
        handleScroll() {
            let element = document.scrollingElement || document.documentElement
            if (!this.navFixed && element.scrollTop > 56) {
                this.navFixed = true
            } else if (this.navFixed && element.scrollTop <= 56) {
                this.navFixed = false
            }
        }
    },
    components: {
        MainNav,
        MainSearch,
        UserCenter,
        History
    }
}
</script>

<style lang="scss">
    .header-molude {
        position: relative;
        min-width: 999px;
        // min-height: 56px;
        &.fixed-top .main-header {
           position: fixed;
           top: 0;
           left: 0;
           right: 0;
       }
       &.mini-type .main-header {
           position: absolute;
           background: transparent;
           box-shadow: none;
           .nav-link .nav-link-item .link,
           .nav-user-center .user-con .item .nav-name {
               color: #fff;
           }
       }
    }
    .main-header {
       position: relative;
       background: #fff;
       width: 100%;
       height: 56px;
       z-index: 200;
       box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.08);
       .header-content {
           padding: 0 24px;
           line-height: 30px;
           position: relative;
           margin: 0 auto;
           display: flex;
           align-items: flex-start;
           justify-content: space-between;
       }
       &.mini-type {
           position: absolute;
           background: transparent;
           box-shadow: none;
           .nav-link .nav-link-item .link,
           .nav-user-center .user-con .item .nav-name {
               color: #fff;
           }
       }
    }
</style>