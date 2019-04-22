<template>
	<div>
		<template v-for="item in testArr">
			<Divider />
			<router-link :to="{ name: 'test', query: { title: item.title } }" tag="div" class="test-item" :key="item.id">
				<div class="left">
					<h1>{{ item.title }}</h1>
					<p>{{ item.description }}</p>
					<div class="tis">
						<span>
							<Icon type="ios-brush-outline" size="20" style="margin-right: 10px;"/>1.2w人已测
						</span>
						<span>
							<Icon type="ios-chatboxes-outline" size="20" style="margin-right: 10px;"/>122
						</span>
						<span>
							<Icon type="ios-heart-outline" size="20" style="margin-right: 10px;"/>202
						</span>
						<span>
							<Icon type="ios-calendar-outline" size="20" style="margin-right: 10px;"/>{{ item.created }}
						</span>
					</div>
				</div>
				<div class="right">
					<img :src="item.image">
				</div>
			</router-link>
		</template>
	</div>
</template>

<script>
	export default {
		props: {
			testArr: {
				type: Array,
				data () {
					return []
				}
			}
		}
	}
</script>

<style lang="less" scoped>
	.test-item {
		margin: 0 auto;
		width: 95%;
		height: 180px;
		border-radius: 6px;
		transition: box-shadow .5s ease;
		cursor: pointer;

		& > .left {
			padding: 15px;
			position: relative;
			top: 0;
			left: 0;
			float: left;
			width: 70%;
			height: 100%;
			padding-right: 10px;

			& > h1 {
				color: #333;
				letter-spacing: 0.25px;
				font-size: 20px;
				margin-bottom: 5px;
				font-weight: 500;
			}

			& > p {
				font-size: 14px;
				line-light: 1.4em;
				display: -webkit-box;
				-webkit-line-clamp: 3;
				-webkit-box-orient: vertical;
				overflow: hidden;
				color: #999;
			}

			& > .tis {
				position: absolute;
				bottom: 10px;
				left: 18px;
				height: 30px;
				line-height: 1.5em;
				width: 100%;

				& > span {
					margin-right: 35px;
					font-size: 14px;
					color: #999;
				}
			}
		}

		& > .right {
			float: right;
			width: 30%;
			height: 100%;
			padding: 15px;

			& > img {
				width: 100%;
				height: 100%;
				object-fit: cover;
				border-radius: 8px;
			}
		}

		&:hover {
			box-shadow: 0 6px 6px rgba(10,16,20,.24),0 0 8px rgba(10,16,20,.12);
		}

		&:hover > .right > img {
			opacity: 0.7;
		}
	}
</style>