export default {
  changeToken (ctx, token) { // 存储用户token
    ctx.commit('changeToken', token)
  },
  changeRadioRole (ctx, radioRole) { // 多用户角色id存储
    ctx.commit('changeRadioRole', radioRole)
  },
  changeHttpUrl (ctx, httpUrl) { // 图片前缀地址
    ctx.commit('changeHttpUrl', httpUrl)
  },
  changeMainHeight (ctx, mainHeight) { // 内容列表高度值
    ctx.commit('changeMainHeight', mainHeight)
  },
  changeNavTs (ctx, navTs) { // 伸缩按钮存储值
    ctx.commit('changeNavTs', navTs)
  }
}
