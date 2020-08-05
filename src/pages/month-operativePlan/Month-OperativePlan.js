import ScreenBox from './components/ScreenBox'
import Tables from './components/Tables'
import Paging from './components/Paging'
import Request from './Request.js' // 接口文件
export default {
  name: 'Month-OperativePlan',
  components: {
    ScreenBox,
    Tables,
    Paging
  },
  mounted () { // 钩子函数
    Request.getInfo(this, this.formData)
  },
  methods: {
    getInfo (size) { // 更新分页单页显示条数
      this.formData.pageSize = size
      Request.getInfo(this, this.formData)
    },
    getInfo_current (size) { // 更新每页页码函数
      this.formData.currentPage = size
      Request.getInfo(this, this.formData)
    },
    downLoad () { // 下载模板函数
      Request.downLoad(this)
    },
    search (val) { // 关键字查询函数
      this.formData.searchContent = val
      Request.getInfo(this, this.formData)
    },
    workYaerSearch (val) { // 时间查询
      this.formData.searchTime = val
      Request.getInfo(this, this.formData)
    },
    dataDerive () { // 导出
      Request.dataDerive(this)
    },
    impExcel (file) { // 导入函数
      Request.impExcel(this, file)
    },
    passengerAdd () { // 新增作业计划编制
      this.drawer = true
      this.addInfo = true
      this.isUpdate = true
      this.disabled = false
      this.addAndUpdateTitle = '新增作业计划'
      Request.getSelectList(this, 2, null)
    },
    changevoType () { // 电压等级±号是否显示
      if (this.ruleForm.voltageLevelType === 'true') {
        this.fanTrue = true
      } else {
        this.fanTrue = false
      }
    },
    handleClose (done) { // 抽屉弹出关闭
      done()
    },
    onSubmit () {
      Request.onSubmit(this, 1)
    },
    edit (obj) { // 编辑作业计划函数
      this.addAndUpdateTitle = '编辑作业计划编制'
      this.drawer = true
      this.addInfo = false
      this.isUpdate = true
      this.disabled = false
      Request.getSelectList(this, 1, obj.id)
    },
    lookInfo (obj) { // 查看作业计划函数
      this.addAndUpdateTitle = '作业计划编制'
      this.drawer = true
      this.isUpdate = false
      this.disabled = true
      Request.getSelectList(this, 1, obj.id)
    },
    onSubmitEdit () { // 编辑帐号
      Request.onSubmit(this, 2)
    },
    addIds (ids) { // 批量删除的id集合赋值
      this.ids = ids
    },
    dataDelet () { // 批量删除
      if (this.ids === '' || this.ids === undefined || this.ids === null) {
        this.$message({
          showClose: true,
          message: '请至少选择一条信息！',
          type: 'error'
        })
      } else {
        Request.deleteUser(this, this.ids)
      }
    },
    deleteUser (id) { // 单个删除删除
      Request.deleteUser(this, id)
    },
    submitCheck () { // 提交审核
      if (this.ids === '' || this.ids === undefined || this.ids === null) {
        this.$message({
          showClose: true,
          message: '请至少选择一条信息！',
          type: 'error'
        })
      } else {
        Request.submitCheck(this, this.ids)
      }
    },
    applyValue () { // 拼接配合作业需求申请的值
      this.ruleForm.apply = this.ruleForm.apply + this.applys
    },
    changeAssos () {
      this.ruleForm.associatedPower = this.ruleForm.associatedPower + this.associatedPowers
    }
  },
  data () {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass')
        }
        callback()
      }
    }
    var date = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入结束时间'))
      } else if (value <= this.ruleForm.planStartTime) {
        callback(new Error('结束时间小于开始时间!'))
      } else {
        callback()
      }
    }
    return {
      addInfo: true, // 编辑还是新建的提交按钮
      addInfo: true, // 编辑还是新建的提交按钮
      disabled: true, // 编辑状态下用户帐号不可编辑
      addAndUpdateTitle: '', // 添加编辑作业计划标题
      formData: { // 向用户列表数据接口传递数据
        planStatus: null, // 计划状态(1草稿2已提交-审核中3审核通过4审核不通过)
        type: 2, // 1年计划2月计划3半月计划4周计划5日计划
        planCreateType: 1, // 年计划查询类型 1 所有 2 计划创建
        searchContent: '', // 模糊查询内容
        searchTime: '', // 查询时间
        pageSize: 20, // 分页单页显示条数
        currentPage: 1 // 每页页码
      },
      tableData: [
        { // 表格数据
        // id: '1',
        // locked: '', // 用户锁定状态（默认：1正常, 0锁定, 2注销）
        // loginTime: '11', // 最后登录时间
        // nickName: '', // 昵称
        // phoneNum: '', // 手机号
        // realName: '111', // 真实姓名
        // userName: '11' // 帐号
        }
      ],
      ids: '', // 删除id集合
      totalRows: null, // 分页数据总条数
      drawer: false, // 控制新增导航抽屉弹层是否展开
      fanTrue: false, // 电压范围±号是否显示
      ruleForm: { // 新增导航抽屉弹层所收集的表单数据，用于将数据提交至axios
        id: null, // id
        planName: '', // 工作任务
        planContent: '', // 工作内容
        planNature: '', // 计划性质
        jobType: '', // 工作类型
        profession: '', // 专业名称
        teamName: '', // 工作班组
        planAddress: '', // 工作地点
        planStartTime: '', // 计划开始日期
        planEndTime: '', // 计划结束日期
        jobWay: '', // 工作方式
        voltageLevelType: '', // 电压等级是否包含范围
        voltageLevel: '', // 电压等级
        planPrincipal: '', // 作业责任单位/责任人
        planConstructor: '', // 作业施工单位/负责人
        hazardLevel: '', // 风险等级
        equipment: '', // 操作设备
        controLevel: '', // 管控层级
        apply: '', // 配合作业需求申请
        powerNumber: null, // 停电户数
        operation: '', // 执行调度
        associatedPower: '', // 关联停电设备
        remark: '', // 备注
        workYaer: '', // 作业计划年份
        selectionWork: [] // 选用作业文件
      },
      planNatureList: [{ // 计划性质下拉列表
      }],
      jobTypeList: [{ // 工作类型下拉列表
      }],
      professionList: [{ // 专业名称下拉列表
      }],
      voltageLevelList: [{ // 电压等级下拉列表
      }],
      selectionWorkList: [{ // 关选用作业文件下拉列表
      }],
      teamNameList: [{ // 工作班组下拉列表
        value: '',
        label: ''
      }],
      planAddressList: [{ // 工作地点下拉列表
        value: '',
        label: ''
      }],
      voltageLevelType: [{ // 电压等级是否包含范围
        value: true,
        label: '是'
      }, {
        value: false,
        label: '否'
      }],
      jobWayList: [{ // 工作方式下拉列表
        value: '1',
        label: '停电'
      }, {
        value: '2',
        label: '不停电'
      }, {
        value: '3',
        label: '带电作业'
      }],
      hazardLevelList: [{ // 风险等级下拉列表
        value: '1',
        label: '高'
      }, {
        value: '2',
        label: '中'
      }, {
        value: '3',
        label: '低'
      }, {
        value: '4',
        label: '可接受'
      }],
      controlevelList: [{ // 管控层级下拉列表
        value: '1',
        label: '班组'
      }, {
        value: '2',
        label: '所队'
      }, {
        value: '3',
        label: '局级'
      }],
      applys: '', // 配合作业需求申请选中的值
      applyList: [{ // 配合作业需求申请下拉列表
        value: '',
        label: ''
      }],
      operationList: [{ // 执行调度下拉列表
        value: '1',
        label: '总调'
      }, {
        value: '2',
        label: '中调'
      }, {
        value: '3',
        label: '地调'
      }, {
        value: '4',
        label: '配调'
      }],
      associatedPowers: '', // 关联停电设备选的值
      associatedPowerList: [{ // 关联停电设备下拉列表
        value: '',
        label: ''
      }],
      timeTo: false, // 校验开始时间和结束时间
      rules: { // 表单验证.
        planName: [{ required: true, message: '请输入工作任务', trigger: 'blur' }], // 工作任务验证
        planContent: [{ required: true, message: '请输入工作内容', trigger: 'blur' }], // 工作内容验证
        planNature: [{ required: true, message: '请选择计划性质', trigger: 'blur' }], // 计划性质验证
        jobType: [{ required: true, message: '请选择工作类型', trigger: 'blur' }], // 工作类型验证
        profession: [{ required: true, message: '请选择专业', trigger: 'blur' }], // 专业验证
        teamName: [{ required: true, message: '请输入工作班组', trigger: 'blur' }], // 工作班组验证
        planAddress: [{ required: true, message: '请输入工作地点', trigger: 'blur' }], // 工作地点验证
        planStartTime: [{ required: true, message: '请选择开始日期', trigger: 'blur' }], // 开始日期验证
        planEndTime: [{ required: true, validator: date, trigger: 'blur'  }], // 结束日期验证
        jobWay: [{ required: true, message: '请选择工作方式', trigger: 'blur' }], // 工作方式验证
        voltageLevelType: [{ required: true, message: '请选择是否包含电压等级范围', trigger: 'blur' }],// 是否包含电压等级范围
        voltageLevel: [{ required: true, message: '请选择电压等级', trigger: 'blur' }], // 电压等级
        planPrincipal: [{ required: true, message: '请输入作业责任单位/责任人', trigger: 'blur' }], // 作业责任单位/责任人
        planConstructor: [{ required: true, message: '请输入作业施工单位/责任人', trigger: 'blur' }], // 作业施工单位/责任人
        hazardLevel: [{ required: true, message: '请选择风险等级', trigger: 'blur' }] ,// 风险等级
        controLevel: [{ required: true, message: '请选择管控层级', trigger: 'blur' }], // 管控层级
        selectionWork: [{ required: true, message: '请选择作业文件', trigger: 'blur' }], // 作业文件
        powerNumber: [{ required: true, message: '请输入停电户数', trigger: 'blur' }], // 停电户数
        operation: [{ required: true, message: '请选择执行调度', trigger: 'blur' }], // 执行调度
        equipment: [{ required: true, message: '请输入操作设备', trigger: 'blur' }], // 操作设备
        associatedPower: [{ required: true, message: '请输入关联停电设备', trigger: 'blur' }], // 关联停电设备
        apply: [{ required: true, message: '请输入配合作业需求申请', trigger: 'blur' }] // 配合作业需求申请
      },
      dialogFormVisible: false, // 对话框的展开隐藏
      formEdit: { // 编辑用户
        locked: null, // 状态
        userName: null, // 帐号
        realName: null, // 姓名
        phoneNum: null, // 手机号
        pass: null, // 密码
        checkPass: null, // 确认密码
        roleId: 8 // 角色id
      },
      ruless: { // 表单验证.
        // pass: [{ required: true, validator: validatePass, trigger: 'blur' }],
        // checkPass: [{ required: true, validator: validatePass2, trigger: 'blur' }]
      },
      tableHeight: this.$store.state.mainHeight - 170 - 42 // 76为main顶部及填充值
    }
  }
}
