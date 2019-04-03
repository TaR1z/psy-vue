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

// router.beforeEach((to, from, next) => {
// 	const token = getToken()
// 	if (token) {
// 		store.dispatch('authorization', token).then(() => {
// 			//
// 		}).catch(() => {
// 			setToken('') // 及时清除token
// 			//
// 		})
// 	} else {
// 		// 判断没有token的情况,路由跳转
// 	}
// })

export default router