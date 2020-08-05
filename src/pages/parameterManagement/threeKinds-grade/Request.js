import ThreeKindsConsole from '@/apis/interface-fn/ThreeKinds-ConsoleFn.js' // 接口调用文件
import ThreeKindsGrade from '@/apis/interface-fn/ThreeKinds-GradeFn.js' // 接口调用文件
export default {
  getInfo (_this, formData) { // 三种人扣分管理初始化
    ThreeKindsGrade.findSysUserList(_this, formData)
  },
  getAllGwList (_this, type) { // 获取全部岗位下拉列表
    let formData = {
      type: 4 // 4全部
    }
    ThreeKindsConsole.getAllGwList(_this, formData)
  },
  getSelectList (_this, type) { // 获取下拉列表函数
    let formData = {
      type: type // 1回显2添加
    }
    ThreeKindsConsole.getSelectList(_this, formData)
  },
  getFractionList (_this) { // 获取扣分原因列表
    ThreeKindsGrade.getFractionList(_this)
  },
  // submitCheck (_this) {
  //   _this.$refs.fraction.validate((valid) => {
  //     if (valid) { // 表单验证通过
  //       let formData = {
  //         userId: _this.lookForm.userId,
  //         fraction: _this.fraction.fraction,
  //         description: _this.fraction.description
  //       }
  //       ThreeKindsGrade.submitCheck(_this, formData)
  //     } else {
  //       return false // 表单验证不通过
  //     }
  //   }
  // },
  submitCheck (_this, id) { // 提交扣分
    let formData = {
      userId: _this.lookForm.userId,
      fraction: _this.fraction.fraction,
      description: _this.fraction.description
    }
    ThreeKindsGrade.submitCheck(_this, formData)
  }
}
