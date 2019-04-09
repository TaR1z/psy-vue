<template>
	<div>
		<Tabs type="card" class="read-home-content">
			<TabPane label="全部"><list :articleAll="articleAll"></list></TabPane>
			<TabPane label="心理科普"><list :articleAll="articleAll"></list></TabPane>
			<TabPane label="家庭关系"><list :articleAll="articleAll"></list></TabPane>
			<TabPane label="人际关系"><list :articleAll="articleAll"></list></TabPane>
		</Tabs>
		<div class="demo-spin-container" v-if="loadingSign">
			<Spin fix>
				<Icon type="ios-loading" size=18 class="demo-spin-icon-load"></Icon>
				<div>加载中...</div>
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
			<!-- 
				title, avatar, author, content, created, views, kinds
			-->
			<Upload
			type="drag"
			action="/read/uploadBgd"
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
					<Button type="warning" class="reset-btn">重置</Button>
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
	import { readAll, addArticle } from '@/api/readInfo'
	import List from '_c/list'

	export default {
		data () {
			return {
				drawerSign: false,
				loadingSign: false,
				articleAll: [],
				uploadUrl: '',
				formItem: {
					title: '',
					kinds: '',
					introduction: '',
					textarea: ''
				},
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
				const editor = new E(this.$refs.editorElem)
				editor.customConfig.onchange = (html) => {
					this.formItem.textarea = html
				}
				editor.customConfig.zIndex = 10
				editor.customConfig.uploadImgMaxLength = 0
				editor.customConfig.menus = [
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
				editor.create()
				editor.txt.html('<p style="font-size: 20px;">请输入文章的内容</p>')
				$('.reset-btn').eq(0).click(() => {
					this.formItem.title = '',
					this.formItem.kinds = '',
					this.formItem.textarea = '',
					this.formItem.introduction = '',
					this.uploadUrl = ''
					editor.txt.clear()
				})
			})
		},
		methods: {
			loadData () {
				// readAll().then(res => {
				// 	this.articleAll = this.articleAll.concat(res)
				// })
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
				this.uploadUrl = res.url
			},
			handleSubmit(name) {
				this.$refs[name].validate((valid) => {
                    if (valid) {
                    	addArticle(this.uploadUrl, this.formItem.title, this.formItem.introduction, this.formItem.kinds, this.formItem.textarea).then(res => {
                    		console.log(res)
                    	})
                        this.$Message.success('Success!');
                    } else {
                        this.$Message.error('Fail!');
                    }
                })
			},
			showDrawer () {
				if (getToken()) {
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
		components: {
			List
		}
	}
</script>

<style lang="less" scoped>
    .demo-spin-container{
    	display: inline-block;
        width: 100%;
        height: 40px;
        position: relative;
    }

    .demo-spin-icon-load{
    	animation: ani-demo-spin 1s linear infinite;
    }

    @keyframes ani-demo-spin {
    	from { transform: rotate(0deg);}
    	50%  { transform: rotate(180deg);}
    	to   { transform: rotate(360deg);}
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