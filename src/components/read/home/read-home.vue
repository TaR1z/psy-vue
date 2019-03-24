<template>
	<div ref='wrapper'>
		<Tabs type="card">
			<TabPane label="全部"><list  :articleAll="articleAll"></list></TabPane>
			<TabPane label="心理科普">标签二的内容</TabPane>
			<TabPane label="家庭关系">标签三的内容</TabPane>
			<TabPane label="人际关系">标签三的内容</TabPane>
		</Tabs>
	</div>
</template>

<script>
	import { readAll } from '@/api/readInfo'
	import List from '_c/list'
	export default {
		data () {
			return {
				articleAll: []
			}
		},
		created () {
			readAll().then(res => {
				this.articleAll = res.data
			})
		},
		mounted () {
			this.$nextTick(() => {
				//
			})
		},
		components: {
			List
		}
	}
</script>

<style lang="less" scoped>
	
</style>