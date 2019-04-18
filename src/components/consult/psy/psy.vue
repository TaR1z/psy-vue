<template>
	<div class="psy-wrapper-info">
		<div class="top-img" :style="{ background: `url(${topBgd}) center -220px no-repeat`}"></div>
		<div class="mid-content-wrapper">
			<div class="mid-content">
				<div class="top-person">
					<div class="l-avatar">
						<img :src="psyInfo.avatar">
					</div>
					<div class="r-intro">
						<div class="person-title">
							{{ psyInfo.username }}
							<span class="tag">硕士</span>
							<p>
								洛阳理工学院心理学毕业 / 北京大学心理学硕士
							</p>
						</div>
						<div class="bottom-content">
							<div class="l-info">
								<div class="info-item">
									<p class="label">
										在洛理服务过
									</p>
									<p class="cont">
										<span class="bold">{{ psyInfo.id * 11 }}</span>人
									</p>
								</div>
								<div class="info-item">
									<p class="label">
										收到感谢信
									</p>
									<p class="cont">
										<span class="bold">{{ psyInfo.id * 9 }}</span>封
									</p>
								</div>
								<div class="info-item">
									<p class="label">
										所在地
									</p>
									<p class="cont">
										<span class="bold">洛阳市</span>
									</p>
								</div>
							</div>
							<div class="r-btn">
								<Button shape="circle" icon="ios-mail" type="primary"  class="sx-btn" size="large" @click="handleSubmit">私信</Button>
							</div>
						</div>
					</div>
				</div>
				<div class="mid-into" v-if="psyInfo.description">
					<div class="item-info">
						<div class="l-icon">
							<Icon type="logo-reddit" size="85" style="color: indianred;"/>
						</div>
						<div class="r-cont">
							<h1 style="margin-bottom: 20px;">
								认证资质
								<span style="font-size: 15px; font-weight: 400; color: #888;" >从业十年</span>
							</h1>
							<p>国家二级咨询师</p>
							<p>硕士学位证书</p>
							<p>硕士毕业证书</p>
						</div>
					</div>
					<div class="item-info">
						<div class="l-icon">
							<Icon type="ios-checkmark-circle-outline" size="85" style="color:green;"/>
						</div>
						<div class="r-cont">
							<h1 style="margin-bottom: 20px;">
								擅长方向
							</h1>
							<p>心理科普</p>
							<p>家庭关系</p>
							<p>人际关系</p>
						</div>
					</div>
					<div class="item-info">
						<div class="l-icon">
							<Icon type="md-bulb" size="85" style="color: orange;"/>
						</div>
						<div class="r-cont">
							<h1 style="margin-bottom: 20px;">
								个人签名
							</h1>
							<p class="p-intro">
								{{ psyInfo.description }}
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
		</div>
	</div>
</template>

<script>
	import { getToken } from '@/lib/util'
	import { mapActions, mapState } from 'vuex'
	export default {
		created () {
			const id = this.$route.query.id
			this.searchPsyInfo({id}).then(res => {
				this.psyInfo = res.data
			})
		},
		data () {
			return {
				topBgd: require('@/assets/img/consult/miku.jpg'),
				psyInfo: {},
				letterValue: ''
			}
		},
		methods: {
			...mapActions([
					'searchPsyInfo',
					'sendLetter'
				]),
			handleSubmit () {
				if (getToken() && getToken() != 'undefined') {
					if (this.psyInfo.account == this.account) {
						this.$Notice.error({
							title: '警告：',
							desc: '不能对自己发私信！',
							duration: 3
						})
					} else {
						this.letterValue = ''
						this.$Modal.confirm({
							render: h => h('Input', {
								attrs: {
									type: 'textarea'
								},
								props: {
									rows: 8,
									autofocus: true,
									placeholder: '请输入你的悄悄话...'
								},
								on: {
									input: (val) => {
										this.letterValue = val
									}
								}
							}),
							onOk: () => {
								this.letterValue = this.letterValue.replace(/\s*/g,'')
								if (!this.letterValue.replace(/\s*/g,'')) {
									this.$Message.error('内容不能为空！')
								} else {
									const created = this.$moment(new Date().getTime()).format('YYYY-MM-DD')
									this.sendLetter({
										from_account: this.account,
										from_avatar: this.avatar,
										from_name: this.nickName,
										to_account: this.psyInfo.account,
										to_avatar: this.psyInfo.avatar,
										to_name: this.psyInfo.username,
										content: this.letterValue,
										created
									}).then(res => {
										this.$Message.success(res.mes)
									}).catch(err => {
										this.$Message.error(err.mes)
									})
								}
							}
						})
					}
				} else {
					this.$Notice.warning({
						title: '警告：',
						desc: '请先登录账号！',
						duration: 3
					})
				}
			}
		},
		computed: {
			...mapState({
				account: state => state.user.account,
				nickName: state => state.user.nickName,
				avatar: state => state.user.avatarUrl
			})
		}
	}
