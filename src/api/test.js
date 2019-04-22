import axios from './index'

export const testList = () => {
	return axios.request({
		url: '/test/testList',
		method: 'get'
	})
}

export const question = (title) => {
	return axios.request({
		url: `/test/question?title=${title}`,
		method: 'get'
	})
}

export const addHealth = ({score, title}) => {
	return axios.request({
		url: '/test/addHealth',
		method: 'post',
		data: {
			score,
			title
		}
	})
}