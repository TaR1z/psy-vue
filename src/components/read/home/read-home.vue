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
			<Button @click="drawerSign = true" type="primary" size="large">
				<Icon type="md-create"></Icon>
			</Button>
		</div>
		<Drawer placement="left" title="添加文章" width="600" :mask-closable="true" v-model="drawerSign">
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
			 >
			 <img class="upload-img" v-if="uploadUrl" :src="uploadUrl">
			 <div class="upload-wrapper" style="padding: 50px 0px;">
			 	<Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
			 	<p>上传封面图片(小于5MB)</p>
			 </div>
			</Upload>

			<div class="article-editor-wrapper">
				<wangeditor @catchData="catchData"></wangeditor>
				<textarea style="visibility: hidden; height: 0; width: 0; border: 0;"></textarea>
			</div>
		</Drawer>
	</div>
</template>

<script>
	import { readAll } from '@/api/readInfo'
	import List from '_c/list'
    import Wangeditor from '_c/editor'

	export default {
		data () {
			return {
				drawerSign: false,
				articleAll: [],
				loadingSign: true,
				uploadUrl: '',
				editorContent: ''
			}
		},
		created () {
			this.loadData()
			this.$nextTick(() => {
				window.addEventListener('scroll', this.scrollEvent)
			})
		},
		methods: {
			loadData () {
				readAll().then(res => {
					this.articleAll = this.articleAll.concat(res)
				})
			},
			scrollEvent () {
				let windowHeight = $(window).height()
				let scrollHeight = $(document).height()
				let scrollTop = $(document).scrollTop()
				if (Math.ceil(scrollTop + windowHeight) >= scrollHeight) {
					console.log(123)
					this.loadData()
				}
			},

			uploadSuccess (res) {
				this.uploadUrl = res.url
			},

			catchData(value){
          		$('textarea').eq(0).val(value)
      		}
		},
		components: {
			List,
			Wangeditor
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