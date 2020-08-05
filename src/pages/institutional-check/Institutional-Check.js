import Tables from './components/Tables'
import Request from './Request.js' // 接口文件
export default {
  name: 'InstitutionalCheck',
  components: {
    Tables
  },
  mounted () { // 钩子函数
    Request.getInfo(this)
  },
  methods: {
    onlocked (locked, id) { // 修改状态
      Request.onlocked(this, locked, id)
    },
    load (tree, treeNode, resolve) { // 懒加载
      // this.tree = tree
      // this.treeNode = treeNode
      // this.resolve = resolve
      const id = tree.id
      this.maps.set(id, {tree, treeNode, resolve})
      Request.loadGetInfo(this, tree, treeNode, resolve)
    },
    addInfo (obj) { // 新增部门
      this.addData = obj
      this.drawer = true
      this.ruleForm.parentName = obj.name
      this.ruleForm.code = obj.code
      this.ruleForm.id = null
      this.ruleForm.parentId = obj.id
      this.drawerTitle = '添加部门'
      this.drawerButton = '立即创建'
    },
    handleClose (done) { // 抽屉弹出关闭
      done()
    },
    onSubmit () {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) { // 表单验证通过
          Request.onSubmit(this)
        } else {
          return false // 表单验证不通过
        }
      })
    },
    edit (obj) { // 编辑管理员弹层函数
      this.addData = obj
      this.ruleForm = obj
      this.drawer = true
      this.drawerTitle = '编辑部门'
      this.drawerButton = '保存'
    },
    deleteUser (obj, thiss) { // 删除
      this.addData = obj
      console.log(this.addData)
      this.$confirm('此操作将永久删除该信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        Request.deleteUser(this, obj.id, thiss)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  },
  data () {
    return {
      tree: {},
      treeNode: {},
      resolve: '',
      maps: new Map(),
      addData: {},
      disabled: true, // 表单为true则不可编辑
      tableData: [{ // 表格数据
      }],
      drawer: false, // 控制新增导航抽屉弹层是否展开
      drawerTitle: '', // 弹层标题
      drawerButton: '', // 弹层按钮名称
      ruleForm: { // 新增导航抽屉弹层所收集的表单数据，用于将数据提交至axios
        id: '',
        parentId: '', // 父级id
        parentName: '', // 父级名称
        code: '',
        name: '', // 部门名称
        orgType: 1, // 类型
        sort: 0, // 排序
        status: 1, // 状态 1 启用 0 禁用
        createTime: '' // 创建时间
      },
      typeList: [{ // 所属类型列表
        lable: 1, //
        value: '总部供电区'
      }, {
        lable: 2,
        value: '区县供电局'
      }],
      rules: { // 表单验证.
        name: [{ required: true, message: '请输部门名称', trigger: 'blur' }]
      },
      tableHeight: this.$store.state.mainHeight - 76 // 76为main顶部及填充值
    }
  }
}
