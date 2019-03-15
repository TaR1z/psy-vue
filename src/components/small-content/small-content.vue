<template>
	<div class="content-wrapper">
		<div class="content" v-for="item in contentList" :key="item.id">
			<div class="content-img">
				<router-link :to="{ name: item.name, query: { id: item.id } }" tag="img" :src="item.url"></router-link>
			</div>
			<div class="content-title">
				<router-link :to="{ name: item.name, query: { id: item.id } }" tag="p" class="main-title">
					{{ item.title }}
				</router-link>
				<p class="small-title">
					{{ item.content }}
				</p>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'smallContent',
		props: {
			contentList: {
				type: Array,
				// 测试数据
				default: () => {
					return [
					{
						id: 1,
						name: 'read',
						url: 'http://img2.imgtn.bdimg.com/it/u=3135339935,1064367009&fm=26&gp=0.jpg',
						title: '测试题目',
						content: '测试内容测试内容测试内容测试内容测试内容测试内容测试内容测试内容测试内容'
					},
					{
						id: 2,
						name: 'read',
						url: 'http://img2.imgtn.bdimg.com/it/u=3135339935,1064367009&fm=26&gp=0.jpg',
						title: '测试题目',
						content: '测试内容测试内容测试内容测试内容测试内容测试内容测试内容测试内容测试内容'
					},
					{
						id: 3,
						name: 'read',
						url: 'http://img2.imgtn.bdimg.com/it/u=3135339935,1064367009&fm=26&gp=0.jpg',
						title: '测试题目',
						content: '测试内容测试内容测试内容测试内容测试内容测试内容测试内容测试内容测试内容'
					},
					{
						id: 4,
						name: 'read',
						url: 'http://img2.imgtn.bdimg.com/it/u=3135339935,1064367009&fm=26&gp=0.jpg',
						title: '测试题目',
						content: '测试内容测试内容测试内容测试内容测试内容测试内容测试内容测试内容测试内容'
					},
					{
						id: 5,
						name: 'read',
						url: 'http://img2.imgtn.bdimg.com/it/u=3135339935,1064367009&fm=26&gp=0.jpg',
						title: '测试题目',
						content: '测试内容测试内容测试内容测试内容测试内容测试内容测试内容测试内容测试内容'
					},
					{
						id: 6,
						name: 'read',
						url: 'http://img2.imgtn.bdimg.com/it/u=3135339935,1064367009&fm=26&gp=0.jpg',
						title: '测试题目',
						content: '测试内容测试内容测试内容测试内容测试内容测试内容测试内容测试内容测试内容'
					}
				]
				}
			}
		}
	}
</script>

<style lang="less" scoped>

	@media screen and (max-width: 980px) { 
		.content {
			float: none !important;
		}
	}

	.content-wrapper {
		width: 100%;
		height: 100%;
		
		&::after {
			content: '';
			height: 0;
			clear: both;
			visibility: hidden;
			display: block;
		}

		.content {
			float: left;
			height: 136px;
			width: 470px;
			background: #f9f9fa;
			display: flex;
			border-radius: 10px;
			margin: 5px 10px 20px 10px;
			transition: all 0.5s ease-in-out;

			&:hover {
				box-shadow: 0 6px 6px rgba(10,16,20,.24),0 0 8px rgba(10,16,20,.12);
			}

			.content-img {
				width: 88px;
				margin: 24px;

				img {
					width: 88px;
					height: 88px;
					cursor: pointer;
				}

				img:hover {
					opacity: .8;
				}
			}

			.content-title {
				flex: 1;
				margin: 24px 0;

				.main-title {
					width: 320px;
					font-size: 16px;
					color: #333;
					font-weight: 700;
					margin-bottom: 8px;
					line-height: 22px;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space:nowrap;  
					margin-right: 35px;
					cursor: pointer;
				}

				.small-title {
					width: 320px;
					font-size: 12px;
					color: #666;
					overflow: hidden;
					text-overflow: ellipsis;
					line-height: 18px;
					margin-right: 35px;
					margin-bottom: 12px;
					display: -webkit-box;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 3;
				}
			}
		}
	}
</style>