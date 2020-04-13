<!--
 * @Author: johnwang
 * @since: 2019-11-03 14:23:52
 * @lastTime: 2019-11-09 01:08:05
 * @LastAuthor: Do not edit
 * @Github: https://github.com/tyutjohn
 -->
<template>
  <div class="editor" :style="height">
    <div class="editor-jianjie">
      <el-input placeholder="请输入标题(建议20字之内)" suffix-icon="el-icon-document" v-model="title"
        style="width:500px;margin-bottom:20px;font-size:26px">
      </el-input>
      <el-input placeholder="请输入文章简介(建议50字之内)" suffix-icon="el-icon-article" type="textarea" v-model="synopsis">
      </el-input>
    </div>
    <div class="editor-main">
      <div style="width:100%">
        <div class="edit">
          <el-divider content-position="center">文章内容</el-divider>
          <div ref="toolbar" class="toolbar">
          </div>
          <div style="padding: 5px 0; color: #ccc">正文部分</div>
          <div ref="editor" class="text">
          </div>
        </div>
      </div>
    </div>
    <div class="editor-image">
      <p>请设置专栏封面</p>
      <h4><i class="el-icon-warning-outline"></i> 封面默认使用默认封面，若需要定制单图，图片格式为jpg或png,封面大小不能超过5M</h4>
      <el-switch v-model="switchButton" active-text="使用默认封面" inactive-text="定制封面">
      </el-switch>
      <div v-if="!switchButton" class="fileUpdate">
        <div class="filecontainer">
          <div class="fileCover"><img :src="fileCover" @click="fileChange" style="width:100%;height:100%"></div>
          <input type="file" id="file" v-show="false" name="file" @change="fileUpdate($event)">
        </div>
      </div>
    </div>
    <div class="editor-bottom felx">
      <el-select v-model="articleClass" placeholder="请选择发布类别" style="width:200px">
        <el-option label="行业资讯" value="1"></el-option>
        <el-option label="申立德动态" value="2"></el-option>
        <el-option label="学术交流" value="3"></el-option>
      </el-select>
      <el-input size="medium" placeholder="请输入作者" suffix-icon="el-icon-user" v-model="name" style="width:200px">
      </el-input>
      <el-button type="primary" @click="PublishArticle()">发布</el-button>
    </div>
  </div>
</template>
<style>
  .editor {
    width: 100%;
    margin: 0 auto;
    position: relative;
    z-index: 0;
    background: #fff;
    overflow: auto;
  }

  .editor-main {
    margin: 20px;
  }

  .toolbar {
    border: 1px solid #ccc;
  }

  .text {
    border: 1px solid #ccc;
    min-height: 500px;
    font-size: 16px !important;
    padding-top: 0 !important;
    text-align: start !important;
    height: auto !important;
  }

  .preview {
    width: 100%;
  }

  .felx {
    display: flex;
    justify-content: flex-start;

  }

  .editor-bottom {
    justify-content: space-around;
    padding-bottom: 20px;
  }

  .editor-jianjie {
    padding: 20px;
  }

  .editor-image {
    padding-left: 20px;
    margin-bottom: 20px
  }

  .editor-image h4 {
    font-size: 12px;
    color: #99a2aa;
    margin: 10px auto;
  }

  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    margin-left: 40%
  }

  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px !important;
    text-align: center;
  }

  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }

  .fileUpdate {
    height: 200px;
    width: 100%;
  }

  .filecontainer {
    width: 80%;
    margin: 20px auto;
  }

  .fileCover {
    width: 140px;
    height: 100px;
    font-size: 100px;
    cursor: pointer;
    margin: 0 auto;
  }
</style>

