/* eslint-disable vue/no-unused-components */
<template>
<div>
   <van-nav-bar title="黑马头条" fixed>
       <van-icon name="search" slot="right"  @click="$router.push('/search')" />
   </van-nav-bar>
   <!-- 滚动条 标签 -->
   <van-tabs style="margin-top:46px;margin-bottom:50px" v-model="activeIndex">
     <van-icon name="wap-nav" class="editBtn" slot="nav-right" @click="showChannelList=true"/>
    <van-tab v-for="item  in channelList" :title='item.name' :key='item.id' >
      <!-- 下拉刷新内容 -->
    <van-pull-refresh
    v-model="currentChannel.pullloading"
    @refresh="onRefresh"
    :success-text='successText'>

      <!-- 上拉加载内容 -->
    <van-list
    v-model="currentChannel.loading"
     :finished="currentChannel.finished"
     finished-text="没有更多了"
    @load="onLoad"
   >
  <van-cell
    v-for="article in currentChannel.articles"
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
   </van-pull-refresh>
  </van-tab>
</van-tabs>
<!-- 弹出层  插件(自定义) -->
<more-action v-model="dialogStatus" :article='currentArctile' @delcurrentArt='delcurrentArt' @blackList='blackList'></more-action>

<!-- 弹出层  编辑频道列表 -->
<channel-edit v-model="showChannelList"></channel-edit>

</div>
</template>

<script>
import Vue from 'vue'
import { Lazyload } from 'vant'
import { channel } from '@/api/channels'
import { articles } from '@/api/news'
import MoreAction from './components/moreActino'
import ChannelEdit from './components/channelEdit'
import { getItem, setItem } from '@/utils/localStorage'

// options 为可选参数，无则不传
Vue.use(Lazyload)
export default {
  components: {
    MoreAction,
    ChannelEdit
  },
  data () {
    return {
      activeIndex: 0, // 标签tab项的索引
      channelList: [],
      successText: '',
      dialogStatus: false,
      showChannelList: false,
      currentArctile: null
    }
  },
  methods: {
    // 获取频道列表数据
    async hannelList () {
      // 判断用户是否登录
      let channels = []
      if (this.$store.state.user) {
        const data = await channel()
        channels = data.channels
      } else {
        channels = getItem('channel')
        if (!channels) {
          const data = await channel()
          channels = data.channels
          setItem('channel', channels)
        }
      }
      channels.forEach((channel) => {
        channel.timestamp = null
        channel.articles = []
        channel.loading = false
        channel.pullloading = false
        channel.finished = false
      })
      this.channelList = channels
      // console.log(this.channelList)
    },
    // 上拉列表 数据 视图更新
    async onLoad () {
      // 发送请求
      // 获取当前的频道对象
      // 当前频道对象的时间戳
      // 当前频道对象  文章数组
      // let currentChannel = this.channelList[this.activeIndex]
      const data = await articles(({
        // 频道的id
        channel_id: this.currentChannel.id,
        // 时间戳
        timestamp: this.currentChannel.timestamp || Date.now(),
        // 是否包含置顶
        with_top: 1
      }))
      this.currentChannel.timestamp = data.pre_timestamp
      this.currentChannel.articles.push(...data.results)
      this.currentChannel.loading = false
      if (data.results.length === 0) {
        this.currentChannel.finished = true
      }
    },
    // 下拉加载更多数据
    async onRefresh () {
      try {
        const data = await articles(({
        // 频道的id
          channel_id: this.currentChannel.id,
          // 时间戳
          timestamp: Date.now(),
          // 是否包含置顶
          with_top: 1
        }))
        this.currentChannel.timestamp = data.pre_timestamp
        this.currentChannel.articles.unshift(...data.results)
        this.successText = `已成功加载${data.results.length}条数据`
        // this.$toast('刷新成功')
        this.currentChannel.pullloading = false
      } catch (error) {
        console.log(error)
      }
    },
    // 点击X按钮  显示弹框数据
    handleAction (article) {
      this.dialogStatus = true
      this.currentArctile = article
    },
    // 当前页面  删除不敢兴趣的文章  并隐藏弹出层
    delcurrentArt () {
      this.dialogStatus = false
      // 获取要删除当前文章的索引值
      const articles = this.currentChannel.articles
      const index = articles.findIndex(article => {
        return article.art_id === this.currentArctile.art_id
      })
      articles.splice(index, 1)
    },
    // 拉黑作者  并隐藏弹出层
    blackList () {
      this.dialogStatus = false
      let articles = this.currentChannel.articles
      console.log(articles)
      this.currentChannel.articles = articles.filter(article => {
        return article.aut_id !== this.currentArctile.aut_id
      })
    }
  },
  computed: {
    currentChannel () {
      return this.channelList[this.activeIndex]
    }
  },
  created () {
    this.hannelList()
  }
}
</script >

<style lang='less' scoped>
.editBtn{
  position: fixed;
  font-size: 22px;
  right:5px;
  color:chartreuse;
  line-height: 40px;
  z-index:20
  }
  .van-nav-bar .van-icon {
    color:#fff;
    font-size: 24px
  }
</style>
