<template>
  <div >
 <van-nav-bar
 title="哈哈"
 left-text="返回"
  @click-left="$router.back()"
 fixed
 left-arrow />
 <div class="article" style="margin-top:46px" v-if='articleList'>
      <!-- 文章标题 -->
      <h2 class="article-title">{{articleList.title}}{{articleList.art_id.toString()}}</h2>
      <!-- 作者信息 -->
      <author-info :articleinfo='articleList'></author-info>
      <!-- 文章内容 -->
      <div class="article-content" v-html="articleList.content">
      </div>
      <!-- 点赞和取消 -->
   <more-action :articleinfo='articleList'></more-action>
      <comment-list :isArticle="true" :source="articleList.art_id"></comment-list>
      <send-comment :isArticle="true" :target='articleList.art_id.toString()'></send-comment>
      <reply-list v-model="showReplyList" :id='articleList.art_id.toString()'></reply-list>
    </div>
  </div>
</template>

<script>
import { getArticles } from '@/api/article'
import AuthorInfo from './component/authorInfo' // 关注作者
import MoreAction from './component/moreAction' // 点赞 喜欢文章
import CommentList from './component/commentList' // 评论列表模块
import SendComment from './component/sendComment' // 发送评论
import ReplyList from './component/replyList' // 显示回复列表
import { mapState } from 'vuex'

export default {
  name: 'Detail',
  props: ['id'],
  components: {
    AuthorInfo,
    MoreAction,
    CommentList,
    SendComment,
    ReplyList
  },
  data () {
    return {
      articleList: null
      // showReplyList: false
    }
  },
  methods: {
    async loadData () {
      try {
        this.articleList = await getArticles(this.id)
        console.dir(this.articleList)
      } catch (error) {
        console.log(error)
        this.$toast.fail('数据获取失败')
      }
    }
  },
  computed: {
    ...mapState(['showReplyList'])
  },
  created () {
    this.loadData()
    console.log(this.articleList)
  }
}
</script>

<style lang='less' scoped>
.van-icon,.van-nav-bar__text{
    color:#fff
}
.article{
  .article {
  margin-top: 92px;
  padding: 0px 20px;
  .article-title {
    font-size: 40px;
    font-weight: bold;
  }
  .article-content {
    font-size: 26px;
  }
}
}
</style>
