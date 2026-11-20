<template>
    <div class="filter-block">
        <div class="filter-name">{{ filterName }}</div>
        <ul :class="['filter-item-wrapper', {free: free}]" :style="style">
            <li :class="['filter-item', {on: cursor === item.value}]" v-for="(item, index) in list" :key="index" :title="item.name" @click="cursorItem(item.value)">{{ item.name }}</li>
            <li class="btn-expand" v-if="expandShow" @click="expandHandler">{{ expandName }}</li>
        </ul>
    </div>
</template>

<script>
import Bus from '../../../utils/eventbus'
export default {
    name: 'FilterBlock',
    data() {
        return {
            expand: false,
            cursor: 0
        }
    },
    props: {
        filterName: {
            type: String,
            required: true
        },
        minLine: {
            type: Number,
            default: 0
        },
        list: {
            type: Array,
            required: true
        },
        filterKey: {
            type: String,
            required: true
        },
        free: {
            type: Boolean,
            default: false
        }
    },
    mounted() {
        Bus.$on('FILTER_RESET', () => {
            this.cursor = this.list[0] ? this.list[0].value : 0
        })
        Bus.$on('FILTER_INIT', (param) => {
            this.cursor = param[this.filterKey]
        })
    },
    computed: {
       maxLine() {
           return Math.ceil(this.list.length / 4)
       },
       style() {
           if (this.minLine > 0 && this.maxLine > this.minLine && !this.free) {
               return {
                   height: this.expand ? `${30 * (this.maxLine + 1)}px` : `${30 * this.minLine}px`
               }
           } else {
               return {}
           }
       },
       expandShow() {
           return this.minLine > 0 && this.maxLine > this.minLine && !this.free
       },
       expandName() {
           return this.expand ? "收起" : "展开"
       }
    },
    methods: {
        cursorItem(value) {
            this.cursor = value
            let params = {
                page: 1
            }
            params[this.filterKey] = value
            Bus.$emit('FILTER_CHANGE', params)
        },
        expandHandler() {
            this.expand = !this.expand
        }
    }
}
</script>

<style lang="scss">
    .filter-block {
        position: relative;
        margin-bottom: 16px;
        overflow: hidden;
        .filter-name {
            display: block;
            float: left;
            width: 52px;
            height: 30px;
            line-height: 1;
            font-size: 14px;
            color: #99a2aa;
        }
        .filter-item-wrapper {
            width: 208px;
            float: right;
            overflow: hidden;
            transition: all .3s linear;
            min-height: 30px;
            &.free .filter-item {
                width: auto;
                padding-right: 20px;
            }
            .filter-item {
                display: inline-block;
                vertical-align: top;
                line-height: 1;
                text-align: left;
                width: 50px;
                height: 30px;
                font-size: 14px;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                padding-right: 2px;
                cursor: pointer;
                outline: 0;
                &.on {
                    color: #00a1d6;
                }
            }
            .btn-expand {
                position: absolute;
                width: 38px;
                height: 18px;
                border: 1px solid #ccd0d7;
                font-size: 12px;
                color: #99a2aa;
                border-radius: 4px;
                text-align: center;
                line-height: 18px;
                bottom: 14px;
                right: 18px;
                cursor: pointer;
                background-color: #fff
            }
        }
    }
</style>