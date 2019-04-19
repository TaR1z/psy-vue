<template>
	<div class="chat-wrapper">
		<div class="l-wrapper">
			<template v-for="value, key in chats">
				<div class="list-item" :key="key" @click="targetClick(value, key)">
					<Badge :count="targetNews(key)" style="float: left;" :offset="[4, 18]">
						<img :src="targetAvatar(value)">
					</Badge>
					<div class="title">
						<h1 v-text="targetName(value)"></h1>
						<p v-text="lastMsg(value)"></p>
					</div>
				</div>
			</template>
		</div>
		<div class="mid-hr"></div>
		<div class="r-wrapper" v-if="record.length">
			<h1 v-text="targetName(record)"></h1>
			<div class="top" ref="talkContent">
				<template v-for="item in record">
					<div :class="directionNews(item)" :key="item.id">
						<div class="news" v-text="item.content"></div>
					</div>
				</template>
			</div>
			<div class="bottom" style="padding: 0px 1px;">
				 <Input v-model="inputVal" type="textarea" :autofocus="true" :rows="4"  style="margin-bottom: 3px;" />
				 <Button type="primary" long @click="handleSumbit">发送</Button>
			</div>
		</div>
	</div>
</template>

<script>
	import { classify } from '@/lib/chatHandle'
	import { mapActions, mapState } from 'vuex'
	export default {
		data () {
			return {
				chats: {},
				record: [],
				inputVal: '',
				clickAccount: ''
			}
		},
		created () {
			this.chatsAll().then(res => {
				this.chats = classify(res.data, this.account)
			})
		},
		watch: {
			letters (newVal, oldVal) {
				let difIndex = []
				let oldIndex = []
				let newIndex = []
				let addCont = []
				for (let i = 0; i < oldVal.length; i ++) {
					oldIndex.push(oldVal[i].id)
				}
				for (let i = 0; i < newVal.length; i ++) {
					newIndex.push(newVal[i].id)
				}
				for (let i = 0; i < newIndex.length; i ++) {
					if (!oldIndex.includes(newIndex[i])) {
						difIndex.push(i)
					} 
				}
				if (difIndex.length) {
					for (let i = 0; i < difIndex.length; i ++) {
						addCont.push(newVal[difIndex[i]])
					}
					for (let i = 0; i < addCont.length; i ++) {
						let newAccount = addCont[i]['from_account']
						if (this.chats[newAccount]) {
							this.chats[newAccount].push(addCont[i])
							if (this.clickAccount == newAccount) {
								this.changeStatus({
									id: addCont[i].id
								}).then(res => {
									// success options
								}).catch(err => {
									// error options
								})
							}
							this.$nextTick(() => {
								this.$refs.talkContent.scrollTop = this.$refs.talkContent.scrollHeight
							})
						} else {
							this.chats[newAccount] = []
							this.chats[newAccount].push(addCont[i])
						}
					}
				}
			}
		},
		methods: {
			...mapActions([
					'chatsAll',
					'changeStatus',
					'sendLetter'
				]),
			targetClick (value, key) {
				this.clickAccount = key
				this.record = value
				let idRange = []
				for (let i = 0; i < this.letters.length; i ++) {
					if (this.letters[i]['from_account'] == key) {
						idRange.push(this.letters[i].id)
					}
				}
				this.changeStatus({
					id: idRange.join()
				}).then(res => {
					// success options
				}).catch(err => {
					// error options
				})
				this.$nextTick(() => {
					this.$refs.talkContent.scrollTop = this.$refs.talkContent.scrollHeight
				})
			},
			targetName (val) {
				let len = val.length
				let lastIndex = len - 1
				if (val[lastIndex]['to_account'] == this.account) {
					return val[lastIndex]['from_name']
				} else {
					return val[lastIndex]['to_name']
				}
			},
			targetNews (key) {
				let count = 0
				for (let i = 0; i < this.letters.length; i ++) {
					if (this.letters[i]['from_account'] == key) {
						count ++
					}
				}
				return count
			},
			targetAvatar (val) {
				let len = val.length
				let lastIndex = len - 1
				if (val[lastIndex]['to_account'] == this.account) {
					return val[lastIndex]['from_avatar']
				} else {
					return val[lastIndex]['to_avatar']
				}
			},
			directionNews (val) {
				if (val['to_account'] == this.account) {
					return 'news-wrapper-l'
				} else {
					return 'news-wrapper-r'
				}
			},
			lastMsg (val) {
				let len = val.length
				let lastIndex = len - 1
				return val[lastIndex].content
			},
			handleSumbit () {
				this.inputVal = this.inputVal.replace(/\s*/g,'')
				if (!this.inputVal.replace(/\s*/g,'')) {
					this.$Message.error('内容不能为空！')
				} else {
					const created = this.$moment(new Date().getTime()).format('YYYY-MM-DD')
					const newLetter = {
						from_account: this.account,
						from_avatar: this.avatar,
						from_name: this.nickName,
						to_account: this.clickAccount,
						to_avatar: this.targetAvatar(this.record),
						to_name: this.targetName(this.record),
						content: this.inputVal,
						created
					}
					this.sendLetter(newLetter).then(res => {
						this.record.push(newLetter)
						this.$nextTick(() => {
							this.$refs.talkContent.scrollTop = this.$refs.talkContent.scrollHeight
						})
						this.inputVal = ''
						this.$Message.success(res.mes)
					}).catch(err => {
						this.$Message.error(err.mes)
					})
				}
			}
		},
		computed: {
			...mapState({
				account: state => state.user.account,
				letters: state => state.user.letters,
				avatar: state => state.user.avatarUrl,
				nickName: state => state.user.nickName
			})
		}
	}
