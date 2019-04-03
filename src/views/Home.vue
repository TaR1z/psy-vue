<!-- 首页页面 -->
<template>
	<div>
		<BackTop></BackTop>
		<carousel></carousel>
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
	import Carousel from '_c/home/carousel'
	// 阅读（数据）
	import ReadContent from '_c/home/read-content'
	// 咨询 （数据）
	import UserConsult from '_c/home/user-consult'
	// 测试 （数据）
	import TestContent from '_c/home/test-content'
	// 模拟请求
	import { homeReadPsy, homeReadFamily, homeReadRelationship, homeConsult, homeTest } from '@/api/homeInfo'
	export default {
		name: 'home',
		created () {
			homeReadPsy().then(res => {
				this.homeReadPsyList = res
			}),
			homeReadFamily().then(res => {
				this.homeReadFamilyList = res
			}),
			homeReadRelationship().then(res => {
				this.homeReadRelationshipList = res
			}),
			homeConsult().then(res => {
				this.homeConsultList = res
			}),
			homeTest().then(res => {
				this.homeTestList = res
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
			Carousel,
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
			height: 1020px !important;
		}

		.contanier-consult {
			height: 860px !important;
		}

		.contanier-test {
			height: 1340px !important;
		}
	}

	@media screen and (max-width: 500px) { 
		.contanier-consult {
			height: 1550px !important;
		}
	}
	
	.contanier {
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