import { login, register } from '@/api/user'
import { setToken, authorization } from '@/lib/util'


const state = {
	nickName: '',
	identify: '',
	avatarUrl: ''
}

const getters = {
	//
}

const mutations = {
	SET_PERSON_INFO (state, params) {
		state.nickName = params.nickName,
		state.identify = params.identify,
		state.avatarUrl = params.avatarUrl
	},
	SET_NICK_NAME (state, params) {
		state.nickName = params
	},
	SET_IDENTIFY (state, params) {
		state.identify = params
	},
	SET_AVATARURL(state, params) {
		state.avatarUrl = params
	}
}

const actions = {
	login ({ commit }, { userName, password }) {
		return new Promise((resolve, reject) => {
			login({ userName, password }).then(res => {
				if (res.code == 200 && res.data.token) {
					setToken(res.data.token)
					commit('SET_PERSON_INFO', res.data)
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
					commit('SET_PERSON_INFO', res.data)
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
	authorization ({ commit }) {
		return new Promise((resolve, reject) => {
			authorization().then((res) => {
				if (res.data.code == 401) {
					reject({msg: '验证失败!'})
				} else {
					commit('SET_PERSON_INFO', res.data)
					setToken(res.data.token)
					resolve()
				}
			}).catch(error => {
				reject(error)
			})
		})
	},
	logout ({ commit }) {
		setToken('')
		commit('SET_PERSON_INFO', {
			nickName: '',
			identify: '',
			avatarUrl: ''
		})
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