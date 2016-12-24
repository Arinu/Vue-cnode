import Index from '../components/Index'
import Getstart from '../components/Getstart'
import Api from '../components/Api'
import About from '../components/About'
import Signin from '../components/Signin'
import Topics from '../components/Topics'
import User from '../components/User'

export default [
	{path: '/',component: Index, name: '主页'},
	{path: '/getstart',component: Getstart, name: '新手入门'},
	{path: '/api',component: Api, name: 'API'},
	{path: '/about',component: About, name: '关于'},
	{path: '/signin',component: Signin, name: '登录'},
	{path: '/topic',component: Topics, name: '主题详情'},
	{path: '/user',component: User, name: '用户详情'}
]