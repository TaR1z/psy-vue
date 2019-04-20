import axios from 'axios'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { baseUrl as baseURL } from '@/config'
import { getToken } from '@/lib/util'

class HttpRequest {
	constructor (baseUrl = baseURL) {
		this.baseUrl = baseUrl
		this.queue = {}
	}

	getInsideConfig () {
		const config = {
			baseUrl: this.baseUrl,
			headers: {
				//
			}
		}
		return config
	}

	interceptors (instance) {
		// 请求拦截
		instance.interceptors.request.use(config => {
			// 添加全局的loading...
			NProgress.start()
			if (Object.keys(this.queue).length) {
				NProgress.start()
			}
			this.queue[config.url] = true
			config.headers['Authorization'] = getToken() // 头部传入判断的token
			return config
		}, error => {
			return Promise.reject(error)
		})

		// 响应拦截
		instance.interceptors.response.use(res => {
			delete this.queue[res.config.url]
			// 结果筛选
			const { data } = res
			if (data.code == -401) {
				location.reload()
			}
			NProgress.done()
			return data
		}, error => {
			delete this.queue[res.config.url]
			return Promise.reject(error)
		})
		
	}

	request (options) {
		const instance = axios.create()
		options = Object.assign(this.getInsideConfig(), options)
		this.interceptors(instance, options.url)
		return instance(options)
	}
}

export default HttpRequest