<template>
	<div class="article-wrapper-obj" v-if="article">
		<div class="top">
			<p class="title" v-text="article.title"></p>
			<div class="first-tag">
				<span v-text="article.kinds"></span>
			</div>
			<div class="info">
				<span v-text="`发布时间：${article.created}`"></span>
				<span class="author" v-text="`作者：${article.author}`"></span>
				<span class="views">
					<Icon type="ios-eye" size="18"></Icon>{{ article.views }}阅读
				</span>
			</div>
		</div>
		<div class="content">
			<div class="conver">
				<img class="article-cover" :src="article.cover_image">
			</div>
			<div class="editor" v-html="article.content">
			</div>
		</div>
	</div>
</template>

<script>
	import { mapActions } from 'vuex'
	export default {
		data () {
			return {
				article: null
			}
		},
		created () {
			const id = this.$route.query.id
			this.addViews({id})
			this.searchId({id}).then(res => {
				this.article = res.data[0]
			}).catch(error => {
				this.$Message.error(error.mes)
				this.$router.push({
					name: 'read'
				})
			})
		},
		methods: {
			...mapActions([
					'searchId',
					'addViews'
				])
		}
	}
</script>

<style lang="less">
	.article-wrapper-obj {
		margin-bottom: 20px;
		.top {
			padding-top: 20px;

			.title {
				margin-top: 5px;
				font-size: 22px;
				color: #333;
				font-weight: 700;
			}

			.first-tag {
				margin-top: 20px;

				span {
					background: #ddefff;
					border-radius: 6px;
					padding: 2px 7px;
					font-size: 14px;
					color: #6c798c;
				}
			}

			.info {
				margin-top: 20px;

				span {
					font-size: 14px;
					color: #999;
				}

				.author {
					padding-left: 50px;
				}

				.views {
					padding-left: 50px;
				}
			}
		}

		.content {
			padding: 0 80px;
			margin-top: 60px;

			.article-cover {
				max-width: 100%;
			}

			.editor {
				margin-top: 30px;
				font-size: 16px;
				line-height: 1.8;
				word-break: break-all;
				color: #444;

				& img {
					display: block;
					max-width: 90%;
					margin: 0 auto;
				}
			}
		}
	}
</style>