<!-- 扣分规则管理 -->
<template>
  <div class="box">
    <screen-box
      @passengerAdd="passengerAdd">
    </screen-box>
    <tables
      :tableData="tableData"
      :tableHeight="tableHeight"
      @edit="edit"
      @deleteUser="deleteUser">
    </tables>
    <el-drawer
      :title="drawerTitle"
      :visible.sync="drawer"
      direction="ltr"
      size="300px"
      :before-close="handleClose"
      class="drawerBox">
      <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="80px" style="padding: 0 10px;">
        <el-form-item label="名称" prop="fractionName">
          <el-input v-model="ruleForm.fractionName" placeholder="请输入姓名" clearable autocomplete="off" ></el-input>
        </el-form-item>
        <el-form-item label="扣除分数" prop="fraction">
          <el-input type="number" v-model="ruleForm.fraction" placeholder="请输入扣除分数" clearable autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="扣分原因" prop="description">
          <el-input type="textarea" v-model="ruleForm.description" placeholder="请输入扣分原因" clearable autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">{{drawerButton}}</el-button>
        </el-form-item>
      </el-form>
    </el-drawer>
  </div>
</template>

<script src="./Grade-Rule.js"></script>
<style lang="stylus" scoped src="./Grade-Rule.css"></style>
