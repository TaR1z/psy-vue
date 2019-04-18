import { searchUser, searchPsyInfo, sendLetter } from '@/api/consult'

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
	searchUser ({commit}, {username, start, numbers}) {
		return new Promise((resolve, reject) => {
			searchUser(username, start, numbers).then(res => {
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
	searchPsyInfo ({commit}, {id}) {
		return new Promise((resolve, reject) => {
			searchPsyInfo(id).then(res => {
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
	sendLetter ({commit}, {from_account, from_avatar, from_name, to_account, to_avatar, to_name, content, created}) {
		return new Promise((resolve, reject) => {
			sendLetter({from_account, from_avatar, from_name, to_account, to_avatar, to_name, content, created}).then(res => {
				if (res.code == 200) {
					resolve(res)
				} else {
					reject(res)
				}
			})
		}).catch(err => {
			reject(err)
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