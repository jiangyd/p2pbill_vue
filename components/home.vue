<template>

<el-container>
  <el-header><navmenu></navmenu></el-header>
  <el-container>
    <el-aside><sidemenu></sidemenu></el-aside>
    <el-container>
      <el-main><router-view></router-view></el-main>
      <el-footer>Footer</el-footer>
    </el-container>
  </el-container>
</el-container>

</template>

<script>
    import navmenu from './navmenu.vue';
    import sidemenu from './sidemenu.vue';
    export default {
    	name:'home',
        components:{
            navmenu, sidemenu
        }
    }
</script>

<style>


</style>



  