<template>
	<div class="myAvatar-wrapper">
		<my-upload field="file"
		@crop-success="cropSuccess"
		@crop-upload-success="cropUploadSuccess"
		@crop-upload-fail="cropUploadFail"
		v-model="show"
		:width="300"
		:height="300"
		url="/uploadAvatar"
		:headers="headers"
		:noCircle="true"
		img-format="png"></my-upload>
		<div class="newAvatar-wrapper">
			<img class="newAvatar" :src="avatarUrl">
			<span>当前头像</span>
		</div>

	</div>
</template>

<script>
	import { mapMutations, mapState } from 'vuex'
	import { getToken } from '@/lib/util'
	import myUpload from 'vue-image-crop-upload'
	export default {
		data () {
			return {
				show: true,
				headers: {
					'Authorization': getToken()
				},
				showSuccess: true
			}
		},
		components: {
			'my-upload': myUpload
		},
		computed: {
			...mapState({
				avatarUrl: state => state.user.avatarUrl
			})
		},
		methods: {
			...mapMutations([
					'SET_AVATARURL'
				]),
			toggleShow() {
				this.show = !this.show;
			},
            /**
			 * crop success
			 *
			 * [param] imgDataUrl
			 * [param] field
			 */
			 cropSuccess(imgDataUrl, field){
			 	// console.log('-------- crop success --------');
			 },
			/**
			 * upload success
			 *
			 * [param] jsonData   服务器返回数据，已进行json转码
			 * [param] field
			 */
			 cropUploadSuccess(jsonData, field){
			 	// console.log('-------- upload success --------');
			 	this.SET_AVATARURL(`${jsonData.url}`)
			 },
			/**
			 * upload fail
			 *
			 * [param] status    server api return error status, like 500
			 * [param] field
			 */
			 cropUploadFail(status, field){
			 	// console.log('-------- upload fail --------');
			 	// console.log(status);
			 	// console.log('field: ' + field);
			 }
			}
	}
</script>

<style lang="less">
	.myAvatar-wrapper {
		position: relative;
		width: 100%;
		height: 100%;
		
		.newAvatar-wrapper {
			position: absolute;
			right: 120px;
			top: 40px;
			.newAvatar {
				width: 100px;
				height: 100px;
				padding: 3px;
				border: 1px solid rgba(0, 0, 0, 0.15);
				object-fit: cover;
			}

			& > span {
				position: absolute;
				left: 22px;
				top: 110px;
				color: #bbb;
				font-size: 14px;
			}
		}
	}

	.vue-image-crop-upload {
		z-index: 0;
		position: static;
		background-color: #fff;

		.vicp-wrap {
			z-index: 0;
			width: 100%;
			height: 100%;
			position: absolute;
			padding: 0;
			border: 0;
			top: 0;
			left: 0;
			margin: 0;
			border: 0;
			animation: none;

			.vicp-step1 {
				margin: 20px 0px 0px 20px;
				width: 240px;
				height: 240px;
				border-radius: 4px;
				border: 1px solid #e5e9ef;
				background: #f1f2f5;


				.vicp-drop-area {
					width: 100%;
					height: 100%;

					.vicp-icon1 {
						margin: 40px auto 0;
					}
				}
			}

			.vicp-crop {
				margin-top: 20px;
				margin-left: 20px;
			}

			.vicp-close {
				display: none;
			}
			.vicp-upload {
				border: none !important;
				background-color: #fff !important;
				width: 450px;
			}
		}
	}
	
	.vicp-preview-item {
		margin-right: 280px !important;
		margin-top: 20px !important;
	}

</style>