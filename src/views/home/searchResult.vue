/* eslint-disable no-tabs */
<template>
  <div>
  <van-nav-bar
  title="详情..."
  fixed
  left-arrow
  @click-left="$router.back()"
/>
<!-- 搜索结果展示 -->
<van-list
  v-model="loading"
  :finished="finished"
  finished-text="没有更多了"
  @load="onLoad"
>
<van-cell
    v-for="article in list"
    :key="article.art_id.toString()"
    :title="article.title"
    @click="$router.push({name:'detail',params:{id:article.art_id.toString()}})"
    >
    <template slot="label">
  <van-grid :border="false" :column-num="3" v-if='article.cover.type'>
    <van-grid-item v-for="(img,index) in article.cover.images" :key="img+index" >
      <van-image :src="img" height='80' lazy-load>
        <template v-slot:loading>
    <van-loading type="spinner" size="20" />
  </template>
    <template v-slot:error>加载失败</template>
      </van-image>
  </van-grid-item>
    </van-grid>
      <span>{{article.aut_name}}</span>&nbsp;
      <span>{{article.comm_count}}</span>&nbsp;
      <span>{{article.pubdate|fmtDate }}</span>&nbsp;
      <van-icon style="float:right" name="close" @click.stop="handleAction(article)" />
    </template>
  </van-cell>
</van-list>
  </div>
</template>

<script>
import { searchResult } from '@/api/search'
export default {
  name: 'SearchResult',
  props: ['q'],
  data () {
    return {
      loading: false,
      finished: false,
      list: [],
      page: 1,
      per_page: 10
    }
  },
  methods: {
    async onLoad () {
      try {
        const data = await searchResult({
          page: this.page, // 页数，不传默认为1
          per_page: this.per_page, // 每页数量，不传每页数量由后端决定
          q: this.q// 搜索关键词
        })
        this.list.push(...data.results)
        this.page++
        this.loading = false
        if (data.results.leng === 0) {
          this.finished = true
        }
      } catch (error) {
        console.dir(error)
        this.$toast.fail('操作失败')
      }
    }
  }
}
</script>

<style lang='less' scoped>
.van-icon-arrow-left{
    color:#fff
}
</style>
