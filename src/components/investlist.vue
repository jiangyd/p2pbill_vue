<template>
    <div>
        <el-button type="default" @click="addinvest_dialog">添加</el-button>
        <el-table :data="tableData" stripe style="width: 100%">
            <el-table-column prop="id" label="id " width="180">
            </el-table-column>
            <el-table-column prop="p2p_name" label="平台名称" width="180">
            </el-table-column>
            <el-table-column prop="money" label="投资金额">
            </el-table-column>
            <el-table-column prop="profit" label="年化收益" width="180">
            </el-table-column>
            <el-table-column prop="status" label="状态" :formatter="invest_status_format">
            </el-table-column>
            <el-table-column prop="start_time" label="开始时间" width="180">
            </el-table-column>
            <el-table-column prop="end_time" label="结束时间" width="180">
            </el-table-column>
                        <el-table-column label="操作" width="100">
                <template slot-scope="scope">
                    <el-button type="text" size="small" @click="getinvest(scope.row.id)">编辑</el-button>
                    <el-button type="text" size="small" @click="delinvest(scope.row.id)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="pagination">
            <el-pagination @current-change="handleCurrentChange" background layout="total,prev, pager, next" :total="total_count">
            </el-pagination>
        </div>
        <el-dialog title="添加投资记录" :visible.sync="addinvest" width="450px" :before-close="handleClose">
            <el-form :model="addinvest_form" :label-position="labelPosition" label-width="100px">
                <el-form-item label="平台名称">
                    <el-select clearable class="filter-item" v-model="addinvest_form.p2p_id" placeholder="请选择平台" style="width:320px">
                        <el-option v-for="item in  p2p_options" :key="item.id" :label="item.name" :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="投资金额">
                    <el-input v-model="addinvest_form.money" auto-complete="off" style="width:320px"></el-input>
                </el-form-item>
                <el-form-item label="年化收益率">
                    <el-input v-model="addinvest_form.profit" auto-complete="off" style="width:320px"></el-input>
                </el-form-item>
                <el-form-item label="开始日期">
                    <el-date-picker v-model="addinvest_form.start_time" type="date" value-format="yyyy-MM-dd" placeholder="选择开始日期" style="width:320px"></el-date-picker>
                </el-form-item>
                </el-date-picker>
                <el-form-item label="到期日期">
                    <el-date-picker v-model="addinvest_form.end_time" type="date" value-format="yyyy-MM-dd" placeholder="选择到期日期" style="width:320px"></el-date-picker>
                </el-form-item>
                <el-form-item label="预期收益">
                    <el-input v-model="addinvest_form.lucre" auto-complete="off" style="width:320px"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
    <el-button @click="handleClose">取 消</el-button>
    <el-button type="primary" @click="addinvest_fun">确 定</el-button>
  </span>
        </el-dialog>

                <el-dialog title="修改投资记录" :visible.sync="modifyinvest" width="450px" :before-close="handleClose">
            <el-form :model="modifyinvest_form" :label-position="labelPosition" label-width="100px">
            <el-input v-model="modifyinvest_form.id" auto-complete="off" type="hidden"></el-input>
                <el-form-item label="平台名称">
                    <el-select clearable class="filter-item" v-model="modifyinvest_form.p2p_id" placeholder="请选择平台" style="width:320px">
                        <el-option v-for="item in  p2p_options" :key="item.id" :label="item.name" :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="投资金额">
                    <el-input v-model="modifyinvest_form.money" auto-complete="off" style="width:320px"></el-input>
                </el-form-item>
                <el-form-item label="年化收益率">
                    <el-input v-model="modifyinvest_form.profit" auto-complete="off" style="width:320px"></el-input>
                </el-form-item>
                <el-form-item label="开始日期">
                    <el-date-picker v-model="modifyinvest_form.start_time" type="date" placeholder="选择开始日期" style="width:320px"></el-date-picker>
                </el-form-item>
                </el-date-picker>
                <el-form-item label="到期日期">
                    <el-date-picker v-model="modifyinvest_form.end_time" type="date" placeholder="选择到期日期" style="width:320px"></el-date-picker>
                </el-form-item>
                <el-form-item label="预期收益">
                    <el-input v-model="modifyinvest_form.lucre" auto-complete="off" style="width:320px"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
    <el-button @click="handleClose">取 消</el-button>
    <el-button type="primary" @click="modifyinvest_fun">确 定</el-button>
  </span>
        </el-dialog>
    </div>
