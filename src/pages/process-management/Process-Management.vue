<!-- 流程管理 -->
<template>
  <div class="box">
    <screen-box
      @addProcess="addProcess">
    </screen-box>
    <!-- 首页列表 -->
    <div class="wapperPro">
      <el-row :gutter="20">
        <el-col :span="6" v-for="(item, index) of tableData" :key='index'>
          <div class="grid-content">
            <ul>
              <li class="box-top">
                <div class="box-img"></div>
                <ul class="box-title">
                  <li>名称</li>
                  <li>{{item.processName}}</li>
                </ul>
              </li>
              <li class="box-button">
                <el-button type="primary" @click='editPro(item)'>编辑</el-button>
                <el-button  type="primary">删除</el-button>
                <el-button  type="primary" @click='lookPro(item.id)'>查看</el-button>
              </li>
            </ul>
          </div>
        </el-col>
      </el-row>
    </div>
    <!-- 新建、编辑首页弹层 -->
    <el-dialog
      :title="drawerTitle"
      :visible.sync="drawer"
      class="drawerBox"
      width="400px">
      <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="50px" style="padding: 0 10px;">
        <el-form-item label="名称" prop="processName">
          <el-input v-model="ruleForm.processName" placeholder="请输入名称" clearable autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item style="text-align: center;">
          <el-button type="primary" @click="onSubmit">{{drawerButton}}</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 查看流程节点详情页面 -->
    <el-dialog
      title="流程节点详情"
      :visible.sync="drawerTable"
      class="drawerBox"
      width="1000px">
      <node-screen-box
        @addProcessNode="addProcessNode">
      </node-screen-box>
      <tables
        :tableData="nodeTable"
        :tableHeight="tableHeight"
        @editNode='editNode'
        @lookNodeChid='lookNodeChid'>
      </tables>
    </el-dialog>
    <!-- 流程节点新建编辑界面 -->
    <el-dialog
      :title="nodeTitle"
      :visible.sync="nodeDrawer"
      class="drawerBox"
      center
      width="400px">
      <el-form ref="nodeForm" :model="nodeForm" :rules="nodeRules" label-width="80px" style="padding: 0 10px;">
        <el-form-item label="节点序号" prop="nodeSort">
          <el-input v-model="nodeForm.nodeSort" type="number" placeholder="节点序号不可重复" clearable autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="节点名称" prop="nodeName">
          <el-input v-model="nodeForm.nodeName" placeholder="请输入节点名称" clearable autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="节点类型" prop="nodeTypeVal">
          <el-select placeholder="请选择" v-model="nodeForm.nodeTypeVal" style="width: 100%;">
            <el-option
              v-for="item in nodeTypeList"
              :key="item.nodeTypeVal"
              :label="item.nodeTypeName"
              :value="item.nodeTypeVal">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item style="text-align: center;">
          <el-button type="primary" @click="onSubmitNode">{{nodeButton}}</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 节点按钮详情页面 -->
    <el-dialog
      title="节点按钮详情"
      :visible.sync="nodeChild"
      class="drawerBox"
      center=""
      width="900px">
      <screen-box-three
        @addPlanNode="addPlanNode">
      </screen-box-three>
      <tables-three
        :tableData="nodeChildTable"
        :tableHeight="tableHeight"
        @editPlan='editPlan'>
      </tables-three>
    </el-dialog>
    <!-- 节点按钮编辑、新增界面 -->
    <el-dialog
      :title="planTitle"
      :visible.sync="planDrawer"
      class="drawerBox"
      center
      width="420px">
      <el-form ref="planForm" :model="planForm" :rules="planRules" label-width="110px" style="padding: 0 10px;">
        <el-form-item label="导向按钮名称" prop="guideName">
          <el-input v-model="planForm.guideName" placeholder="例:通过/驳回/创建" clearable autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="导向节点名称" prop="guideNodeId">
          <el-select placeholder="请选择" v-model="planForm.guideNodeId" style="width: 100%;">
            <el-option
              v-for="item in nodeTable"
              :key="item.id"
              :label="item.nodeName"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="节点类型" prop="nodeTypeVal">
          <el-select placeholder="请选择" v-model="planForm.nodeTypeVal" style="width: 100%;">
            <el-option
              v-for="item in nodeTypeList"
              :key="item.nodeTypeVal"
              :label="item.nodeTypeName"
              :value="item.nodeTypeVal">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="提交至部门编码" prop="orgCodes" v-if="isShowAddressInfo">
          <el-cascader
            style="width: 100%;"
            :props="props"
            clearable
            :show-all-levels="false"
            placeholder="请选择"
            v-model="planForm.orgCodes">
          </el-cascader>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="planForm.remark" type="textarea" clearable autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item style="text-align: center;">
          <el-button type="primary" @click="onSubmitPlan">{{planButton}}</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script src="./Process-Management.js"></script>
<style lang="stylus" scoped src="./Process-Management.css"></style>
