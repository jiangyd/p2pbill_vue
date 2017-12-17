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
                    <el-date-picker v-model="value1" type="date" placeholder="选择开始日期" style="width:320px"></el-date-picker>
                </el-form-item>
                </el-date-picker>
                <el-form-item label="到期日期">
                    <el-date-picker v-model="value1" type="date" placeholder="选择到期日期" style="width:320px"></el-date-picker>
                </el-form-item>
                <el-form-item label="预期收益">
                    <el-input v-model="addinvest_form.lucre" auto-complete="off" style="width:320px"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
    <el-button @click="handleClose">取 消</el-button>
    <el-button type="primary" @click="addmyp2p_fun">确 定</el-button>
  </span>
        </el-dialog>
    </div>
</template>
<script>
import {
    investlist_api,
    p2plist_api

} from '../api/service'
export default {
    name: 'investlist',
    data() {
        return {
            //表单右对齐
            labelPosition: 'right',
            tableData: [],
            total_count: 0,
            addinvest: false,
            //p2p下拉列表
            p2p_options: [],
            addinvest_form: {
                p2p_id: "",
                money: "",
                profit: "",
                start_time: "",
                end_time: "",
                lucre:""

            }
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
        addinvest_dialog() {
            this.addinvest = true
            this.getselectdata()
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
