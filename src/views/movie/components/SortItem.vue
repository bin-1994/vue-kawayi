<template>
    <li :class="['sort-item', {on: current == item.key, 'lock-desc': '0' === item.sort, 'lock-asc': '1' === item.sort}]" @click="clickHandler">
        <i :class="['up', {active: 1 === sort}]"></i>
        <span>{{ item.title }}</span>
        <i :class="['down', {active: 0 === sort}]"></i>
    </li>
</template>

<script>
import Bus from '../../../utils/eventbus'
export default {
    name: 'SortItem',
    props: {
        item: {
            type: Object,
            required: true,
        },
        sort: {
            type: Number,
            required: true,
        },
        current: {
            type: Number,
            required: true
        }
    },
    methods: {
        clickHandler() {
            if (this.item.key === this.current) {
                '0,1' === this.item.sort && Bus.$emit('FILTER_CHANGE', {
                    sort: 1 === this.sort ? 0 : 1,
                    page: 1 
                })
            } else {
                Bus.$emit('FILTER_CHANGE', {
                    order: this.item.key,
                    sort: 0,
                    page: 1
                })
            }
        }
    }
}
</script>

<style lang="scss">
    .sort-item {
        position: relative;
        width: 80px;
        margin-right: 20px;
        float: left;
        color: #222;
        cursor: pointer;
        &.on {
            color: #00a1d6;
            i.active {
                border-color: #00a1d6 transparent;
            }
        }
        &.lock-desc i.up {
            display: none;
        }
        i {
            &.active {
                border-color: #00a1d6 rgba(0,0,0,0);
                &.up {
                    border-top: none;
                }
                &.down {
                    border-bottom: none;
                }
            }
            &.up, &.down {
                display: block;
                position: absolute;
                left: 60px;
                margin: 0 2px;
                width: 0;
                height: 0;
            }
            &.up {
                top: 0;
                border: 5px dashed rgba(0,0,0,0);
                border-top: none;
                border-bottom: 5px solid #ddd;
            }
            &.down {
                bottom: 0;
                border: 5px dashed rgba(0,0,0,0);
                border-top: 5px solid #ddd;
                border-bottom: none;
            }
        }
    }
</style>