<!-- 用户管理 -->
<template>
  <div class="box">
    <screen-box
      @lookLoad='lookLoad'
      @search="search"
      @changeStatus='changeStatus'
      @addInfo="addInfo"
      @handleChange='handleChange'
      @dataDerive='dataDerive'
      @impExcel='impExcel'
      @downLoad='downLoad'
      :statusList='statusList'
      :props='props'>
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
    <!-- 用户新建、编辑页面 -->
    <el-dialog
      :title="drawerTitle"
      :visible.sync="drawer"
      class="drawerBox"
      width="400px">
      <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="80px" style="padding: 0 10px;">
        <el-form-item label="状态" prop="userStatus">
          <el-select placeholder="请选择" v-model="ruleForm.userStatus">
            <el-option
              v-for="item in statusList"
              :key="item.lable"
              :label="item.value"
              :value="item.lable">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="帐号" prop="userName">
          <el-input v-model="ruleForm.userName" placeholder="帐号为必填项" clearable autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="realName">
          <el-input v-model="ruleForm.realName" placeholder="请输入姓名" clearable autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="组织机构" prop="department" v-if="isShowAddressInfo">
          <el-cascader :props="props" size='small' clearable placeholder="请选择" v-model="ruleForm.department"></el-cascader>
        </el-form-item>
        <el-form-item label="手机号" prop="phoneNum">
          <el-input v-model="ruleForm.phoneNum" placeholder="请输入手机号" clearable></el-input>
        </el-form-item>
        <el-form-item label="岗位" prop="positionId">
          <el-select placeholder="请选择" v-model="ruleForm.positionId">
            <el-option
              v-for="item in roleList"
              :key="item.id"
              :label="item.positionName"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="资质" prop="userType">
          <el-select placeholder="请选择" v-model="ruleForm.userType">
            <el-option
              v-for="item in cerList"
              :key="item.lable"
              :label="item.value"
              :value="item.lable">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="密码" prop="pass">
          <el-input type="password" v-model="ruleForm.pass" :placeholder="placeholder" clearable autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item style="text-align: center;">
          <el-button type="primary" @click="onSubmit">{{drawerButton}}</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 导入记录页面 -->
    <el-dialog
      title="导入记录"
      :visible.sync="drawerTable"
      class="drawerBox"
      width="1000px">
      <screen-box-two
        @importStatus='importStatus'
        @changeType='changeType'>
      </screen-box-two>
      <tables-two
        :tableData="inportData"
        :tableHeight="tableHeight">
      </tables-two>
      <paging-two
        :totalRows="inportTotalRows"
        :pageSize="lookLoadData.pageSize"
        @getInfoTwo="getInfoTwo"
        @getInfo_currentTwo="getInfo_currentTwo">
      </paging-two>
    </el-dialog>
  </div>
</template>

<script src="./Admin.js"></script>
<style lang="stylus" scoped src="./Admin.css"></style>
