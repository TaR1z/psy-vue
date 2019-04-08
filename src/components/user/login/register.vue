<!-- 登录页面 -->
<template>
	<div class="user-wrapper">
		<div class="user-form">
			<Form ref="formCustom" :model="formCustom" :rules="ruleCustom" :label-width="80">
				<FormItem label="账号：" prop="user">
					<Input type="text" v-model="formCustom.user"></Input>
				</FormItem>
				<FormItem label="职业：">
					<RadioGroup v-model="formCustom.indentify">
						<Radio label="student">学生</Radio>
						<Radio label="teacher">咨询师</Radio>
					</RadioGroup>
				</FormItem>
				<FormItem label="密码：" prop="passwd">
					<Input type="password" v-model="formCustom.passwd"></Input>
				</FormItem>
				<FormItem label="确认密码：" prop="passwdCheck">
					<Input type="password" v-model="formCustom.passwdCheck"></Input>
				</FormItem>
				<FormItem>
					<Button style="float: right;" type="primary" @click="handleSubmit('formCustom')">
                      注册
                    </Button>
				</FormItem>
			</Form>
		</div>
	</div>
</template>

<script>
    import { mapActions } from 'vuex'
	export default {
		data () {
			const validatePass = (rule, value, callback) => {
                const regNumber = /\d+/
                const regString = /[a-zA-Z]+/
				if (value.length < 6 || !regNumber.test(value) || !regString.test(value)) {
					callback(new Error('字母和数字组成、不小于六位'))
				} else {
					if (this.formCustom.passwdCheck !== '') {
                        // 对第二个密码框单独验证
                        this.$refs.formCustom.validateField('passwdCheck')
                    }
                    callback()
                }
            }
            const validatePassCheck = (rule, value, callback) => {
            	if (value === '') {
            		callback(new Error('请再次输入你的密码'))
            	} else if (value !== this.formCustom.passwd) {
            		callback(new Error('两次密码不一致'))
            	} else {
            		callback()
            	}
            }
            const validateUser = (rule, value, callback) => {
                const regUserName = /^[a-zA-Z]{1}/
            	if (value.length < 6 || !regUserName.exec(value)) {
            		return callback(new Error('首位由字母组成、不小于六位'))
            	} else {
            		callback()
            	}
            }
            
            return {
            	formCustom: {
            		user: '',
            		passwd: '',
            		passwdCheck: '',
            		indentify: 'student'
            	},
            	ruleCustom: {
            		passwd: [
            		{ validator: validatePass, trigger: 'blur' }
            		],
            		passwdCheck: [
            		{ validator: validatePassCheck, trigger: 'blur' }
            		],
            		user: [
            		{ validator: validateUser, trigger: 'blur' }
            		]
            	}
            }
        },
        methods: {
            ...mapActions([
                'register'
                ]),
        	handleSubmit (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {                        
                        this.register({
                            userName: this.formCustom.user,
                            password: this.formCustom.passwd,
                            identify: this.formCustom.indentify
                        }).then((res) => {
                            this.$Message.success(res.mes);
                            this.$router.push({
                                path: '/user/person'
                            })
                        }).catch(error => {
                            this.$Message.error(error.mes);
                        }) 
                    }
                })
            }
        }
    }
</script>

<style lang="less" scoped>
	.user-form {
		margin-top: 12px;
	}
</style>