<template>
    <div>
        <el-button type="default" @click="addmyp2p_dialog">添加</el-button>
        <el-table :data="tableData" stripe style="width: 100%">
            <el-table-column prop="id" label="id " width="180">
            </el-table-column>
            <el-table-column prop="p2p_name" label="平台名称" width="180">
            </el-table-column>
            <el-table-column prop="account" label="平台用户">
            </el-table-column>
            <el-table-column prop="password" label="平台密码">
            </el-table-column>
            <el-table-column prop="card_name" label="银行卡名称" width="180">
            </el-table-column>
            <el-table-column prop="card_card" label="银行卡号" width="180">
            </el-table-column>
            <el-table-column prop="phone" label="手机号" width="180">
            </el-table-column>
            <el-table-column label="操作" width="100">
                <template slot-scope="scope">
                    <el-button type="text" size="small" @click="getmyp2p(scope.row.id)">编辑</el-button>
                    <el-button type="text" size="small" @click="delmyp2p(scope.row.id)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog title="添加平台用户" :visible.sync="addmyp2p" width="450px" :before-close="handleClose">
            <el-form :model="addmyp2p_form" :label-position="labelPosition" label-width="100px">
                <el-form-item label="平台名称">
                    <el-select clearable class="filter-item" v-model="addmyp2p_form.p2p_id" placeholder="请选择平台" style="width:320px">
                        <el-option v-for="item in  p2p_options" :key="item.id" :label="item.name" :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="平台用户">
                    <el-input v-model="addmyp2p_form.account" auto-complete="off" style="width:320px"></el-input>
                </el-form-item>
                <el-form-item label="平台密码">
                    <el-input v-model="addmyp2p_form.password" auto-complete="off" type="password" style="width:320px"></el-input>
                </el-form-item>
                <el-form-item label="银行卡">
                    <el-select clearable class="filter-item" v-model="addmyp2p_form.card_id" placeholder="请选择银行卡" style="width:320px">
                        <el-option v-for="item in  bankcard_options" :key="item.id" :label="item.name+'('+item.card+')'" :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="绑定手机号">
                    <el-input v-model="addmyp2p_form.phone" auto-complete="off" style="width:320px"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
    <el-button @click="handleClose">取 消</el-button>
    <el-button type="primary" @click="addmyp2p_fun">确 定</el-button>
  </span>
        </el-dialog>
        <el-dialog title="修改平台用户" :visible.sync="modifymyp2p" width="450px" :before-close="handleClose">
            <el-form :model="modifymyp2p_form" :label-position="labelPosition" label-width="100px">
                <el-input v-model="modifymyp2p_form.id" auto-complete="off" type="hidden"></el-input>
                <el-form-item label="平台名称">
                    <el-select clearable class="filter-item" v-model="modifymyp2p_form.p2p_id" placeholder="请选择平台名称" style="width:320px">
                        <el-option v-for="item in  p2p_options" :key="item.id" :label="item.name" :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="平台用户">
                    <el-input v-model="modifymyp2p_form.account" auto-complete="off" style="width:320px"></el-input>
                </el-form-item>
                <el-form-item label="平台密码">
                    <el-input v-model="modifymyp2p_form.password" auto-complete="off" type="password" style="width:320px"></el-input>
                </el-form-item>
                <el-form-item label="银行卡">
                    <el-select clearable class="filter-item" v-model="modifymyp2p_form.card_id" placeholder="请选择银行卡" style="width:320px">
                        <el-option v-for="item in  bankcard_options" :key="item.id" :label="item.name+'('+item.card+')'" :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="绑定手机号">
                    <el-input v-model="modifymyp2p_form.phone" auto-complete="off" style="width:320px"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
    <el-button @click="handleClose">取 消</el-button>
    <el-button type="primary" @click="modifymyp2p_fun">确 定</el-button>
  </span>
        </el-dialog>
        <div class="pagination">
            <el-pagination @current-change="handleCurrentChange" background layout="total,prev, pager, next" :total="total_count">
            </el-pagination>
        </div>
    </div>
</template>
<script>
import {
    myp2plist_api,
    p2plist_api,
    banklist_api,
    addmyp2p_api,
    getmyp2pinfo_api,
    modifymyp2p_api,
    delmyp2p_api
} from '../api/service'

//定义下拉选择p2p平台数组


