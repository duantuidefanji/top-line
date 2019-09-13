/* eslint-disable no-duplicate-case */
<template>
 <van-dialog
 :value='value'
 @input="$emit('input',$event)"
  :showConfirmButton=false
  closeOnClickOverlay
>
<!-- first 弹层 -->
<van-cell-group v-show='showReports'>
  <van-cell icon="location-o" title="不感兴趣" @click="handle('dislike')"/>
  <van-cell icon="edit" title="反馈垃圾内容" is-link @click="showReports=false"/>
  <van-cell icon="friends" title="拉黑作者"  @click="handle('blackList')"/>
</van-cell-group>
<!-- second弹层 -->
<van-cell-group  v-show='!showReports'>
  <van-cell icon="arrow-left" @click="showReports=true"/>
  <van-cell  v-for='item in reportType'
   :title="item.label"
   :key='item.value'
   @click="handle('report',item.value)"/>
</van-cell-group>
</van-dialog>
</template>

<script>
import { dislikeArticle, blackLists, reportArticle } from '@/api/news'
import { reportType } from '@/api/constant'
export default {
  name: 'moreaction',
  data () {
    return {
      showReports: true,
      reportType
    }
  },
  props: {
    value: {
      type: Boolean,
      require: true
    },
    article: {
      type: Object,
      require: true
    }
  },
  methods: {
    handle (type, reportType) {
      switch (type) {
        case 'dislike':
          this.dislike()
          break
        case 'blackList':
          this.blackList()
          break
        case 'report':
          this.reportArticles(reportType)
          break
      }
    },
    // 对文章不感兴趣操作
    async dislike () {
      // console.log(this.article.art_id)
      try {
        await dislikeArticle(this.article.art_id)
        this.$toast.success('操作成功')
        this.$emit('delcurrentArt')
      } catch (error) {
        this.$toast.fail('操作失败')
      }
    },
    // 拉黑作者操作
    async blackList () {
      try {
        await blackLists(this.article.aut_id)
        this.$toast.success('操作成功')
        this.$emit('blackList')
      } catch (error) {
        this.$toast.fail('操作失败')
      }
    },
    // 举报文章
    async reportArticles (reportType) {
      console.log(reportType, this.article.art_id.toString())
      try {
        const id = this.article.art_id.toString()
        await reportArticle({ target: id, type: reportType })
        this.$emit('input', false)
        this.$toast.success('操作成功')
      } catch (error) {
        this.$toast.fail('操作失败')
      }
    }
  },
  created () {
    // console.log(this.reportType)
    // let arr = this.reportType.filter(item => {
    //   return item.value !== 4
    // })
    // console.log(arr)
  }
}
</script>

<style>

</style>
