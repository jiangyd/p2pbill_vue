<template>
<div class="header">
  <div class="logo">P2P投资管理系统</div>
  <div class="user-info">
    <el-dropdown>
      <span class="el-dropdown-link" style="color: #fff;">
    安全设置<i class="el-icon-arrow-down el-icon--right"></i>
    </span>
  <el-dropdown-menu slot="dropdown">
    <el-dropdown-item>MFA设置</el-dropdown-item>
    <el-dropdown-item>修改密码</el-dropdown-item>
    <el-dropdown-item>退出</el-dropdown-item>
    
    
  </el-dropdown-menu>
</el-dropdown>
  </div>
</div>

</template>

<script>
  export default {
    name:'navmenu',
    data() {
      return {
        
        
      };
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      }
     
    }
  }
</script>

<style>
     .header {
        /*margin: 0px;*/
        position: relative;
        box-sizing: border-box;
        width: 100%;
        height: 60px;
        font-size: 22px;
        color: #fff;
        line-height: 60px;
        background-color: #24292e;
    }
    .header .logo{
        float: left;
        width:250px;
        text-align: center;
    }
    .user-info {
        float: right;
        padding-right: 50px;
        font-size: 16px;
        
        background-color: #24292e;
        height: 60px;
    }
  
</style>