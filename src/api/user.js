import axios from './index'

export const login = ({ userName, password }) => {
	return axios.request({
		url: '/login',
		method: 'post',
		data: {
			userName,
			password
		}
	})
}

export const register = ({ userName, password, identify }) => {
	return axios.request({
		url: '/users/register',
		method: 'post',
		data: {
			userName,
			password,
			identify
		}
	})
}