<template>
    <div>
        <el-table :data="tableData" stripe style="width: 100%">
            <el-table-column prop="id" label="id " width="180">
            </el-table-column>
            <el-table-column prop="p2p_name" label="平台名称" width="180">
            </el-table-column>
            <el-table-column prop="card_name" label="银行">
            </el-table-column>
            <el-table-column prop="card_card" label="银行卡号">
            </el-table-column>
            <el-table-column prop="money" label="金额" width="180">
            </el-table-column>
            <el-table-column prop="type" label="类型" :formatter="billflow_type_format">
            </el-table-column>
            <el-table-column prop="status" label="状态" :formatter="billflow_status_format">
            </el-table-column>
            <el-table-column prop="addtime" label="开始时间" width="180">
            </el-table-column>
            <el-table-column prop="donetime" label="完成时间" width="180">
            </el-table-column>
        </el-table>
        <div class="pagination">
            <el-pagination @current-change="handleCurrentChange" background layout="total,prev, pager, next" :total="total_count">
            </el-pagination>
        </div>
    </div>
</template>
<script>
import {
    billflowlist_api
} from '../api/service'
export default {
    name: 'billflow',
    data() {
        return {
            tableData: [],
            total_count: 0,
        }
    },
    created() {
        this.getData(1);
        this.$router.push({
            path: 'billflowlist',
            query: {
                page_index: 1
            }
        })
    },
    methods: {
        getData(page_index) {
            billflowlist_api(page_index)
                .then((res) => {
                    this.tableData = res.data.objects
                        //条目总数
                    this.total_count = res.data.num_result

                })

        },

        handleCurrentChange(val) {
            this.getData(val);
            this.$router.push({
                path: 'billflowlist',
                query: {
                    page_index: val
                }
            });

        },
        billflow_type_format(row, column) {
            //0 充值，1 提现
            if (row.type == 0) {
                return "充值"
            } else if (row.type == 1) {
                return "提现"
            }

        },
        billflow_status_format(row, column) {
            //0进行中,1已完成
            if (row.status == 0) {
                return "进行中"
            } else if (row.status == 1) {
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