export default {
    name: 'myp2plist',
    data() {
        return {
            //表单右对齐
            labelPosition: 'right',
            //表单组件宽度
            formLabelWidth: "350px",
            tableData: [],
            total_count: 0,
            //添加弹出框
            addmyp2p: false,
            //编辑弹出框
            modifymyp2p: false,
            //p2p下拉列表
            p2p_options: [],
            //银行卡下来列表
            bankcard_options: [],
            addmyp2p_form: {
                p2p_id: "",
                account: "",
                password: "",
                card_id: "",
                phone: ""
            },
            modifymyp2p_form: {
                id: "",
                p2p_id: "",
                account: "",
                password: "",
                card_id: "",
                phone: ""
            }
        }
    },
    created() {
        this.getData(1);
        this.$router.push({
            path: 'myp2plist',
            query: {
                page_index: 1
            }
        })
    },
    methods: {
        getData(page_index) {
            myp2plist_api(page_index)
                .then((res) => {
                    this.tableData = res.data.objects
                        //条目总数
                    this.total_count = res.data.num_result

                })

        },
        //关闭dialog窗口时的回调函数
        handleClose() {
            this.addmyp2p = false;
            this.modifymyp2p = false;
            //清空下拉选项数组
            this.p2p_options.splice(0, this.p2p_options.length);
            this.bankcard_options.splice(0, this.bankcard_options.length);
        },
        //添加，编辑时获取下拉列表数据
        getselectdata() {
            //平台列表
            p2plist_api(1)
                .then((res) => {
                    if (res.data.code == 0) {
                        for (var i = 0; i < res.data.objects.length; i++) {
                            this.p2p_options.push(res.data.objects[i])
                        }

                    }
                })
                .catch((res) => {
                    this.$message.error(res)
                })
                //银行卡列表     
            banklist_api(1)
                .then((res) => {

                    if (res.data.code == 0) {
                        console.log(res.data)
                        for (var i = 0; i < res.data.objects.length; i++) {
                            console.log(this.bankcard_options)
                            this.bankcard_options.push(res.data.objects[i])
                        }

                    }
                })
                .catch((res) => {
                    this.$message.error(res)
                })
        },
        addmyp2p_dialog() {
            this.addmyp2p = true
            this.getselectdata()

        },
        getmyp2p(id) {
            this.modifymyp2p = true
            this.getselectdata()
            getmyp2pinfo_api(id)
                .then((res) => {
                    if (res.data.code == 0) {
                        this.modifymyp2p_form.id = res.data.data.id
                        this.modifymyp2p_form.p2p_id = res.data.data.p2p_id
                        this.modifymyp2p_form.account = res.data.data.account
                        this.modifymyp2p_form.password = res.data.data.password
                        this.modifymyp2p_form.card_id = res.data.data.card_id
                        this.modifymyp2p_form.phone = res.data.data.phone

                    } else {
                        this.$message.error(res.data.message)
                    }
                })
                .catch((res) => {
                    this.$message.error(res)
                })
        },

        addmyp2p_fun() {
            var p2p_id = this.addmyp2p_form.p2p_id
            var account = this.addmyp2p_form.account
            var password = this.addmyp2p_form.password
            var card_id = this.addmyp2p_form.card_id
            var phone = this.addmyp2p_form.phone
            addmyp2p_api(p2p_id, account, password, card_id, phone)
                .then((res) => {
                    if (res.data.code == 0) {
                        //添加成功隐藏dialog
                        this.addmyp2p = false
                        this.$message.success("添加成功")
                    }
                })
                .catch((res) => {
                    this.$message.error(res)
                })
        },

        modifymyp2p_fun() {
            var id = this.modifymyp2p_form.id
            var p2p_id = this.modifymyp2p_form.p2p_id
            var account = this.modifymyp2p_form.account
            var password = this.modifymyp2p_form.password
            var card_id = this.modifymyp2p_form.card_id
            var phone = this.modifymyp2p_form.phone
            modifymyp2p_api(id, p2p_id, account, password, card_id, phone)
                .then((res) => {
                    if (res.data.code == 0) {
                        //添加成功隐藏dialog
                        this.modifymyp2p = false
                        this.$message.success("修改成功")
                    }
                })
                .catch((res) => {
                    this.$message.error(res)
                })
        },

        delmyp2p(id) {
            this.$confirm('此操作将删除该条目, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
                center: true
            }).then(() => {
                //确认删除,调用删除接口
                delmyp2p_api(id)
                    .then((res) => {
                        if (res.data.code == 0) {
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            })
                        } else {
                            this.$message.error(res.data.msg)
                        }
                    })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });
        },

        handleCurrentChange(val) {
            this.getData(val);
            this.$router.push({
                path: 'myp2plist',
                query: {
                    page_index: val
                }
            });

        },



    }
}
</script>
<style>
.pagination {
    margin-top: 20px;
    margin-right: 20px;
    text-align: right;
}
</style>
