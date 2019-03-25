<template>
	<div>
		<nav-menu style="position: fixed; width: 100%;" :listdata="navListData"></nav-menu>     
		<router-view style="padding-top: 60px;" />
	</div>
</template>

<script>
	import NavMenu from '_c/nav-menu'
	export default {
		name: 'App',
		data () {
			return {
				navListData: [
				{
					'id': 1,
					'name': '首页',
					'icon': 'ios-home',
					'path': '/home'
				},
				{
					'id': 2,
					'name': '阅读',
					'icon': 'ios-paper',
					'path': '/read'
				},
				{
					'id': 3,
					'name': '咨询',
					'icon': 'ios-heart',
					'path': '/consult'
				},
				{
					'id': 4,
					'name': '测试',
					'icon': 'ios-calendar',
					'path': '/test'
				},
				{
					'id': 5,
					'name': '登录',
					'icon': 'ios-person',
					'path': '/login'
				}
				]
			}
		},
		components: {
			NavMenu
		}
	}
</script>

<style lang="less">
	html, body {
		background-color: #f3f4f5 !important;
		overflow-x: hidden;
	}
</style>


