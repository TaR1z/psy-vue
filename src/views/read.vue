<!-- 阅读页面 -->
<template>
	<div class="wrapper">
		<BackTop></BackTop>
		<div class="contanier">
			<article-info v-if="articleNumber"></article-info>
			<home v-else></home>
		</div>
	</div>
</template>

<script>
	import Home from '_c/read/home'
	import ArticleInfo from '_c/read/article'
	export default {
		name: 'read',
		data () {
			return {
				articleNumber: ''
			}
		},
		components: {
			Home,
			ArticleInfo
		},
		beforeRouteEnter (to, from, next) {
			next(vm => {
				vm.articleNumber = vm.$route.query.id
			})
		},
		beforeRouteUpdate (to, from, next) {
			this.articleNumber = to.query.id
			next()
		}
	}
</script>

<style lang="less" scoped>
	.wrapper {
		width: 800px;
		margin: 0 auto;

		.contanier {
			margin-top: 20px;
			padding: 30px 30px 0px;
			background-color: #fff;
			border-radius: 12px;
		}
	}
</style>