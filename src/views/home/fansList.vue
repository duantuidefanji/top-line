<template>
  <div>
      <van-nav-bar
  title="关注/粉丝"
  left-text="返回"
  left-arrow
  @click-left="$router.back()"
/>
<van-tabs v-model="active">
  <van-tab title="标签 1">
      <list :type='active'></list>
  </van-tab>
  <van-tab title="标签 2">
      <list :type='active'></list>
  </van-tab>
</van-tabs>
  </div>
</template>

<script>
import List from './list'
export default {
  name: 'FanList',
  components: {
    List
  },
  data () {
    return {
      active: 1
    }
  },
  activated () {
    console.log(this.$route.query.type)
    this.active = Number(this.$route.query.type)
  }
}
</script>

<style>

</style>
