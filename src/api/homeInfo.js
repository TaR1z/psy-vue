import axios from './index'

export const homeReadPsy = () => {
	return axios.request({
		url: '/homeRead',
		method: 'post',
		data: {
			classify: 'psychology'
		}
	})
}

export const homeReadFamily = () => {
	return axios.request({
		url: '/homeRead',
		method: 'post',
		data: {
			classify: 'family'
		}
	})
}

export const homeReadRelationship = () => {
	return axios.request({
		url: '/homeRead',
		method: 'post',
		data: {
			classify: 'Relationship'
		}
	})
}

export const homeConsult = () => {
	return axios.request({
		url: '/homeConsult',
		method: 'post'
	})
}

export const homeTest = () => {
	return axios.request({
		url: '/homeTest',
		method: 'post'
	})
}