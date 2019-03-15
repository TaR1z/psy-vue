<template>
	<div class="test-content">
		<router-link  v-for="item in testList" :to="{ name: item.name, query: { id: item.id } }" tag="div" class="test-info" :key="item.id">
			<img :src="item.url">
			<p class="title">{{ item.title }}</p>
			<div class="free-tag">免费</div>
			<span class="number">9999人测试过</span>
		</router-link>
	</div>
</template>

<script>
	export default {
		name: 'testContent',
		props: {
			testList: {
				type: Array,
				default: () => {
					return [
					{
						id: 1,
						name: 'test',
						url: 'https://ossimg.xinli001.com/20171025/4da7c8d79e1f58444e4f2bdbe510cfa0.jpg?x-oss-process=image/quality,Q_80',
						title: '时间管理测试'
					},
					{
						id: 2,
						url: 'https://ossimg.xinli001.com/20171025/4da7c8d79e1f58444e4f2bdbe510cfa0.jpg?x-oss-process=image/quality,Q_80',
						name: 'test',
						title: '时间管理测试'
					},
					{
						id: 3,
						url: 'https://ossimg.xinli001.com/20171025/4da7c8d79e1f58444e4f2bdbe510cfa0.jpg?x-oss-process=image/quality,Q_80',
						name: 'test',
						title: '时间管理测试'
					}
					]
				}
			}
		}
	}
</script>

<style lang="less" scoped>
@media screen and (max-width: 980px) { 
	.test-content{
		width: 300px !important;
	}
}

	.test-content {
		height: 400px;

		.test-info {
			float: left;
			width: 300px;
			height: 100%;
			border-radius: 15px;
			box-shadow: 0 2px 20px 0 #eaeaea;
			transition: all 0.5s ease-in-out;
			cursor: pointer;
			margin-right: 20px;
			margin-bottom: 10px;

			&:hover img{
				opacity: .8;
			}

			&:hover {
				box-shadow: 0 6px 6px rgba(10,16,20,.24),0 0 8px rgba(10,16,20,.12);
			}

			img {
				border-radius: 15px 15px 0px 0px;
				width: 100%;
				height: 300px;
				object-fit: cover;
				object-position: center;
			}

			.title {
				text-align: left;
				margin: 10px 0px 10px 30px;
				font-size: 20px;
				letter-spacing: 1px;
			}

			.number {
				font-size: 14px;
				margin-right: 10px;
				color: #ccc;
				float: right;
				height: 30px;
				line-height: 30px;
			}

			.free-tag {
				display: inline-block;
				font-size: 14px;
				line-height: 30px;
				width: 60px;
				height: 30px;
				border-radius: 100px;
				background-color: #5ed49d;
				text-align: center;
				color: #fff;
				margin-left: 25px;
			}
		}
	}
</style>