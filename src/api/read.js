import axios from './index'

export const searchKinds = (kinds, start, numbers) => {
	const url = `/read/searchKinds?kinds=${kinds}&start=${start}&numbers=${numbers}`
	return axios.request({
		url,
		method: 'get'
	})
}

export const addArticle = ({title, introduction, cover_image, author, content, created, views, kinds}) => {
	return axios.request({
		url: '/read/addArticle',
		method: 'post',
		data: {
			title,
			introduction,
			cover_image,
			author,
			content,
			created,
			views,
			kinds
		}
	})
}

export const searchId = (id) => {
	const url = `/read/searchId?id=${id}`
	return axios.request({
		url,
		method: 'get'
	})
}