<template>
	<nav ref="pageNav">
		<Menu mode="horizontal" @on-select="turnUrl" theme="light" :active-name="currentPath">
			<div class="layout-nav">
				<Menu-item name="/home">
					<Icon type="ios-home"></Icon>
					首页
				</Menu-item>
				<Menu-item name="/read">
					<Icon type="ios-paper"></Icon>
					阅读
				</Menu-item>
				<Menu-item name="/consult">
					<Icon type="ios-heart"></Icon>
					咨询
				</Menu-item>
				<Menu-item name="/test">
					<Icon type="ios-calendar"></Icon>
					测试
				</Menu-item>
				<Menu-item name="/user/login">
<!-- 					<div class="user-avatar-badge">
						<Badge :count="99" :offset='[15, -20]'>
							<Avatar src="https://i.loli.net/2017/08/21/599a521472424.jpg" size='small'/>
							<span class="user-name">tariz</span>
						</Badge>
					</div> -->
					<div class="nav-login">
						<Icon type="ios-person"></Icon>
						登录
					</div>
				</Menu-item>
			</div>
		</Menu>
	</nav>
</template>

<script>
	export default {
		name: 'navMenu',
		mounted () {
			this.$nextTick(() => {
				window.onscroll = () => {
					let scrollTop = $(document).scrollTop()
					if (scrollTop > 65) {
						this.$refs.pageNav.style.boxShadow = '0 5px 15px -5px #aaa'
					} else {
						this.$refs.pageNav.style.boxShadow = ''
					}
				}
			}) 
		},
		computed: {
			currentPath () {
				return this.$route.path
			}
		},
		methods: {
			turnUrl (Path) {
				this.$router.push(Path)
			}
		}
	}
</script>

<style lang="less" scoped>
nav {
	z-index: 999;
	transition: box-shadow .5s ease;
}

.user-avatar-badge {
	position: relative;

	.user-name {
		text-align: center;
		display: inline-block;
		width: 60px;
		padding-left: 5px;
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
	}

	.ivu-avatar-small {
		position: absolute;
		top: 16px;
		left: -20px;
	}
}

.layout-nav {
	width: 650px;
	height: 60px;
	margin: 0 auto;
	li {
		padding: 0 30px !important;
		font-size: 16px;
	}
}
</style>