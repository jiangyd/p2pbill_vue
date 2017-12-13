import { baseUrl } from '../config/env'
import axios from 'axios'
// import Router from 'vue-router'
import router from '../router'


export const instance = axios.create();


instance.interceptors.request.use(
    config => {
        if (localStorage.getItem("access_token")) {
            config.headers.Authorization = localStorage.getItem("access_token");
        }
        return config;
    },
    err => {
        return Promise.reject(err);
    });

// http response 拦截器
instance.interceptors.response.use(
    response => {
        // Do something with response data
        return response;
    },
    error => {
        if (error.response.status == 401) {
            // this.$router.push({path:'/login'})
            router.push("/login")
            localStorage.clear()
        }
        // Do something with response error
        return Promise.reject(error.response.data);
    });



// 获取图片验证码
export const get_captcha_url = baseUrl + '/admin/captcha'

// export const settoken=axios.defaults.headers;

const login_url = baseUrl + "/admin/logins"

// 用户登录api
export const login_api = (username, password) => instance({
    method: "post",
    url: login_url,
    data: {
        "username": username,
        "password": password
    }

})

//用户登出
export const logout_api = () => instance({
    method: "get",
    url: baseUrl + "/admin/logout"

})

//用户日志api
export const loginlog_api = (page_index) => instance({
    method: "get",
    url: baseUrl + "/admin/loginlogs?page_index=" + page_index
})


//用户信息
export const userinfo_api = () => instance({
    method: "get",
    url: baseUrl + "/admin/userinfo"
})

//用户银行卡列表
export const banklist_api = (page_index) => instance({
    method: "get",
    url: baseUrl + "/admin/banklist?page_index=" + page_index
})

//获取银行卡信息
export const getbankcard_api=(id)=>instance({
  method:"get",
  url:baseUrl+"/admin/bankcard?id="+id
})

//添加银行卡
export const addbankcard_api = (name, card) => instance({
    method: "post",
    url: baseUrl + "/admin/bankcard",
    data: {
        "name": name,
        "card": card,
    }
})

//更新银行卡
export const updatebankcard_api=(id,name,card)=>instance({
  method:"put",
  url:baseUrl+"/admin/bankcard",
  data:{
    "id":id,
    "name":name,
    "card":card
  }
})

//删除银行卡
export const delbank_api = (id) => instance({
    method: "delete",
    url: baseUrl + "/admin/bankcard",
    data: {
        "id": id
    }
})

//平台列表
export const p2plist_api = (page_index) => instance({
    method: "get",
    url: baseUrl + "/admin/p2plist?page_index=" + page_index
})

//用户平台
export const myp2plist_api = (page_index) => instance({
    method: "get",
    url: baseUrl + "/admin/myp2plist?page_index=" + page_index
})

//添加用户平台
export const addmyp2p_api=(p2p_id,account,password,card_id,phone)=>instance({
    method:"post",
    url:baseUrl+"/admin/myp2p",
    data:{
        "p2p_id":p2p_id,
        "account":account,
        "password":password,
        "card_id":card_id,
        "phone":phone
    }
})

//用户资金流水记录
export const billflowlist_api = (page_index) => instance({
    method: "get",
    url: baseUrl + "/admin/billflowlist?page_index=" + page_index
})

//用户投资记录
export const investlist_api = (page_index) => instance({
    method: "get",
    url: baseUrl + "/admin/investlist?page_index=" + page_index
})
