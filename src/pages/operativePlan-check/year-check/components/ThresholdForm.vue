<!-- 阈值设置界面 -->
<template>
  <el-form :inline="true" :model="formInline" class="demo-form-inline" label-width="80px">
    <el-form-item label="01月:">
      <el-input v-model="formInline.Jan" type='number' placeholder="请输入"></el-input>
    </el-form-item>
    <el-form-item label="02月:">
      <el-input v-model="formInline.Feb" type='number' placeholder="请输入"></el-input>
    </el-form-item>
    <el-form-item label="03月:">
      <el-input v-model="formInline.Mar" type='number' placeholder="请输入"></el-input>
    </el-form-item>
    <el-form-item label="04月:">
      <el-input v-model="formInline.Apr" type='number' placeholder="请输入"></el-input>
    </el-form-item>
    <el-form-item label="05月:">
      <el-input v-model="formInline.May" type='number' placeholder="请输入"></el-input>
    </el-form-item>
    <el-form-item label="06月:">
      <el-input v-model="formInline.Jun" type='number' placeholder="请输入"></el-input>
    </el-form-item>
    <el-form-item label="07月:">
      <el-input v-model="formInline.Jul" type='number' placeholder="请输入"></el-input>
    </el-form-item>
    <el-form-item label="08月:">
      <el-input v-model="formInline.Aug" type='number' placeholder="请输入"></el-input>
    </el-form-item>
    <el-form-item label="09月:">
      <el-input v-model="formInline.Sep" type='number' placeholder="请输入"></el-input>
    </el-form-item>
    <el-form-item label="10月:">
      <el-input v-model="formInline.Oct" type='number' placeholder="请输入"></el-input>
    </el-form-item>
    <el-form-item label="11月:">
      <el-input v-model="formInline.Nov" type='number' placeholder="请输入"></el-input>
    </el-form-item>
    <el-form-item label="12月:">
      <el-input v-model="formInline.Dec" type='number' placeholder="请输入"></el-input>
    </el-form-item>
    <div style="text-align: center;">
      <el-button type="primary">确定</el-button>
    </div>
  </el-form>
</template>

<script>
export default {
  name: 'ThresholdForm',
  data () {
    return {
      formInline: {
        Jan: '',
        Feb: '',
        Mar: '',
        Apr: '',
        May: '',
        Jun: '',
        Jul: '',
        Aug: '',
        Sep: '',
        Oct: '',
        Nov: '',
        Dec: ''
      }
    }
  },
  methods: {
    onSubmit () {
      console.log('submit!')
    }
  }
}
</script>

<style lang="stylus" scoped>
  .demo-form-inline >>> .el-form-item
    width 48%
</style>
