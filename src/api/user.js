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
		url: '/register',
		method: 'post',
		data: {
			userName,
			password,
			identify
		}
	})
}

export const personInfo = () => {
	return axios.request({
		url: '/personInfo',
		method: 'get'
	})
}

export const updatePersonInfo = ({nickname, username, age, gender, description}) => {
	return axios.request({
		url: '/updatePersonInfo',
		method: 'post',
		data: {
			nickname,
			username,
			age,
			gender,
			description
		}
	})
}