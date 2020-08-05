<!-- 年作业计划审核 -->
<template>
  <div class="box">
    <!-- 首页表格 -->
    <div v-show = "oneShow == true">
      <screen-box
        @workYaerSearch="workYaerSearch"
        @search="search"
        @submitCheck='submitCheck'
        @proofread='proofread'
        @setThreshold='setThreshold'>
      </screen-box>
      <tables
        :tableData="tableData"
        :tableHeight="tableHeight"
        @lookInfo='lookInfo'>
      </tables>
      <paging
        :totalRows="totalRows"
        :pageSize="formData.pageSize"
        @getInfo="getInfo"
        @getInfo_current="getInfo_current">
      </paging>
    </div>
    <!-- 修改调整表格 -->
    <div v-show = "oneShow == false">
      <red-screen-box
        @search="search"
        @proofread='proofread'
        @setThreshold='setThreshold'>
      </red-screen-box>
      <red-tables
        :tableData="tableData"
        :tableHeight="tableHeight"
        @lookInfo='lookInfo'>
      </red-tables>
      <red-paging
        :totalRows="totalRows"
        :pageSize="formData.pageSize"
        @getInfo="getInfo"
        @getInfo_current="getInfo_current">
      </red-paging>
    </div>
    <!-- 查看详情 -->
    <el-dialog
      title="作业计划详情"
      :visible.sync="drawer"
      width="1500px"
      :before-close="handleClose"
      class="drawerBox">
      <el-form label-width="160px" style="padding: 0 10px;">
        <!-- flex 最外面wapper -->
        <div class="formWapper">
          <!-- 第一个div -->
          <div class="">
            <el-form-item label="工作任务">
              <el-input :disabled='disabled' v-model="ruleForm.planName"></el-input>
            </el-form-item>
            <el-form-item label="工作内容">
              <el-input :disabled='disabled' type="textarea" v-model="ruleForm.planContent"></el-input>
            </el-form-item>
            <el-form-item label="计划性质">
              <el-input :disabled='disabled' v-model="ruleForm.planNature"></el-input>
            </el-form-item>
            <el-form-item label="工作类型">
              <el-input :disabled='disabled' v-model="ruleForm.jobType"></el-input>
            </el-form-item>
            <el-form-item label="专业">
              <el-input :disabled='disabled' v-model="ruleForm.profession"></el-input>
            </el-form-item>
            <el-form-item label="工作班组">
              <el-input :disabled='disabled' v-model="ruleForm.teamName"></el-input>
            </el-form-item>
            <el-form-item label="工作地点">
              <el-input :disabled='disabled' v-model="ruleForm.planAddress"></el-input>
            </el-form-item>
          </div>
          <!-- 第二个div -->
          <div style="width: 380px;">
            <el-form-item label="计划开始时间">
              <el-input :disabled='disabled' v-model="ruleForm.planStartTime"></el-input>
            </el-form-item>
            <el-form-item label="计划结束时间">
              <el-input :disabled='disabled' v-model="ruleForm.planEndTime"></el-input>
            </el-form-item>
            <el-form-item label="工作方式">
              <el-input :disabled='disabled' v-model="ruleForm.jobWayName"></el-input>
            </el-form-item>
            <el-form-item label="电压等级" class="select-flex">
              <el-input :disabled='disabled' v-model="ruleForm.voltageLevelType" style="width: 80px;"></el-input>
              <el-input :disabled='disabled' v-model="ruleForm.voltageLevel"></el-input>
              <div class="danwei">kv</div>
            </el-form-item>
            <el-form-item label="作业责任单位/责任人">
              <el-input :disabled='disabled' v-model="ruleForm.planPrincipal"></el-input>
            </el-form-item>
            <el-form-item label="作业施工单位/负责人">
              <el-input :disabled='disabled' v-model="ruleForm.planConstructor"></el-input>
            </el-form-item>
            <el-form-item label="操作设备">
              <el-input :disabled='disabled' type="textarea" v-model="ruleForm.deviceName"></el-input>
            </el-form-item>
          </div>
          <!-- 第三个div -->
          <div style="flex: 1;">
            <div style="display:flex;" class="rightWapper">
              <div style="width: 360px;">
                <el-form-item label="风险等级">
                  <el-input :disabled='disabled' v-model="ruleForm.hazardLevelName"></el-input>
                </el-form-item>
                <el-form-item label="管控层级">
                  <el-input :disabled='disabled' v-model="ruleForm.controlLevelName"></el-input>
                </el-form-item>
                <el-form-item label="配合作业需求申请" class="noBorder">
                  <el-input :disabled='disabled' type="textarea" v-model="ruleForm.cooperating"></el-input>
                </el-form-item>
                <el-form-item label="停电时户数">
                  <el-input :disabled='disabled' type='number' v-model="ruleForm.planHouseNum"></el-input>
                </el-form-item>
                <el-form-item label="执行调度">
                  <el-input :disabled='disabled' v-model="ruleForm.dispatchTypeName"></el-input>
                </el-form-item>
              </div>
              <div>
                <el-form-item label="关联停电设备" class="noBorder">
                  <el-input :disabled='disabled' type="textarea" v-model="ruleForm.deviceJointName"></el-input>
                </el-form-item>
                <el-form-item label="备注">
                  <el-input :disabled='disabled' type="textarea" v-model="ruleForm.description"></el-input>
                </el-form-item>
              </div>
            </div>
            <el-form-item label="选用作业文件">
              <el-input :disabled='disabled' type="textarea" v-model="ruleForm.planModelFileCodes"></el-input>
            </el-form-item>
          </div>
        </div>
      </el-form>
    </el-dialog>
    <!-- 自动校核加载页面 -->
    <el-dialog
      :visible.sync="loadingDialog"
      :show-close='false'
      class="loadingDia"
      width="300px">
    </el-dialog>
    <!-- 校核返回值页面 -->
    <el-dialog
      :visible.sync="returnJXDialog"
      :show-close='false'
      class="returnDia"
      width="800px">
      <tables-two
        :tableData="xhTableData">
      </tables-two>
      <div style="padding: 20px 0; text-align: center;">
        <el-button type="primary">自动优化调整</el-button>
      </div>
    </el-dialog>
    <!-- 阈值设定 -->
    <el-dialog
      title="阈值设定"
      :visible.sync="thresholdDialog"
      class="drawerBox"
      width="700px">
      <threshold-form></threshold-form>
    </el-dialog>
    <!-- 审核界面 -->
    <el-dialog
      title="审核"
      :visible.sync="checkDia"
      width="500px"
      class="drawerBox">
      <el-form ref="checkForm" :model="checkForm" :rules="rules" style="padding: 0 10px;">
        <el-form-item prop="reason" class="reasonWapper">
          <el-input type="textarea" v-model="checkForm.reason" placeholder="请输入理由" clearable autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item v-show="showCheckPeople" label="请选择审核节点:">
          <el-tag
            :key="tag"
            v-for="tag in dynamicTags"
            closable
            :disable-transitions="false"
            @close="handleClose(tag)">
            {{tag}}
          </el-tag>
          <i class="el-icon-circle-plus-outline" style="color: #409EFF;" @click="innerCheckTag = true"></i>
        </el-form-item>
        <el-dialog
          width="300px"
          title="请选择审核节点"
          :visible.sync="innerCheckTag"
          append-to-body>
          <el-tree
            :data="treeData"
            show-checkbox
            :props="defaultProps">
          </el-tree>
          <div style="text-align: center; margin-top: 20px;">
            <el-button type="primary">确定</el-button>
          </div>
        </el-dialog>
        <el-dialog
          width="300px"
          title="请选择驳回节点"
          :visible.sync="innerVisible"
          append-to-body>
          <el-select v-model="dismissNode" placeholder="请选择" style="width: 100%;">
            <el-option
              v-for="item in dismissNodeList"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <div style="text-align: center; margin-top: 20px;">
            <el-button type="primary">确定</el-button>
          </div>
        </el-dialog>
        <el-form-item style="text-align: center;">
          <el-button type="primary">通过</el-button>
          <el-button type="primary" @click='checkResult(2)'>驳回</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script src="./Year-Check.js"></script>
<style lang="stylus" scoped src="./Year-Check.css"></style>
