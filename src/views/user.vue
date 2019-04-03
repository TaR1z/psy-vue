<!-- 登录页面 -->
<template>
	<div class="user-wrapper">
		<div class="user-form">
			<Form ref="formInline" :model="formInline" :rules="ruleInline">
    		    <FormItem prop="user">
    		        <Input size="large" type="text" v-model="formInline.user" placeholder="Username">
    		            <Icon type="ios-person-outline" slot="prepend"></Icon>
    		        </Input>
    		    </FormItem>
    		    <FormItem prop="password">
    		        <Input size="large" type="password" v-model="formInline.password" placeholder="Password">
    		            <Icon type="ios-lock-outline" slot="prepend"></Icon>
    		        </Input>
    		    </FormItem>
    		    <FormItem>
    		        <Button style="float: right;" type="primary" @click="handleSubmit('formInline')">登录</Button>
    		    </FormItem>
    		</Form>
		</div>
		<router-view></router-view>
	</div>
</template>

<script>
	import { mapActions } from 'vuex'
	export default {
		data () {
			return {
				formInline: {
					user: '',
					password: ''
				},
				ruleInline: {
					user: [
					{ required: true, message: '请输入账号', trigger: 'blur' }
					],
					password: [
					{ required: true, message: '请输入密码', trigger: 'blur' }
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
							password: this.formInline.password
						}).then(() => {
							this.$Message.success('登录成功!');
							this.$router.push({
								name: 'home'
							})
						}).catch(error => {
							this.$Message.error('登录失败!');
							console.log(error)
						}) 

					} else {
						this.$Message.error('登录失败!');
					}
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	.user-wrapper {
		position: absolute;
		left: 50%;
		top: 50%;
		width: 400px;
		background-color: #fff;
		transform: translate(-50%, -50%);
		border-radius: 10px;


		.user-form {
			width: 300px;
			margin: 0 auto;
		}
	}
</style>