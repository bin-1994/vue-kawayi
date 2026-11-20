<template>
    <div class="lazy-img">
        <img v-lazy="src" :key="src" :alt="alt" v-if="src" referrerpolicy="no-referrer">
    </div>
</template>

<script>
export default {
    name: 'LazyImg',
    props: ['src', 'alt', 'widht', 'height']
}
</script>

<style lang="scss">
    .lazy-img {
        position: relative;
        background: url(../../assets/images/loading.png) 50% no-repeat;
        background-size: 50px;
        width: 100%;
        height: 100%;
        display: inline-block;
        vertical-align: top;
        border-radius: 2px;
        overflow: hidden;
        background-color: #fafafa;
        img {
            display: block;
            border: none;
            width: 100%;
            &::after {
                content: '';
                line-height: 1;
                display: block;
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: #fafafa;
            }
        }
    }
</style>