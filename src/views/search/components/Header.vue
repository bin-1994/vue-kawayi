<template>
    <div class="search-header">
        <div class="input-wrap">
            <input type="text" class="search-keyword" name="keyword" v-model="keyword" autocomplete="off" maxlength="100" @keydown="inputKeyupEvent" @focus="inputFocus" @blur="inputBlur">
            <search-suggest ref="suggest" :keyword="keyword" v-show="showSuggest" @searchEvent="searchEvent" @updateHistory="updateHistory" @updateSuggest="updateSuggest" :suggest-focus="suggestFocus"></search-suggest>
        </div>
        <button type="submit" class="search-button" @click="searchEvent(keyword)">
            <i class="iconfont icon-search"></i>
            搜索
        </button>
    </div>
</template>

<script>
import SearchSuggest from './Suggest.vue'
export default {
    name: 'SearchHeader',
    data() {
        return {
            keyword: this.$route.query.keyword,
            showSuggest: false,
            suggestFocus: -1,
            suggestList: [],
            suggestLength: 0,
            historyLength: 0,
            isFocus: false
        }
    },
    watch: {
        '$route.query.keyword'(value) {
            this.keyword = value || ''
        },
        isFocus(value) {
            value && (this.showSuggest = true)
        },
    },
    mounted() {
        // document.addEventListener('click', (event) => {
        //     let element = document.querySelector('.search-header')
        //     element.contains(event.target) || (this.showSuggest = false, this.suggestFocus = -1)
        // })
        document.addEventListener('mousedown', (event) => {
            let element = document.querySelector('.search-header')
            element.contains(event.target) || (this.showSuggest = false, this.suggestFocus = -1)
        })
        this.saveHistory(this.keyword)
    },
    destroyed() {
        document.removeEventListener('mousedown', () => {})
    },
    computed: {
        whichList() {
            return '' === this.keyword && 0 === this.historyLength ? 'hot' : ('' !== this.keyword && this.suggestLength, 'suggest')
        }
    },
    methods: {
        search() {
            this.$router.push({path: `/search`, query: {keyword: this.keyword}})
        },
        inputFocus() {
            // this.showSuggest = true
            
            console.log(`焦点`)
            this.isFocus = true
            this.$refs.suggest.loadSuggest()
        },
        inputBlur() {
            console.log(`失去焦点`)
            this.isFocus = false
        },
        saveHistory(keyword) {
            let history = JSON.parse(window.localStorage.getItem('search_history')) || []
            let index = history.findIndex(item => item.keyword == keyword)
            index >= 0 && history.splice(index, 1)
            history.length >= 20 && history.pop()
            history.unshift({keyword: keyword, time: new Date().getTime() / 1000})
            window.localStorage.setItem('search_history', JSON.stringify(history))
        },
        searchEvent(keyword) {
            if (this.suggestFocus > -1) {
                keyword = this.suggestList[this.suggestFocus].title
            }
            keyword = keyword.trim()
            
            this.saveHistory(keyword)

            this.$router.replace({path: `/search`, query: {keyword: keyword}})
            this.showSuggest = false
        },
        updateHistory(list) {
            this.historyLength = list.length
        },
        updateSuggest(list) {
            this.suggestLength = list.length
            this.suggestList = list
            this.suggestFocus = -1
            this.hotFocus = -1
        },
        focusUp() {
            this.showSuggest && (this.suggestFocus = Math.max(this.suggestFocus - 1, 0))
        },
        focusDown() {
            this.showSuggest && (this.suggestFocus = Math.min(this.suggestFocus + 1, this.suggestLength - 1))
        },
        inputKeyupEvent(event) {
            switch (event.keyCode) {
                case 38:
                    event.preventDefault()
                    this.focusUp()
                    break
                case 40:
                    event.preventDefault()
                    this.focusDown()
                    break
                case 9:
                case 13:
                    this.searchEvent(this.keyword)
                    break
                case 27:
                    this.showSuggest = false
                    break
                default:
                    setTimeout(() => {
                        this.showSuggest = true
                    }, 100)
            }
        }
    },
    components: {
        SearchSuggest
    }
}
</script>

<style lang="scss">
    .search-header {
        width: 600px;
        height: 44px;
        margin: 40px auto 0;
        position: relative;
        .input-wrap {
            position: relative;
            background: #fff;
            border-radius: 2px;
            float: left;
            margin-right: 10px;
            width: 500px;
            .search-keyword {
                width: 466px;
                border: 2px solid #ccd0d7;
                height: 18px;
                border-radius: 2px;
                font-size: 16px;
                outline: none;
                padding: 11px 15px;
                background: transparent;
                box-shadow: none;
                &:focus {
                    border-color: #00a1d6;
                }
            }
        }
        .search-button {
            float: left;
            color: #fff;
            background-color: #00a1d6;
            border: none;
            font-size: 16px;
            line-height: 44px;
            text-align: center;
            width: 90px;
            border-radius: 2px;
            cursor: pointer;
            &:hover {
                background-color: #00b5e5;
            }
            .icon-search {
                width: 21px;
                height: 21px;
                margin-top: -4px;
                vertical-align: middle;
                font-size: 21px;
                display: inline-block;
            }
        }
    }
</style>