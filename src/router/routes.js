import home from '@/views/home'
export default [
	{
		path: '/',
		redirect: to => '/home'
	},
	{
		name: 'home',
		path: '/home',
		component: home
	},
	{
		name: 'read',
		path: '/read',
		component: () => import('@/views/read.vue')
	},
	{
		name: 'consult',
		path: '/consult',
		component: () => import('@/views/consult.vue')
	},
	{
		name: 'test',
		path: '/test',
		component: () => import('@/views/test.vue')
	},
	{
		name: 'user',
		path: '/user',
		redirect: to => '/home',
		children: [
			{ path: 'login', component: () => import('_c/user/login') },
			{ path: 'person', component: () => import('_c/user/person') }

		],
		component: () => import('@/views/user.vue')
	},
	{
		path: '*',
		redirect: to => '/home'
	}
]