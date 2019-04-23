<template>
	<div class="myDraw-warpper">
		<div ref="myChart" class="myChart"></div>
		<div class="result" v-if="this.total">
			<p v-if="this.total >= 0 && this.total <= 4">
				心理非常健康，请你放心.
			</p>
			<p v-else-if="this.total >= 5 && this.total <= 8">
				你在心理方面有一些障碍，应采取适应的方法进行调适，阅读心理方面文章，或者找咨询师聊聊心.
			</p>
			<p v-else-if="this.total >= 9 && this.total <= 14">
				黄牌警告，有可能患有某些心理疾病，找咨询师进行检查和治疗.
			</p>
			<p v-else>
				有严重的心理障碍，需要及时药物治疗和心理放松.
			</p>
		</div>
		<div class="famous">
			All those moments will be lost in time,like tears in rain. 
		</div>
	</div>
</template>

<script>
	import { mapActions } from 'vuex'
	export default {
		data () {
			return {
				title: '',
				score: [],
				mark: [],
				total: 0
			}
		},
		mounted(){
			this.$nextTick(() => {
				this.queryHealth().then(res => {
					this.title = res.data.title
					this.score = res.data.score.split(',').map((v) => parseInt(v))
					this.mark = Array.from({length: this.score.length}).map((v,k) => k + 1)
					this.total = this.score.reduce((total, num) => { return total + num }, 0)
					this.drawLine()
				})
			})
		},
		methods: {
			...mapActions([
					'queryHealth'
				]),
			drawLine(){
				let myChart = this.$echarts.init(this.$refs.myChart)
				myChart.setOption({
					title: [{
						left: 'center',
						text: this.title,
						textStyle: {
							color: '#666',
							fontSize: 22
						}
					}],
					xAxis: {
						name: '题目编号',
						type: 'category',
						data: this.mark
					},
					yAxis: {
						name: '题目得分',
						type: 'value'
					},
					series: [
					{	
						data: this.score,
						type: 'line'
					}]
        		})
			}
		}	
	}	
</script>

<style lang="less" scoped>
	.myDraw-warpper {
		position: relative;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		overflow: hidden;

		.myChart {
			margin: 30px auto 0px;
			width: 90%;
			height: 400px;
		}

		.result {
			width: 100%;
			height: 80px;
			padding-left: 100px;
			padding-right: 40px;
			overflow: auto;

			& > p {
				font-size: 18px;
			}
		}

		.famous {
			position: absolute;
			right: 50px;
			bottom: 30px;
			font-size: 13px;
			color: #aaa;
			user-select: none;
		}
	}
</style>