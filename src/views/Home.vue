<!--
 * @Author: johnwang
 * @since: 2019-11-02 19:37:58
 * @lastTime: 2019-11-05 21:53:02
 * @LastAuthor: Do not edit
 * @Github: https://github.com/tyutjohn
 -->
<template>
    <div class="home">
        <div class="left flex" :style="height">
            <div style="display:flex;margin:20px">
                <img :src="logoSrc" width="50px" height="40px">
                <p class="logo-p">申立德</p>
            </div>
            <div class="user" style="display:flex">
                <div class="flex">
                    <el-avatar :src="user.userAvatarSrc" class="userAvatar"></el-avatar>
                </div>
                <div class="flex">
                    <p style="color: aliceblue">Welcome</p>
                    <h1 class="userName">{{user.userName}}</h1>
                </div>
            </div>
            <div class="menu">
                <el-menu default-active="1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose"
                    background-color="#253e55" text-color="#fff" @select="componentMount">
                    <el-submenu index="1">
                        <template slot="title">
                            <i class="el-icon-edit-outline"></i>
                            <span>新闻资讯</span>
                        </template>
                        <el-menu-item-group>
                            <template slot="title">文章管理</template>
                            <el-menu-item index="1-1">文章列表</el-menu-item>
                        </el-menu-item-group>
                        <el-menu-item-group title="发布文章">
                            <el-menu-item index="1-2">添加文章</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                    <el-menu-item index="2">
                        <i class="el-icon-message"></i>
                        <span slot="title">客户回访</span>
                    </el-menu-item>
                    <el-submenu index="3">
                        <template slot="title">
                            <i class="el-icon-setting"></i>
                            <span>系统设置</span>
                        </template>
                        <el-menu-item-group>
                            <template slot="title">管理员</template>
                            <el-menu-item index="3-1">用户管理</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                </el-menu>
            </div>
        </div>
        <div class="right flex">
            <Header :userImfor=user></Header>
            <div style="margin-top:10px">
                <router-view></router-view>
            </div>
            <Bottom />
        </div>
    </div>

</template>
<style>
    .home {
        width: 100%;
        height: 100%;
        display: flex;
    }

    .flex {
        justify-content: start;
    }

    .left {
        background: #253e55;
        width: 16%;
    }

    .right {
        background: #f1f2f4;
        width: 84%;
    }

    .logo-p {
        font-size: 30px;
        color: #fff;
        letter-spacing: 6px;
        margin-left: 16px;
        font-weight: 600;
    }

    .user {
        width: 100%;
        height: 100px;
    }

    .userAvatar {
        margin: 10px 40px;
        margin-right: 30px;
        width: 50px !important;
        height: 50px !important;
    }

    .userName {
        font-size: 30px;
        color: #f1f2f4;
    }
</style>

<script>
    import Header from '../components/Header'
    import Bottom from '../components/Bottom'
    export default {
        data() {
            return {
                height: {
                    height: document.body.scrollHeight + 'px'
                },
                logoSrc: require('../assets/images/logo.jpg'),
                user: {
                    userAvatarSrc: require('../assets/images/admin-avatar.jpg'),
                    userName: ''
                },
                isCompany: 'Editor',
            };
        },

        components: {
            Header,
            Bottom,
        },

        computed: {},

        beforeMount() {},

        mounted() {
            this.getUser();
        },

        methods: {
            //token验证获取用户信息
            getUser() {
                const token = sessionStorage.getItem("userToken");
                this.axios.get('/api/users/current', {
                    headers: {
                        Authorization: token
                    }
                }).then(res => {
                    this.user.userName = res.data.name
                })
            },
            handleOpen(key, keyPath) {
                console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath);
            },
            //动态加载工作区组件
            componentMount(key) {
                switch (key) {
                    case '1-1':
                        this.$router.push('/Article');
                        break;
                    case '1-2':
                        this.$router.push('/Editor');
                        break;
                    case '3-1':
                        this.$router.push('/Adminuser');
                        break;
                }
            },
        },

        watch: {}

    }
</script>