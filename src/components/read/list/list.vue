<template>
	<div>
		<div class="item-wrapper" v-for="item in article" :key="item.id">
			<router-link :to="{ name: 'read', query: { id: item.id } }" tag="div" class="item">
				<div class="pic">
					<img :src="item.cover_image">
				</div>
				<div class="right">
					<span class="title">{{ item.title }}</span>
					<p class="content">{{ item.introduction }}</p>
					<p class="author">{{ item.author }} {{ item.created }}</p>
					<span class="sign">{{ item.views }} 阅读</span>
				</div>
			</router-link>
		</div>
	</div>
</template>

<script>
	export default {
		props: {
			article: {
				type: Array,
				data () {
					return []
				}
			}
		}
	}
</script>

<style lang="less" scoped>
.item-wrapper {
	margin: 10px 0 25px;
	width: 100%;

	.item {
		display: flex;
		margin: 0 auto;
		width: 98%;
		height: 100px;
		border-radius: 10px;
		transition: box-shadow 0.4s ease-in-out;
		cursor: pointer;

		&:hover {
			box-shadow: 0 6px 6px rgba(10,16,20,.24),0 0 8px rgba(10,16,20,.12);
		}

		.pic {
			img {
				padding: 5px;
				height: 100px;
				width: 100px;
				border-radius: 10px;
				object-fit: cover;
			}
		}


		.right {
			position: relative;
			margin-left: 18px;
			width: 100%;
			display: flex;
			flex-direction: column;

			.title {
				padding-top: 5px;
				font-size: 18px;
				color: #333;
				font-weight: 700;
				line-height: 20px;
				display: -webkit-box;
				-webkit-box-orient: vertical;
				-webkit-line-clamp: 1;
				overflow: hidden;
				padding-right: 80px;
			}

			.content {
				color: #666;
				padding: 10px 10px 0px 0px;
				display: -webkit-box;
				-webkit-box-orient: vertical;
				overflow: hidden;
				line-height: 20px;
				-webkit-line-clamp: 2;
			}

			.author {
				position: absolute;
				left: 0;
				bottom: 5px;
				color: #999;
				font-size: 12px;
			}
			
			.sign {
				font-size: 14px;
				color: #ccc;
				position: absolute;
				top: 5%;
				right: 2%;
			}

		}
	}
}
</style>