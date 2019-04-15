<template>
	<div id="app">
		<nav-menu style="position: fixed; width: 100%;"></nav-menu>     
		<router-view style="padding-top: 60px;" />
	</div>
</template>

<script>
	import { mapMutations } from 'vuex'
	import NavMenu from '_c/nav-menu'
	export default {
		name: 'App',
		components: {
			NavMenu
		},
		sockets: {
			privateLetters (nums) {
				this.SET_LETTERNUMS(nums)
			}
		},
		methods: {
			...mapMutations([
					'SET_LETTERNUMS'
				])
		}
	}
</script>

<style lang="less">
	html, body {
		background-color: #f3f4f5 !important;
		height: 100%;
	}

	#app {
	    height: 100%;
	}
</style>


