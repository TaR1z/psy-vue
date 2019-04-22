<template>
	<div class="test-content">
		<router-link  v-for="item in testArr" :to="{ name: 'test', query: { title: item.title } }" tag="div" class="test-info" :key="item.id | namePrefix">
			<img :src="item.image">
			<div class="go-test">去测试</div>
			<p class="title">{{ item.title }}</p>
			<div class="free-tag">免费</div>
			<span class="number">1.2w人测试过</span>
		</router-link>
	</div>
</template>

<script>
	export default {
		name: 'testContent',
		props: {
			testArr: {
				type: Array,
				required: true
			}
		},
		filters: {
			namePrefix: function (value) {
				if (!value) return ''
					return 'test_' + value
			}
		}
	}
</script>

<style lang="less" scoped>
	.test-content {
		height: 400px;

		.test-info {
			position: relative;
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

			&:hover .go-test {
				color: #888;
				background: rgba(0,0,0,0.2);
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
				letter-spacing: 0.25px;
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

			.go-test {
				left: 50%;
				top: 40%;
				margin-left: -40px;
				position: absolute;
				color: #fff;
				font-size: 14px;
				text-align: center;
				line-height: 40px;
				height: 40px;
				width: 80px;
				background: rgba(0,0,0,.5);
				border-radius: 8px;
			}
		}
	}
</style>