<!-- 流程节点添加 -->
<template>
  <div>
    <div class="screenBox hyb_clear">
      <div class="left">
      </div>
      <div class="right">
        <el-button type="primary" @click="addProcess">新建流程节点</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ScreenBox',
  methods: {
    addProcess () { // 新建
      this.$emit('addProcessNode')
    }
  }
}
</script>

<style lang="stylus" scoped>
  .screenBox
    background: #eee
    border-radius: 3px
    padding: 6px
    margin-bottom: 10px
    .left
      float: left
      display flex
    .right
      float: right
      button
        padding 8px 20px
</style>
