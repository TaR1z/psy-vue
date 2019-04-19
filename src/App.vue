<template>
	<div id="app">
		<nav-menu style="position: fixed; width: 100%;"></nav-menu>     
		<router-view style="padding-top: 60px;" />
	</div>
</template>

<script>
	import { mapMutations, mapState } from 'vuex'
	import NavMenu from '_c/nav-menu'
	export default {
		name: 'App',
		data () {
			return {			
				//
			}
		},
		provide () {
			return {
				reload: this.reload
			}
		},
		components: {
			NavMenu
		},
		sockets: {
			privateLetters (res) {
				this.SET_LETTERNUMS(res)
			}
		},
		watch: {
			account (newName, oldName) {
				if (newName) {
					this.$socket.emit('getAccount', this.account)
				} else {
					this.$socket.emit('getAccount', false)
				}
			}
		},
		methods: {
			...mapMutations([
					'SET_LETTERNUMS'
				])
		},
		computed: {
			...mapState({
				account: state => state.user.account
			})
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

	.ivu-input {
		resize: none;
	}
</style>


