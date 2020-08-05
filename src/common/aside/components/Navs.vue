<template>
  <div>
    <el-submenu v-for="(item, index) of asideData" :key="item.id" :index="String(index)" v-if="menuList(item.menuList)">
      <template slot="title">
        <i class="iconfont" v-html="item.menuImgCode"></i>
        <span slot="title">{{item.tabName}}</span>
      </template>
      <!-- <navs :asideData="item.menuList"></navs> -->
      <!-- <el-menu-item v-for="(subItem,i) in item.tabName" :key="i" :index="subItem.parentId+'-' + i">
          {{ subItem.tabName }}
      </el-menu-item> -->
      <!-- 三级菜单 -->
      <el-menu-item v-for="(items, i) of item.menuList" :key="items.id" :index="String(i)" @click="hrefUrlClick(items.tabName, items.menuUrl)">
        <i class="iconfont" v-html="items.menuImgCode"></i>
        <span slot="title">{{items.tabName}}</span>
      </el-menu-item>
    </el-submenu>
    <el-menu-item v-else @click="hrefUrlClick(item.tabName, item.menuUrl)">
      <i class="iconfont" v-html="item.menuImgCode"></i>
      <span slot="title">{{item.tabName}}</span>
    </el-menu-item>
  </div>
</template>

<script>
import Navs from './Navs'
export default {
  name: 'Navs',
  components: {
    Navs
  },
  props: {
    asideData: Array
  },
  methods: {
    hrefUrlClick: function (_name, _url) {
      let asideNavData = {
        tabName: _name,
        menuUrl: _url
      }
      this.$emit('asideClick', asideNavData)
    },
    menuList (menuList) { // 判断是否含有子级
      if (menuList !== undefined && menuList.length > 0) {
        return true
      } else {
        return false
      }
    }
  }
}
</script>
