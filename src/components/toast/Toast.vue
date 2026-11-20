<template>
    <transition name="fade">
        <div class="toast-wrap" v-show="visible">
            {{ message }}
        </div>
    </transition>
</template>

<script>
export default {
    name: 'Toast',
    data() {
        return {
            visible: false,
            message: ''
        }
    }
}
</script>

<style lang="scss">
    .toast-wrap {
        position: fixed;
        background-color: rgba(0, 0, 0, 0.8);
        border-radius: 4px;
        top: 50%;
        left: 50%;
        transform: translateX(-50%);
        font-size: 14px;
        color: #fff;
        text-align: center;
        padding: 10px 20px;
        height: 20px;
        line-height: 20px;
        box-shadow: 0 0 2px 0 rgba(255, 255, 255, 0.1);
        z-index: 2000;
    }
</style>