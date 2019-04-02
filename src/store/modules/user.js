import { login, authorization } from '@/api/user'
import { setToken } from '@/api/util'


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
				if (res.code === 200 && res.data.token) {
					setToken(res.data.token)
					resolve()
				} else {
					reject(new Error('错误'))
				}
			}).catch(error => {
				reject(error)
			})
		})
	},
	authorization ({ commit }, token) {
		authorization().then(res => {
			return new Promise((resolve, reject) => {
				if (parseInt(res.code) === 401) {
					reject(new Error('token error'))
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