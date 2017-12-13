import register from '@/components/register'
import login from '@/components/login'
import forgetpwd from '@/components/forgetpwd'
import navmenu from '@/components/navmenu'
import sidemenu from '@/components/sidemenu'
import home from '@/components/home'
import loginlog from '@/components/loginlog'
import dashboard from '@/components/dashboard'

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
					component:dashboard
				},
				{
					path:'/loginlog',
					component:loginlog
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
export default routes	
