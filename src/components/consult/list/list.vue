<template>
	<div class="consult-content-home">
		<template v-for="item in consult">
			<Divider />
			<div class="consult-list" :key="item.id">
				<div class="img">
					<img :src="item.avatar">
				</div>
				<div class="text">
					<h2>
						<div class="l">
							{{ item.username }}
							<span>大学生心理咨询师 / 心理学硕士</span>
						</div>
						<div class="r">
							<Button type="success" class="list-btn" @click="handleSubmit(item.id)">咨询</Button>
						</div>
					</h2>
					<p>
						{{ item.description }}
					</p>
					<dl>
						<dd>
							<Icon type="ios-cafe" size="24"/>
							从业年限
							<span>10</span>
						</dd>
						<dd>
							<Icon type="ios-happy" size="24"/>
							好评率
							<span>100%</span>
						</dd>
						<dd>
							<Icon type="logo-usd" size="23"/>
							100.00 元/次
						</dd>
					</dl>
				</div>
			</div>
		</template>
	</div>
</template>

<script>
	export default {
		props: {
			consult: {
				type: Array,
				data () {
					return []
				}
			}
		},
		methods: {
			handleSubmit (id) {
				this.$router.push({
					path: `/consult?id=${id}`
				})
			}
		}
	}
</script>

<style lang="less">
.consult-content-home {
	& > .consult-list {
		transition: box-shadow 0.5s ease-in-out;
		padding: 15px;
		margin: 0 auto 15px;
		width: 620px;
		height: 150px;
		overflow: hidden;
		border-radius: 8px;

		.img {
			float: left;
			display: inline;
			width: 120px;
			height: 120px;
			overflow: hidden;

			& > img {
				width: 100%;
				object-fit: cover;
			}
		}

		.text {
			float: right;
			display: inline;
			height: 120px;
			width: 450px;

			& > h2 {
				height: 35px;
				overflow: hidden;

				& > .l {
					float: left;
					display: inline;
					max-width: 350px;
					white-space: nowrap;
					text-overflow: ellipsis;
					overflow: hidden;

					& > span {
						margin-left: 20px;
						font-size: 12px;
						font-weight: 400;
						color: #999;
					}
				}

				& > .r {
					float: right;
					display: inline;

					& > .list-btn {
						width: 80px;
						height: 30px;
					}
				}
			}

			& > p {
				display: -webkit-box;
				-webkit-box-orient: vertical;
				-webkit-line-clamp: 3;
				text-overflow: ellipsis;
				overflow: hidden;
				margin-bottom: 12px;
				color: #777;
				height: 52px;
			}

			& > dl > dd {
				float: left;
				margin-right: 30px;

				& > span {
					font-size: 14px;
					color: #f59900;
					margin-left: 5px;
				}
			}
		}

		&:hover {
			box-shadow: 0 6px 6px rgba(10,16,20,.24),0 0 8px rgba(10,16,20,.12);
		}

		&:hover  img {
			opacity: 0.8;
		}
	}
}
</style>