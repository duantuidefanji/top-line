<template>
  <van-list
  v-model="loading"
  :finished="finished"
  finished-text="没有更多了"
  @load="onLoad"
>
  <van-cell
    v-for="item in list"
    :key="item.id.toString()"
    :title="item.name"
  />
</van-list>
</template>

<script>
import { followings, followers } from '@/api/user'
export default {
  name: 'List',
  props: ['type'],
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      page: 1,
      per_page: 10
    }
  },
  methods: {
    async onLoad () {
      console.log(this.type)
      try {
        let data = null
        if (this.type === 1) {
          data = await followings({
            page: this.page,
            per_page: this.per_page
          })
        } else {
          data = await followers({
            page: this.page,
            per_page: this.per_page
          })
        }
        console.log(data)
        this.page++
        this.list.push(...data.results)
        this.loading = false
        if (data.results.length === 0) {
          this.finished = true
        }
      } catch (error) {

      }
    }
  }
}
</script>

<style>

</style>
