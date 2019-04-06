<template>
	<div>
		<Tabs type="card" class="read-home-content">
			<TabPane label="全部"><list :articleAll="articleAll"></list></TabPane>
			<TabPane label="心理科普"><list :articleAll="articleAll"></list></TabPane>
			<TabPane label="家庭关系"><list :articleAll="articleAll"></list></TabPane>
			<TabPane label="人际关系"><list :articleAll="articleAll"></list></TabPane>
		</Tabs>
		<div class="demo-spin-container" v-if="loadingSign">
			<Spin fix>
				<Icon type="ios-loading" size=18 class="demo-spin-icon-load"></Icon>
				<div>加载中...</div>
			</Spin>
		</div>
		<div class="add-article">
			<Button @click="drawerSign = true" type="primary" size="large">
				<Icon type="md-create"></Icon>
			</Button>
		</div>
		<Drawer placement="left" title="添加文章" width="600" :mask-closable="true" v-model="drawerSign">
			<!--  -->
		</Drawer>
	</div>
</template>

<script>
	import { readAll } from '@/api/readInfo'
	import List from '_c/list'

	export default {
		data () {
			return {
				drawerSign: false,
				articleAll: [],
				loadingSign: true
			}
		},
		created () {
			this.loadData()
			this.$nextTick(() => {
				window.addEventListener('scroll', this.scrollEvent)
			})
		},
		methods: {
			loadData () {
				readAll().then(res => {
					this.articleAll = this.articleAll.concat(res)
				})
			},
			scrollEvent () {
				let windowHeight = window.innerHeight
				let scrollHeight = document.documentElement.scrollHeight
				let scrollTop = document.documentElement.scrollTop
				if (Math.ceil(scrollTop + windowHeight) >= scrollHeight) {
					this.loadData()
				}
			}
		},
		components: {
			List
		}
	}
</script>

<style lang="less" scoped>
    .demo-spin-container{
    	display: inline-block;
        width: 100%;
        height: 40px;
        position: relative;
    }
    .demo-spin-icon-load{
    	animation: ani-demo-spin 1s linear infinite;
    }
    @keyframes ani-demo-spin {
    	from { transform: rotate(0deg);}
    	50%  { transform: rotate(180deg);}
    	to   { transform: rotate(360deg);}
    }

    .add-article {
    	position: fixed;
    	bottom: 80px; 
    	right: 30px;

    	.ivu-btn-large {
    		padding: 8px 16px;
    	}
    }
</style>