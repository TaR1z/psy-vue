import axios from './index'

export const chatsAll = () => {
	return axios.request({
		url: '/chat/all',
		method: 'get'
	})
}

export const changeStatus = (id) => {
	const url = `/chat/updateStatus?id=${id}`
	return axios.request({
		url,
		method: 'get'
	})
}