<template>
	<div class="main-content">
		<div class="user-img" v-for="item in userList" :key='item.id'>
			<div class="hidden-img">
				<img :src="item.url">
			</div>
			<p class="show-user-tip">累计帮助999人</p>
			<img :src="item.url" class="user-radius-img">
			<ul class="user-introudct">
				<li>大学生心理辅导咨询师</li>
				<li>国家一级咨询师</li>
				<li>荣获国家咨询特等奖</li>
			</ul>
			<p class="aera-info">{{ item.description }}</p>
			<p class="prew-metting">
				<router-link :to="{ name: item.name, query: { id: item.id } }" class="order-btn" tag="div">预约</router-link>
			</p>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'userConsult',
		props: {
			userList: {
				type: Array,
				required: true
			}
		}
	}
</script>

<style lang="less" scoped>
	@media screen and (max-width: 980px) { 
		.main-content {
			width: 500px !important;
		}
	}

	.main-content {
		width: 100%;

		.user-img {
			margin-bottom: 20px;
			float: left;
			width: 230px;
			height: 340px;
			position: relative;
			border-radius: 10px;
			margin-right: 15px;
			background: #fff;
			transition: all 0.5s ease-in-out;
	
			&::after {
				content: '';
				height: 0;
				clear: both;
				visibility: hidden;
				display: block;
			}

			&:hover {
				box-shadow: 0 8px 8px rgba(10,16,20,.24),0 0 8px rgba(10,16,20,.12);
			}

			.hidden-img {
				border-radius: 10px 10px 0 0;
				width: 230px;
				height: 84px;
				overflow: hidden;

				img {
					width: 230px;
					height: 100%;
					filter: blur(8px);
					object-fit: cover;
				}
			}
			
			.show-user-tip {
				font-size: 14px;
				color: #888;
				line-height: 14px;
				margin-top: 10px;
				position: absolute;
				left: 100px;
			}

			.user-radius-img {
				width: 68px;
				height: 68px;
				border-radius: 50%;
				top: 45px;
				left: 15px;
				position: absolute;
				-webkit-filter: blur(0);
				filter: blur(0);
			}

			.user-introudct {
				margin-top: 45px;
				text-align: left;
				list-style: none;
				padding-left: 20px;
				height: 42px;
				
				li {
					font-size: 14px;
					color: #333;
					line-height: 14px;
					margin-bottom: 14px;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
					margin-right: 20px;

					&::before {
						content: "\25CF";
						color: #0b8bff;
						font-size: 12px;
						margin-right: 10px;
					}
				}
			}

			.aera-info {
				font-size: 14px;
				color: #999;
				line-height: 18px;
				margin: 50px 20px 0px;
				text-align: left;
				overflow: hidden;
				display: -webkit-box;
				-webkit-box-orient: vertical;
				-webkit-line-clamp: 2;
				height: 36px;
			}
			
			.prew-metting {
				width: 90px;
				height: 36px;
				line-height: 36px;
				text-align: center;
				background: #0b8bff;
				border-radius: 8px;
				margin: 0 30%;
				margin-top: 25px;
				color: #fff;
				font-size: 14px;
				opacity: 1;

				&:hover {
					opacity: 0.6;
				}
				
				.order-btn {
					height: 100%;
					cursor: pointer;
					color: #fff;
				}
			}
		}
	}
</style>