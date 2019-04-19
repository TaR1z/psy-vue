export const classify = (chatArr, userAccount) => {
	const chat = chatArr
	const len = chatArr.length
	var res = {}
	for (let i = 0; i < len; i ++) {
		if (chat[i]['from_account'] == userAccount) {
			let name = chat[i]['to_account']
			if (res[name]) {
				res[name].push(chat[i])
			} else {
				res[name] = []
				res[name].push(chat[i])
			}
		} else {
			let name = chat[i]['from_account']
			if (res[name]) {
				res[name].push(chat[i])
			} else {
				res[name] = []
				res[name].push(chat[i])
			}
		}
	}
	return res
}