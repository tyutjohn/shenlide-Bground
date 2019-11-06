<!--
 * @Author: johnwang
 * @since: 2019-11-06 08:25:09
 * @lastTime: 2019-11-06 09:53:43
 * @LastAuthor: Do not edit
 * @Github: https://github.com/tyutjohn
 -->
<template>
    <div class="client">
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
            <el-table-column prop="intendent" label="意向" width="300">
            </el-table-column>
            <el-table-column prop="remark" label="备注" width="200">
            </el-table-column>
            <el-table-column prop="status" label="状态" width="100"
                :filters="[{ text: '已联系', value: '0' }, { text: '未联系', value: '1' }]" :filter-method="filterTag"
                filter-placement="bottom-end">
                <template slot-scope="scope">
                    <el-tag :type="scope.row.status === '0' ? 'success' : 'warning'" disable-transitions>
                        {{scope.row.status}}
                    </el-tag>
                </template>
            </el-table-column>
            <el-table-column prop="create_time" label="资讯时间" width="100" sortable>
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
                    <el-input v-model="clientForm.tel" autocomplete="off" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="客户意向" :label-width="formLabelWidth">
                    <el-input v-model="clientForm.intendent" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="客户称呼" :label-width="formLabelWidth">
                    <el-input v-model="clientForm.name" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="备注" :label-width="formLabelWidth">
                    <el-input type="textarea" :rows="2" placeholder="请输入备注内容" v-model="clientForm.remark">
                    </el-input>
                </el-form-item>
                <el-form-item label="状态" :label-width="formLabelWidth">
                    <el-select v-model="clientForm.status" placeholder="请选择该状态">
                        <el-option label="已处理" value="0"></el-option>
                        <el-option label="未处理" value="1"></el-option>
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
                :current-page="currentPage" :page-sizes="[10, 20, 50, 100]" :page-size="10"
                layout="total, sizes, prev, pager, next, jumper" :total="100">
            </el-pagination>
        </div>
    </div>
</template>
<style>
    .client {
        width: 100%;
        background: #fff;
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
    export default {
        data() {
            return {
                clientData: [{ //  客户资料
                    tel: '15503676579',
                    intendent: '有意向合作',
                    name: '王先生',
                    remark: '',
                    status: '1',
                    create_time: '2019-11-03',
                    id: ''
                }, {
                    tel: '13934964859',
                    intendent: '请问如何资讯',
                    name: '张三',
                    remark: '',
                    status: '1',
                    create_time: '2019-11-04',
                    id: ''
                }, {
                    tel: '13663469862',
                    intendent: '贵公司的费用如何。。。。',
                    name: '李四',
                    remark: '',
                    status: '1',
                    create_time: '2019-11-06',
                    id: ''
                }, {
                    tel: '15636596553',
                    intendent: '资讯意向。。。。。。',
                    name: '王五',
                    remark: '',
                    status: '0',
                    create_time: '2019-11-08',
                    id: ''
                }],
                currentPage: 1, //当前页数
                size: '', //每页条数
                page: '', //页数
                dialogFormVisible: false, //修改客户外层
                clientForm: { //修改客户表单
                    tel: '',
                    intendent: '',
                    name: '',
                    remark: '',
                    status: '',
                    id: ''
                },
                formLabelWidth: '120px'
            };
        },

        components: {},

        computed: {},

        beforeMount() {},

        mounted() {},

        methods: {
            //状态过滤
            filterTag(value, row) {
                return row.status === value;
            },
            //分页
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
            },
            //修改客户信息
            clientUpdate(row) {
                this.dialogFormVisible = true;
                this.clientForm.tel = row.tel;
                this.clientForm.intendent = row.intendent;
                this.clientForm.name = row.name;
                this.clientForm.remark = row.remark;
                this.clientForm.status = row.status;
                this.clientForm.id = row.id
            },
            //确定修改
            clientConfirm() {
                var id = this.clientForm.id;
                this.axios.put('/api/customer/' + id, {
                    tel: this.clientForm.tel,
                    intendent: this.clientForm.intendent,
                    name: this.clientForm.name,
                    remark: this.clientForm.remark,
                    status: this.clientForm.status
                }).then((res) => {
                    if (res.state == '200') {
                        this.$message({
                            message: '修改成功',
                            type: 'success'
                        });
                        this.dialogFormVisible = false;
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
                    this.axios.delete('/api/customer/' + id).then(res => {
                        if (res.state == '200') {
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                        }else{
                            this.$message.error('删除失败');
                        }
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            }
        },

        watch: {}

    }
</script>