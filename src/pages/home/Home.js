import HeaderBox from 'common/header/Header.vue'
import AsideBox from 'common/aside/Aside.vue'
import MainBox from 'common/main/Main.vue'
import Request from './Request.js'
export default {
  name: 'Home',
  components: {
    HeaderBox,
    AsideBox,
    MainBox
  },
  data () {
    return {
      unreadCount: null, // 企业审核未读条数
      headerData: { // 页眉接口数据
        headNavLeft: [
          // {id
          // menuImgCode: 图标代码
          // menuList: 子级数据 无用
          // menuName: 按钮名称
          // menuSort: 排序
          // menuType: 1为左导航 2为右导航
          // menuUrl: 内容页面地址
          // parentId: 父级id 顶级为0
          // ref: 元素refs索引名
          // status: 是否启用  1启用 0停用
          // tabName: 内容页面标题名}
        ],
        headNavRight: [/* 同上 */],
        headerLogo: {
          // BooleanName: true, 是否显示logo名
          // BooleanUrl: false, 是否显示logo图片
          // name: "本是教育", logo名
          // url: "" logo图片
        }
      },
      asideData: [ // 左侧导航接口数据
        // {id
        // menuImgCode: 导航图标
        // menuList: 子级
        // menuName: 导航按钮名称
        // menuSort: 排序
        // menuType: 左右导航 无用
        // menuUrl: 内容页面地址
        // parentId: 父级id
        // ref: 元素ref索引名
        // status: 是否启用
        // tabName: 内容页面标题名}
      ],
      contentData: { // 内容区域接口数据
        // menuUrl: 内容地址
        // tabName: 内容标题
      }
    }
  },
  methods: {
    navIdClick (Id) { // 点击页眉导航更新左侧导航及内容区域
      console.log(Id)
      Request.getMenuList(this, Id)
    },
    asideNavData (asideNavData) {
      this.contentData = asideNavData
    }
  },
  // mounted () { // 钩子函数
  // },
  activated () { // 组件被激活调用
    this.$store.dispatch('changeMainHeight', this.$refs.main.$el.offsetHeight) // 记录main高度
    Request.getHomeInfo(this) // 登录成功首页初始化调用页眉logo、left及right导航数据接口
  }
}
