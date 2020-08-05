<!-- 半月作业计划编制 -->
<template>
  <div class="box">
    <screen-box
      @downLoad='downLoad'
      @workYaerSearch="workYaerSearch"
      @search="search"
      @dataDerive='dataDerive'
      @dataDelet='dataDelet'
      @impExcel='impExcel'
      @passengerAdd="passengerAdd"
      @submitCheck='submitCheck'>
    </screen-box>
    <tables
      :tableData="tableData"
      :tableHeight="tableHeight"
      @edit="edit"
      @lookInfo='lookInfo'
      @deleteUser="deleteUser"
      @addIds='addIds'>
    </tables>
    <paging
      :totalRows="totalRows"
      :pageSize="formData.pageSize"
      @getInfo="getInfo"
      @getInfo_current="getInfo_current">
    </paging>
    <el-dialog
      :title="addAndUpdateTitle"
      :visible.sync="drawer"
      width="1500px"
      :before-close="handleClose"
      class="drawerBox">
      <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="160px" style="padding: 0 10px;">
        <!-- flex 最外面wapper -->
        <div class="formWapper">
          <!-- 第一个div -->
          <div class="">
            <el-form-item label="工作任务" prop="planName">
              <el-input :disabled='disabled' v-model="ruleForm.planName" placeholder="请输入" clearable autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="工作内容" prop="planContent">
              <el-input :disabled='disabled' type="textarea" v-model="ruleForm.planContent" placeholder="请输入" clearable autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="计划性质" prop="planNature">
              <el-select :disabled='disabled' v-model="ruleForm.planNature" placeholder="请选择">
                <el-option
                  v-for="item in planNatureList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="工作类型" prop="jobType">
              <el-select :disabled='disabled' v-model="ruleForm.jobType" placeholder="请选择">
                <el-option
                  v-for="item in jobTypeList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="专业" prop="profession">
              <el-select :disabled='disabled' v-model="ruleForm.profession" placeholder="请选择">
                <el-option
                  v-for="item in professionList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="工作班组" prop="teamName">
              <el-select
                :disabled='disabled'
                v-model="ruleForm.teamName"
                filterable
                allow-create
                default-first-option
                placeholder="请输入或选择">
                <el-option
                  v-for="item in teamNameList"
                  :key="item.name"
                  :label="item.name"
                  :value="item.name">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="工作地点" prop="planAddress">
              <el-select
                :disabled='disabled'
                v-model="ruleForm.planAddress"
                filterable
                allow-create
                default-first-option
                placeholder="请输入或选择">
                <el-option
                  v-for="item in planAddressList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </div>
          <!-- 第二个div -->
          <div style="width: 380px;">
            <el-form-item label="计划开始时间" prop="planStartTime">
              <el-date-picker
                :disabled='disabled'
                v-model="ruleForm.planStartTime"
                type="datetime"
                value-format="yyyy-MM-dd HH:mm:ss"
                placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
            <div class="timeTip" v-if='timeTo'>开始时间不能大于结束时间</div>
            <el-form-item label="计划结束时间" prop="planEndTime">
              <el-date-picker
                :disabled='disabled'
                v-model="ruleForm.planEndTime"
                type="datetime"
                value-format="yyyy-MM-dd HH:mm:ss"
                placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="工作方式" prop="jobWay">
              <el-select :disabled='disabled' v-model="ruleForm.jobWay" placeholder="请选择">
                <el-option
                  v-for="item in jobWayList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="电压等级" prop="voltageLevel" class="select-flex">
              <el-select
                :disabled='disabled'
                class="selectOne"
                v-model="ruleForm.voltageLevelType"
                filterable
                allow-create
                default-first-option
                placeholder="请选择"
                @change="changevoType">
                <el-option
                  v-for="item in voltageLevelType"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
              <el-select
                :disabled='disabled'
                class="selectTwo"
                v-model="ruleForm.voltageLevel"
                filterable
                allow-create
                default-first-option
                placeholder="请选择">
                <el-option
                  v-for="item in voltageLevelList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
              <div class="fanwei" v-show="fanTrue">±</div>
              <div class="danwei">kv</div>
            </el-form-item>
            <el-form-item label="作业责任单位/责任人" prop="planPrincipal">
              <el-input :disabled='disabled' v-model="ruleForm.planPrincipal" placeholder="责任单位XX,责任人XX,联系方式XX" clearable autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="作业施工单位/负责人" prop="planConstructor">
              <el-input :disabled='disabled' v-model="ruleForm.planConstructor" placeholder="责任单位XX,责任人XX,联系方式XX" clearable autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="操作设备" prop="equipment">
              <el-input :disabled='disabled' type="textarea" v-model="ruleForm.equipment" placeholder="请输入" clearable autocomplete="off"></el-input>
            </el-form-item>
          </div>
          <!-- 第三个div -->
          <div style="flex: 1;">
            <div style="display:flex;" class="rightWapper">
              <div style="width: 360px;">
                <el-form-item label="风险等级" prop="hazardLevel">
                  <el-select :disabled='disabled' v-model="ruleForm.hazardLevel" placeholder="请选择">
                    <el-option
                      v-for="item in hazardLevelList"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="管控层级" prop="controLevel">
                  <el-select :disabled='disabled' v-model="ruleForm.controLevel" placeholder="请选择">
                    <el-option
                      v-for="item in controlevelList"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="配合作业需求申请" prop="apply" class="noBorder">
                  <el-input :disabled='disabled' type="textarea" v-model="ruleForm.apply" placeholder="请输入或选择" clearable autocomplete="off"></el-input>
                  <el-select
                    :disabled='disabled'
                    v-model="applys"
                    placeholder="请输入或选择"
                    @change="applyValue">
                    <el-option
                      v-for="item in applyList"
                      :key="item.name"
                      :label="item.name"
                      :value="item.name">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="停电时户数" prop="powerNumber">
                  <el-input :disabled='disabled' type='number' v-model="ruleForm.powerNumber" placeholder="请输入" clearable autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="执行调度" prop="operation">
                  <el-select :disabled='disabled' v-model="ruleForm.operation" placeholder="请选择">
                    <el-option
                      v-for="item in operationList"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
              </div>
              <div>
                <el-form-item label="关联停电设备" prop="associatedPower" class="noBorder">
                  <el-input :disabled='disabled' type="textarea" v-model="ruleForm.associatedPower" placeholder="请输入或选择" clearable autocomplete="off"></el-input>
                  <el-select
                    :disabled='disabled'
                    v-model="associatedPowers"
                    @change="changeAssos"
                    placeholder="请输入或选择">
                    <el-option
                      v-for="item in associatedPowerList"
                      :key="item.deviceName"
                      :label="item.deviceName"
                      :value="item.deviceName">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="备注" prop="remark">
                  <el-input :disabled='disabled' type="textarea" v-model="ruleForm.remark" placeholder="请输入" clearable autocomplete="off"></el-input>
                </el-form-item>
              </div>
            </div>
            <el-form-item label="选用作业文件" prop="selectionWork">
              <el-select
                :disabled='disabled'
                v-model="ruleForm.selectionWork"
                multiple
                placeholder="请选择">
                <el-option
                  v-for="item in selectionWorkList"
                  :key="item.fileCode"
                  :label="item.fileName"
                  :value="item.fileCode">
                </el-option>
              </el-select>
            </el-form-item>
          </div>
        </div>
        <el-form-item  style="text-align: center;" v-show="isUpdate">
          <el-button type="primary" @click="onSubmit" v-show="addInfo == true">立即创建</el-button>
          <el-button type="primary" @click="onSubmitEdit" v-show="addInfo == false">保存</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- <el-dialog title="编辑乘客用户" :visible.sync="dialogFormVisible" width="500px" :rules="ruless">
      <el-form :model="formEdit">
        <el-form-item label="帐号" label-width="80px">
          <el-input v-model="formEdit.userName" autocomplete="off" disabled></el-input>
        </el-form-item>
        <el-form-item label="姓名" label-width="80px">
          <el-input v-model="formEdit.realName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机号" label-width="80px">
          <el-input v-model="formEdit.phoneNum" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" label-width="80px">
          <el-input type="password" v-model="formEdit.pass" placeholder="如不需重置密码请勿填写" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" label-width="80px">
          <el-input type="password" v-model="ruleForm.checkPass" placeholder="如不需重置密码请勿填写" clearable autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="onSubmitEdit">确 定</el-button>
      </div>
    </el-dialog> -->
  </div>
</template>

<script src="./HalfMonth-OperativePlan.js"></script>
<style lang="stylus" scoped src="./HalfMonth-OperativePlan.css"></style>
