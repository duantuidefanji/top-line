export default {
  install (Vue) {
    // 给Vue实例增加方法
    Vue.prototype.$checkLogin = function () {
      // this 是 Vue的实例 this.$checkLogin()
      if (!this.$store.state.user) {
        this.$dialog.confirm({
          title: '登录提示',
          message: '你确定要跳转登录页面吗?'
        }).then(() => {
          // on confirm
          // this.$router.push('/login')
          this.$router.push({
            path: '/login',
            query: {
              redirect: this.$route.fullPath
            }
          })
        }).catch(() => {
          // on cancel
        })
        return false
      }
      return true
    }
  }
}
