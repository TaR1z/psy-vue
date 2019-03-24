import axios from './index'

export const homeReadPsy = () => {
	return axios.request({
		url: '/homeRead',
		method: 'get',
		data: {
			classify: 'psychology'
		}
	})
}

export const homeReadFamily = () => {
	return axios.request({
		url: '/homeRead',
		method: 'get',
		data: {
			classify: 'family'
		}
	})
}

export const homeReadRelationship = () => {
	return axios.request({
		url: '/homeRead',
		method: 'get',
		data: {
			classify: 'Relationship'
		}
	})
}

export const homeConsult = () => {
	return axios.request({
		url: '/homeConsult',
		method: 'get'
	})
}

export const homeTest = () => {
	return axios.request({
		url: '/homeTest',
		method: 'get'
	})
}