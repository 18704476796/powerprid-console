<!-- 平台初始化 -->
<template>
  <div class="box">
    <div class="left">
      <!-- <div class="val-box">
        <strong class="title-strong">前台跳转地址：</strong>
        <el-input placeholder="请输入内容" v-model="form.url" class="input-with-select">
          <el-select v-model="form.select" slot="prepend" placeholder="请选择" style="width: 96px">
            <el-option label="http://" value="http://"></el-option>
            <el-option label="https://" value="https://"></el-option>
          </el-select>
        </el-input>
      </div> -->
      <div class="val-box">
        <strong class="title-strong">页眉Logo名称：</strong>
        <el-input
          placeholder="请输入内容"
          v-model="form.text"
          clearable
          style="margin-top: 20px;">
        </el-input>
      </div>
      <el-button type="primary" class="btn-text" @click='submitInfo()'>保存信息</el-button>
    </div>
    <div class="left">
      <ul class="list-img">
        <li>
          <el-upload
            action="#"
            :show-file-list="false"
            list-type="picture-card"
            :auto-upload="false"
            :on-change="onChangeHeadImg"
            >
            <div class="img-box" v-if="form.disabledHeaderLogo">
              <div class="img-mask">更换图片</div>
              <img :src="form.headerLogoUrl"/>
            </div>
            <i v-else class="el-icon-plus"></i>
          </el-upload>
          <el-button type="primary" size="mini" @click='submit(form.headerLogo, 1)'>保存图片</el-button>
          <strong>页眉Logo</strong>
          <span>尺寸：200px*48px<br>格式：png</span>
        </li>
        <li>
          <el-upload
            action="#"
            :show-file-list="false"
            list-type="picture-card"
            :auto-upload="false"
            :on-change="onChangeLoginLogo"
            >
            <div class="img-box" v-if="form.disabledLoginLogo">
              <div class="img-mask">更换图片</div>
              <img :src="form.loginLogoUrl"/>
            </div>
            <i v-else class="el-icon-plus"></i>
          </el-upload>
          <el-button type="primary" size="mini" @click='submit(form.loginLogo, 2)'>保存图片</el-button>
          <strong>登录页Logo</strong>
          <span>尺寸：200px*200px<br>格式：png</span>
        </li>
        <li>
          <el-upload
            action="#"
            :show-file-list="false"
            list-type="picture-card"
            :auto-upload="false"
            :on-change="onChangeLoginBack"
            >
            <div class="img-box" v-if="form.disabledLoginBack">
              <div class="img-mask">更换图片</div>
              <img :src="form.loginBackUrl"/>
            </div>
            <i v-else class="el-icon-plus"></i>
          </el-upload>
          <el-button type="primary" size="mini" @click='submit(form.loginBack, 3)'>保存图片</el-button>
          <strong>登录页背景</strong>
          <span>尺寸：1920px*1080px<br>格式：png、jpg</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script src="./Platform.js"></script>
<style lang="stylus" scoped src="./Platform.css"></style>
