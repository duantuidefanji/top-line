/* eslint-disable no-tabs */
<template>
<div class="auth-info">
    <div class="base-info">
      <img class="avatar" :src="articleinfo.aut_photo" alt="">
      <div>
        <p>{{articleinfo.aut_name}}</p>
        <p>{{articleinfo.pubdate|fmtDate}}</p>
      </div>
    </div>
    <div>
      <van-button
        type="danger"
        :loading="loading"
        @click="handleFollow"
      >{{articleinfo.is_followed?'取消关注':'关注'}}</van-button>
    </div>
  </div>
</template>

<script>
import { concern, cancelConcern } from '@/api/user.js'
export default {
  name: 'authorInfo',
  props: {
    articleinfo: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      loading: false
    }
  },
  methods: {
    async  handleFollow () {
      if (!this.$checkLogin()) {
        return
      }
      this.loading = true
      try {
        // 先判断用户是否登录  如果未登录  跳转到登录界面
        const id = this.articleinfo.aut_id
        if (this.articleinfo.is_followed) {
          await cancelConcern(id)
          this.articleinfo.is_followed = false
        } else {
          await concern(id)
          this.articleinfo.is_followed = true
        }
      } catch (error) {
        console.log(error)
        this.$toast.fail('操作失败')
      }
      this.loading = false
    }
  },
  created () {
    console.log(this.articleinfo)
  }

}
</script >

<style lang='less' scoped>
.auth-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 26px;
  .base-info {
    display: flex;
    align-items: center;
  }
  .avatar {
    margin-right: 10px;
    width: 100px;
    height: 100px;
    border-radius: 100%;
  }
}
</style>
