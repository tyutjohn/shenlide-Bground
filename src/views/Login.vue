<!--
 * @Author: johnwang
 * @since: 2019-11-02 10:42:43
 * @lastTime: 2019-11-09 09:39:27
 * @LastAuthor: Do not edit
 * @Github: https://github.com/tyutjohn
 -->
<template>
  <div class="bg">
    <div class="container">
      <el-card class="box-card">
        <el-row>
          <el-col :span="12">
            <img :src="BoardSrc" width="100%" height="100%" style="margin-top:20%">
          </el-col>
          <el-col :span="12">
            <el-form :label-position="labelPosition" label-width="80px" :model="formlogin" style="width:100%">
              <p class="form-p">申立德后台管理系统</p>
              <el-form-item label="用户名">
                <el-input v-model="formlogin.username" style="width:80%" @keyup.enter.native="nextFocus()"></el-input>
              </el-form-item>
              <el-form-item label="密码">
                <el-input v-model="formlogin.password" style="width:80%" @keyup.enter.native="login()" id="password"
                  show-password>
                </el-input>
              </el-form-item>
              <el-button type="primary" class="button"
                style="margin:0 auto;display:block;border-radius:20px;font-size:16px" @click="login()">登陆</el-button>
            </el-form>
            <p class="bottom">申立德版权所有@ 2019-2029</p>
          </el-col>
        </el-row>
      </el-card>
    </div>
  </div>
</template>
<style>
  .bg {
    background: url("../assets/images/login-bg1.jpg") no-repeat center;
    background-size: 100% 100%;
    height: 100%;
    position: fixed;
    width: 100%;
  }

  .container {
    width: 60%;
    margin: 0 auto;
    margin-top: 130px;
  }

  .form-p {
    text-align: center;
    font-weight: 600;
    font-size: 20px;
    letter-spacing: 4px;
    margin: 80px 0;
  }

  .button {
    width: 200px;
    letter-spacing: 4px;
  }

  .bottom {
    font-size: 6px;
    color: #747171b6;
    text-align: center;
    margin-bottom: 0;
    margin-top: 50px;
  }
</style>

<script>
  import {
    Loading
  } from 'element-ui';
  import qs from 'qs';
  export default {
    data() {
      return {
        BoardSrc: require("../assets/images/login-borad1.jpg"),
        BgSrc: require("../assets/images/login-bg1.jpg"),
        labelPosition: 'right',
        formlogin: {
          username: '',
          password: ''
        },
      };
    },

    components: {},

    computed: {},

    beforeMount() {},

    mounted() {},

    methods: {
      //登陆账号
      login() {
        let param=qs.stringify({
          username:this.formlogin.username,
          password:this.formlogin.password
        })
        this.axios.post('/api/admin/login',param).then(res => {
            if (res.data) {
              Loading.service({
                fullscreen: true,
                text: '登陆成功，正在跳转'
              });
              setTimeout(() => {
                //将用户名和token放入sessionStorage
                sessionStorage.setItem("userName", this.formlogin.username);
                sessionStorage.setItem("userToken", res.data.token);
                sessionStorage.setItem("isLogin",true);
                //传入vuex
                this.$store.dispatch('setAdmin',this.formlogin.username);
                this.$router.push({
                  path: '/Home'
                })
                Loading.service().close();
              }, 1000);
            }else{
              this.$message.error('用户名或密码错误')
            }
          }).catch(err => {
            this.$message.error(err);
        })
      },
      //回车焦点跳转
      nextFocus() {
        document.querySelector("#password").focus()
      }
    },

    watch: {}

  }
</script>