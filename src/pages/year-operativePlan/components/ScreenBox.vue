<template>
  <div>
    <div class="top-button">
      <el-button type="success" @click='downLoad'>下载模板</el-button>
      <el-button type="success">筛选</el-button>
      <el-button type="success" @click='submitCheck'>提交审核</el-button>
    </div>
    <div class="screenBox hyb_clear">
      <div class="left">
        <div class="inputWapper">
          <el-input
            size="small"
            placeholder="请输入内容"
            v-model="content">
          </el-input>
          <el-button type="primary" icon="el-icon-search" @click="search">搜索</el-button>
        </div>
        <div class="searchDate">
          <span>工作年份(年)</span>
          <el-date-picker
            v-model="workYaer"
            @change='workYaerSearch'
            type="year"
            placeholder="选择年份"
            size="small"
            value-format="yyyy">
          </el-date-picker>
        </div>
      </div>
      <div class="right">
        <el-button type="primary" @click="dataAdd">新增</el-button>
        <el-upload
          class="upload-demo"
          action=""
          :on-change="handleChange"
          :show-file-list="false"
          :on-remove="handleRemove"
          accept=".xls, .xlsx"
          :auto-upload="false">
          <el-button size="small" type="primary">导入</el-button>
        </el-upload>
        <el-button type="primary" @click="dataDerive">导出</el-button>
        <el-button type="danger" @click="dataDelet">删除</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ScreenBox',
  data () {
    return {
      content: '', // 搜索关键字
      workYaer: '', // 年份
      positionList: [], // 工作年份下拉列表
      uploadUrl: '/api/plan/info/impExcel', // 上传地址
      fileTemp: ''
    }
  },
  methods: {
    downLoad () { // 下载模板
      this.$emit('downLoad')
    },
    search () { // 关键字查询
      this.$emit('search', this.content)
    },
    workYaerSearch () { // 工作年份查询
      this.$emit('workYaerSearch', this.workYaer)
    },
    dataAdd () { // 新增
      this.$emit('passengerAdd')
    },
    dataDerive () { // 导出
      this.$emit('dataDerive')
    },
    dataDelet () { // 删除
      this.$emit('dataDelet')
    },
    submitCheck () { // 提交审核
      this.$emit('submitCheck')
    },
    handleChange (file, fileList) { // excel表导入
      this.fileTemp = file.raw
      // 判断上传文件格式
      if (this.fileTemp) {
        this.$emit('impExcel', this.fileTemp)
      } else {
        this.$message({
          type: 'warning',
          message: '附件格式错误，请删除后重新上传！'
        })
      }
    },
    // 移除excel表
    handleRemove (file, fileList) {
      this.fileTemp = null
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
    .right
      float: right
      button
        padding 8px 20px
      .upload-demo
        display: inline-block
    button
      font-size: 12px
      padding: 8px 10px
    .statusSelect
      width: 110px
      margin-right: 10px
    .searchInput
      width: 200px
    .searchInput >>> .el-input-group__prepend
      width: 22px
    .searchInput >>> .el-input__inner
      padding: 0 6px
  .inputWapper
    display flex
    button
      margin-left 4px
      height 30px
  .searchDate
    margin-left 25px
    line-height 32px
    span
      margin-right 5px
      color #5d5b5b
      font-size 14px
    .el-date-editor.el-input, .el-date-editor.el-input__inner
      width 160px
</style>
