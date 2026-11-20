<template>
    <div class="page-list clearfix" v-if="totalPages > 1">
        <a href="javascript:;" class="page prev-page" @click="jump(currPage - 1)" v-if="hasPrevPage">上一页</a>
        <a href="javascript:;" class="page index-page" @click="jump(1)" v-if="hasIndexPage">1</a>
        <strong v-if="hasIndexOmit">...</strong>
        <a href="javascript:;" v-for="(page, index) in maxDisplayPages" :key="index" :class="['page', {active: page === active}]" @click="jump(cachePages[page])">{{ cachePages[page] }}</a>
         <strong v-if="hasEndOmit">...</strong>
         <a href="javascript:;" class="page end-page" @click="jump(totalPages)" v-if="hasEndPage">{{ totalPages }}</a>
        <a href="javascript:;" class="page next-page" @click="jump(currPage + 1)" v-if="hasNextPage">下一页</a>
        <div class="custom-right" v-if="isJump">
            <span class="custom-raight-inner">共 {{ totalPages }} 页/{{ count }} {{ unit }}，跳至</span>
            <input type="text" class="custompage" v-model="pageText" maxlength="4" @keyup.enter="skip()" @input="$event.target.composing || (pageText = $event.target.value)">
            <span class="custom-raight-inner">页</span>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Pagination',
    props: {
        count: {
            type: Number,
            default: 0
        },
        unit: {
            type: String,
            default: '个'
        },
        currPage: {
            type: Number,
            default: 1
        },
        totalPages: {
            type: Number,
            default: 1
        },
        maxShow: {
            type: Number,
            default: 5
        },
        isJump: {
            type: Boolean,
            default: true
        }
    },
    data() {
        return {
            pageText: '',
            cachePages: []
        }
    },
    created() {
       this.resetPageCache() 
    },
    watch: {
        currPage() {
           this.resetPageCache() 
        },
        totalPages() {
            this.resetPageCache()
        }
    },
    computed: {
        active() {
            let offset = Math.ceil(this.maxShow / 2),
                maxPage = this.totalPages - offset + 1
            return this.totalPages <= this.maxShow ? this.currPage : this.currPage >= offset && this.currPage <= maxPage ? this.currPage < offset ? this.currPage : offset : this.currPage < offset ? this.currPage : this.currPage > maxPage ? this.maxShow - (this.totalPages - this.currPage) : this.currPage < offset ? this.currPage : offset
        },
        maxDisplayPages() {
            return this.totalPages > this.maxShow ? this.maxShow : this.totalPages
        },
        hasIndexPage() {
            return 1 !== this.cachePages[1]
        },
        hasEndPage() {
            return this.totalPages !== this.cachePages[this.maxDisplayPages]
        },
        hasIndexOmit() {
            return this.cachePages[1] > 2
        },
        hasEndOmit() {
            return this.totalPages - this.cachePages[this.maxDisplayPages] > 1
        },
        hasPrevPage() {
            return this.currPage > 1
        },
        hasNextPage() {
            return this.currPage < this.totalPages
        }
    },
    methods: {
        resetPageCache() {
            'number' != typeof this.currPage && (this.currPage = parseInt(this.currPage),
            isNaN(this.currPage) && (this.currPage = 1)),
            'number' != typeof this.totalPages && (this.totalPages = parseInt(this.totalPages),
            isNaN(this.totalPages) && (this.totalPages = 1))
            let offset = Math.ceil(this.maxShow / 2),
                maxPage = this.totalPages - offset + 1,
                maxDisplayPages = this.maxDisplayPages
            this.cachePages = [0]
            for (let i = 1; i <= maxDisplayPages; i++) {
                this.totalPages <= this.maxShow ? this.cachePages[i] = i : this.currPage >= offset && this.currPage <= maxPage ? this.cachePages[i] = i + this.currPage - offset : this.currPage < offset ? this.cachePages[i] = i : this.currPage > maxPage && (this.cachePages[i] = this.totalPages - this.maxShow + i)
            }
        },
        jump(page) {
            this.pageText = '',
            page > 0 && page <= this.totalPages && this.$emit('change', page)
        },
        skip() {
            let page = this.pageText,
                pageText = ['first', '<<<']
            pageText.indexOf(page) >= 0 ? this.jump(1) : (pageText = ["last", ">>>"]).indexOf(page) >= 0 ? this.jump(this.totalPages) : (pageText = ["prev", "<", "<<"]).indexOf(page) >= 0 ? this.jump(this.currPage - 1) : (pageText = ["next", ">", ">>"]).indexOf(page) >= 0 ? this.jump(this.currPage + 1) : this.jump(parseInt(page))
        }
    }
}
</script>

<style lang="scss">
    .page-list {
        display: block;
        height: 40px;
        white-space: nowrap;
        padding-right: 20px;
        .page {
            display: inline-block;
            min-width: 17px;
            font-size: 14px;
            height: 38px;
            border-radius: 4px;
            background-color: #fff;
            color: #222;
            text-align: center;
            line-height: 38px;
            padding: 0 8px;
            border: 1px solid #ddd;
            transition: all .2s ease;
            margin-right: 4px;
            &.active, &:hover {
                background-color: #00a1d6;
                color: #fff;
                border-color: #00a1d6;
            }
            &:last-child {
                margin-right: 0;
            }
        }
        .page.next-page, .page.prev-page {
            padding: 0 15px;
        }
        strong {
            display: inline-block;
            margin-right: 4px;
            width: 35px;
            height: 40px;
            line-height: 40px;
            text-align: center;
            font-weight: 400;
            font-size: 14px;
        }
        .custom-right {
            float: right;
            .custom-raight-inner {
                display: inline-block;
                vertical-align: top;
                min-width: 15px;
                margin: 0 2px;
                height: 40px;
                line-height: 40px;
                font-size: 12px;
                color: #99a2aa;
                padding: 0 2px;
            }
            .custompage {
                position: relative;
                margin-top: 7px;
                padding: 0 10px;
                width: 30px;
                height: 24px;
                line-height: 24px;
                border-radius: 4px;
                border: 1px solid #ccd0d7;
                background-color: #fff;
                text-align: center;
                outline: none;
                transition: border .2s ease;
                vertical-align: middle;
                color: #99a2aa;
                font-size: 12px;
                &:hover {
                    border-color: #00a1d6;
                }
            }
        }
    }
</style>