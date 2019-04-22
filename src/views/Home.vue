<!-- 首页页面 -->
<template>
	<div class="wrapper-home">
		<BackTop></BackTop>
		<carousel></carousel>
		<div class="contanier contanier-read">
			<div class="article">
				<Tabs :animated="false"  @on-click='tabIndex'>
					<TabPane label="心理科普">
						<read-content :readList="article.psy.content"></read-content>
					</TabPane>
					<TabPane label="家庭关系">
						<read-content :readList="article.family.content"></read-content>
					</TabPane>
					<TabPane label="人际关系">
						<read-content :readList="article.relation.content"></read-content>
					</TabPane>
					<TabPane label="更多分类"></TabPane>
				</Tabs>
			</div>
		</div>
		<div class="contanier container-gray contanier-consult">
			<div class="consult">
				<div class="main-title">
					<router-link to="consult" tag="span" class="xinli-answer">心理咨询</router-link>
					<span class="sub-title">没有人是一座孤岛，每个人都需要心理咨询</span>
				</div>
				<user-consult :userList="psyList"></user-consult>
			</div>
		</div>
		<div class="contanier contanier-test">
			<div class="test">
				<div class="main-title">
					<router-link to="consult" tag="span" class="xinli-answer">心理测试</router-link>
					<span class="sub-title">认识自己 了解他人</span>
				</div>
				<test-content :testArr="testArr"></test-content>
			</div>
		</div>
		<footer>
			<p>Copyright © 2019 &nbsp; TaR1z</p>
		</footer>
	</div>
</template>

<script>
	import Carousel from '_c/home/carousel'
	import ReadContent from '_c/home/read-content'
	import TestContent from '_c/home/test-content'
	import UserConsult from '_c/home/user-consult'
	import { mapActions } from 'vuex'
	export default {
		name: 'home',
		created () {
			this.articleUpload()
			this.psyUpload()
			this.testUpload()
		},
		data () {
			return {
				selectName: 'psy',
				article: {
					psy: {
						kinds: '心理科普',
						numbers: 6,
						start: 0,
						content: []
					},
					family: {
						kinds: '家庭关系',
						numbers: 6,
						start: 0,
						content: []
					},
					relation: {
						kinds: '人际关系',
						numbers: 6,
						start: 0,
						content: []
					}
				},
				psyList: [],
				testArr: [],
			}
		},
		components: {
			Carousel,
			ReadContent,
			UserConsult,
			TestContent
		},
		methods: {
			...mapActions([
					'searchKinds',
					'searchUser',
					'testList'
				]),
			tabIndex (name) {
				switch (name) {
					case 0:
					this.selectName = 'psy'
					break;
					case 1:
					this.selectName = 'family'
					let psyContent = this.article[this.selectName].content
					if (!psyContent.length) this.articleUpload()
						break;
					case 2:
					this.selectName = 'relation'
					let familyContent = this.article[this.selectName].content
					if (!familyContent.length) this.articleUpload()
						break;
					case 3:
					this.$router.push({name: 'read'})
					break;
				}
			},
			articleUpload () {
				let kinds = this.article[this.selectName].kinds
				let start = this.article[this.selectName].start
				let numbers = this.article[this.selectName].numbers
				let content = this.article[this.selectName].content
				this.searchKinds({kinds, start, numbers}).then(res => {
					let resLength = Object.keys(res.data).length
					this.article[this.selectName].content = content.concat(res.data)
					this.article[this.selectName].start += resLength 
				}).catch(err => {
					//
				})
			},
			psyUpload () {
				let username = ''
				let start = 0
				let numbers = 4
				this.searchUser({ username, start, numbers }).then(res => {
					this.psyList = this.psyList.concat(res.data)
				})
			},
			testUpload () {
				this.testList().then(res => {
					if (res.data.length > 3) {
						for (let i = 0; i < 3; i ++) {
							this.testArr = res.data[i]
						}
					} else {
						this.testArr = res.data
					}
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	.contanier {
		width: 100%;
		padding-top: 30px;
		height: 580px;
		background-color: #fff;
		.article {
			width: 980px;
			height: 100%;
			margin: 0 auto;
		}
	}

	.container-gray {
		height: 500px;
		background-color: #f3f4f5;
	}

	.contanier-test {
		height: 520px;
	}

	.contanier {
		.consult {
			height: 100%;
			width: 980px;
			margin: 0 auto;
			padding-top: 20px;
		}
		
		.test {
			height: 100%;
			width: 980px;
			margin: 0 auto;
			padding-bottom: 20px;
		}
		.main-title {
			margin-bottom: 30px;

			.xinli-answer {
				font-size: 24px;
				color: #0b8bff;
				line-height: 28px;
				margin-right: 14px;
				cursor: pointer;
			}

			.sub-title {
				font-size: 16px;
				color: #999;
				line-height: 18px;
			}
		}
	}

	footer {
		height: 80px;
		background-color: #666;

		p {
			color: #ccc;
			text-align: center;
			font-size: 15px;
			line-height: 80px;
		}
	}
</style>