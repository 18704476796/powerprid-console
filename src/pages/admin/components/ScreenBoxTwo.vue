<template>
  <div>
    <div class="screenBox hyb_clear">
      <div class="left">
        <!-- 下拉框搜索 -->
        <div class="searchDate">
          <span>导入状态：</span>
          <el-select size='small' clearable v-model="status" placeholder="请选择" @change="changeStatus">
            <el-option
              v-for="item in statusList"
              :key="item.lable"
              :label="item.value"
              :value="item.lable">
            </el-option>
          </el-select>
        </div>
        <div class="searchDate">
          <span>导入类型：</span>
          <el-select size='small' clearable v-model="post" placeholder="请选择" @change="changeType">
            <el-option
              v-for="item in typeList"
              :key="item.lable"
              :label="item.value"
              :value="item.lable">
            </el-option>
          </el-select>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ScreenBoxTwo',
  data () {
    return {
      statusList: [{ // 导入状态
        lable: 0,
        value: '失败'
      }, {
        lable: 1,
        value: '成功'
      }],
      typeList: [{ // 导入类型
        lable: '导入用户',
        value: '导入用户'
      }],
      status: null, // 状态
      post: ''
    }
  },
  methods: {
    changeStatus () { // 状态查询
      this.$emit('importStatus', this.status)
    },
    changeType () { // 导入类型查询
      this.$emit('changeType', this.post)
    }
  }
}
</script>

<style lang="stylus" scoped>
  .top-button
    text-align right
    padding-bottom 10px
    button
      padding 8px 20px
  .floatLeft
    float: left
  .screenBox
    background: #eee
    border-radius: 3px
    padding: 6px
    margin-bottom: 10px
    .left
      float: left
      display flex
  .searchDate
    margin-left 25px
    line-height 32px
    .el-select
      width 140px
    .el-cascader
      width 140px
</style>
