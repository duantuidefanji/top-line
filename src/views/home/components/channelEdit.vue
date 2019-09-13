<template>
  <van-popup
  :value='value'
  @input="$emit('input',$event)"
  position="bottom"
  :style="{  height:'80%',width:'80%'}"
>
<van-cell title="单元格" icon="shop-o">
  <!-- 使用 right-icon 插槽来自定义右侧图标 -->
  <van-icon
    slot="right-icon"
    name="search"
    style="line-height: inherit;"
  />
</van-cell>
<van-grid>
  <van-grid-item
    v-for="value in 4"
    :key="value"
    icon="photo-o"
    text="文字"
  />
</van-grid>
  </van-popup>
</template>

<script>
export default {
  props: {
    value: {
      type: Boolean,
      required: true
    }
  },
  data () {
    return {
    //   show: true
    }
  }
}
</script>

<style>

</style>
