<!-- 测试页面 -->
<template>
	<div>
		<BackTop></BackTop>
		<div class="test-contanier">
			<test-info v-if="testTitle"></test-info>
			<home v-else></home>
		</div>
	</div>
</template>

<script>
	import TestInfo from '_c/test/test-info'
	import Home from '_c/test/home'
	export default {
		name: 'test',
		data () {
			return {
				testTitle: ''
			}
		},
		components: {
			Home,
			TestInfo
		},
		beforeRouteEnter (to, from, next) {
			next(vm => {
				vm.testTitle = vm.$route.query.title
			})
		},
		beforeRouteUpdate (to, from, next) {
			this.testTitle = to.query.title
			next()
		}
	}
</script>

<style lang="less" scoped>
	.test-contanier {
		width: 100%;
		height: 100%;
	}
</style>