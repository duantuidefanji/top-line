<template>
<van-popup
  :value='value'
  v-if='currentComment'
  @input="$store.commit('showReply',$event)"
  position="bottom"
  :style="{ height: '80%' }"
>
<van-nav-bar>
  <template slot="title">
    共有{{currentComment.reply_count}} 条评论
  </template>
</van-nav-bar>
  <van-cell>
        <div slot="icon">
          <img class="avatar" :src="currentComment.aut_photo" alt="">
        </div>
        <div slot="title">
          <span>{{currentComment.aut_name}}</span>&nbsp;
          <van-tag mark>楼主</van-tag>
        </div>
        <div slot="default">
          <van-button  icon="like-o" size="mini" plain :class="{'light-reply':!currentComment.is_liking }">赞</van-button>
        </div>
        <div slot="label">
          <p>{{currentComment.content}}</p>
          <p>
            <span>{{currentComment.pubdate|fmtDate}}</span>
            <span>回复{{currentComment.comm_count}}</span>
          </p>
        </div>
      </van-cell>
 <!-- 评论的回复列表 -->
  <h2>全部回复</h2>
 <comment-list :isArticle="false" :source='currentComment.com_id.toString()'></comment-list>
 <!-- 发表评论回复 -->
 <send-comment :isArticle="false" :target='currentComment.com_id.toString()'
 :id="id"></send-comment>
</van-popup>
</template>

<script>
import { mapState } from 'vuex'
import CommentList from './commentList'
import SendComment from './sendComment'
import eventhub from '@/utils/eventHub'
export default {
  name: 'ReplyList',
  components: {
    CommentList,
    SendComment
  },
  props: {
    value: {
      type: Boolean,
      required: true
    },
    id: {
      required: true
    }
  },
  computed: {
    ...mapState(['currentComment'])
  },
  created () {
    eventhub.$on('sendSuccess', () => {
      this.currentComment.reply_count++
    })
  },
  methods: {
  }
}
</script>

<style lang='less' scoped>
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
