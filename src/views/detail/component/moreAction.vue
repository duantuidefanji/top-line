/* eslint-disable vue/no-duplicate-attributes */
<template>
   <div class="more-action">
    <van-button
      :icon="articleinfo.attitude===1?'star-o':'star'"
      round
      :loading="false"
      type="danger"
      @click="handlelike"
    >点赞</van-button>

    <van-button
      :icon="articleinfo.attitude===0?'delete':'gem'"
      round
      type="danger"
      @click="handlelove"
    >不喜欢</van-button>
  </div>
</template>

<script>
import { liking, disliking } from '@/api/article.js'
export default {
  name: 'moreAction',
  data () {
    return {
      list: 'lili'
    }
  },
  props: {
    articleinfo: {
      type: Object,
      required: true
    }
  },
  created () {
    // console.dir(this.list)
  },
  methods: {

    //   点赞或者取消点赞操作
    async  handlelike () {
      // console.dir(this.articleinfo)
      // 判断是否登录
      if (!this.$checkLogin()) {
        return
      }

      const id = this.articleinfo.art_id.toString()
      console.log(id)
      try {
        if (this.articleinfo.attitude === 1) {
          await disliking(id)
          this.articleinfo.attitude = -1
        } else {
          await liking(id)
          this.articleinfo.attitude = 1
        }
      } catch (error) {
        console.log(error)
        this.$toast.fail('操作失败')
      }
    }
  }
}
</script>
<style lang="less" scoped>
.more-action {
  padding: 20px;
  display: flex;
  justify-content: space-around;
}
</style>
