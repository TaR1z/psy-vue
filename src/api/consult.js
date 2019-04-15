import axios from './index'

export const searchUser = (username, start, numbers) => {
	const url = `/consult/searchUser?username=${username}&start=${start}&numbers=${numbers}`
	return axios.request({
		url,
		method: 'get'
	})
}

export const searchPsyInfo = (id) => {
	const url = `/consult/searchId?id=${id}`
	return axios.request({
		url,
		method: 'get'
	})
}