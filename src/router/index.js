import VueRouter from 'vue-router'
import Vue from 'vue'

import register from '@/components/register'
import login from '@/components/login'
import forgetpwd from '@/components/forgetpwd'
import navmenu from '@/components/navmenu'
import sidemenu from '@/components/sidemenu'
import home from '@/components/home'
import loginlog from '@/components/loginlog'
import dashboard from '@/components/dashboard'
import userinfo from '@/components/userinfo'
import banklist from '@/components/banklist'
import p2plist from '@/components/p2plist'
import myp2plist from '@/components/myp2plist'
import billflowlist from '@/components/billflowlist'
import investlist from "@/components/investlist"

Vue.use(VueRouter)

const routes= [
		{
			path:'/',
			redirect:'/login'
		},

		{
			path:'/dashboard',name:'home',component:home,
			children:[
				{
					path:'/',
					component:dashboard,
					meta: {
            			requireAuth: true,
        				},
				},
				{
					path:'/loginlog',
					component:loginlog,
					meta: {
            			requireAuth: true,
        				},
				},
					{
					path:'/userinfo',
					component:userinfo,
					meta: {
            			requireAuth: true,
        				},
				},
					{
					path:'/banklist',
					component:banklist,
					meta: {
            			requireAuth: true,
        				},
				}
				,
					{
					path:'/p2plist',
					component:p2plist,
					meta: {
            			requireAuth: true,
        				},
				},

					{
					path:'/myp2plist',
					component:myp2plist,
					meta: {
            			requireAuth: true,
        				},
				}
				,

					{
					path:'/billflowlist',
					component:billflowlist,
					meta: {
            			requireAuth: true,
        				},
				}
					,

					{
					path:'/investlist',
					component:investlist,
					meta: {
            			requireAuth: true,
        				},
				},

					{
					path:'/dashboard',
					component:dashboard,
					meta: {
            			requireAuth: true,
        				},
				}


			]
		},
		{
			path:'/login',
			name:'login',
			component:login

		},

		{
			path:'/register',
			name:'register',
			component:register
		},
		{
			path:'/forgetpwd',name:'forgetpwd',component:forgetpwd
		},
		
		
	]


const router = new VueRouter({
	routes
})
export default router	
