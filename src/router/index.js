import Vue from 'vue'
import Router from 'vue-router'
import routes from './routes'
import { getToken, setToken } from '@/lib/util'
import store from '@/store'

Vue.use(Router)

const router = new Router({
	// mode: 'history',
	routes
})

router.beforeEach((to, from, next) => {
	const token = getToken()
	if (token && token !== 'undefined') {
		store.dispatch('authorization').then(() => {
			if (to.path == '/user/login') {
				next({
					name: 'home'
				})
			}
		}).catch(() => {
			setToken('') // 及时清除token
		})
	} else {
		if (to.path == '/user/person') {
			next({
				name: 'user'
			})
		}
	}
	next()
})

export default router