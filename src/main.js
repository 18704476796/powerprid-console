// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui' // elementui组件
import store from './store' // vuex
import 'element-ui/lib/theme-chalk/index.css' // elementui样式
// 解决300毫秒单击延迟的问题
import fastClick from 'fastclick'
import VueCropper from 'vue-cropper' // 图片剪裁组件
import 'styles/reset.css' // 初始化样式
import 'styles/hybin.css' // 自定义样式
import 'styles/iconfont.css' // 字体图标
import 'styles/border.css' // 移动端1像素边框的问题
import '@/apis/http.js' // 移动端1像素边框的问题
import preview from 'vue-photo-preview' // 图片放大预览组件
import 'vue-photo-preview/dist/skin.css'
Vue.use(preview)
Vue.use(ElementUI) // elementui组件
Vue.use(VueCropper) // 图片剪裁组件
Vue.config.productionTip = false
// 解决300毫秒单击延迟的问题
fastClick.attach(document.body)

router.beforeEach((to, from, next) => { // 路由判断登录 根据路由配置文件的参数
  if (to.fullPath === '/login') { // 如果本地 存在 token 则 不允许直接跳转到 登录页面
    if (localStorage.token) {
      next({
        path: from.fullPath
      })
    } else {
      next()
    }
  }
  if (to.matched.some(record => record.meta.requireAuth)) { // 判断该路由是否需要登录权限
    if (localStorage.token !== isNaN(NaN) && localStorage.token !== undefined && localStorage.token !== null && localStorage.token !== '') {
      next()
    } else {
      next({
        path: '/login',
        query: {redirect: to.fullPath} // 将跳转的路由path作为参数，登录成功后跳转到该路由
      })
    }
  } else {
    next()
  }
})

/* eslint-disable no-new */
var vue = new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
// 导出vue 供axios实例内公共使用
export default vue
