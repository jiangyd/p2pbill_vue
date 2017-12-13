

<template>
  <div class="register">
  <h3>用户注册</h3>
  <el-form ref="form" :model="form" label-width="80px" >

<el-form-item label="用户名">
    <el-input v-model="form.username" placeholder="请输入注册用户名" ></el-input>
  </el-form-item>

  <el-form-item label="昵称">
    <el-input v-model="form.nickname" placeholder="请输入注册昵称" ></el-input>
  </el-form-item>
  <el-form-item label="手机号">
    <el-input v-model="form.phone" placeholder="请输入注册手机号" ></el-input>
  </el-form-item>

  <el-form-item label="邮箱">
    <el-input v-model="form.email" placeholder="请输入注册邮箱" ></el-input>
  </el-form-item>


  <el-form-item label="密码">
    <el-input v-model="form.password" placeholder="请输入注册密码" type="password"></el-input>
  </el-form-item>
<el-form-item label="密码">
    <el-input v-model="form.repassword" placeholder="请确认输入密码" type="password"></el-input>
  </el-form-item>
  <el-form-item label="验证码">
    <el-input v-model="form.captcha" placeholder="请输入验证码" style="width:150px;" ></el-input>
    <img  :src='captcha_img' @click='update_captcha_img'>
  </el-form-item>

  <el-form-item>
  <router-link to="/login" >已有帐号去登录</router-link>
    <el-button type="primary" @click="onSubmit">确认</el-button> 
    
  </el-form-item>
  </el-form>
  </div>
</template>

<script>
import {get_captcha_url} from '../api/service'

  export default{
    name:'register',
    data(){
      return{
        form:{

      },
      captcha_img:get_captcha_url,
      } 
    },
    
    methods:{
      onSubmit(){
        
      },
      update_captcha_img(){
        this.captcha_img=get_captcha_url+'?=t'+Math.random()
      }
      
    }
  }
</script>


<style>
  .register{
width:28%;
margin-top:100px;
text-align:right;
/*height:250px;*/
margin-left:36%;
}
.register a {
  text-decoration:none; 
  color: green
}

.register h3 {
    font-size: 22px;
    font-weight: 400;
    color: #1f2f3d;
    text-align: center;
}
</style>