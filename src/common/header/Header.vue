<!-- 页眉组件 -->
<template>
  <div class="header-box">
    <div class="header-logo">
      <img :src="headerData.headerLogo.url" v-if="headerData.headerLogo.BooleanUrl"/>
      <div v-else>{{headerData.headerLogo.name}}</div>
    </div>
    <div class="nav nav-left">
      <el-button
        v-for="item of headerData.headNavLeft"
        :key="item.id"
        circle
        type="primary"
        :class="{iconfont:'iconfont',hyb_tsn:'hyb_tsn'}"
        @click="navClick(item.menuRef, item.id, $event)"
        :title="item.tabName"
        :ref="item.menuRef"
        v-html="item.menuImgCode"
      >
      </el-button>
    </div>
    <div class="nav nav-right">
      <el-button
        v-for="item of headerData.headNavRight"
        :key="item.id"
        circle
        type="primary"
        :class="{iconfont:'iconfont',hyb_tsn:'hyb_tsn'}"
        @click="navClick(item.menuRef, item.id)"
        :title="item.tabName"
        :ref="item.menuRef"
        v-html="item.menuImgCode"
      >
      </el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Header',
  props: {
    headerData: Object
  },
  watch: {
    // 监听 headerData 属性，将属性值与store内的值保持同步，保证伸缩按钮图标显示正确
    headerData () {
      this.$nextTick(function () {
        this.$refs.telescopic[0].$el.innerHTML = this.$store.state.navTs.icon
      })
    }
  },
  methods: {
    // 点击页眉一级导航执行函数
    navClick (ref, Id, e) {
      switch (ref) {
        case 'telescopic':
          if (parseInt(this.$store.state.navTs.val) === 1) {
            this.$store.dispatch('changeNavTs', {val: 0, icon: '&#xe62b;'})
          } else {
            this.$store.dispatch('changeNavTs', {val: 1, icon: '&#xe62d;'})
          }
          e.target.innerHTML = this.$store.state.navTs.icon
          break
        case 'reception':
          window.open('http://www.benshijy.com', '_blank')
          break
        case 'signOut':
          this.$confirm('您正在进行退出操作, 是否继续?', '提示', {
            confirmButtonText: '确定退出',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$message({
              type: 'success',
              message: '退出成功!'
            })
            this.$store.dispatch('changeToken', '')
            this.$router.push('/login')
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消退出'
            })
          })
          break
        default:
          this.$emit('navIdClick', Id)
          break
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
  .header-logo
    float: left
    width: 200px
    padding: 6px 0
    font-size: 18px
    color: #fff
    line-height: 48px
    text-align: center
    img
      margin: auto
      height: 48px
  .nav
    margin-top: 5px
    .el-button
      width: 50px
      height: 50px
      color: #fff
      font-size: 26px
      padding: 0
  .nav-left
    float: left
  .nav-right
    float: right
</style>
