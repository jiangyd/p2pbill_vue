import {baseUrl} from '../config/env'
import axios from 'axios'

// 获取图片验证码
export const get_captcha_url=baseUrl+'/admin/captcha'

export const settoken=axios.defaults.headers;

const login_url=baseUrl+"/admin/logins"

// 用户登录api
export const login_api=(username,password)=>axios({
	method:"post",
	url:login_url,
	data:{
		"username":username,
		"password":password
	}

})

//用户日志api
export const loginlog=(page_index)=>axios({
	method:"get",
	url:baseUrl+"/admin/loginlog?page_index="+page_index
})