</script>

<style lang='less' scoped>
	.psy-wrapper-info {
		position: relative;
		top: 0;
		left: 0;

		.top-img {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 300px;
		}
		.mid-content-wrapper {
			position: absolute;
			top: 300px;
			left: 0;
			width: 100%;

			.mid-content {
				position: relative;
				top: 0;
				left: 0;
				width: 1200px;
				height: 100%;
				margin: 0 auto;

				& > .top-person {
					position: absolute;
					top: -120px;
					left: 0;
					padding: 20px 0px;
					height: 240px;
					width: 100%;
					

					& > .l-avatar {
						float: left;
						height: 200px;
						width: 200px;

						& > img {
							height: 100%;
							width: 100%;
							object-fit: cover;
							border: 3px solid rgba(255,255,255,.3);
							border-radius: 6px;
						}
					}

					& > .r-intro {
						float: right;
						height: 100%;
						width: calc(~"100% - 200px");
						padding-left: 25px;

						& > .person-title {
							font-size: 35px;
							color: #fff;
							font-weight: 400;

							& > .tag {
								position: relative;
								top: -6px;
								left: 10px;
								display: inline-block;
								width: 50px;
								height: 25px;
								font-size: 14px;
								line-height: 25px;
								text-align: center;
								background-color: #f55e6d;
							}

							& > p {
								margin-top: 10px;
								font-size: 16px;
							}
						}

						& > .bottom-content {
							margin-top: 20px;
							padding-top: 25px;
							height: 90px;

							& > .l-info {
								float: left;
								height: 100%;
								margin-left: 25px;

								& > .info-item {
									display: inline-block;
									margin-right: 80px;
									& > .label {
										font-size: 14px;
										color: #999;
									}

									& > .cont {
										height: 45px;
										line-height: 54px;
										font-size: 16px;
										color: #666;

										& > .bold {
											font-size: 34px;
											color: #0b8bff;
											margin-right: 3px;
										}
									}
								}
							}

							& > .r-btn {
								float: right;
								margin-top: 13px;

								& > .sx-btn{
									font-size: 20px;
									width: 140px;
									height: 50px;
								}
							}
						}
					}
				}

				& > .mid-into {
					position: relative;
					width: 100%;
					top: 200px;
					border-top: 2px solid #0b8bff;

					& > .item-info {
						width: 100%;
						padding: 20px 0px 0px 20px;
						height: 200px;

						& > .l-icon {
							float: left;
							width: 200px;
							text-align: center;
						}

						& > .r-cont {
							float: left;
							width: calc(~"100% - 200px");
							padding-bottom: 20px;
							height: 100%;
							border-bottom: 1px solid #ccc;

							& > p {
								font-size: 16px;
							}

							& > .p-intro {
								display: -webkit-box;
								-webkit-box-orient: vertical;
								overflow: hidden;
								-webkit-line-clamp: 3;
							}
						}
					}
				}
			}
		}
	}
</style>