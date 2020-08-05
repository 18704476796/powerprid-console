<template>
  <div>
    <div class="screenBox hyb_clear">
      <div class="left">
        <!-- 键值对搜索 -->
        <div class="inputWapper">
          <el-input
            placeholder="请输入内容"
            v-model="searchValue"
            size="small"
            class="searchInput"
            @blur="search">
            <el-select v-model="searchType" slot="prepend" placeholder="请选择">
              <el-option label="账号" value="userName"></el-option>
              <el-option label="姓名" value="realName"></el-option>
              <el-option label="手机号" value="phoneNum"></el-option>
            </el-select>
          </el-input>
          <el-button type="primary" icon="el-icon-search" @click="search">搜索</el-button>
        </div>
        <!-- 下拉框搜索 -->
        <div class="searchDate">
          <span>用户状态</span>
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
          <span>组织机构</span>
          <el-cascader
            :props="props"
            size='small'
            clearable
            v-model="post"
            placeholder="请选择"
            @change="handleChange"
          >
          </el-cascader>
        </div>
      </div>
      <div class="right">
        <el-button type="success" @click='downLoad'>下载模板</el-button>
        <el-button type="success" @click='lookLoad'>查看导入记录</el-button>
        <el-button type="primary" @click="dataAdd">新增</el-button>
        <el-upload
          class="upload-demo"
          action=""
          :on-change="handleChangeLoad"
          :show-file-list="false"
          :on-remove="handleRemove"
          accept=".xls, .xlsx"
          :auto-upload="false">
          <el-button size="small" type="primary">导入</el-button>
        </el-upload>
        <el-button type="primary" @click="dataDerive">导出</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ScreenBox',
  props: {
    statusList: Array,
    props: Object
  },
  data () {
    return {
      searchType: 'userName', // 搜索框类型值
      searchValue: '', // 搜索框的值
      status: null, // 状态
      post: ''
    }
  },
  methods: {
    lookLoad () { // 查看导入记录
      this.$emit('lookLoad')
    },
    search () { // 关键字搜索筛选
      this.$emit('search', this.searchType, this.searchValue)
    },
    changeStatus () { // 状态查询
      this.$emit('changeStatus', this.status)
    },
    handleChange () { // 组织机构查询
      this.$emit('handleChange', this.post)
    },
    dataAdd () { // 新增
      this.$emit('addInfo')
    },
    downLoad () { // 下载模板
      this.$emit('downLoad')
    },
    dataDerive () { // 导出
      this.$emit('dataDerive')
    },
    handleChangeLoad (file, fileList) { // excel表导入
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
    .searchInput
      width: 240px
    .searchInput >>> .el-input-group__prepend
      width: 45px
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
    .el-select
      width 140px
    span
      margin-right 5px
      color #5d5b5b
      font-size 14px
    .el-date-editor.el-input, .el-date-editor.el-input__inner
      width 160px
</style>
