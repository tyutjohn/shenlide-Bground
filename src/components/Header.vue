<!--
 * @Author: johnwang
 * @since: 2019-11-02 20:11:45
 * @lastTime: 2019-11-06 11:19:01
 * @LastAuthor: Do not edit
 * @Github: https://github.com/tyutjohn
 -->
<template>
  <div class="Header">
    <div class="header-container">
      <div class="flex header-left">
        <div style="display:flex;font-size:26px">
          <i class="el-icon-s-operation" style="margin:20px"></i>
          <p style="margin-top:10px">申立德后台管理系统</p>
        </div>
      </div>
      <div class="flex header-right">
        <div style="display:flex;font-size: 26px;">
          <i class="el-icon-chat-line-square" style="margin:20px;"></i>
          <el-dropdown style="margin-top:10px;">
            <el-button>
              <el-avatar :src="userImfor.userAvatarSrc" style="width:20px;height:20px;margin-right:6px;color:#606266">
              </el-avatar>
              {{userImfor.userName}}<i class="el-icon-arrow-down el-icon--right"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item><p @click="logOut()">退出登陆</p></el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
    </div>
  </div>
</template>
<style>
  .Header {
    width: 100%;
    height: 70px;
    background: #fff;
    position: absoulte;
    top: 0;
  }

  .header-container {
    width: 96%;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
  }

  .header-left {
    width: 30%;
  }

  .header-right {
    width: 20%;
  }
</style>

<script>
  import {
    Loading
  } from 'element-ui';
  export default {
    data() {
      return {
        search: ''
      };
    },

    props: ['userImfor'],

    components: {},

    computed: {},

    beforeMount() {},

    mounted() {},

    methods: {
      //退出登陆
      logOut() {
        this.axios.post('/api/admin/logout').then(res => {
          if (res.status == 200) {
            Loading.service({
              fullscreen: true,
              text: '退出成功'
            });
            sessionStorage.clear();
            setTimeout(() => {
              this.$router.push({
                path: '/Home'
              })
              Loading.service().close();
            }, 1000)
          }
        })
      }
    },

    watch: {}

  }
</script>