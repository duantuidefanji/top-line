<template>
  <div>
  <!-- 搜索框 -->
      <van-search
     v-model="value"
    placeholder="请输入搜索关键词"
    show-action
    :clearable=true
    @search="onSearch(value)"
    @cancel="onCancel"
    @input='handleInput'
    background='rgb(255, 2, 255)'
  />
  <!-- 搜索提示 -->
  <van-cell-group v-show="value">
   <van-cell v-for="(item,index) in searchList"
   :key="index"
   @click="onSearch(item)"
    icon="search" >
    <div slot="title" v-html="extraShow (item)">
     </div>
   </van-cell>

 </van-cell-group>

<!-- 历史记录 -->
  <van-cell-group v-show="!value">
   <van-cell title="历史记录">
     <template>
       <div style="display:inline-block" v-show="editMode">
      <span>全部删除</span>&nbsp;
      <span @click="editMode=false">完成</span>&nbsp;
       </div>
      <van-icon name="service" v-show="!editMode" @click="editMode=true"/>
     </template>
   </van-cell>
   <van-cell v-for="(item,index) in history" :title="item" :key="item"  @click="onSearch(item)">
      <van-icon name="close" v-show="editMode" @click="delRecord(index)" />
   </van-cell>
  </van-cell-group>
  </div>
</template>

<script>
import { getSuggest } from '@/api/search'
import * as storageTools from '@/utils/localStorage'
import { mapState } from 'vuex'
import _ from 'lodash'
export default {
  name: 'Search',
  data () {
    return {
      value: '',
      searchList: [],
      editMode: false,
      history: []
    }
  },
  computed: {
    ...mapState(['user'])
  },
  created () {
    if (this.user) {
      return
    }
    this.history = storageTools.getItem('history') || []
  },
  methods: {
    extraShow (item) {
      let reg = new RegExp(this.value, 'gi')
      return item.replace(reg, `<span style='color:red'>${this.value}</span>`)
    },
    delRecord (index) {
      this.history.splice(index, 1)
      storageTools.setItem('history', this.history)
    },
    onSearch (item) {
      if (!this.history.includes(item)) {
        this.history.push(item)
      }
      if (this.user) {
        return
      }
      storageTools.setItem('history', this.history)
      this.$router.push({ name: 'SearchResult', params: { q: item } })
    },
    onCancel () {
      this.$router.back()
    },
    handleInput: _.debounce(async function () {
      if (this.value.length === 0) {
        return
      }
      try {
        const data = await getSuggest(this.value)
        this.searchList = data.options
      } catch (error) {
        console.dir(error)
      }
    }, 3000)
  }
}
</script>

<style lang='less' scoped>

</style>
