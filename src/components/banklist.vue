<template>
    <div>
        <el-button type="default" @click="addbankcard = true">添加</el-button>
        <el-table :data="tableData" stripe style="width: 100%">
            <!-- prop="user.username" json多级访问 -->
            <el-table-column prop="name" label="银行名称">
            </el-table-column>
            <el-table-column prop="card" label="银行卡号">
            </el-table-column>
            <el-table-column label="操作" width="100">
                <template slot-scope="scope">
                    <el-button type="text" size="small" @click="getbankcard(scope.row.id)">编辑</el-button>
                    <el-button type="text" size="small" @click="delbank_confirm(scope.row.id)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="pagination">
            <el-pagination @current-change="handleCurrentChange" background layout="total,prev, pager, next" :total="total_count">
            </el-pagination>
        </div>
        <!-- 添加银行卡dialog -->
        <el-dialog title="添加银行卡" :visible.sync="addbankcard" width="350px">
            <el-form :model="addbankcard_form">
                <el-form-item label="银行卡名称">
                    <el-input v-model="addbankcard_form.name" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="银行卡号">
                    <el-input v-model="addbankcard_form.card" auto-complete="off"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
    <el-button @click="addbankcard = false">取 消</el-button>
    <el-button type="primary" @click="addbankcard_fun">确 定</el-button>
  </span>
        </el-dialog>
        <!-- 编辑银行卡dialog -->
        <el-dialog title="编辑银行卡" :visible.sync="editbankcard" width="350px">
            <el-form :model="editbankcard_form">
            <el-input v-model="editbankcard_form.id" auto-complete="off" type="hidden"></el-input>
                <el-form-item label="银行卡名称">
                    <el-input v-model="editbankcard_form.name" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="银行卡号">
                    <el-input v-model="editbankcard_form.card" auto-complete="off"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
    <el-button @click="editbankcard = false">取 消</el-button>
    <el-button type="primary" @click="updatebankcard_fun">确 定</el-button>
  </span>
        </el-dialog>
    </div>
</template>
<script>
import {
    banklist_api,
    delbank_api,
    addbankcard_api,
    getbankcard_api,
    updatebankcard_api,
} from '../api/service'
export default {
    name: 'banklist',
    data() {
        return {
            tableData: [],
            total_count: 0,
            //添加银行卡dialog
            addbankcard: false,
            //添加银行卡表单
            addbankcard_form: {
                name: "",
                card: ""
            },
            editbankcard:false,
            editbankcard_form:{
              id:"",
              name:"",
              card:""
            }
        }
    },
    created() {
        this.getData(1);
        this.$router.push({
            path: 'banklist',
            query: {
                page_index: 1
            }
        })
    },
    methods: {
        getData(page_index) {
            banklist_api(page_index)
                .then((res) => {
                    this.tableData = res.data.objects
                        //条目总数
                    this.total_count = res.data.num_result

                })

        },
        handleCurrentChange(val) {
            this.getData(val);
            this.$router.push({
                path: 'banklist',
                query: {
                    page_index: val
                }
            });

        },
        addbankcard_fun() {
            addbankcard_api(this.addbankcard_form.name, this.addbankcard_form.card)
                .then((res) => {
                    if (res.data.code == 0) {
                        //添加成功后隐藏dialog
                        this.addbankcard = false
                        this.$message.success("添加成功!")
                            //刷新当前页面
                            // this.$router.go(0)


                    } else {
                        this.$message.error(res.data.msg)
                    }
                })
                .catch((res) => {
                    this.$message.error(res)
                })
        },
        getbankcard(id){
          //编辑dialog弹出
            this.editbankcard=true;
            getbankcard_api(id)
            .then((res)=>{
              if(res.data.code==0){
                this.editbankcard_form.id=res.data.data.id
                this.editbankcard_form.name=res.data.data.name
                this.editbankcard_form.card=res.data.data.card
              }
            })
            .catch((res)=>{
              this.$message.error(res)
            })
        },
        updatebankcard_fun(id,name,card){
          updatebankcard_api(this.editbankcard_form.id,this.editbankcard_form.name,this.editbankcard_form.card)
          .then((res)=>{
            if (res.data.code==0){
              this.$message.success("编辑成功")
              this.editbankcard=false
            }else{
              this.$message.error(res.data.msg)
            }
          })
          .catch((res)=>{
            console.log(res)
            this.$message.error(res)
          })
        },
        delbank_confirm(id) {
            this.$confirm('此操作将删除该条目, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
                center: true
            }).then(() => {
                //确认删除,调用删除接口
                delbank_api(id)
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
