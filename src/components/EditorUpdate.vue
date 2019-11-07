<template>
  <div class="editor">
    <div class="editor-main">
      <div class="felx">
        <div class="edit">
          <el-divider content-position="center">编辑区</el-divider>
          <div ref="toolbar" class="toolbar">
          </div>
          <div style="padding: 5px 0; color: #ccc">中间隔离带</div>
          <div ref="editor" class="text">
          </div>
        </div>
        <div class="preview">
          <el-divider content-position="center">预览区</el-divider>
          <div id="content" class="text" style="margin-top:86px"></div>
        </div>
      </div>
    </div>
    <div class="editor-bottom felx">
      <el-input placeholder="请输入新闻标题" suffix-icon="el-icon-document" v-model="article.title" style="width:250px">
      </el-input>
      <el-select v-model="article.articleClass" placeholder="请选择发布类别" style="width:200px">
        <el-option label="行业资讯" value="1"></el-option>
        <el-option label="申立德动态" value="2"></el-option>
        <el-option label="学术交流" value="3"></el-option>
      </el-select>
      <el-input size="medium" placeholder="请输入作者" suffix-icon="el-icon-user" v-model="article.name"
        style="width:200px">
      </el-input>
      <el-button type="warning" @click="PublishArticle()">确认修改</el-button>
    </div>
  </div>
</template>
<style>
  .editor {
    width: 100%;
    margin: 0 auto;
    position: relative;
    z-index: 0;
    background: #fff
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
</style>

<script>
  const config = {
    headers: {
      'Authorization': "bearer " + sessionStorage.getItem('userToken')
    }
  }
  import E from 'wangeditor'
  export default {
    name: 'editoritem',
    data() {
      return {
        editor: '',
        info_: '', //内容
        article: {
          title: '', //标题
          articleClass: '', //类别
          name: '', //发布者
          id: '' //文章id
        }
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

    beforeMount() {
      this.initArticle()
    },

    mounted() {
      this.seteditor()
      this.editor.txt.html(this.info_)
    },

    methods: {
      //设置editor
      seteditor() {
        this.editor = new E(this.$refs.toolbar, this.$refs.editor)
        this.editor.customConfig.uploadImgShowBase64 = true // base 64 存储图片
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
      //修改文章
      PublishArticle() {
        var id = this.article.id;
        this.axios.put('/api/news/' + id, {
          title: this.article.title,
          category: this.article.articleClass,
          author: this.article.name,
          content: this.info_
        },config).then(res => {
          if (res.status == '200') {
            this.$message({
              message: '文章修改成功',
              type: 'success'
            });
          } else {
            this.$message.error('文章修改失败');
          }
        })
      },
      //获取vuex数据
      initArticle() {
        this.article.name = this.$store.state.article.name;
        this.article.title = this.$store.state.article.title;
        this.article.articleClass = this.$store.state.article.class;
        this.info_ = this.$store.state.article.content;
        this.article.id = this.$store.state.article.id;
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
      info_() {
        var html = this.info_;
        document.querySelector('#content').innerHTML = html;
        this.content = this.info_;
      }
    }

  }
</script>