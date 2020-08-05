<!-- 欢迎页 -->
<template>
  <!-- <div class="box" :style="{backgroundImage: 'url(' + backUrl + ')', height: boxHeight + 'px'}"> -->
  <div class="box" :style="{height: boxHeight + 'px'}">
    <div class="box-position">
      <!-- <img :src="logoImg"> -->
      <h3>欢迎登录作业安全掌控平台</h3>
      <div class="loginTime">上次登录时间：{{lastLoginTime}}</div>
      <div class="loginTime">当前登录时间：{{currentLoginTime}}</div>
      <div class="iconfont icon-welcome">&#xe601;</div>
      <!-- <div class="list" :style="{backgroundImage: 'url(' + boxBorder + ')'}"> -->
      <div class="list">
        <ul>
          <li>帐号：{{userName}}</li>
          <li>角色：{{roleName}}</li>
          <!-- <li>昵称：{{nickName}}</li> -->
          <li>姓名：{{realName}}</li>
          <!-- <li>部门：{{department}}</li>
          <li>职务：{{job}}</li> -->
        </ul>
      </div>
    </div>
  </div>
</template>

<script src="./Welcome.js"></script>
<style lang="stylus" scoped src="./Welcome.css"></style>
