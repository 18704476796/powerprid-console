<!-- 组织机构管理 -->
<template>
  <div class="box">
    <tables
      :tableData="tableData"
      :tableHeight="tableHeight"
      @load='load'
      @addInfo='addInfo'
      @onlocked="onlocked"
      @edit="edit"
      @deleteUser="deleteUser">
    </tables>
    <el-dialog
      :title="drawerTitle"
      :visible.sync="drawer"
      width="500px">
      <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="80px" style="padding: 0 10px;">
        <el-form-item label="上级部门" v-show="drawerTitle === '添加部门'">
          <el-input v-model="ruleForm.parentName" disabled></el-input>
        </el-form-item>
        <el-form-item label="部门名称" prop="name">
          <el-input v-model="ruleForm.name" placeholder="请输入部门名称" clearable autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="所属类型" prop="orgType">
          <el-select v-model="ruleForm.orgType" placeholder="请选择">
            <el-option
              v-for="item in typeList"
              :key="item.lable"
              :label="item.value"
              :value="item.lable">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="显示排序" prop="sort">
          <el-input v-model="ruleForm.sort" placeholder="请输入排序" type="number"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-switch
            slot-scope="scope"
            v-model="ruleForm.status"
            active-color="#13ce66"
            inactive-color="#ff4949"
            :active-value="1"
            :inactive-value="0"
            active-text="启用"
            inactive-text="停用">
          </el-switch>
        </el-form-item>
        <el-form-item style="text-align: center;">
          <el-button type="primary" @click="onSubmit">{{drawerButton}}</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script src="./Institutional-Check.js"></script>
<style lang="stylus" scoped src="./Institutional-Check.css"></style>