</template>
<script>
import {
    investlist_api,
    p2plist_api,
    addinvest_api,
    getinvest_api,
    modifyinvest_api,
    delinvest_api

} from '../api/service'
export default {
    name: 'investlist',
    data() {
        return {
            //表单右对齐
            labelPosition: 'right',
            tableData: [],
            total_count: 0,
            //添加invest的dialog
            addinvest: false,
            //编辑invest的dialog
            modifyinvest:false,
            //p2p下拉列表
            p2p_options: [],
            //添加invest的form
            addinvest_form: {
                p2p_id: "",
                money: "",
                profit: "",
                start_time: "",
                end_time: "",
                lucre:"",

            },
            //编辑invest的form
            modifyinvest_form:{
                id:"",
                p2p_id:"",
                profit:"",
                start_time:"",
                end_time:"",
                lucre:"",
            },
        }
    },
    created() {
        this.getData(1);
        this.$router.push({
            path: 'investlist',
            query: {
                page_index: 1
            }
        })
    },
    methods: {
        getData(page_index) {
            investlist_api(page_index)
                .then((res) => {
                    this.tableData = res.data.objects
                        //条目总数
                    this.total_count = res.data.num_result

                })

        },
        //关闭dialog窗口时的回调函数
        handleClose() {
            this.addinvest = false;

            //清空下拉选项数组
            this.p2p_options.splice(0, this.p2p_options.length);
        },

        handleCurrentChange(val) {
            this.getData(val);
            this.$router.push({
                path: 'investlist',
                query: {
                    page_index: val
                }
            });

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
        },
        //关闭dialog窗口时的回调函数
        handleClose() {
            this.modifyinvest = false;
            this.addinvest= false;
            //清空下拉选项数组
            this.p2p_options.splice(0, this.p2p_options.length);
        },
        addinvest_dialog() {
            this.addinvest = true
            this.getselectdata()
        },
        //编辑invest时，获取单个invest信息
        getinvest(id){
            this.modifyinvest=true;
            this.getselectdata()
            getinvest_api(id)
            .then((res)=>{
                if(res.data.code==0){
                    this.modifyinvest_form.id=res.data.data.id
                    this.modifyinvest_form.p2p_id=res.data.data.p2p_id
                    this.modifyinvest_form.profit=res.data.data.profit
                    this.modifyinvest_form.money=res.data.data.money
                    this.modifyinvest_form.start_time=res.data.data.start_time
                    this.modifyinvest_form.end_time=res.data.data.end_time
                    this.modifyinvest_form.lucre=res.data.data.lucre
                }else{
                    this.$message.error(res.data.msg)
                }
            })
            .catch((res)=>{
                this.$message.error(res)
            })
        },
        //提交数据
        addinvest_fun(){
            var p2p_id=this.addinvest_form.p2p_id
            var money=this.addinvest_form.money
            var profit=this.addinvest_form.profit
            var start_time=this.addinvest_form.start_time
            var end_time=this.addinvest_form.end_time
            var lucre=this.addinvest_form.lucre
            addinvest_api(p2p_id,money,profit,start_time,end_time,lucre)
            .then((res)=>{
                if(res.data.code==0){
                    this.$message.success("添加成功")
                }else{
                    this.$message.error(res.data.msg)
                }
            })
            .catch((res)=>{
                this.$message.error(res)
            })

        },
        //编辑投资记录提交
        modifyinvest_fun(){
            var id=this.modifyinvest_form.id
            var p2p_id=this.modifyinvest_form.p2p_id
            var money=this.modifyinvest_form.money
            var profit=this.modifyinvest_form.profit
            var start_time=this.modifyinvest_form.start_time
            var end_time=this.modifyinvest_form.end_time
            var lucre=this.modifyinvest_form.lucre
            modifyinvest_api(id,p2p_id,money,profit,start_time,end_time,lucre)
            .then((res)=>{
                if(res.data.code==0){
                    this.modifyinvest=false;
                    this.$message.success("编辑成功")
                }else{
                    this.$message.error(res.data.msg)
                }
            })
            .catch((res)=>{
                this.$message.error(res)
            })
        },
        //删除invest
        delinvest(id){
            this.$confirm('此操作将删除该条目, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
                center: true
            }).then(() => {
                //确认删除,调用删除接口
                delinvest_api(id)
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


        invest_status_format(row, column) {
            //0投资中,1已到期,2已完成
            if (row.status == 0) {
                return "投资中"
            } else if (row.status == 1) {
                return "已到期"
            } else if (row.status == 2) {
                return "已完成"
            }
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
