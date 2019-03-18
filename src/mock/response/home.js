import Mock from 'mockjs'
const Random = Mock.Random
export const getHomeRead = (option) => {
	var template = []
	for (var i = 0; i < 6; i++) {
		template.push({
			'id|1-100': 1,
			'name': 'read',
			'url': Random.dataImage(),
			'title': Random.ctitle(3, 8),
			'content': Random.cparagraph(1, 4)
		})
	}
	return Mock.mock(template)
}

export const getHomeConsult = (option) => {
	var template = []
	for (var i = 0; i < 4; i++) {
		template.push({
			'id|1-100': 1,
			'name': 'consult',
			'url': Random.dataImage(),
			'title': Random.ctitle(3, 8)
		})
	}
	return Mock.mock(template)
}

export const getHomeTest = (option) => {
	var template = []
	for (var i = 0; i < 3; i++) {
		template.push({
			'id|1-100': 1,
			'name': 'test',
			'url': Random.dataImage(),
			'description': Random.cparagraph(2, 4)
		})
	}
	return Mock.mock(template)
}