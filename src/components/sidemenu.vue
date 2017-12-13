<template>
    <div class="sidebar">
        <el-menu default-active="1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose">
            <router-link to="/dashboard">
                <el-menu-item index="1">
                    <i class="el-icon-menu"></i>
                    <span slot="title">概览</span>
                </el-menu-item>
            </router-link>
            <router-link to="/investlist">
                <el-menu-item index="2">
                    <i class="el-icon-menu"></i>
                    <span slot="title">投资记录</span>
                </el-menu-item>
            </router-link>
            <router-link to="/billflowlist">
                <el-menu-item index="3">
                    <i class="el-icon-menu"></i>
                    <span slot="title">资金流水</span>
                </el-menu-item>
            </router-link>
            <router-link to="/myp2plist">
                <el-menu-item index="4">
                    <i class="el-icon-menu"></i>
                    <span slot="title">用户平台</span>
                </el-menu-item>
            </router-link>
            <router-link to="/p2plist">
                <el-menu-item index="5">
                    <i class="el-icon-menu"></i>
                    <span slot="title">P2P平台</span>
                </el-menu-item>
            </router-link>
            <router-link to="/banklist">
                <el-menu-item index="6">
                    <i class="el-icon-menu"></i>
                    <span slot="title">银行卡管理</span>
                </el-menu-item>
            </router-link>
            <router-link to="/userinfo">
                <el-menu-item index="7">
                    <i class="el-icon-menu"></i>
                    <span slot="title">用户信息</span>
                </el-menu-item>
            </router-link>
            <router-link to="/loginlog">
                <el-menu-item index="8">
                    <i class="el-icon-setting"></i>
                    <span slot="title">登录日志</span>
                </el-menu-item>
            </router-link>
        </el-menu>
    </div>
</template>
<script>
export default {
    name: 'sidemenu',
    methods: {
        handleOpen(key, keyPath) {
            console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
            console.log(key, keyPath);
        }
    }
}
</script>
<style>
.sidebar {
    display: block;
    position: absolute;
    width: 200px;
    left: 20px;
    top: 70px;
    bottom: 0;
}

.sidebar a {
    text-decoration: none;
}
</style>
