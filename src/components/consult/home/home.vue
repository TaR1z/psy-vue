<template>
	<div class="consult-wrapper-home">
		<div class="consult-contanier-home">
			<div class="search-top">
				<Input v-model="searchKeyword.username" @on-search="handleSearch()" search enter-button placeholder="搜索专家的名字" size="large" />
			</div>
			<list :consult="psyList"></list>
			<div class="consult-spin" v-if="loadingSign">
				<Spin fix>
					<div>没有更多了...</div>
				</Spin>
			</div>
		</div>
	</div>
</template>

<script>
	import { mapActions } from 'vuex'
	import List from '../list'
	export default {
		data () {
			return {
				searchKeyword: {
					start: 0,
					numbers: 6,
					username: ''
				},
				psyList: [],
				loadingSign: false
			}
		},
		components: {
			List
		},
		created () {
			this.searchKeyword.start = 0
			this.loadData()
			this.$nextTick(() => {
				window.onscroll = this.scrollEvent
			})
		},
		methods: {
			...mapActions([
					'searchUser'
				]),
			handleSearch () {
				this.searchKeyword.start = 0
				this.psyList = []
				this.loadData()
			},
			scrollEvent () {
				let windowHeight = $(window).height()
				let scrollHeight = $(document).height()
				let scrollTop = $(document).scrollTop()
				if (scrollTop) {
					if (Math.ceil(scrollTop + windowHeight) >= scrollHeight) {
						this.loadData()
					}
				}
			},
			loadData () {
				let username = this.searchKeyword.username
				let start = this.searchKeyword.start
				let numbers = this.searchKeyword.numbers
				this.searchUser({username, start, numbers}).then((res) => {
					let resLength = Object.keys(res.data).length
					this.psyList = this.psyList.concat(res.data)
					this.searchKeyword.start += resLength 
					if (!resLength) this.loadingSign = true
				})
			}
		}
	}
</script>

<style lang='less'>
.consult-wrapper-home {
	width: 750px;
	margin: 0 auto;

	.consult-contanier-home {
		position: relative;
		padding: 30px 30px 50px;
		background-color: #fff;
		border-radius: 12px;
		margin: 20px 0px;

		.search-top {
			padding: 10px 45px;
			height: 50px;
		}
		
		& > .consult-spin {
			position: absolute;
			bottom: 15px;
			left: 0;
			width: 750px;
		}
	}
}
</style>