<!--
 * @Author: johnwang
 * @since: 2019-11-06 08:25:09
 * @lastTime: 2019-11-10 00:10:25
 * @LastAuthor: Do not edit
 * @Github: https://github.com/tyutjohn
 -->
<template>
    <div class="client" :style="height">
        <div class="client-header">
            <el-breadcrumb separator="/" style="font-size:16px;padding-top:20px">
                <el-breadcrumb-item :to="{ path: '/Home' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item><a href="/Client">客户信息</a></el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <el-divider></el-divider>
        <el-table :data="clientData" style="width: 100%;padding:0 30px">
            <el-table-column prop="tel" label="电话" width="150">
            </el-table-column>
            <el-table-column prop="name" label="称呼" width="120">
            </el-table-column>
            <el-table-column prop="intention" label="意向" width="300">
            </el-table-column>
            <el-table-column prop="remark" label="备注" width="200">
            </el-table-column>
            <el-table-column prop="status" label="状态" width="100"
                :filters="[{ text: '已联系', value: 1 }, { text: '未联系', value: 0 }]" :filter-method="filterTag"
                filter-placement="bottom-end">
                <template slot-scope="scope">
                    <el-tag :type="scope.row.status === 1 ? 'success' : 'warning'" disable-transitions>
                        {{getStatus(scope.row.status)}}
                    </el-tag>
                </template>
            </el-table-column>
            <el-table-column label="资讯时间" width="150" sortable>
                <template slot-scope="scope">{{changeTime(scope.row.create_time)}}</template>
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button size="mini" @click="clientUpdate(scope.row)" type="info">修改</el-button>
                    <el-button size="mini" type="danger" @click="clientDelete(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog title="修改客户资料" :visible.sync="dialogFormVisible">
            <el-form :model="clientForm">
                <el-form-item label="客户电话" :label-width="formLabelWidth">
                    <el-input v-model="clientForm.tel" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="客户意向" :label-width="formLabelWidth">
                    <el-input v-model="clientForm.intention" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="客户称呼" :label-width="formLabelWidth">
                    <el-input v-model="clientForm.name"></el-input>
                </el-form-item>
                <el-form-item label="备注" :label-width="formLabelWidth">
                    <el-input type="textarea" :rows="2" placeholder="请输入备注内容" v-model="clientForm.remark">
                    </el-input>
                </el-form-item>
                <el-form-item label="状态" :label-width="formLabelWidth">
                    <el-select v-model="clientForm.status" placeholder="请选择该状态">
                        <el-option label="已处理" value="1"></el-option>
                        <el-option label="未处理" value="0"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="clientConfirm()">确 定</el-button>
            </div>
        </el-dialog>
        <div class="client-bottom">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                :current-page="currentPage" :page-sizes="[5, 10, 20, 50]" :page-size="5"
                layout="total, sizes, prev, pager, next, jumper" :total="count">
            </el-pagination>
        </div>
    </div>
</template>
<style>
    .client {
        width: 100%;
        background: #fff;
        overflow: auto;
    }

    .client-header {
        display: flex;
        justify-content: space-between;
        margin: 20px 30px;
    }

    .client-bottom {
        text-align: center;
        margin: 10px auto;
    }
</style>

<script>
    const config = {
        headers: {
            'Authorization': "bearer " + sessionStorage.getItem('userToken')
        }
    }
    import qs from 'qs'
    export default {
        data() {
            return {
                clientData: [], //客户列表
                currentPage: 1, //当前页数
                count: 0, //客户总数
                size: 5, //每页条数
                page: 1, //页数
                dialogFormVisible: false, //修改客户外层
                clientForm: { //修改客户表单
                    tel: '',
                    intention: '',
                    name: '',
                    remark: '',
                    status: '',
                    id: ''
                },
                formLabelWidth: '120px',
                height: {
                    height: document.body.scrollHeight - 102 + 'px'
                },
            };
        },

        components: {},

        computed: {
            getStatus() { //状态计算
                return function (res) {
                    switch (res) {
                        case 1:
                            return '已联系';
                        case 0:
                            return '未联系';
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
            this.getClient();
        },

        methods: {
            //状态过滤
            filterTag(value, row) {
                return row.status === value;
            },
            //分页
            handleSizeChange(val) {
                this.size = val;
                this.getClient();
            },
            handleCurrentChange(val) {
                this.page = val;
                this.getClient();
            },
            //修改客户信息
            clientUpdate(row) {
                this.dialogFormVisible = true;
                this.clientForm.tel = row.tel;
                this.clientForm.intention = row.intention;
                this.clientForm.name = row.name;
                this.clientForm.remark = row.remark;
                this.clientForm.status = row.status;
                this.clientForm.id = row.id
            },
            //确定修改
            clientConfirm() {
                let param = qs.stringify({
                    tel: this.clientForm.tel,
                    intention: this.clientForm.intention,
                    name: this.clientForm.name,
                    remark: this.clientForm.remark,
                    status: this.clientForm.status
                });
                this.axios.put('/api/customer/' + this.clientForm.id, param, config).then((res) => {
                    if (res.status == 200) {
                        this.$message({
                            message: '修改成功',
                            type: 'success'
                        });
                        this.dialogFormVisible = false;
                        this.getClient();
                    } else {
                        this.$message.error('修改失败');
                    }
                })
            },
            //删除客户信息
            clientDelete(row) {
                this.$confirm('此操作将永久删除该客户资料, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    var id = row.id;
                    this.axios.delete('/api/customer/' + id, config).then(res => {
                        if (res.status == 200) {
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                            this.getClient();
                        } else {
                            this.$message.error('删除失败');
                        }
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            //获取客户列表
            getClient() {
                this.axios.get('/api/customer', {
                    params: {
                        page: this.page,
                        size: this.size,
                    },
                    headers: {
                        'Authorization': "bearer " + sessionStorage.getItem('userToken')
                    }
                }).then(res => {
                    if (res.status == 200) {
                        this.clientData = res.data.customers;
                        this.count = res.data.count;
                    } else {
                        this.$message.error('获取服务器数据失败');
                    }
                })
            }
        },

        watch: {}

    }
</script>