</script>

<style lang="less" scoped>
	.chat-wrapper {
		position: absolute;
		left: 50%;
		top: 50%;
		width: 90%;
		height: 88%;
		transform: translate(-50%, -51%);
		background-color: #fff;
		border-radius: 8px;
		border: 1px solid #ccc;

		& > .l-wrapper {
			user-select: none;
			float: left;
			width: 30%;
			height: 100%;
			word-wrap: break-word;
			overflow-y: auto;
			border-radius: 8px 0px 0px 8px;
			background-color: #fff;

			& > .list-item {
				height: 75px;
				padding: 10px;
				width: 100%;
				cursor: pointer;

				&  img {
					height: 55px;
					width: 55px;
					border-radius: 4px;
					object-fit: cover;
					margin-right: 15px;
				}

				& > .title {
					& > p, & > h1 {
						overflow: hidden;
						white-space: nowrap;
						text-overflow: ellipsis;
					}

					& > p {
						color: #999;
					}

					& > h1 {
						margin-top: 5px;
						font-size: 16px;
						margin-bottom: 4px;
						font-weight: 600;
					}
				}

				&:hover {
					background-color: #ccc;
				}
			}
		}

		& > .mid-hr {
			float: left;
			width: 0.1%;
			height: 100%;
			background-color: #f1f1f1;
		}	

		& > .r-wrapper {
			float: left;
			width: 69.9%;
			height: 100%;

			& > h1 {
				color: #444; 
				font-size: 18px;  
				margin: 5px 0px; 
				padding-left: 15px; 
				border-bottom: 1px solid #ccc;
			}

			& > .top {
				padding: 15px;
				height: 68%;
				width: 100%;
				word-wrap: break-word;
				overflow-y: auto;
				
				& .news-wrapper-l {
					text-align: left;
					margin-bottom: 20px;
				}

				& .news-wrapper-r {
					text-align: right;
					margin-bottom: 20px;
				}

				&  .news {
					display: inline-block;
					padding: 5px 8px;
					font-size: 14px;
					max-width: 300px;
					line-height: 20px;
					background-color: lightgreen;
					border-radius: 4px;
				}

			}

			& > .bottom {
				height: 32%;
				width: 100%;
			}
		}
	}
</style>