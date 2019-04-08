import { login, register } from '@/api/user'
import { setToken, authorization  } from '@/lib/util'


const state = {
	//
}

const getters = {
	//
}

const mutations = {
	// 
}

const actions = {
	login ({ commit }, { userName, password }) {
		return new Promise((resolve, reject) => {
			login({ userName, password }).then(res => {
				if (res.code == 200 && res.data.token) {
					setToken(res.data.token)
					resolve(res)
				} else {
					reject({
						mes: res.mes
					})
				}
			}).catch(error => {
				reject(error)
			})
		})
	},
	register ({ commit }, { userName, password, identify }) {
		return new Promise((resolve, reject) => {
			register({ userName, password, identify }).then(res => {
				if (res.code == 200 && res.data.token) {
					setToken(res.data.token)
					resolve(res)
				} else {
					reject({
						mes: res.mes
					})
				}
			}).catch(error => {
				reject(error)
			})
		})
	},
	authorization ({ commit }, token) {
		authorization().then(res => {
			return new Promise((resolve, reject) => {
				if (res.data.code == 401) {
					reject(new Error('token错误!'))
				} else {
					setToken(res.data.token)
					resolve()
				}
			}).catch(error => {
				reject(error)
			})
		})
	},
	logout () {
		setToken('')
	}
}

export default {
	getters,
	state,
	mutations,
	actions,
	modules: {
		//
	}
}