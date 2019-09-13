<template>
  <div>
      <van-nav-bar
  title="个人信息"
  right-text="保存"
  left-arrow
  @click-left="$router.back()"
  @click-right="onClickRight"
/>
<van-cell-group>
  <van-cell title="头像" is-link @click="show=true" >
    <img :src="userList.photo" alt="" style="width:50px;height:50px">
  </van-cell>
</van-cell-group>
<van-cell-group>
  <van-cell title="昵称" :value="userList.name" is-link />
</van-cell-group>
<van-cell-group>
  <van-cell title="性别"  is-link>
      <template>{{userList.gender?'女':'男'}}</template>
  </van-cell>
</van-cell-group>
<van-cell-group>
  <van-cell title="生日" value="userList.birthday" is-link/>
</van-cell-group>
<upload-file v-model="show" @upload='handleSuccess'></upload-file>
  </div>
</template>

<script>
import { getUserProfile } from '@/api/user'
import UploadFile from './components/dialog'
export default {
  name: 'userInforEdit',
  components: {
    UploadFile
  },
  data () {
    return {
      userList: {},
      show: false
    }
  },
  methods: {
    async loadInfo () {
      try {
        const data = await getUserProfile()
        this.userList = data
      } catch (error) {
        console.dir(error)
      }
    },
    onClickRight () {},
    handleSuccess (photo) {
      this.userList.photo = photo
    }
  },
  created () {
    this.loadInfo()
  }
}
</script>

<style lang='less' scoped>
.van-nav-bar .van-icon{
    color:#fff
}
.van-nav-bar__text{
    color:#fff
}
</style>
