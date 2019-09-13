<template>
<div>
  <!-- 未登录 -->
  <div class="notLogin" @click="handleLogin" v-if='!user'>
    <div class="circle">
      <span>登录</span>
    </div>
  </div>
  <!-- 已登录 -->
   <van-cell-group class="user-info" v-else>
    <van-cell class="base-info" is-link
    to="/user-edit"
   :border="false">
      <div slot="title">
        <img class="avatar" :src="userList.photo" alt="">
        <span class="title">{{userList.name}}</span>
      </div>
    </van-cell>
    <van-grid class="data-info" :border="false">
      <van-grid-item>
        <span class="count">{{userList.art_count}}</span>
        <span class="text">头条</span>
      </van-grid-item>
      <van-grid-item @click="$router.push('/fans?type=0')">
        <span class="count">{{userList.follow_count}}</span>
        <span class="text">关注</span>
      </van-grid-item>
      <van-grid-item @click="$router.push('/fans?type=1')">
        <span class="count">{{userList.fans_count}}</span>
        <span class="text">粉丝</span>
      </van-grid-item>
      <van-grid-item>
        <span class="count">{{userList.like_count}}</span>
        <span class="text">获赞</span>
      </van-grid-item>
    </van-grid>
  </van-cell-group>
<van-cell-group>
  <van-grid clickable>
    <van-grid-item icon="star" text="我的收藏"/>
    <van-grid-item icon="chat" text="我的评论"/>
    <van-grid-item icon="like" text="我的点赞"/>
    <van-grid-item icon="browsing-history" text="浏览历史"/>
  </van-grid>
</van-cell-group>
<van-cell-group>
  <van-cell title="消息通知" is-link />
  <van-cell title="用户反馈" is-link />
  <van-cell title="小智同学" is-link />
  <van-cell title="系统设置" is-link to="/settings" />
</van-cell-group>
</div>
</template>

<script>
import { mapState } from 'vuex'
import { getuserInfo } from '@/api/user'
export default {
  name: 'User',
  data () {
    return {
      userList: {}
    }
  },
  computed: {
    ...mapState(['user'])
  },
  methods: {
    handleLogin () {
      this.$router.push({
        path: '/login',
        query: {
          redirect: this.$route.fullPath
        }
      })
    },
    async loadUserInfo () {
      if (!this.$checkLogin) {
        return
      }
      try {
        const data = await getuserInfo()
        console.log(data)
        this.userList = data
      } catch (error) {
        console.dir(error)
        this.$toast.fail('获取用户信息失败')
      }
    }
  },
  created () {
    this.loadUserInfo()
  }
}
</script>

<style lang='less' scoped>
.notLogin{
  margin-top:200px;
  height: 300px;
  display:flex;
  justify-content: center;
  .circle{
    width: 300px;
    height: 300px;
    border-radius:50%;
    background-color: red;
    display:flex;
    justify-content: center;
    justify-items: center;
    span{
      text-align: center;
      color:chartreuse;
      font-size: 30px;
      line-height: 300px;
    }
  }
}
.user-info {
  .base-info {
    display: flex;
    align-items: center;
    background-color: #0096fa;
    div {
      display: flex;
      align-items: center
    }
    .avatar {
      margin-right: 30px;
      width: 100px;
      border-radius: 100%;
    }
  }
  .data-info {
    .text {
      font-size: 28px;
    }
    .count {
      font-size: 24px;
    }
  }
  /deep/ .van-cell__right-icon {
    color: #fff
  }
  /deep/ .van-grid-item__content {
    background-color: #0096fa;
  }
}
</style>
