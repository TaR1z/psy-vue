import { addArticle, searchKinds, searchId } from '@/api/read'


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
	addArticle ({ commit }, {title, introduction, cover_image, author, content, created, views, kinds}) {
		return new Promise((resolve, reject) => {
			addArticle({title, introduction, cover_image, author, content, created, views, kinds}).then(res => {
				if (res.code == 200) {
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
	searchKinds ({ commit }, {kinds, start, numbers}) {
		return new Promise((resolve, reject) => {
			searchKinds(kinds, start, numbers).then((res) => {
				if (res.code == 200) {
					resolve(res)
				} else {
					reject({
						code: res.code,
						mes: res.mes
					})
				}
			}).catch(error => {
				reject(error)
			})
		})
	},
	searchId ({commit}, {id}) {
		return new Promise((resolve, reject) => {
			searchId(id).then((res) => {
				if (res.code == 200) {
					resolve(res)
				} else {
					reject({
						code: res.code,
						mes: res.mes
					})
				}
			}).catch(error => {
				reject(error)
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