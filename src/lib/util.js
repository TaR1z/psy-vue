import Cookies from 'js-cookie'

export const setToken = (token, tokenName = 'token') => {
	Cookies.set(tokenName, token)
}

export const getToken = (tokenName = 'token') => {
	return Cookies.get(tokenName)
}

export const authorization = () => {
	return axios.request({
		url: '/users/authorization'  // 判断token真伪
	})
}