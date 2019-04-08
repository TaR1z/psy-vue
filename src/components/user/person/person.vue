<template>
	<div>
		<div class="person-wrapper">
			<Menu :active-name="menuNum" style="height: 100%" @on-select="changeMenu">
				<MenuGroup title="个人中心">
					<MenuItem name="1">
						<Icon type="md-document" />
						我的信息
					</MenuItem>
					<MenuItem name="2">
						<Icon type="md-person" />
						我的头像
					</MenuItem>
				</MenuGroup>
				<MenuGroup title="消息中心">
					<MenuItem name="3">
						<Icon type="md-mail" />
						私信
					</MenuItem>
				</MenuGroup>
				<MenuGroup title="心理健康">
					<MenuItem name="4">
						<Icon type="md-heart" />
						晴雨表
					</MenuItem>
				</MenuGroup>
			</Menu>
			<div class="person-content-wrapper">
				<div v-if="menuNum == '1'">
					<my-data></my-data>
				</div>
				<div v-else-if="menuNum == '2'">
					我的头像
				</div>
				<div v-else-if="menuNum == '3'">
					私信
				</div>
				<div v-else-if="menuNum == '4'">
					晴雨表
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import MyData from './myData.vue'
	export default {
		data () {
			return {
				menuNum: '1'
			}
		},
		methods: {
			changeMenu (name) {
				this.menuNum = name
			}
		},
		components: {
			MyData
		}
	}
</script>

<style lang="less" scoped>
	.person-wrapper {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		background-color: #fff;
		margin-top: 20px;
		width: 950px;
		height: 600px;
		box-shadow: 0 5px 15px -5px rgba(0, 0, 0, 0.5);

		.person-content-wrapper {
			position: absolute; 
			top: 0px; 
			left: 240px; 
			height: 100%; 
			width: calc(100% - 240px);
		}
	}
</style>