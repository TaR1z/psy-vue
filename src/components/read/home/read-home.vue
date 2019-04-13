<template>
	<div>
		<div :style="{ height: articleHeight + 'px', overflow: 'hidden' }">
			<Tabs type="card" class="read-home-content" @on-click="selectTab">
				<TabPane label="全部">
					<list :article="article.all.content"></list>
				</TabPane>
				<TabPane label="心理科普">
					<list :article="article.psy.content"></list>
				</TabPane>
				<TabPane label="家庭关系">
					<list :article="article.family.content"></list>
				</TabPane>
				<TabPane label="人际关系">
					<list :article="article.relation.content"></list>
				</TabPane>
			</Tabs>
		</div>
		<div class="article-spin-container" v-if="loadingSign">
			<Spin fix>
				<div>没有更多了...</div>
			</Spin>
		</div>
		<div class="add-article">
			    <Tooltip content="添加文章" placement="top">
			    	<Button @click="showDrawer" type="primary" size="large">
			    		<Icon type="md-create"></Icon>
			    	</Button>
    			</Tooltip>
		</div>
		<Drawer placement="left" title="添加文章" width="640" :mask-closable="true" v-model="drawerSign">
			<Upload
			type="drag"
			action="/read/uploadBgd"
			:headers="{
				'Authorization': getToken
			}"
			:on-success="uploadSuccess"
			:format="['jpg','jpeg','png']"
			:max-size="5120"
			accept="image/*"
			:show-upload-list="false"
			style="width: 95%; margin: 20px auto 30px;"
			>
				<img class="upload-img" v-if="uploadUrl" :src="uploadUrl">
				<div class="upload-wrapper" style="padding: 50px 0px;">
					<Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
					<p>上传封面图片(小于5MB)</p>
				</div> 
			</Upload>
			
			<Form  ref="formItem" :model="formItem" style="width: 95%; margin: 0px auto" :rules="ruleItem">
				<FormItem prop="title">
					<Input type="text" v-model="formItem.title" placeholder="请输入文章标题"></Input>
				</FormItem>
				<FormItem prop="introduction">
					<Input type="text" v-model="formItem.introduction" placeholder="请输入文章简介"></Input>
				</FormItem>
				<FormItem prop="kinds">
					<Select v-model="formItem.kinds"  placeholder="请选择文章类型">
						<Option value="心理科普">心理科普</Option>
						<Option value="家庭关系">家庭关系</Option>
						<Option value="人际关系">人际关系</Option>
						<Option value="其他">其他</Option>
					</Select>
				</FormItem>
				<FormItem prop="textarea">
					<div ref="editorElem"></div>
					<Input id="editor-area" v-model="formItem.textarea" type="textarea" style="visibility: hidden; height: 0; width: 0; border: 0;"></Input>
				</FormItem>
				<FormItem style="margin-top: -30px; float: right">
					<Button type="primary" style="margin-right: 10px;" @click="handleSubmit('formItem')">确认</Button>
					<Button type="warning" @click="clearData">重置</Button>
				</FormItem>
			</Form>

			<div class="article-editor-wrapper">
			</div>
		</Drawer>
	</div>
</template>

