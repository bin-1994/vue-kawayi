<template>
    <div class="comment-wrapper">
        <div class="comment-top">
            <span class="comment-count">0</span>
            <span>评论</span>
        </div>
        <div class="comment"></div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    name: 'Comment',
    mounted() {
        this.loadComment()
    },
    watch: {
        EP_INFO() {
            // console.log("ep改变了")
            // window.comment.removeEvent()
            // console.log(window.comment)
            // $('.comment').find('*').off()
        //     $('.comment').off().html('')
            this.loadComment()
        }
    },
    methods: {
        loadComment() {
            window.comment && window.comment.removeEvent && window.comment.removeEvent() && (window.comment = null)
            window.comment = new Comment(this.commentParmas)
        },
    },
    computed: {
      ...mapGetters('bangumi', ['MEDIA_INFO', 'EP_INFO']),
      commentParmas() {
          return {
                container: '.comment',
                media_id: this.MEDIA_INFO.media_id,
                ep_id: this.EP_INFO.ep_id,
                readOnly: this.MEDIA_INFO.episodes.length == 0 ? true : false,
                userInfo: this.$store.state.userInfo || {}
          }
      }
    },
}
</script>

<style lang="scss">
    .comment-wrapper {
        padding-top: 20px;
        border-top: 1px solid #e5e9ef;
        .comment-top {
            font-size: 18px;
            line-height: 24px;
            color: #222;
            margin-bottom: 20px;
            .comment-count {
                margin-right: 10px;
            }
        }
        .comment {
            position: relative;
        }
    }
</style>