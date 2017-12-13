<template>
    <div>
        <el-table :data="tableData" stripe style="width: 100%">
            <el-table-column prop="id" label="id " width="180">
            </el-table-column>
            <el-table-column prop="username" label="用户" width="180">
            </el-table-column>
            <!-- prop="user.username" json多级访问 -->
            <el-table-column prop="ip" label="ip地址">
            </el-table-column>
            <el-table-column prop="mfa_status" label="是否MFA登录" :formatter="mfa_status">
            </el-table-column>
            <el-table-column prop="addtime" label="登录时间">
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
    loginlog_api
} from '../api/service'
export default {
    name: 'loginlog',
    data() {
        return {
            tableData: [],
            total_count: 0,
        }
    },
    created() {
        this.getData(1);
        this.$router.push({
            path: 'loginlog',
            query: {
                page_index: 1
            }
        })
    },
    methods: {
        getData(page_index) {
            loginlog_api(page_index)
                .then((res) => {
                    this.tableData = res.data.loginlog_resource.objects
                        //条目总数
                    this.total_count = res.data.loginlog_resource.num_result

                })

        },
        mfa_status(row, column) {
            if (row.mfa_status == false) {
                return "否"
            } else {
                return "是"
            }

        },
        handleCurrentChange(val) {
            this.getData(val);
            this.$router.push({
                path: 'loginlog',
                query: {
                    page_index: val
                }
            });

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
