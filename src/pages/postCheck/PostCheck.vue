<!-- 岗位管理 -->
<template>
  <div class="box">
    <screen-box
      @search="search"
      @addInfo="addInfo">
    </screen-box>
    <tables
      :tableData="tableData"
      :tableHeight="tableHeight"
      @edit="edit"
      @deleteUser="deleteUser">
    </tables>
    <paging
      :totalRows="totalRows"
      :pageSize="formData.pageSize"
      @getInfo="getInfo"
      @getInfo_current="getInfo_current">
    </paging>
    <el-dialog
      :title="drawerTitle"
      :visible.sync="drawer"
      width="500px">
      <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="80px" style="padding: 0 10px;">
        <el-form-item label="岗位名称" prop="positionName">
          <el-input v-model="ruleForm.positionName" placeholder="请输入岗位名称" clearable autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="显示排序" prop="sort">
          <el-input v-model="ruleForm.sort" placeholder="请输入排序" type="number"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-switch
            slot-scope="scope"
            v-model="ruleForm.isStatus"
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

<script src="./PostCheck.js"></script>
<style lang="stylus" scoped src="./PostCheck.css"></style>
