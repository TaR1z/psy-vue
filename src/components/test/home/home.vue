<template>
	<div class="test-home-wrapper">
		<div class="title">
			<Icon type="ios-book-outline" size="30" style="color: #666"></Icon>
			<span>免费</span>精选
		</div>
		<list :testArr="testArr"></list>
	</div>
</template>

<script>
	import List from '../list' 
	import { mapActions } from 'vuex'
	export default {
		data () {
			return {
				testArr: []
			}
		},
		created () {
			this.testList().then(res => {
				this.testArr = res.data
			})
		},
		components: {
			List
		},
		methods: {
			...mapActions([
					'testList'
				])
		}
	}
</script>

<style lang="less" scoped>
	.test-home-wrapper {
		margin: 20px auto;
		padding: 30px;
		width: 760px;
		background-color: #fff;
		border-radius: 12px;

		.title {
			font-size: 22px;
			color: #666;
			& > span {
				color: #ff3d3d;
				margin-left: 8px;
			}
		}
	}
</style>