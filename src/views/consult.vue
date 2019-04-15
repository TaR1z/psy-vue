<!-- 咨询页面 -->
<template>
	<div>
		<BackTop></BackTop>
		<psy v-if="psyNumber"></psy>
		<home v-else></home>
	</div>
</template>

<script>
	import Psy from '_c/consult/psy'
	import Home from '_c/consult/home'
	export default {
		name: 'consult',
		data () {
			return {
				psyNumber: ''
			}
		},
		components: {
			Home,
			Psy
		},
		beforeRouteEnter (to, from, next) {
			next(vm => {
				vm.psyNumber = vm.$route.query.id
			})
		},
		beforeRouteUpdate (to, from, next) {
			this.psyNumber = to.query.id
			next()
		}
	}
</script>

<style lang="less" scoped></style>