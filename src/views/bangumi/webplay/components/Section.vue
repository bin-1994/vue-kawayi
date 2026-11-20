<template>
    <div class="ep-section-module">
        <div class="section-title">{{ title }}</div>
        <div class="section-ep-wrapper" ref="secEpList">
            <ul :style="listHeight">
                <ep-item v-for="(item, index) in list" :ep-item="item" :simple-mode="false" :key="index"></ep-item>
            </ul>
        </div>
    </div>
</template>

<script>
import EpItem from './EpItem'
import { mapGetters } from 'vuex'
export default {
    name: 'Section',
    props: {
        title: {
            type: String,
            default: '标题'
        },
        list: {
            type: Array,
            default: []
        },
        index: 0
    },
    computed: {
        listHeight() {
            return {
                height: `${36 * this.list.length - 6}px`
            }
        },
        ...mapGetters('bangumi', ['EP_INFO']),
    },
    watch: {
        EP_INFO() {
            this.autoScroll()
        }
    },
    mounted() {
        this.autoScroll()
    },
    methods: {
        autoScroll() {
            this.$refs.secEpList && this.$nextTick(() => {
                this.index > 1 ? this.$refs.secEpList.scrollTop = 36 * (this.index - 2) : this.$refs.secEpList = 0
            })
        }
    },
    components: {
        EpItem
    }
}
</script>

<style lang="scss">
    .ep-section-module {
        position: relative;
        background-color: #f4f4f4;
        border-radius: 2px;
        margin-bottom: 20px;
        .section-title {
            padding: 0 16px;
            height: 42px;
            line-height: 42px;
            font-size: 16px;
            color: #212121;
            font-weight: 400;
        }
        .section-ep-wrapper {
            position: relative;
            padding: 0 6px 6px;
            display: block;
            overflow: auto;
            max-height: 175px;
            ul {
                position: relative;
            }
        }
    }
</style>