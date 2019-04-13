<template>
	<div id="app">
		<nav-menu style="position: fixed; width: 100%;"></nav-menu>     
		<router-view style="padding-top: 60px;" />
	</div>
</template>

<script>
	import NavMenu from '_c/nav-menu'
	export default {
		name: 'App',
		components: {
			NavMenu
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


