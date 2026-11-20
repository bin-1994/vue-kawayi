<template>
    <transition name="fade" mode="out-in">
        <div id="app">
            <router-view/>
            <main-footer></main-footer>
        </div>
    </transition>
</template>

<script>
import MainFooter from './components/footer/Footer.vue'
export default {
    name: 'App',

    components: {
        MainFooter
    }
}
</script>

<style lang="scss">
    @import './assets/css/base.scss';
</style>