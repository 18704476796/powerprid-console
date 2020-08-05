import HomeFn from '@/apis/interface-fn/HomeFn.js' // 接口调用文件
export default {
  getHomeInfo (_this) {
    console.log(_this.$store.state.radioRole)
    let formData = {roleId: _this.$store.state.radioRole}
    HomeFn.getIndex(_this, formData)
  },
  getMenuList (_this, Id) {
    let formData = {menuId: Id, roleId: _this.$store.state.radioRole}
    HomeFn.getMenuList(_this, formData)
  }
}
