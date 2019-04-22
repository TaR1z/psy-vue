import { testList, question, addHealth } from '@/api/test'


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
	testList () {
		return new Promise((resolve, reject) => {
			testList().then(res => {
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
	questionArr ({commit}, {title}) {
		return new Promise((resolve, reject) => {
			question(title).then(res => {
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
	addHealth ({commit}, {score, title}) {
		return new Promise((resolve, reject) => {
			addHealth({score, title}).then(res => {
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