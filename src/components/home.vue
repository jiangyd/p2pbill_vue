<template>
    <el-container>
        <el-header>
            <navmenu></navmenu>
        </el-header>
        <el-container>
            <el-aside>
                <sidemenu></sidemenu>
            </el-aside>
            <el-container>
                <el-main>
                    <router-view></router-view>
                </el-main>
                <el-footer>
                    <div class="footer">
                        <span>关于作者:  睡着了去做梦</span>
                        <span>微信:  jiangyd177</span>
                    </div>
                </el-footer>
            </el-container>
        </el-container>
    </el-container>
</template>
<script>
import navmenu from './navmenu.vue';
import sidemenu from './sidemenu.vue';
export default {
    name: 'home',
    components: {
        navmenu,
        sidemenu
    }
}
</script>
<style>
.footer {
    width: 100%;
    height: 60px;
    background-color: #f5f5f5;
    text-align: center;
    bottom: 0px;
    z-index: 9999999;
    line-height: 60px;
}
</style>
