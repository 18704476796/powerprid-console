// 数据接口
import req from './http.js'
import ref from './httpFile.js' // 上传文件使用此接口函数

// 登录模块接口
export const LOGIN_IMG = params => req('post', '/company/aboutusUs.htm', params) // 登录页面背景图片及logo接口
export const LOGIN = params => req('post', '/admin/user/login', params) // 登录验证接口
export const NAV_ONE = params => req('post', '/admin/user/getIndex', params) // 登录成功初始化一级导航
export const GO_PHONE_CODE = params => req('post', '/admin/verificationCode/sendSMS', params) // 发送验证码接口

// home导航交互接口
export const NAV_LEFT_CONTENT = params => req('post', '/admin/user/getMenuList', params) // 点击一级导航左侧导航及内容
export const PERSON_CENTER = params => req('post', '/admin/user/getPersonCenter', params) // 欢迎页接口

// 资源管理模块接口
export const FIND_MENU_ALL = params => req('post', '/admin/menu/findMenuAll', params) // 资源管理初始化
export const SAVE_UPDATE_MENU = params => req('post', '/admin/menu/saveOrUpdateMenu', params) // 资源管理保存和修改接口
export const DELETE_MENU = params => req('post', '/admin/menu/deleteMenu', params) // 资源管理删除数据接口

// 权限管理模块接口
export const FIND_ROLE_CONTROL = params => req('post', '/admin/sysRole/findRoleControl', params) // 权限管理,角色权限切换数据接口
export const JURISDICTION_PRESERVATION_MODIFY = params => req('post', '/admin/sysRole/saveOrUpdateRoleControl', params) // 权限管理，权限变化更新接口

// 角色管理模块接口
export const FIND_ROLE_LIST = params => req('post', '/admin/sysRole/findRoleList', params) // 角色管理数据接口
export const SAVE_UPDATE_ROLE = params => req('post', '/admin/sysRole/saveOrUpdateRole', params) // 角色创建保存角色信息数据接口
export const DELETE_ROLE = params => req('post', '/admin/sysRole/deleteRole', params) // 角色管理删除角色数据接口

// 作业计划编制管理模块
export const PLAN_LIST = params => req('get', '/plan/info/list', params) // 作业计划初始化数据接口
export const IMP_EXCEL = params => ref('post', '/plan/info/impExcel', params) // 作业计划导入数据接口
export const DOWNLOAD_PLAN_INFO_TEMLATE = params => ref('get', '/plan/info/downloadPlanInfoTemplate', params) // 作业计划下载模板接口
export const IMPROT_PLAN_INFO = params => ref('get', '/plan/info/importPlanInfo', params) // 作业计划导出模板接口
export const INFO_SHOW = params => req('get', '/plan/info/show', params) // 作业计划获取下拉列表数据接口
export const INFO_ADD = params => req('post', '/plan/info/add', params) // 作业计划添加数据接口
export const INFO_DELETE = params => req('post', '/plan/info/delete', params) // 作业计划删除接口
export const INFO_UPDATE = params => req('post', '/plan/info/update', params) // 作业计划编辑接口
export const UPDATE_PLAN_STATUS = params => req('post', '/plan/info/updatePlanStatus', params) // 作业计划编辑提交审核接口

// 用户管理模块
export const USER_LIST = params => req('post', '/admin/sys/user/list', params) // 用户管理初始化接口
export const FIND_POSITION_SELECT_LIST = params => req('post', '/admin/sysPosition/findPositionSelectList', params) // 获取角色列表接口
export const SAVE_OR_UPDATE = params => req('post', '/admin/sys/user/saveOrUpdate', params) // 添加修改用户接口
export const USER_DELETE = params => req('post', '/admin/sys/user/delete', params) // 删除用户接口
export const USER_EXPEXCEL = params => ref('post', '/admin/sys/user/expexcel', params) // 用户导出接口
export const USER_IMPEXCELL = params => ref('post', '/admin/sys/user/impexcel', params) // 用户导入接口
export const IMPEXCEL_TEMPLATE = params => ref('post', '/admin/sys/user/downloadImpexcelTemplate', params) // 用户下载模板接口
export const FIND_CLIENT_IMPORT_LIST = params => req('post', '/admin/clientImport/findClientImportList', params) // 查询导入记录接口

