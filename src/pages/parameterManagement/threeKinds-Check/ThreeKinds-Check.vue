<!-- 三种人审核管理 -->
<template>
  <div class="box">
    <screen-box
      @search="search"
      @submitCheck='submitCheck'
      @searchPost='searchPost'
      @searchMajor='searchMajor'
      :postList='postList'
      :professionList='professionList'>
    </screen-box>
    <tables
      :tableData="tableData"
      :tableHeight="tableHeight"
      @addIds='addIds'
      @lookInfo='lookInfo'>
    </tables>
    <paging
      :totalRows="totalRows"
      :pageSize="formData.pageSize"
      @getInfo="getInfo"
      @getInfo_current="getInfo_current">
    </paging>
    <el-dialog
      title="审核"
      :visible.sync="drawer"
      width="500px"
      :before-close="handleClose"
      class="drawerBox">
      <el-form ref="ruleForm" :model="lookForm" label-width="90px" style="padding: 0 10px;">
        <el-form-item label="单位:">
          <el-input disabled v-model="lookForm.orgName"></el-input>
        </el-form-item>
        <el-form-item label="姓名:">
          <el-input disabled v-model="lookForm.realName"></el-input>
        </el-form-item>
        <el-form-item label="身份证号:">
          <el-input disabled v-model="lookForm.idCard"></el-input>
        </el-form-item>
        <el-form-item label="部门">
          <el-input disabled v-model="lookForm.deptName"></el-input>
        </el-form-item>
        <el-form-item label="班组">
          <el-input disabled v-model="lookForm.groupName"></el-input>
        </el-form-item>
        <el-form-item label="岗位">
          <el-input disabled v-model="lookForm.postName"></el-input>
        </el-form-item>
        <el-form-item label="专业">
          <el-input disabled v-model="lookForm.professionName"></el-input>
        </el-form-item>
        <el-form-item label="类别">
          <el-input disabled v-model="lookForm.jobTypeName"></el-input>
        </el-form-item>
        <el-form-item label="分数">
          <el-input disabled type="number" v-model="lookForm.pointsDeductedCount"></el-input>
        </el-form-item>
        <el-form-item  style="text-align: center;">
          <el-button type="primary" @click="returnCheck">确定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog
      title="审核"
      :visible.sync="addDrawer"
      width="500px"
      :before-close="handleClose"
      class="drawerBox">
      <el-form ref="ruleForm" :model="ruleForm" :rules="rules" style="padding: 0 10px;">
        <el-form-item prop="reason" class="reasonWapper">
          <el-input type="textarea" v-model="ruleForm.reason" placeholder="请输入理由" clearable autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item style="text-align: center;">
          <el-button type="primary" @click="onSubmitEdit(item)" v-for="(item, index) of guideList" :key='index'>{{item.guideName}}</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script src="./ThreeKinds-Check.js"></script>
<style lang="stylus" scoped src="./ThreeKinds-Check.css"></style>
