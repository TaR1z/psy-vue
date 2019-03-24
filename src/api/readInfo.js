import axios from './index'

export const readAll = () => {
	return axios.request({
		url: '/readAll',
		method: 'get'
	})
}

export const readPsy = () => {
	return axios.request({
		url: '/readPsy',
		method: 'get',
		data: {
			classify: 'psychology'
		}
	})
}

export const readFamily = () => {
	return axios.request({
		url: '/readFamily',
		method: 'get',
		data: {
			classify: 'family'
		}
	})
}

export const readRelationship = () => {
	return axios.request({
		url: '/readRelationship',
		method: 'get',
		data: {
			classify: 'relationship'
		}
	})
}