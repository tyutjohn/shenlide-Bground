<!--
 * @Author: johnwang
 * @since: 2019-11-05 21:49:54
 * @lastTime: 2019-11-10 00:10:13
 * @LastAuthor: Do not edit
 * @Github: https://github.com/tyutjohn
 -->
<template>
    <div class="article" :style="height">
        <div class="article-header">
            <div class="header-left">
                <el-breadcrumb separator="/">
                    <el-breadcrumb-item :to="{ path: '/Home' }">文章管理</el-breadcrumb-item>
                    <el-breadcrumb-item>文章列表</el-breadcrumb-item>
                </el-breadcrumb>
            </div>
            <div class="header-right">
                <p style="margin: 10px 6px">筛选:</p>
                <el-select v-model="category" placeholder="请选择文章类型" style="width:170px" @change="getArticleCategory()">
                    <el-option v-for="item in article_class_data" :key="item.value" :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
            </div>
        </div>
        <div class="article-data">
            <el-table :data="articleData" style="width: 100%;padding:0 20px">
                <el-table-column prop="title" label="标题" width="200">
                </el-table-column>
                <el-table-column label="类型" width="150">
                    <template slot-scope="scope">{{getActicleClass(scope.row.category)}}</template>
                </el-table-column>
                <el-table-column prop="author" label="作者" width="100">
                </el-table-column>
                <el-table-column prop="synopsis" label="简介" width="500">
                </el-table-column>
                <el-table-column label="发布时间" width="200" sortable>
                    <template slot-scope="scope">{{changeTime(scope.row.create_time)}}</template>
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
                    :current-page="currentPage" :page-sizes="[6,10,20,100]" :page-size="6"
                    layout="total, sizes, prev, pager, next, jumper" :total="count">
                </el-pagination>
            </div>
        </div>
    </div>
</template>
<style>
    .article {
        width: 100%;
        background: #f1f2f4;
        overflow: auto;
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
                articleData: [], //  获取文章列表数据
                category: '', //选择文章类型
                article_class_data: [{
                    value: '1',
                    label: '行业资讯'
                }, {
                    value: '2',
                    label: '申立德动态'
                }, {
                    value: '3',
                    label: '学术交流'
                }],
                currentPage: 1, //当前页
                dialogArticle: false, //修改文章开关
                articleChangeData: '',
                menuKey: 1, //重新加载组件
                pageSize: 6, //每页条数
                page: 1, //页数
                count: 0, //文章总数
                judge: false, //判断全部还是分类
                height: {
                    height: document.body.scrollHeight - 102 + 'px'
                },
            };
        },

        components: {
            Editor
        },

        computed: {
            getActicleClass() { //文章类型计算
                return function (res) {
                    switch (res) {
                        case 1:
                            return '行业资讯'
                        case 2:
                            return '申立德动态'
                        case 3:
                            return '学术交流'
                    }
                }
            },
            changeTime() { //时间GMT转换
                return function (time) {
                    let date = new Date(time)
                    let Str = date.getUTCFullYear() + '-' +
                        (date.getMonth() + 1) + '-' +
                        date.getDate() + ' ' +
                        date.getUTCHours() + ':' +
                        date.getUTCMinutes()
                    return Str
                }
            }
        },

        beforeMount() {},

        mounted() {
            this.getArticleData();
        },

        methods: {
            //修改文章
            articleUpdate(row) {
                this.dialogArticle = true;
                //将信息传入vuex
                this.$store.dispatch('setArticleTitle', row.title);
                this.$store.dispatch('setArticleClass', row.category);
                this.$store.dispatch('setArticleName', row.author);
                this.$store.dispatch('setArticleContent', row.content);
                this.$store.dispatch('setArticleId', row.id)
                this.$store.dispatch('setArticleSynopsis', row.synopsis)
                    //重加载组件
                    ++this.menuKey
            },
            //分页
            handleSizeChange(val) {
                this.pageSize = val;
                if (this.judge) {
                    this.getArticleCategory();
                } else {
                    this.getArticleData();
                }
            },
            handleCurrentChange(val) {
                this.page = val;
                if (this.judge) {
                    this.getArticleCategory();
                } else {
                    this.getArticleData();
                }
            },
            //删除文章
            articleDelect(row) {
                var id = row.id;
                this.axios.delete('/api/news/' + id, {
                    headers: {
                        'Authorization': "bearer " + sessionStorage.getItem('userToken')
                    }
                }).then((res) => {
                    if (res.status == 200) {
                        this.$message({
                            message: '删除成功',
                            type: 'success'
                        })
                        this.getArticleData();
                    } else {
                        this.$message.error('操作失败')
                    }
                })
            },
            //获取文章列表
            getArticleData() {
                this.axios.get('/api/news', {
                    params: {
                        size: this.pageSize,
                        page: this.page
                    }
                }).then((res) => {
                    if (res.status == 200) {
                        this.articleData = res.data.news;
                        this.count = res.data.count;
                    } else {
                        this.$message.error('获取服务器数据失败');
                    }
                })
            },
            //获取分类文章列表
            getArticleCategory() {
                this.axios.get('/api/news', {
                    params: {
                        size: this.pageSize,
                        page: this.page,
                        category: this.category
                    }
                }).then(res => {
                    if (res.status == 200) {
                        this.articleData = res.data.news;
                        this.count = res.data.count;
                        this.judge = true;
                    } else {
                        this.$message.error('获取服务器数据失败');
                    }
                })
            }
        },

        watch: {
            /**
             * 监听this.dialogArticle 是否为false,当从true变成false时，重新获取数据
             */
            dialogArticle() {
                if (!this.dialogArticle) {
                    this.getArticleData();
                }
            }
        }

    }
</script>