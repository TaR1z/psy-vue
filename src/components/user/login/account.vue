<!-- 登录页面 -->
<template>
	<div class="user-wrapper">
		<div class="user-form">
			<div class="top-img">
				<img src="@/assets/img/user/avatar.jpg">
			</div>
			<Form ref="formInline" :model="formInline" :rules="ruleInline">
    		    <FormItem prop="user">
    		        <Input size="large" type="text" v-model="formInline.user" placeholder="请输入账号">
    		        	<Icon type="ios-person-outline" slot="prepend"></Icon>
    		        </Input>
    		    </FormItem>
    		    <FormItem prop="password">
    		        <Input size="large" type="password" v-model="formInline.password" placeholder="请输入密码">
    		            <Icon type="ios-lock-outline" slot="prepend"></Icon>
    		        </Input>
    		    </FormItem>
    		    <FormItem>
    		        <Button type="primary" @click="handleSubmit('formInline')" long>登录</Button>
    		    </FormItem>
    		</Form>
		</div>
	</div>
</template>

<script>
	import { mapActions, mapState } from 'vuex'
	export default {
		data () {
			return {
				formInline: {
					user: '',
					password: ''
				},
				ruleInline: {
					user: [
					{ required: true, message: '账号不能为空!', trigger: 'blur' }
					],
					password: [
					{ required: true, message: '密码不能为空!', trigger: 'blur' }
					]
				}
			}
		},
		methods: {
			...mapActions([
					'login'
				]),
			handleSubmit(name) {
				this.$refs[name].validate((valid) => {
					if (valid) {						
						this.login({
							userName: this.formInline.user,
							password: this.$md5(this.formInline.password)
						}).then((res) => {
							this.$Message.success(res.mes)
							this.$router.push({
								path: '/home'
							})
						}).catch(error => {
							this.$Message.error(error.mes)
							this.formInline.password = ''
						}) 
					}
				})
			}
		},
		computed: {
			...mapState({
				account: state => state.user.account
			})
		}
	}
</script>

<style lang="less" scoped>
	.user-form {
		margin-top: 35px;
		width: 300px;
	}

	.top-img {
		width: 100%;
		margin-bottom: 12px;
		img {
			width: 300px;
			height: 80px;
			object-fit: cover;
			border-radius: 5px;
		}
	}
</style>