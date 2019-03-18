<!-- 首页页面 -->
<template>
	<div>
		<BackTop></BackTop>
		<home-carousel></home-carousel>
		<div class="contanier contanier-read">
			<div class="article">
				<Tabs :animated="false"  @on-click='tabIndex'>
					<TabPane label="心理科普">
						<read-content :readList="homeReadPsyList"></read-content>
					</TabPane>
					<TabPane label="家庭关系">
						<read-content :readList="homeReadFamilyList"></read-content>
					</TabPane>
					<TabPane label="人际关系">
						<read-content :readList="homeReadRelationshipList"></read-content>
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
				<user-consult :userList="homeConsultList"></user-consult>
			</div>
		</div>
		<div class="contanier contanier-test">
			<div class="test">
				<div class="main-title">
					<router-link to="consult" tag="span" class="xinli-answer">心理测试</router-link>
					<span class="sub-title">认识自己 了解他人</span>
				</div>
				<test-content :testList="homeTestList"></test-content>
			</div>
		</div>
		<footer>
			<p>Copyright © 2019 &nbsp; TaR1z</p>
		</footer>
	</div>
</template>

<script>
	import HomeCarousel from '_c/carousel'
	// 阅读（数据）
	import ReadContent from '_c/read-content'
	// 咨询 （数据）
	import UserConsult from '_c/user-consult'
	// 测试 （数据）
	import TestContent from '_c/test-content'
	// 模拟请求
	import { homeReadPsy, homeReadFamily, homeReadRelationship, homeConsult, homeTest } from '@/api/homeInfo'
	export default {
		name: 'home',
		created () {
			homeReadPsy().then(res => {
				this.homeReadPsyList = res.data
			}),
			homeReadFamily().then(res => {
				this.homeReadFamilyList = res.data
			}),
			homeReadRelationship().then(res => {
				this.homeReadRelationshipList = res.data
			}),
			homeConsult().then(res => {
				this.homeConsultList = res.data
			}),
			homeTest().then(res => {
				this.homeTestList = res.data
			})

		},
		data () {
			return {
				homeReadPsyList: [],
				homeReadFamilyList: [],
				homeReadRelationshipList: [],
				homeConsultList: [],
				homeTestList: []
			}
		},
		components: {
			HomeCarousel,
			ReadContent,
			UserConsult,
			TestContent
		},
		methods: {
			tabIndex (name) {
				if (name === 3) {
					this.$router.push({name: 'read'})
				}
			}
		}
	}
</script>

<style lang="less" scoped>

	@media screen and (max-width: 980px) { 
		.contanier-read {
			height: 960px !important;
		}

		.contanier-consult {
			height: 860px !important;
		}

		.contanier-test {
			height: 1300px !important;
		}
	}

	.contanier {
		margin-top: 50px;
		height: 500px;
		.article {
			width: 980px;
			height: 100%;
			margin: 0 auto;
		}
	}

	.container-gray {
		background-color: #f3f4f5;
	}

	.contanier {
		.consult {
			height: 100%;
			width: 980px;
			margin: 0 auto;
			padding: 50px 0 20px;
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