<template>
  <div>
    <div class="top-button">
      <!-- <el-button type="success" @click='submitCheck'>提交审核</el-button> -->
    </div>
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
              <el-option label="姓名" value="1"></el-option>
              <el-option label="分数" value="2"></el-option>
            </el-select>
          </el-input>
          <el-button type="primary" icon="el-icon-search" @click="search">搜索</el-button>
        </div>
        <!-- 下拉框搜索 -->
        <div class="searchDate">
          <span>岗位</span>
          <el-select size='small' clearable v-model="post" placeholder="请选择" @change="searchPost">
            <el-option
              v-for="item in postList"
              :key="item.code"
              :label="item.name"
              :value="item.code">
            </el-option>
          </el-select>
        </div>
        <div class="searchDate">
          <span>专业</span>
          <el-select size='small' clearable v-model="major" placeholder="请选择" @change="searchMajor">
            <el-option
              v-for="item in professionList"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </div>
      </div>
      <div class="right">
        <el-button type="primary" @click="submitCheck">审核</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ScreenBox',
  props: {
    postList: Array,
    professionList: Array
  },
  data () {
    return {
      searchType: '1', // 搜索框类型值
      searchValue: '', // 搜索框的值
      post: '', // 岗位
      major: '' // 专业
    }
  },
  methods: {
    search () { // 关键字搜索筛选
      this.$emit('search', this.searchType, this.searchValue)
    },
    searchPost () { // 岗位搜索
      this.$emit('searchPost', this.post)
    },
    searchMajor () { // 专业搜索
      this.$emit('searchMajor', this.major)
    },
    submitCheck () { // 审核
      this.$emit('submitCheck')
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
