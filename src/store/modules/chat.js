import { chatsAll, changeStatus } from '@/api/chat'

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
	chatsAll ({commit}) {
		return new Promise((resolve, reject) => {
			chatsAll().then(res => {
				if (res.code == 200) {
					resolve(res)
				} else {
					reject(res)
				}
			}).catch(err => {
				reject(err)
			})
		})
	},
	changeStatus ({commit}, {id}) {
		return new Promise((resolve, reject) => {
			changeStatus(id).then(res => {
				if (res.code == 200) {
					resolve(res)
				} else {
					reject(res)
				}
			}).catch(err => {
				reject(err)
			})
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