// 人员资质台账管理
// 三种人管理接口
export const FIND_SYS_USER_LEDGER = params => req('get', '/admin/ledger/findSysUserLedgerList', params) // 三种人管理初始化数据接口
export const IMPORT_SYS_USER_LEDGER = params => ref('get', '/admin/ledger/importSysUserLedger', params) // 三种人管理导出数据接口
export const FIND_SYS_USER_LIST = params => req('get', '/admin/ledger/findSysUserList', params) // 新增三种人管理初始化数据接口
export const SAVE_SYS_USER_LEDGER = params => req('post', '/admin/ledger/saveSysUserLedger', params) // 新增三种人管理提交数据接口
export const DELETE_SYS_USER_LEDGER = params => req('post', '/admin/ledger/deleteSysUserLedger', params) // 删除三种人管理数据接口
export const FIND_SYS_ORG_DEPART_SELECT_LIST = params => req('post', '/admin/sys/org/depart/findSysOrgDepartSelectList', params) // 获取单位、岗位、班组等下拉列表数据接口
export const UPDATE_SYS_USER_LEDGER = params => req('post', '/admin/ledger/updateSysUserLedger', params) // 编辑三种人管理数据接口
export const FIND_LEDGER_FRACTION_LIST = params => req('get', '/admin/ledgerfraction/findLedgerFractionList', params) // 查看扣分详情接口
// 扣分规则
export const FIND_FRACTION_ITEM_LIST = params => req('get', '/admin/fractionitem/findFractionItemList', params) // 扣分规则初始化数据接口
export const SAVE_UPDATE_FRACTION_ITEM = params => req('post', '/admin/fractionitem/saveOrUpdateFractionItem', params) // 扣分规则添加、修改数据接口
export const DELETE_FRACTION_ITEM = params => req('post', '/admin/fractionitem/deleteFractionItem', params) // 删除扣分规则数据接口
export const SAVE_UPDATE_LEDGER_FRACTION = params => req('post', '/admin/ledgerfraction/saveOrUpdateLedgerFraction', params) // 提交扣分是申请数据接口
// 三种人审核接口
export const SYS_USER_LEDGER_TODO_TASKS_LIST = params => req('get', '/admin/ledger/sysUserLedgerToDoTasksList', params) // 三种人审核初始化接口
export const SYS_USER_LEDGER_AUDIT = params => req('post', '/admin/ledger/sysUserLedgerAudit', params) // 三种人审核提交接口
// 三种人扣分审核
export const FIND_LEDGER_FRACTION_AUDIT_LIST = params => req('get', '/admin/ledgerfraction/findLedgerFractionAuditList', params) // 三种人扣分审核初始化数据接口
export const LEDGER_FRACTION_AUDIT = params => req('get', '/admin/ledgerfraction/ledgerFractionAudit', params) // 三种人扣分审核结果提交数据接口

// 组织机构模块
export const DEPART_TREE = params => req('get', '/admin/sys/org/depart/tree', params) // 组织机构始化数据接口
export const DEPART_ADD = params => req('post', '/admin/sys/org/depart/add', params) // 组织机构添加、修改数据接口
export const DEPART_UPDATA_STATUS_BYID = params => req('post', '/admin/sys/org/depart/updateStatusById', params) // 组织机构修改状态数据接口
export const DEPART_DELETE = params => req('post', '/admin/sys/org/depart/delete', params) // 组织机构删除数据接口

// 岗位管理模块
export const FIND_POSITION_LIST = params => req('get', '/admin/sysPosition/findPositionList', params) // 岗位管理始初化数据接口
export const SAVE_UPDATE_POSITION = params => req('post', '/admin/sysPosition/saveOrUpdatePosition', params) // 岗位管理添加、修改数据接口
export const DELETE_POSITION = params => req('post', '/admin/sysPosition/deletePosition', params) // 岗位管理删除数据接口

// 流程管理模块
export const FIND_PLAN_PROCESS_LIST = params => req('get', '/plan/findPlanProcessList', params) // 流程管理初始化数据接口
export const SAVE_UPDATE_PLAN_PROCESS = params => req('post', '/plan/saveOrUpdatePlanProcess', params) // 流程管理添加、修改数据接口
export const NODE_LIST = params => req('get', '/plan/node/list', params) // 流程管理查看流程节点数据接口
export const FIND_PLAN_NODE_TYPE_SELECT_LIST = params => req('get', '/plan/findPlanNodeTypeSelectList', params) // 获取流程节点类型下拉列表数据接口
export const NODE_ADD = params => req('post', '/plan/node/add', params) // 流程管理添加流程节点数据接口
export const NODE_UPDATE = params => req('post', '/plan/node/update', params) // 流程管理修改流程节点数据接口
export const GUIDE_LIST = params => req('get', '/plan/node/guide/list', params) // 节点按钮查看详情数据接口
export const GUIDE_ADD = params => req('post', '/plan/node/guide/add', params) // 节点按钮添加数据接口
export const GUIDE_UPDATE = params => req('post', '/plan/node/guide/update', params) // 节点按钮编辑数据接口

// 节点类型管理模块
export const FIND_OLAN_NODE_TYPE_LIST = params => req('get', '/plan/findPlanNodeTypeList', params) // 节点类型管理初始化数据接口
export const SAVE_UPDATE_PLAN_NODE_TYPE = params => req('post', '/plan/saveOrUpdatePlanNodeType', params) // 节点类型管理修改、添加数据接口
export const DELETE_PLAN_NODE_TYPE = params => req('post', '/plan/deletePlanNodeType', params) // 节点类型管理删除数据接口

// 这里使用了箭头函数，转换一下写法：/
// export const LOGIN = function(req) {
//   return req('post', '/user/validateLogin.htm', params)
// }
