<template>
    <div>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell
        v-for="(comment,index) in commentLIst"
        :key="index"
      >
        <div slot="icon">
          <img class="avatar" :src="comment.aut_photo" alt="">
        </div>
        <div slot="title">
          <span>{{comment.aut_name}}</span>
        </div>
        <div slot="default">
          <van-button  icon="like-o" size="mini" plain :class="{'light-reply':!comment.is_liking }">赞</van-button>
        </div>
        <div slot="label">
          <p>{{comment.content}}</p>
          <p>
            <span>{{comment.pubdate|fmtDate}}</span>
            ·
            <span @click="replyList(comment)">回复{{comment.comm_count}}</span>
          </p>
        </div>
      </van-cell>
    </van-list>
  </div>
</template>

<script>
import { comments } from '@/api/article'
import { mapMutations } from 'vuex'
import eventHub from '@/utils/eventHub'
export default {
  name: 'CommentList',
  props: ['isArticle', 'source'],
  data () {
    return {
      loading: false,
      finished: false,
      limit: 10,
      offset: null,
      commentLIst: []
    }
  },
  methods: {
    ...mapMutations(['showReply', 'postComment']),
    //   获取评论列表数据
    async  onLoad () {
      try {
        const data = await comments({
          isArticle: this.isArticle,
          source: this.source.toString(),
          offset: this.offset,
          limit: this.limit
        })
        console.log(data)
        this.offset = data.last_id
        this.commentLIst.push(...data.results)
        this.loading = false
        if (data.results.length === 0) {
          this.finished = true
        }
      } catch (error) {
        console.dir(error)
        this.$toast.fail('获取评论失败')
      }
    },
    replyList (comment) {
      this.showReply(true)
      this.postComment(comment)
    }
  },
  created () {
    eventHub.$on('sendSuccess', (obj) => {
      if (this.isArticle === obj.isArticle) {
        this.commentLIst.unshift(obj.comment)
      }
    })
  }
}
</script>

<style lang="less" scoped>
.avatar {
  width: 50px;
  height: 50px;
  border-radius: 100%;
  margin-right: 10px;
}
.light-reply{
  color:chartreuse;
  background-color : red;
}
</style>
