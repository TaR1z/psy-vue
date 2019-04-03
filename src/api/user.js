import axios from './index'

export const login = ({ userName, password }) => {
	return axios.request({
		url: '/index/login',
		method: 'post',
		data: {
			userName,
			password
		}
	})
}