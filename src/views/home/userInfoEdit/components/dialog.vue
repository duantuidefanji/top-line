<template>
  <van-dialog
  :value='value'
  @input="$emit('input',$event)"
  :showConfirmButton='false'
  closeOnClickOverlay
>
<van-cell-group>
  <van-cell title="从相册选择图片"  @click="handleImg">
      <input type="file" ref="file" style="display:none">
  </van-cell>
</van-cell-group>
<van-cell-group>
  <van-cell title="拍照" />
</van-cell-group>
<van-cell-group>
  <van-cell title="取消" />
</van-cell-group>
</van-dialog>
</template>

<script>
import Vue from 'vue'
import { ImagePreview } from 'vant'
import { uploadImg } from '@/api/user'
Vue.use(ImagePreview)
export default {
  name: 'uploadImg',
  props: ['value'],
  methods: {
    handleImg () {
      this.$refs.file.click()

      this.$refs.file.onchange = (e) => {
        if (e.target.files.length === 0) {
          return
        }
        let url = URL.createObjectURL(e.target.files[0])
        this.$emit('input', false)
        ImagePreview({
          images: [
            url
          ],
          showIndex: false,
          onClose: this.showImg()
        })
      }
    },
    showImg () {
      this.$dialog.confirm({
        message: '您确定更改头像图片吗?'
      }).then(async () => {
        this.$toast.loading({
          duration: 0, // 持续展示 toast
          forbidClick: true, // 禁用背景点击
          loadingType: 'spinner',
          message: '倒计时 3 秒'
        })
        const data = await uploadImg('photo', this.$refs.file.files[0])
        console.log(data)
        this.$emit('upload', data.photo)
        this.$toast.success('头像上传成功')
      }).catch((error) => {
        console.log(error)
        this.$toast.fail('上传失败')
      })
      this.$toast.clear()
    }
  }
}
</script>

<style>

</style>
