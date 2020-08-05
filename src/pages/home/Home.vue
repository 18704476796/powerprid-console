<!-- home架构 -->
<template>
  <el-container id="box">
    <el-header>
      <header-box :headerData="headerData" @navIdClick="navIdClick"></header-box>
    </el-header>
    <el-container>
      <el-aside style="width: auto">
        <aside-box :asideData="asideData" @asideClick="asideNavData"></aside-box>
      </el-aside>
      <el-main ref="main">
        <main-box :contentData="contentData"></main-box>
      </el-main>
    </el-container>
    <el-footer style="height: 26px;">
      <!-- <footerbox></footerbox> -->
    </el-footer>
  </el-container>
</template>

<script src="./Home.js"></script>
<style lang="stylus" scoped src="./Home.css"></style>
