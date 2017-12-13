<template>
    <div>
        <el-table :data="tableData" stripe style="width: 100%">
            <el-table-column prop="id" label="id " width="180">
            </el-table-column>
            <el-table-column prop="name" label="用户" width="180">
            </el-table-column>
            <!-- prop="user.username" json多级访问 -->
            <el-table-column prop="url" label="ip地址">
            </el-table-column>
            <el-table-column prop="funds_deposit" label="资金存管" :filters="[{ text: '是', value: '是' }, { text: '否', value: '否' }]" :formatter="formatter_funds" :filter-method="filterTag_funds">
            </el-table-column>
            <el-table-column prop="risk_deposit" label="风险金存管" :filters="[{ text: '是', value: '是' }, { text: '否', value: '否' }]" :formatter="formatter_risk" :filter-method="filterTag_risk">
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
    p2plist_api
} from '../api/service'
export default {
    name: 'p2plist',
    data() {
        return {
            tableData: [],
            total_count: 0,
        }
    },
    created() {
        this.getData(1);
        this.$router.push({
            path: 'p2plist',
            query: {
                page_index: 1
            }
        })
    },
    methods: {
        getData(page_index) {
            p2plist_api(page_index)
                .then((res) => {
                    this.tableData = res.data.objects
                        //条目总数
                    this.total_count = res.data.num_result

                })

        },

        handleCurrentChange(val) {
            this.getData(val);
            this.$router.push({
                path: 'p2plist',
                query: {
                    page_index: val
                }
            });

        },
        formatter_funds(row, column) {
            if (row.funds_deposit == false) {
                return "否"
            } else if (row.funds_deposit == true) {
                return "是"
            } else {
                return row.funds_deposit
            }
        },
        formatter_risk(row, column) {
            if (row.risk_deposit == false) {
                return "否"
            } else if (row.risk_deposit == true) {
                return "是"
            } else {
                return row.risk_deposit
            }
        },
        filterTag_funds(value, row) {
            return row.funds_deposit === value;
        },
        filterTag_risk(value, row) {
            return row.risk_deposit === value;
        }


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
