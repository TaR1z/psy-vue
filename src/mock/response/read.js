import Mock from 'mockjs'
const Random = Mock.Random
export const getReadAll = (option) => {
	var template = []
	for (var i = 0; i < 10; i++) {
		template.push({
			'id|1-10000': 1,
			'name': 'read',
			'url': Random.dataImage(),
			'title': Random.ctitle(3, 8),
			'content': Random.cparagraph(1, 4),
			'author': Random.cname(),
			'date': Random.date('yyyy-MM-dd'),
			'times|2000-1000000': 1

		})
	}
	return Mock.mock(template)
}