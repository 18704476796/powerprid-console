import axios from 'axios' // axios
import _this from '@/main.js' // 引入vue实例
// 创建axios的一个实例
var instanceFile = axios.create({ // 文件上传实例
  baseURL: '/api',
  timeout: 8000,
  // responseType: 'json'
  responseType: 'blob'
})
instanceFile.defaults.withCredentials = true // 设置为跨域携带证书
// http request 拦截器
var loading = null
instanceFile.interceptors.request.use(
  config => {
    loading = _this.$loading({ // 调用遮罩
      lock: true,
      text: '请稍候...',
      spinner: 'el-icon-loading', // 图标
      background: 'rgba(0, 0, 0, 0.5)'
    })
    // 判断是否存在token，如果存在的话，则每个http header都加上token
    if (localStorage.token) {
      config.headers.Authorization = localStorage.token
    }
    return config
  }, err => {
    return Promise.reject(err)
  }
)
// http response 拦截器
instanceFile.interceptors.response.use(
  response => {
    loading.close() // 取消遮罩
    return response
  },
  error => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          // 返回 401 清除token信息并跳转到登录页面
          // localStorage.removeItem('token')
          // router.replace({
          //   path: '/login',
          //   query: {redirect: router.currentRoute.fullPath}
          // })
          break
        case 500:
          _this.$message({
            showClose: true,
            message: '错误码：500，请联系网站管理员。',
            type: 'error'
          })
          break
        default:
          _this.$message({
            showClose: true,
            message: '未知错误，请联系网站管理员。',
            type: 'error'
          })
          break
      }
    }
    loading.close() // 取消遮罩
    return Promise.reject(error.response.data) // 返回接口返回的错误信息
  }
)
// export default Instance
export default function (method, url, data = null) {
  method = method.toLowerCase()
  if (method === 'post') {
    return instanceFile.post(url, data)
  } else if (method === 'get') {
    return instanceFile.get(url, { params: data })
  } else if (method === 'delete') {
    return instanceFile.delete(url, { params: data })
  } else if (method === 'put') {
    return instanceFile.put(url, data)
  } else {
    console.error('未知的method' + method)
    return false
  }
}