<script>
	import { getToken } from '@/lib/util'
	import E from 'wangeditor'
	import List from '../list'
	import { mapState, mapActions } from 'vuex'

	export default {
		data () {
			return {
				selectName: 'all',
				drawerSign: false,
				loadingSign: false,
				article: {
					all: {
						kinds: '%',
						numbers: 10,
						start: 0,
						content: []
					},
					psy: {
						kinds: '心理科普',
						numbers: 10,
						start: 0,
						content: []
					},
					family: {
						kinds: '家庭关系',
						numbers: 10,
						start: 0,
						content: []
					},
					relation: {
						kinds: '人际关系',
						numbers: 10,
						start: 0,
						content: []
					}
				},
				uploadUrl: '',
				formItem: {
					title: '',
					kinds: '',
					introduction: '',
					textarea: ''
				},
				editor: null,
				ruleItem: {
					title: [
						{required: true, message: "标题不能为空！", trigger: 'blur'}
					],
					kinds: [
						{required: true, message: "分类不能为空！", trigger: 'blur'}
					],
					textarea: [
						{required: true, message: "内容不能为空！", trigger: 'blur'}
					],
					introduction: [
						{required: true, message: "简介不能为空！", trigger: 'blur'}
					]
				}
			}
		},
		created () {
			this.loadData()
			this.$nextTick(() => {
				window.addEventListener('scroll', this.scrollEvent)
			})
		},
		mounted () {
			this.$nextTick(() => {
				this.editor = new E(this.$refs.editorElem)
				this.editor.customConfig.onchange = (html) => {
					this.formItem.textarea = html
				}
				this.editor.customConfig.zIndex = 10
				this.editor.customConfig.uploadImgMaxLength = 0
				this.editor.customConfig.menus = [
				'head',
				'bold',
				'fontSize',
				'foreColor',
				'italic',
				'underline',
				'strikeThrough',
				'justify',
				'quote',
				'link',
				'undo',
				'redo'
				]
				this.editor.create()
				this.editor.txt.html('<p style="font-size: 20px;">请输入文章的内容</p>')
			})
		},
		methods: {
			...mapActions([
				'addArticle',
				'searchKinds'
				]),
			selectTab (name) {
				switch (name) {
					case 0:
						this.selectName = 'all'
						break;
					case 1:
						this.selectName = 'psy'
						let psyContent = this.article[this.selectName].content
						if (!psyContent.length) this.loadData()
						break;
					case 2:
						this.selectName = 'family'
						let familyContent = this.article[this.selectName].content
						if (!familyContent.length) this.loadData()
						break;
					case 3:
						this.selectName = 'relation'
						let relationContent = this.article[this.selectName].content
						if (!relationContent.length) this.loadData()
						break;
				}
			},
			clearData () {
				this.formItem.title = '',
				this.formItem.kinds = '',
				this.formItem.textarea = '',
				this.formItem.introduction = '',
				this.uploadUrl = ''
				this.editor.txt.clear()
			},
			loadData () {
				let kinds = this.article[this.selectName].kinds
				let start = this.article[this.selectName].start
				let numbers = this.article[this.selectName].numbers
				let content = this.article[this.selectName].content
				this.searchKinds({kinds, start, numbers}).then((res) => {
					let resLength = Object.keys(res.data).length
					this.article[this.selectName].content = content.concat(res.data)
					this.article[this.selectName].start += resLength 
				}).catch(err => {
					this.loadingSign = true
				})
			},
			scrollEvent () {
				let windowHeight = $(window).height()
				let scrollHeight = $(document).height()
				let scrollTop = $(document).scrollTop()
				if (Math.ceil(scrollTop + windowHeight) >= scrollHeight) {
					this.loadData()
				}
			},
			uploadSuccess (res) {
				this.uploadUrl = res.url + '?'+ Math.random()
			},
			handleSubmit(name) {
				this.$refs[name].validate((valid) => {
					if (valid) {
						const created = this.$moment(new Date().getTime()).format('YYYY-MM-DD')
						this.addArticle({
							title: this.formItem.title, 
							introduction: this.formItem.introduction, 
							cover_image: this.uploadUrl, 
							author: this.author, 
							content: this.formItem.textarea, 
							created, 
							views: 0, 
							kinds: this.formItem.kinds
						}).then(res => {
							this.$Message.success(res.mes)
							this.clearData()
						}).catch(error => {
							this.$Message.error(error.mes)
							this.$router.push({
								name: 'home'
							})
						})
					}
				})
			},
			showDrawer () {
				if (getToken() && getToken() != 'undefined') {
					this.drawerSign = true
				} else {
					this.drawerSign = false
					this.$Notice.warning({
						title: '警告：',
						desc: '请先登录账号！',
						duration: 3
					})
				}
			}
		},
		computed: {
			...mapState({
				author: state => state.user.nickName
			}),
			getToken () {
				return getToken()
			},
			articleHeight () {
				return this.article[this.selectName].content.length * 125 + 80
			}
		},
		components: {
			List
		}
	}
</script>

<style lang="less" scoped>
    .article-spin-container{
    	display: inline-block;
        width: 100%;
        top: -12px;
        height: 25px;
        position: relative;
    }

    .add-article {
    	position: fixed;
    	bottom: 80px; 
    	right: 30px;

    	.ivu-btn-large {
    		padding: 8px 16px;
    	}
    }

    .upload-wrapper:hover .upload-icon{
    	color: #3399ff;
    }

    .upload-img {
    	position: absolute;
    	top: 0;
    	bottom: 0;
    	left: 0;
    	right: 0;
    	width: 100%;
    	object-fit: cover;
    }
</style>