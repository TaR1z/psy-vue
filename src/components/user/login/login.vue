<template>
	<div class="user-login-wrapper">
		<Tabs value="name1" style="padding-top: 0px;">
			<TabPane label="登录" name="name1">
				<div class="account-wrapper">
					<account></account>
				</div>
			</TabPane>
			<TabPane label="注册" name="name2">
				<div class="register-wrapper">
					<register></register>
				</div>
			</TabPane>
		</Tabs>
	</div>
</template>

<script>
	import Account from './account.vue'
	import Register from './register.vue'
    export default {
        components: {
        	Account,
			Register
        }
    }
</script>

<style lang="less" scoped>
	.user-login-wrapper {
		position: absolute;
		background-color: #fff;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: 380px;
		height: 370px;
		padding: 20px !important;
		border-radius: 10px;
		box-shadow: 0 8px 8px rgba(10, 16, 20, .24), 0 0 8px rgba(10, 16, 20, .12);

		.account-wrapper {
			height: 250px;
			display: flex;
			justify-content: center;
			align-items: center;
		}

		.register-wrapper {
			width: 320px;
		}

	} 
</style>