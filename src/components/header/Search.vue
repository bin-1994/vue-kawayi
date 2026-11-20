<template>
    <div class="nav-search-box">
        <div class="search-form-wrap">
            <div class="search-form">
                <input type="text" class="search-input" name="keyword" v-model="keyword" autocomplete="off" :placeholder="tips"  @focus="inputFocus" @keydown="inputKeyupEvent" @input="handleChange">
                <div class="nav-search-btn" @click="searchEvent(keyword)">
                    <button class="iconfont search-button icon-search"></button>
                </div>
            </div>
            <search-suggest ref="suggest" :keyword="suggestKeyword" v-show="showSuggest" @searchEvent="searchEvent" @updateHistory="updateHistory" @updateSuggest="updateSuggest" :suggest-focus="suggestFocus"></search-suggest>
        </div>
    </div>
</template>

<script>
import SearchSuggest from '../../views/search/components/Suggest.vue'
export default {
    name: 'MainSearch',
    data() {
        return {
            keyword: '',
            suggestKeyword: '',
            suggestFocus: -1,
            showSuggest: false,
            suggestLength: 0,
            suggestList: []
        }
    },
    computed: {
        tips() {

            let today = new Date(),
                happy = {
                    '1/1': '新年伊始，喜气洋洋',
                    '2/14': '愿天下相爱的人，爱意绵绵！',
                    '4/1': '今天被人捉弄了吗＞﹏＜',
                    '6/1': '永远有颗童心',
                    '10/1': '山河壮丽，江山不老',
                    '12/25': '叮叮当，叮叮当，铃儿响叮当',
                },
                key = `${today.getMonth() + 1}/${today.getDate()}`
            
            return happy[key] ? happy[key] : '搜索'
        },
        selectedWord() {
            if (this.showSuggest && this.suggestFocus > -1) {
                return this.suggestList[this.suggestFocus].title
            }
        }
    },
    mounted() {
        document.addEventListener('mousedown', (event) => {
            let element = document.querySelector('.search-form-wrap')
            element.contains(event.target) || (this.showSuggest = false, this.suggestFocus = -1)
        })
    },
    destroyed() {
        document.removeEventListener('click', () => {})
    },
    watch: {
        // suggestFocus(value) {
        //     value && (this.keyword && this.$nextTick(() => {
        //         this.suggestKeyword = this.keyword
        //     }))
        // },
        selectedWord(value) {
            value && (this.keyword = value)
        }
    },
    methods: {
        search() {
            let url = this.$router.resolve({
                path: '/search',
                query: {keyword: this.keyword}
            })
            window.open(url .href, '_blank')
        },
        handleChange(event) {
            if (!event.target.value) {
                return this.keyword = '',
                this.suggestKeyword = '',
                this.suggestFocus = -1
            }
            this.keyword = event.target.value,
            this.$nextTick(() => {
                this.suggestKeyword = event.target.value
            })
        },
        searchEvent(keyword) {
            if (this.suggestFocus > -1) {
                keyword = this.suggestList[this.suggestFocus].title
            }
            keyword = keyword.trim()
            let url = this.$router.resolve({
                path: '/search',
                query: {keyword: keyword}
            })
            window.open(url .href, '_blank')
            // this.$router.replace({path: `/search`, query: {keyword: keyword}})
            // this.showSuggest = false
        },
        inputFocus() {
            this.showSuggest = true
            this.$refs.suggest.loadSuggest()
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
    .nav-search-box {
        position: relative;
        margin: 10px;
        width: 500px;
        transition: .3s width;
        .search-form {
            background: #f4f4f4;
            border: 1px solid #e7e7e7;
            padding: 0 38px 0 16px;
            display: block;
            border-top-left-radius: 6px;
            border-bottom-left-radius: 6px;
            .search-input {
                overflow: hidden;
                width: 100%;
                height: 34px;
                border: none;
                background-color: transparent;
                box-shadow: none;
                color: #999;
                font-size: 14px;
                line-height: 34px;
                transition: all .2s;
            }
            .nav-search-btn {
                position: absolute;
                top: 0;
                right: 0;
                margin: 0;
                padding: 0;
                width: 48px;
                height: 36px;
                border: none;
                border-top-right-radius: 6px;
                border-bottom-right-radius: 6px;
                background-color: #e7e7e7;
                line-height: 26px;
                cursor: pointer;
            }
            .search-button {
                position: absolute;
                top: 8px;
                right: 16px;
                margin: 0;
                padding: 0;
                border: none;
                background: none;
                color: #505050;
                line-height: 20px;
                cursor: pointer;
                transition: all .2s;
                font-size: 16px;
            }
        }
    }
</style>