<!-- 操作人管理 -->
<template>
  <div class="box">
    <screen-box
      @search="search"
      @dataDerive='dataDerive'
      @dataDelet='dataDelet'
      @passengerAdd="passengerAdd"
      @submitCheck='submitCheck'>
    </screen-box>
    <tables
      :tableData="tableData"
      :tableHeight="tableHeight"
      @edit="edit"
      @deleteUser="deleteUser"
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
      :title="dialogTitle"
      :visible.sync="drawer"
      width="500px"
      :before-close="handleClose"
      class="drawerBox">
      <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="90px" style="padding: 0 10px;">
        <el-form-item label="单位:" prop="orgId">
          <el-select
            v-model="ruleForm.orgId"
            placeholder="请选择单位"
            :disabled="disabled"
            @change='changeDw(ruleForm.orgId)'>
            <el-option
              v-for="item in danWeiList"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="姓名:" prop="">
          <el-input disabled v-model="ruleForm.realName" placeholder="请输入姓名" clearable autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="身份证号:" prop="">
          <el-input disabled v-model="ruleForm.idCard" placeholder="请输入身份证号" clearable autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="部门" prop="deptId">
          <el-select
            v-model="ruleForm.deptId"
            @change='getBz(ruleForm.deptId)'
            :disabled="disabled"
            placeholder="请选择">
            <el-option
              v-for="item in bMList"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="班组" prop="groupId">
          <el-select
            v-model="ruleForm.groupId"
            filterable
            allow-create
            default-first-option
            @change='getGw(ruleForm.groupId)'
            :disabled="disabled"
            placeholder="请输入或选择">
            <el-option
              v-for="item in teamNameList"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="岗位" prop="postId">
          <el-select
            v-model="ruleForm.postId"
            :disabled="disabled"
            filterable
            allow-create
            default-first-option
            placeholder="请选择岗位">
            <el-option
              v-for="item in gWiList"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="专业" prop="professionId">
          <el-select v-model="ruleForm.professionId" placeholder="请选择">
            <el-option
              v-for="item in professionList"
              :key="item.id"
              :disabled="disabled"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="类别" prop="jobTypeId">
          <el-select :disabled="disabled" v-model="ruleForm.jobTypeId" placeholder="请选择">
            <el-option
              v-for="item in jobTypeList"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="分数" prop="pointsDeductedCount">
          <el-input disabled type="number" v-model="ruleForm.pointsDeductedCount" placeholder="请输入分数" clearable autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item  style="text-align: center;" v-show="editTitle">
          <el-button type="primary" @click="onSubmitEdit">保存</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog
      title="新增三种人管理"
      :visible.sync="addDrawer"
      width="1000px"
      :before-close="handleClose"
      class="drawerBox">
      <tables-two
        :tableData="addTableData"
        @addKinds = 'addKinds'>
      </tables-two>
      <paging-two
        :totalRows="totalRowsTwo"
        :pageSize="pageSizeTwo"
        @getInfo="getInfoTwo"
        @getInfo_current="getInfo_currentTwo">
      </paging-two>
      <div style="text-align: center;">
        <el-button type="primary" @click="onSubmit">提交新增</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script src="./Operator-Console.js"></script>
<style lang="stylus" scoped src="./Operator-Console.css"></style>
