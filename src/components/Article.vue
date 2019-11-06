<!--
 * @Author: johnwang
 * @since: 2019-11-05 21:49:54
 * @lastTime: 2019-11-06 11:41:09
 * @LastAuthor: Do not edit
 * @Github: https://github.com/tyutjohn
 -->
<template>
    <div class="article">
        <div class="article-header">
            <div class="header-left">
                <el-breadcrumb separator="/">
                    <el-breadcrumb-item :to="{ path: '/Home' }">文章管理</el-breadcrumb-item>
                    <el-breadcrumb-item>文章列表</el-breadcrumb-item>
                </el-breadcrumb>
            </div>
            <div class="header-right">
                <p style="margin: 10px 6px">筛选:</p>
                <el-select v-model="article_class" placeholder="请选择文章类型" style="width:170px">
                    <el-option v-for="item in article_class_data" :key="item.value" :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
            </div>
        </div>
        <div class="article-data">
            <el-table :data="articleData" style="width: 100%;padding:0 20px">
                <el-table-column prop="title" label="标题" width="400">
                </el-table-column>
                <el-table-column prop="class" label="类型" width="150">
                </el-table-column>
                <el-table-column prop="name" label="发布者" width="150">
                </el-table-column>
                <el-table-column prop="create_time" label="发布时间" width="200" sortable>
                </el-table-column>
                <el-table-column fixed="right" label="操作" width="300">
                    <template slot-scope="scope">
                        <el-button @click="articleUpdate(scope.row)" type="primary">修改文章</el-button>
                        <el-button type='danger' @click="articleDelect(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-dialog title="修改文章" :visible.sync="dialogArticle" width="90%">
                <Editor :key="menuKey" />
            </el-dialog>
            <div style="margin-top:10px">
                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                    :current-page="currentPage" :page-sizes="[10,20,50,100]" :page-size="100"
                    layout="total, sizes, prev, pager, next, jumper" :total="100">
                </el-pagination>
            </div>
        </div>
    </div>
</template>
<style>
    .article {
        width: 100%;
        background: #f1f2f4;
    }

    .article-data {
        margin: 10px auto;
        text-align: center;
    }

    .article-header {
        width: 100%;
        background: #fff;
        height: 40px;
        display: flex;
        justify-content: space-between;
    }

    .article-header .header-left {
        margin-left: 20px;
        margin-top: 10px
    }

    .article-header .header-right {
        margin-right: 30px;
        display: flex;
    }
</style>

<script>
    import Editor from '../components/EditorUpdate'
    export default {
        data() {
            return {
                articleData: [{ //获取文章列表数据
                    create_time: '2016-05-01',
                    name: '王小虎',
                    title: '上海市普陀区金沙江路 1518 弄',
                    class: '学术交流',
                    content: 'test',
                    id: '123'
                }, {
                    create_time: '2016-05-02',
                    name: '张三',
                    title: '上海市普陀区金沙江路 1517 弄',
                    class: '行业资讯',
                    content: '这是一篇文章',
                    id: '456'
                }, {
                    create_time: '2016-05-03',
                    name: '李四',
                    title: '上海市普陀区金沙江路 1519 弄',
                    class: '申立德动态',
                    content: '',
                    id: '567'
                }, {
                    create_time: '2016-05-04',
                    name: '王五',
                    title: '上海市普陀区金沙江路 1516 弄',
                    class: '新闻资讯',
                    content: '经研究发现，先加载的编辑器后加载的数据结果导致数据没写进去。坑爹的异步加载。。这个异步加载把我折腾的很惨，到网上找文档，没有一个靠谱的，闹得我想骂娘。苦水吐到这里，开始解决问题。',
                    id: '1234'
                }],
                article_class_data: [{
                    value: '1',
                    label: '行业资讯'
                }, {
                    value: '2',
                    label: '学术交流'
                }, {
                    value: '3',
                    label: '学术交流'
                }],
                article_class: '', //选择文章类型
                currentPage: 1, //当前页
                dialogArticle: false, //修改文章开关
                articleChangeData: '',
                menuKey: 1, //重新加载组件
                pageSize: '', //每页条数
                page: '', //页数
            };
        },

        components: {
            Editor
        },

        computed: {},

        beforeMount() {},

        mounted() {},

        methods: {
            //修改文章
            articleUpdate(row) {
                this.dialogArticle = true;
                //将信息传入vuex
                this.$store.dispatch('setArticleTitle', row.title);
                this.$store.dispatch('setArticleClass', row.class);
                this.$store.dispatch('setArticleName', row.name);
                this.$store.dispatch('setArticleContent', row.content);
                this.$store.dispatch('setArticleId', row.id)
                    //重加载组件
                    ++this.menuKey
            },
            //分页
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
            },
            //删除文章
            articleDelect(row) {
                var id = row.id;
                this.axios.delete('/api/news' + id).then((res) => {
                    if (res.status==200) {
                        this.$message({
                            message:'删除成功',
                            type:'success'
                        })
                    } else {
                        this.$message.error('操作失败')
                    }
                })
            },
            //获取文章列表
            getArticleData() {
                this.axios.get('/api/news', {
                    props: {
                        size: this.pageSize,
                        page: this.page,
                        class: this.article_class
                    }
                }).then((res) => {
                    if (res.status==200) {
                        this.articleData = res.data;
                        //TO-DO 
                    }
                })
            }
        },

        watch: {}

    }
</script>