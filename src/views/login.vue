<template>
  <div>
    <!-- 导航头 -->
    <van-nav-bar title="登录" />
    <van-cell-group>
      <van-field
        v-validate="{ required: true, regex: /^1[3456789]\d{9}$/}"
        name="mobile"
        :error-message="errors.first('mobile')"
        placeholder="请输入手机号"
        right-icon="question-o"
        left-icon="phone-o"
        v-model="user.mobile"
      />
      <van-field
        v-validate="'required|digits:6'"
        name="code"
        :error-message="errors.first('code')"
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
        :loading='loading'
        loading-text="加载中..."
        loading-type="spinner"
      >登录</van-button>
    </div>
  </div>
</template>
<script>
import { login } from '@/api/user'
import { mapMutations } from 'vuex'
// import {mapMutations} from 'vuex'
export default {
  name: 'login',
  data () {
    return {
      user: {
        mobile: '13911111111',
        code: '246810'
      },
      loading: false
    }
  },
  methods: {
    ...mapMutations(['setUser']),
    // ...mapMutations(['setUser'])

    async handleLogin () {
      this.loading = true
      try {
        const valid = await this.$validator.validate()
        console.log(valid)
        if (!valid) {
          this.loading = false
          return
        }
        const data = await login(this.user)
        // 存储登录的状态
        // 1.vuex
        this.setUser(data)
        // 2.本地存储
        // 跳转到首页
        // this.$router.push('/')
        this.$router.push(this.$route.query.redirect || '/')
        this.$toast.success('登录成功')
      } catch (error) {
        this.$toast.fail('登录失败')
      }
      this.loading = false
    }
  },
  created () {
    const dict = {
      custom: {
        mobile: {
          required: '手机号码不能为空',
          regex: '手机号码格式错误'
        },
        code: {
          required: '手机验证码不能为空',
          digits: '验证码为6位数字'
        }
      }
    }
    this.$validator.localize('custom', dict)
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
