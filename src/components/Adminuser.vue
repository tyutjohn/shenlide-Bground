<!--
 * @Author: johnwang
 * @since: 2019-11-03 22:13:06
 * @lastTime: 2019-11-07 15:26:39
 * @LastAuthor: Do not edit
 * @Github: https://github.com/tyutjohn
 -->
<template>
  <div>
    <div class="admin-header">
      <el-breadcrumb separator="/" class="admin-header-crumb">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      </el-breadcrumb>
      <el-button type="primary" icon="el-icon-edit" @click="dialogFormVisible = true" class="admin-header-button">添加管理员
      </el-button>
      <el-dialog title="添加管理员" :visible.sync="dialogFormVisible">
        <el-form :model="form">
          <el-form-item label="管理员用户名" :label-width="formLabelWidth">
            <el-input v-model="form.username" style="width:250px"></el-input>
          </el-form-item>
          <el-form-item label="管理员密码" :label-width="formLabelWidth">
            <el-input v-model="form.password" style="width:250px" show-password></el-input>
          </el-form-item>
          <el-form-item label="管理员昵称" :label-width="formLabelWidth">
            <el-input v-model="form.nickname" style="width:250px"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="addAdmin()">确 定</el-button>
        </div>
      </el-dialog>
    </div>
    <div class="admin-table">
      <el-table :data="userData" style="width: 100%;padding:0 100px">
        <el-table-column prop="username" label="用户名" width="180">
          <template slot-scope="scope">
            <i class="el-icon-user"></i>
            <span style="margin-left: 10px">{{ scope.row.username }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="nickname" label="昵称" width="180">
          <template slot-scope="scope">
            <i class="el-icon-user"></i>
            <span style="margin-left: 10px">{{ scope.row.nickname }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="create_time" label="注册时间">
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ scope.row.create_time }}</span>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="300">
          <template slot-scope="scope">
            <el-button @click="userUpdate(scope.row)" type="primary">修改信息</el-button>
            <el-button type='danger' @click="userDelect(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog title="修改管理员信息" :visible.sync="dialogPassword">
        <el-form :model="formPass" status-icon :rules="rules" ref="formPass">
          <el-form-item label="新密码" :label-width="formLabelWidth" prop="password">
            <el-input v-model="formPass.password" style="width:300px"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" :label-width="formLabelWidth" prop="password2">
            <el-input v-model="formPass.password2" style="width:300px"></el-input>
          </el-form-item>
          <el-form-item label="昵称" :label-width="formLabelWidth" prop="nickname">
            <el-input v-model="formPass.nickname" style="width:300px"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogPassword = false">取 消</el-button>
          <el-button type="primary" @click="updateConfirm()">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<style>
  .admin-header {
    width: 100%;
    height: 50px;
    background: #fff;
    position: relative;
  }

  .admin-header-button {
    position: absolute;
    bottom: 4px;
    right: 90px;
  }

  .admin-header-crumb {
    position: absolute;
    left: 40px;
    bottom: 20px
  }

  .admin-table {
    width: 100%;
    background: #e8eaeb;
    padding-top: 4px
  }

  .admin-table-main {
    margin: 0 50px;
  }
</style>

<script>
  const config = {
    headers: {
      'Authorization': "bearer " + sessionStorage.getItem('userToken')
    }
  }
  export default {
    data() {
      var validatePass = (rule, value, callback) => { //验证密码
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (value.length < 6) {
            callback(new Error('密码不能少于6位数'));
          } else {
            if (this.formPass.password !== '') {
              this.$refs.formPass.validateField('checkPass');
            }
            callback();
          }
        }
      };
      var validatePass2 = (rule, value, callback) => { //二次验证密码
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.formPass.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        dialogFormVisible: false, //设置内嵌注册表单默认关闭
        dialogPassword: false, //设置内嵌修改密码表单默认关闭
        form: { //注册管理员表单
          username: '',
          password: '',
          nickname: ''
        },
        formLabelWidth: '120px', //内嵌表单宽度
        userData: [], //管理员列表
        formPass: { //修改密码
          password: '',
          password2: '',
          nickname: ''
        },
        username: '', //删除用户变量
        rules: { //验证规则
          password: [{
            validator: validatePass,
            trigger: 'blur'
          }],
          password2: [{
            validator: validatePass2,
            trigger: 'blur'
          }]
        }
      };
    },

    components: {},

    computed: {},

    beforeMount() {},

    mounted() {
      this.getAdmin();  //  获取管理员列表
    },

    methods: {
      addAdmin() { //添加管理员
        this.axios.post('/api/admin', {
          username: this.form.username,
          password: this.form.password,
          nickname: this.form.nickname
        }, config).then(res => {
          if (res.status == 200) {
            this.$message({
              message: '注册成功',
              type: 'success'
            });
            this.dialogFormVisible = false;
            this.getAdmin();
          } else {
            this.$message.error('注册失败')
          }
        })
      },
      userUpdate(row) { //修改信息
        this.dialogPassword = true;
        this.username = row.username;
        this.formPass.nickname = row.nickname
      },
      updateConfirm() {   //修改请求接口
        this.axios.put('/api/admin/' + this.username, {
          password: this.formPass.password,
          nickname:this.formPass.nickname
        },config).then(res => {
          if (res.status == 200) {
            this.$message({
              message: '修改成功',
              type: 'success'
            })
            setTimeout(() => {
              this.dialogPassword = false;
              this.getAdmin();
            }, 1000)
          } else {
            this.$message.error('修改失败')
          }
        })
      },
      userDelect(row) { //删除管理员
        this.username = row.username;
        this.$confirm('此操作将永久删除该管理员, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.axios.delete('/api/admin/' + this.username,config).then(res => {
            if (res.status == 200) {
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
              this.getAdmin();
            } else {
              this.$message.error('删除失败')
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      //获取管理员列表
      getAdmin() {
        this.axios.get('/api/admin',config).then(res => {
          if(res.status==200){
            this.userData=res.data;
          }else{
            this.$message.error('获取服务器数据失败');
          }
        })
      }
    },

    watch: {}

  }
</script>