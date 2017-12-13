<template>
    <div>
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
    </div>
</template>
<script>
import {
    investlist_api
} from '../api/service'
export default {
    name: 'investlist',
    data() {
        return {
            tableData: [],
            total_count: 0,
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

        handleCurrentChange(val) {
            this.getData(val);
            this.$router.push({
                path: 'investlist',
                query: {
                    page_index: val
                }
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
