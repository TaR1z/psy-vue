<template>
	<div class="test-info-wrapper">	
		<div class="test-info" v-if="question.length">
			<div class="page-wrapper" v-if="submitFlag">
				<h1>{{ question[0] && question[0].title }}</h1>
				<img :src="question[0] && question[0].image">
				<p>
					{{ question[0] && question[0].description }}
				</p>
				<Button type="success" style="height: 70px; font-size: 24px;" long @click="beginTest">开始测试</Button>
			</div>
			<div :class="{'problems-wrapper': true, 'animated': true, 'bounceInLeft': animateLeft, 'bounceInRight': animateRight }" v-else>
				<h2>{{index + 1}} / {{ question.length }}</h2>
				<h1>{{ index + 1 }}、{{ question[index].problem }}</h1>
				<div class="option-wrapper">
					<ul>
						<li @click="handleOption('A')">
							{{ question[index]['A'] }}
							<div :class="option == 'A' ? 'circle changeCircle' : 'circle'"></div>
						</li>
						<li @click="handleOption('B')">
							{{ question[index]['B'] }}
							<div :class="option == 'B' ? 'circle changeCircle' : 'circle'"></div>
						</li>
						<li @click="handleOption('C')">
							{{ question[index]['C'] }}
							<div :class="option == 'C' ? 'circle changeCircle' : 'circle'"></div>
						</li>
					</ul>
				</div>
				<Button type="success" style="height: 50px; width: 30%; font-size: 16px; position: absolute; left: 40px; bottom: 0px;" @click="perStep" v-if="index > 0">上一题</Button>
				<Button type="success" style="height: 50px; width: 30%; font-size: 16px; position: absolute; right: 40px; bottom: 0px;" @click="handleSubmit" v-if="index == (question.length - 1)">提交</Button>
			</div>
		</div>
	</div>
</template>

<script>
	import { getToken } from '@/lib/util'
	import { mapState, mapActions } from 'vuex'
	export default {
		data () {
			return {
				question: [],
				submitFlag: true,
				option: '',
				userOption: [],
				userScore: [],
				index: 0,
				animateLeft: false,
				animateRight: false
			}
		},
		created () {
			const title = this.$route.query.title
			this.questionArr({title}).then(res => {
				this.question = res.data
			})
		},
		computed: {
			...mapState({
				identify: state => state.user.identify
			})
		},
		methods: {
			...mapActions([
					'questionArr',
					'addHealth'
				]),
			beginTest () {
				const token = getToken()
				if (token) {
					if (this.identify == 'student') {
						this.submitFlag = false
					} else {
						this.$Message.error('你目前身份为咨询师，不能进行测试！')
					}
				} else {
					this.$Message.warning('请先登录账号！')
				}
			},
			handleOption (option) {
				this.animateLeft = false
				this.animateRight = false
				if (this.index !== (this.question.length - 1)) {
					setTimeout(() => {
						this.animateLeft = true
						this.userOption[this.index] = option
						this.userScore[this.index] = this.question[this.index][option + '_score']
						this.index ++
						this.option = this.userOption[this.index]
						if (this.index === (this.question.length - 1)) {
							this.option = this.userOption[this.index]
							this.userOption[this.index] = option
							this.userScore[this.index] = this.question[this.index][option + '_score']
						}
					}, 100)
				} else {
					this.option = option
					this.userOption[this.index] = option
					this.userScore[this.index] = this.question[this.index][option + '_score']
				}
			},
			perStep () {
				this.animateLeft = false
				this.animateRight = false
				setTimeout(() => {
					this.animateRight = true
					this.index --
					this.option = this.userOption[this.index]
				}, 100)
			},
			handleSubmit () {
				this.addHealth({
					score: this.userScore.join(),
					title: this.question[0].title
				}).then(res => {
					this.$Message.success(res.mes)
					this.$router.push({
						path: '/user/person'
					})
				}).catch(err => {
					this.$Message.error(err.mes)
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	.test-info-wrapper {
		width: 100%;
		height: 100%;

		.test-info {
			text-align: center;
			margin: 35px auto;
			width: 650px;
			height: 700px;
			padding: 20px 40px;
			background-color: #fff;
			border-radius: 12px;
			overflow: hidden;
			box-shadow: 1px 1px 6px 2px rgba(0, 0, 0, 0.3);
			
			& .page-wrapper > h1 {
				white-space: nowrap;  
				text-overflow:	ellipsis; 
				overflow: hidden;
			}

			& .page-wrapper > img {
				margin: 20px 0px;
				width: 100%;
				height: 400px;
				object-fit: cover;
			}

			& .page-wrapper > p {
				font-size: 14px;
				line-light: 1.4em;
				display: -webkit-box;
				-webkit-line-clamp: 3;
				-webkit-box-orient: vertical;
				overflow: hidden;
				word-wrap: break-word;
				color: #999;
				margin-bottom: 30px;
				text-align: left;
			}

			& .problems-wrapper {
				position: relative;
				left: 0;
				top: 0;
				padding: 40px;
				text-align: left;
				user-select: none;

				& > h1 {
					width: 100%;
					height: 80px;
					overflow: auto;
					word-wrap: break-word;
				}

				& > h2 {
					position: absolute;
					right: 0;
					top: 0;
					margin-bottom: 20px;
					text-align: right;
					color: #ccc;
				}

				.option-wrapper {
					margin: 50px auto 20px;
					width: 100%;
					height: 350px;
					
					& > ul {
						height: 300px;
						overflow: auto;
					}


					& > ul > li {
						position: relative;
						top: 0;
						left: 0;
						padding: 30px 80px 30px 0px;
						border-bottom: 1px solid #ccc;
						list-style: none;
						font-size: 25px;

						& .circle {
							position: absolute;
							top: 32px;
							right: 25px;
							width: 30px;
							height: 30px;
							border-radius: 50%;
							border: 4px solid #ffdd2b;
						}

						& .changeCircle {
							background-color: #ffdd2b;
						}
					}
				}
			}
		}
	}
</style>