<script>
  import E from 'wangeditor'
  import {
    Loading
  } from 'element-ui';
  export default {
    name: 'editoritem',
    data() {
      return {
        editor: '',
        info_: '',
        title: '', //标题
        articleClass: '', //类别
        name: '', //发布者
        synopsis: '', //简介
        height: {
          height: document.body.scrollHeight - 102 + 'px'
        },
        file: '', //封面
        switchButton: true, //封面开关
        fileCover: require('../assets/images/file.png')
      };
    },
    model: {
      prop: 'value',
      event: 'change'
    },
    props: {
      value: {
        type: String,
        default: ''
      },
      isClear: {
        type: Boolean,
        default: false
      }
    },

    components: {},

    computed: {},

    beforeMount() {},

    mounted() {
      this.seteditor()
    },

    methods: {
      //设置editor
      seteditor() {
        let that = this;
        this.editor = new E(this.$refs.toolbar, this.$refs.editor)
        // this.editor.customConfig.uploadImgShowBase64 = true // base 64 存储图片
        //设置文件上传的参数名
        this.editor.customConfig.uploadFileName = 'file';
        //配置服务器端上传图片地址
        this.editor.customConfig.uploadImgServer = '/api/upload';
        // 将图片大小限制为 5M
        this.editor.customConfig.uploadImgMaxSize = 5 * 1024 * 1024
        // 限制一次最多上传 5 张图片
        this.editor.customConfig.uploadImgMaxLength = 5
        //自定义header
        this.editor.customConfig.uploadImgHeaders = {
          'Accept': 'text/x-json',
          'Authorization': "bearer " + sessionStorage.getItem('userToken')
        }
        //自定义图片上传监听函数
        this.editor.customConfig.uploadImgHooks = {
          success: function () {
            that.$message({
              type: 'success',
              message: '上传成功'
            })
          },
          fail: function (xhr, editor, result) {
            that.$message.error('上传失败' + result)
          },
          error: function () {
            that.$message.error('上传错误')
          },
          timeout: function (xhr) {
            that.$message.error('上传超时' + xhr)
          },
          customInsert: function (insertImg, result) {
            var url = result.data
            insertImg(url)
          }
        }
        // 配置菜单
        this.editor.customConfig.menus = [
          'head', // 标题
          'bold', // 粗体
          'fontSize', // 字号
          'fontName', // 字体
          'italic', // 斜体
          'underline', // 下划线
          'strikeThrough', // 删除线
          'foreColor', // 文字颜色
          'backColor', // 背景颜色
          'link', // 插入链接
          'list', // 列表
          'justify', // 对齐方式
          'quote', // 引用
          'emoticon', // 表情
          'image', // 插入图片
          'table', // 表格
          'video', //视频
          'code', // 插入代码
          'undo', // 撤销
          'redo', // 重复
          'fullscreen' // 全屏
        ]
        this.editor.customConfig.onchange = (html) => {
          this.info_ = html // 绑定当前逐渐地值
          this.$emit('change', this.info_) // 将内容同步到父组件中
        }
        // 创建富文本编辑器
        this.editor.create();
      },
      //发布文章
      PublishArticle() {
        Loading.service({
          fullscreen: true,
          text: '文章上传中'
        });
        let param = new FormData();
        param.append('title', this.title);
        param.append('category', this.articleClass);
        param.append('author', this.name);
        param.append('content', this.info_);
        param.append('synopsis', this.synopsis);
        param.append('file', this.file);
        this.axios.post('/api/news', param, {
          headers: {
            'Authorization': "bearer " + sessionStorage.getItem('userToken'),
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }).then(res => {
          if (res.data) {
            this.title = '';
            this.articleClass = '';
            this.name = '';
            this.info_ = '';
            this.synopsis = '';
            this.editor.txt.clear();
            Loading.service().close();
            this.$message({
              type: 'success',
              message: '文章上次成功'
            })
          } else {
            this.$message.error('文章发布失败');
          }
        })
      },
      //调用文件
      fileChange() {
        document.querySelector('#file').click();
      },
      //获取文件
      fileUpdate(event) {
        let render = new FileReader();
        let files = event.target.files[0];
        if (files.size > 5242880) {
          this.$message.error('选取封面大小应小于5M,请重新选择');
        } else {
          this.file = files;
          render.readAsDataURL(files);
          render.onload = () => {
            this.fileCover = render.result;
          }
        }
      }
    },

    watch: {
      isClear(val) {
        // 触发清除文本域内容
        if (val) {
          this.editor.txt.clear()
          this.info_ = null
        }
      },
      value: function (value) {
        if (value !== this.editor.txt.html()) {
          this.editor.txt.html(this.value)
        }
      },
      //value为编辑框输入的内容，这里我监听了一下值，当父组件调用得时候，如果给value赋值了，子组件将会显示父组件赋给的值
    }

  }
</script>
