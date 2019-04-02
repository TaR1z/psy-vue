import axios from './index'

export const login = ({ userName, password }) => {
	console.log(userName)
	console.log(password)
	return axios.request({
		url: '/index/login',
		method: 'post',
		data: {
			userName,
			password
		}
	})
}