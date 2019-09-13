<template>
  <div>
      <router-view></router-view>
    <van-tabbar  route >
  <van-tabbar-item  replace to="/" icon="home-o">首页</van-tabbar-item>
  <van-tabbar-item  replace to="/search" icon="search">搜索</van-tabbar-item>
  <van-tabbar-item  replace to="/video" icon="friends-o">视频</van-tabbar-item>
  <van-tabbar-item  replace to="/user" icon="setting-o">{{user?'用户':'未登录'}}</van-tabbar-item>
</van-tabbar>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'TabBar',
  computed: {
    ...mapState(['user'])

  }
}
</script>

<style>

</style>
