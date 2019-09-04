<template>
  <div>
    <!-- 导航头 -->
    <van-nav-bar title="登录" />
    <van-cell-group>
      <van-field
        placeholder="请输入手机号"
        right-icon="question-o"
        left-icon="phone-o"
        v-model="user.mobile"
      />
      <van-field
        placeholder="请输入验证码"
        left-icon="star-o"
        v-model="user.code"
      >
        <van-button
          round
          type="primary"
          size="small"
          slot="button"
        >获取验证码</van-button>
      </van-field>
    </van-cell-group>
    <!-- 登录按钮 -->
    <div class="login_btn">
      <van-button
        square
        type="primary"
        class="btn"
        @click="handleLogin"
      >登录</van-button>
    </div>
  </div>
</template>

<script>
import { login } from '@/api/user'
import { mapMutations } from 'vuex'
export default {
  name: 'login',
  data () {
    return {
      user: {
        mobile: '13911111111',
        code: '246810'
      }
    }
  },
  methods: {
    ...mapMutations(['setUser']),

    async handleLogin () {
      try {
        const data = await login(this.user)
        // 存储登录的状态
        // 1.vuex
        this.setUser(data)
        // 2.本地存储

        // 跳转到首页
        this.$router.push('/')
        this.this.$toast.success('登录成功')
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

<style lang='less' scoped>
.login_btn {
  padding: 15px;
  .btn {
    width: 100%;
  }
}
</style>
