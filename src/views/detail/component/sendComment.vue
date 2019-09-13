<template>
   <div class="add-comment">
   <div class="input-wrap">
     <input type="text" v-model='content'>
   </div>
   <div class="more-wrap">
     <van-icon
     v-if='!isArticle'
       name="star-o"></van-icon>
     <van-button
       size="small" @click="sendCommend">发布</van-button>
   </div>
 </div>
</template>

<script>
import { addComment } from '@/api/article.js'
import eventHub from '@/utils/eventHub'
export default {
  name: 'SendComment',
  props: ['isArticle', 'target', 'id'],
  data () {
    return {
      content: ''
    }
  },
  methods: {
    async sendCommend () {
      if (!this.$checkLogin()) {
        return
      }
      if (this.content.length === 0) {
        this.$toast('请输入评论内容')
        return
      }
      try {
        const data = await addComment({
          target: this.target,
          content: this.content,
          art_id: this.id
        })
        console.dir(data.new_obj)
        eventHub.$emit('sendSuccess', {
          comment: data.new_obj,
          isArticle: this.isArticle
        })
        this.$toast.success('添加评论成功')
        this.content = ''
      } catch (error) {
        console.dir(error)
        this.$toast.fail('操作失败')
      }
    }
  }
}

</script>

<style lang='less' scoped>
.add-comment {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  background: #fff;
  padding: 10px;
  border-top: 2px solid #ccc;
  display: flex;
  align-items: center;
  justify-content: space-around;
  .input-wrap {
    padding: 5px;
    border: 1px solid #ccc;
    border-radius: 10px;
    height: 30px;
    display: flex;
    align-items: center;
    width: 50%;
    input {
      border: none;
      color: #999;
      font-size: 15px;
    }
  }
  .more-wrap {
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: space-evenly;
  }
}
</style>
