<!-- 节点类型管理 -->
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
    <el-dialog
      :title="drawerTitle"
      :visible.sync="drawer"
      direction="ltr"
      width="400px"
      :before-close="handleClose"
      class="drawerBox">
      <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="110px" style="padding: 0 10px;">
        <el-form-item label="节点类型名称" prop="nodeTypeName">
          <el-input v-model="ruleForm.nodeTypeName" placeholder="请输入节点类型名称" clearable autocomplete="off" ></el-input>
        </el-form-item>
        <el-form-item label="节点类型" prop="nodeTypeVal">
          <el-input type="number" v-model="ruleForm.nodeTypeVal" placeholder="节点类型为数字" clearable autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">{{drawerButton}}</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script src="./NodeType-Management.js"></script>
<style lang="stylus" scoped src="./NodeType-Management.css"></style>
