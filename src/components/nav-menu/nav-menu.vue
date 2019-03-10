<template>
	<nav>
		<Menu mode="horizontal" @on-select="turnUrl" theme="light" :active-name="currentPath">
			<div class="layout-nav" :style="{ width: `${listdata.length * 100}px` }">
				<Menu-item v-for="item in listdata" :name="item.path">
					<Icon :type="item.icon"></Icon>
					{{ item.name }}
				</Menu-item>
			</div>
		</Menu>
	</nav>
</template>

<script>
	export default {
		name: 'navMenu',
		props: {
			listdata: {
				type: Array,
				required: true
			},		
		},
		mounted () {
			this.currentPath = this.$route.path
		},
		data () {
			return {
				currentPath: ''
			}
		},
		watch: {
			$route(to, from) {
				if (!from.name) this.currentPath = to.path
			}
		},
		methods: {
			turnUrl (Path) {
				this.$router.push(Path)
			}
		}
	}
</script>

<style lang="less" scoped>
.layout-nav {
	height: 60px;
	margin: 0 auto;
}
</style>