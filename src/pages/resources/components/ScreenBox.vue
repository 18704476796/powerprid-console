<template>
  <div class="screenBox hyb_clear">
    <div class="left">
      <!-- <el-button type="primary" icon="el-icon-edit"></el-button>
      核心内容操作 -->
    </div>
    <div class="right">
      <div v-if="disabled">
        <el-button type="primary" icon="el-icon-edit" @click="newlyAdd">新增导航</el-button>
        <el-button type="primary" icon="el-icon-edit" @click="edit">编辑导航</el-button>
      </div>
      <div v-else>
        <el-button type="success" icon="el-icon-edit" @click="preservation">保存导航</el-button>
        <el-button type="success" icon="el-icon-edit" @click="edit">退出编辑</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ScreenBox',
  props: {
    disabled: Boolean // 返回父元素编辑状态
  },
  data () {
    return {
      disabledSub: this.disabled // 父元素编辑状态赋值给子元素，子元素不能直接修改父元素属性
    }
  },
  watch: { // 监听函数
    disabled () { // 父元素请求完成接口后，需要将编辑状态禁用，子元素需要监听编辑状态，否则会多点一遍编辑按钮
      this.disabledSub = this.disabled
    }
  },
  methods: { // 方法函数
    edit () { // 编辑函数
      this.disabledSub = !this.disabledSub
      this.$emit('changeDisabled', this.disabledSub)
    },
    preservation () { // 保存
      this.$emit('preservation')
    },
    newlyAdd () { // 新增导航函数
      this.$emit('newlyAdd')
    }
  }
}
</script>

<style lang="stylus" scoped>
  .screenBox
    background: #F5F7FA
    border-radius: 3px
    padding: 6px
    margin-bottom: 10px
    .left
      float: left
    .right
      float: right
    button
      font-size: 12px
      padding: 8px 10px
</style>
