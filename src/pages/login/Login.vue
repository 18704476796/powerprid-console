<!-- 登录页 -->
<template>
  <div class="loginBox" :style="{backgroundImage: 'url(' + loginBack + ')'}">
    <img class="imgTitle" src="../../assets/images/ptFont.png" />
    <div class="login-float">
      <div class="login-left login-leftBox">
        <img :src="loginLogo" />
      </div>
      <div class="login-right">
        <div>
          <h3>登录/Login</h3>
          <!-- 密码登录 -->
          <el-form :model="loginForm" :rules="rules" ref="loginForm" v-if="zhLogin">
            <ul>
              <li>
                <el-form-item prop="user">
                  <el-input placeholder="请输入帐号" v-model="loginForm.user" clearable></el-input>
                </el-form-item>
              </li>
              <li>
                <el-form-item prop="password">
                  <el-input placeholder="请输入口令"
                    v-model="loginForm.password"
                    show-password
                    @keyup.enter.native="submitForm('loginForm')"
                  >
                  </el-input>
                </el-form-item>
              </li>
              <li><el-button
                type="primary"
                class="loginBtn"
                @click="submitForm('loginForm')"
              >登入</el-button></li>
            </ul>
            <div class="hyb_clear">
              <div class="yzmLogin" @click="changeYzm">验证码登录</div>
              <h3 class="regButton"><router-link to='/register' style="color: #409EFF;">注册</router-link></h3>
            </div>
          </el-form>
          <!-- 验证码登录 -->
          <el-form :model="ruleForm" :rules="ruless" ref="ruleForm" v-if="yzmLogin">
            <ul>
              <li>
                <el-form-item prop="user">
                  <el-input placeholder="请输入手机号" v-model="ruleForm.user" clearable></el-input>
                </el-form-item>
              </li>
              <li>
                <el-form-item prop="code">
                  <el-input placeholder="请输入验证码" :disabled="codeInfoDis" v-model="ruleForm.code" autocomplete="off" @keyup.enter.native="submitFormYzm('ruleForm')" style="width: 214px;">
                  </el-input>
                  <el-button type="primary" style="padding: 5px;" :disabled="codeDis" @click="setCode('ruleForm')">{{codeInfo}}</el-button>
                </el-form-item>
              </li>
              <li>
                <el-button
                type="primary"
                class="loginBtn"
                @click="submitFormYzm('ruleForm')"
                >登入</el-button>
              </li>
            </ul>
            <div class="hyb_clear">
              <div class="yzmLogin" @click="changePass">密码登录</div>
              <h3 class="regButton"><router-link to='/register' style="color: #409EFF;">注册</router-link></h3>
            </div>
          </el-form>
        </div>
      </div>
    </div>
    <!-- 多角色选择框 -->
    <el-dialog
      title="请选择角色"
      :visible.sync="centerDialogVisible"
      width="320px"
      center>
      <span style="text-align: center;">
        <el-radio v-for="item of roleList" :key="item.id" v-model="radioRole" :label="item.id" border>{{item.roleName}}</el-radio>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="centerDialogVisibleFn">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script src="./Login.js"></script>
<style lang="stylus" scoped src="./Login.css"></style>
