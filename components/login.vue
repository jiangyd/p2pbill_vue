
<template>
  <div class="login">
    <h3>用户登录</h3>
  <el-form ref="form" :model="form" label-width="80px" >
  <el-form-item label="用户名">
    <el-input v-model="form.username"  placeholder="请输入用户名" ></el-input>
  </el-form-item>
  <el-form-item label="密码">
    <el-input v-model="form.password"  placeholder="请输入密码" type="password"></el-input>
  </el-form-item>

  <el-form-item>
  <router-link to="/register" >注册</router-link>
    <router-link to="/forgetpwd">忘记密码</router-link>
    <el-button type="primary" @click="onSubmit">登录</el-button>
    

  </el-form-item>
  </el-form>
  </div>
  
</template>


<script>
import {login_api} from '../api/service'
import axios from 'axios'



export default {  
  name:'login',
  data(){
      return{
        form:{
        username:'',
        password:''
      }
      } 
    },
    methods:{
      onSubmit(){
        login_api(this.form.username,this.form.password)
         .then((response)=> {
            if(response.data.code==0){
              axios.defaults.headers.common['Authorization']='Bearer'+response.data.data.token;
              this.$router.push({path:'/loginlog'})
            }else{
              alert(response.data.msg)
            }
            })
        .catch(function (error) {
            console.log(error);
            }); 

      }
    }
}
</script>
<style>
  .login{
width:28%;
margin-top:100px;
text-align:right;
height:250px;
margin-left:36%;
}
.login a {
  text-decoration:none; 
  color: green;
}
.login h3 {
    font-size: 22px;
    font-weight: 400;
    color: #1f2f3d;
    text-align: center;
}
</style>