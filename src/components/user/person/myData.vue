<template>
	<div style="height: 100%; width: 100%; padding: 50px 20px 10px;" v-if="this.formUser.account">
		<div class="leaveBtn">
			<Button type="error" @click="leaveSign = true">退出登录</Button>
			<Modal
			width="230"
			v-model="leaveSign"
			@on-ok="leaveLogin">
			<p style="text-align: center; font-size: 17px; letter-spacing: 1px; color: indianred;">确认退出登录？</p>
		</Modal>
		</div>
		<Form ref="formUser" :model="formUser" :label-width="80" :rules="ruleUser">
			<FormItem label="昵称："  prop="nickname">
				<Input v-model="formUser.nickname" style="width: 40%;"></Input>
			</FormItem>
			<FormItem label="用户名：" prop="account">
				<Input v-model="formUser.account" disabled style="width: 40%;"></Input>
			</FormItem>
			<FormItem label="真实姓名：" prop="username">
				<Input v-model="formUser.username" style="width: 40%;"></Input>
			</FormItem>
			<FormItem label="性别：" prop="gender">
				<RadioGroup v-model="formUser.gender">
					<Radio label="0">男</Radio>
					<Radio label="1">女</Radio>
					<Radio label="2">保密</Radio>
				</RadioGroup>
			</FormItem>
			<FormItem label="年龄：" prop="age">
				 <InputNumber :max="150" :min="0" :step="10" v-model="formUser.age" @on-change="changeZero"></InputNumber>
			</FormItem>
			<FormItem label="我的签名：" prop="description">
				<Input v-model="formUser.description" type="textarea" :rows="6"></Input>
			</FormItem>
			<FormItem>
				<Button type="primary" @click="handleSubmit('formUser')">保存</Button>
			</FormItem>
		</Form>
	</div>
</template>

<script>
	import { mapActions } from 'vuex'
	export default {
		data () {
			return {
				leaveSign: false,
				formUser: {
					account: '',
					nickname: '',
					username: '',
					gender: '',
					age: 0,
					description: ''
				},
				ruleUser: {
					nickname: [
						{ required: true, message:"昵称不能为空！", trigger: 'blur' }
					],
					username: [
						{ required: true, message:"姓名不能为空！", trigger: 'blur' }
					],
					gender: [
						{ required: true, message:"性别不能为空！", trigger: 'blur' }
					],
					description: [
						{ required: true, message:"签名不能为空！", trigger: 'blur' }
					]
				}
			}
		},
		created () {
			this.personInfo().then(res => {
				this.formUser.account = res.data.account
				this.formUser.nickname = res.data.nickname
				this.formUser.username = res.data.username
				this.formUser.gender = res.data.gender + ''
				this.formUser.age = res.data.age
				this.formUser.description = res.data.description
			})
		},
		methods: {
			...mapActions([
					'personInfo',
					'updatePersonInfo',
					'logout'
				]),
			leaveLogin () {
				this.logout()
				this.$Notice.success({
					desc: '退出登录成功！',
					duration: 2
				})
				this.$nextTick(() => {
					this.$router.push({
						name: 'user'
					})
				})
			},
			handleSubmit (name) {
				this.$refs[name].validate((valid) => {
					if (valid) {
						this.updatePersonInfo({
							nickname: this.formUser.nickname,
							username: this.formUser.username,
							age: this.formUser.age,
							gender: this.formUser.gender,
							description: this.formUser.description
						}).then((res) => {
							this.$Message.success('保存成功!')
						}).catch(() => {
							this.$Message.error('保存失败!')
						})
					}
				})
			},
			changeZero () {
				if (!this.formUser.age) {
					this.formUser.age = 0;
				}
			}
		}
	}
</script>

<style lang="less">
	textarea.ivu-input {
		resize: none;
	}

	.ivu-form-item-required .ivu-form-item-label:before {
		display: none;
	}

	.leaveBtn {
		position: absolute;
		right: 20px;
		bottom: 25px;
		z-index: 999;
	}
</style>