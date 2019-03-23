<template>
	<nav>
		<Menu mode="horizontal" @on-select="turnUrl" theme="light" :active-name="currentPath">
			<div class="layout-nav" :style="{ width: `${listdata.length * 100}px` }">
				<Menu-item v-for="item in listdata" :key="item.key" :name="item.path">
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
			}
		},
		computed: {
			currentPath () {
				return this.$route.path
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
nav {
	z-index: 999;
}

.layout-nav {
	height: 60px;
	margin: 0 auto;
	li {
		font-size: 16px;
	}
}
</style>