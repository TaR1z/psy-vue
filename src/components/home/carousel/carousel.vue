<template>
	<Carousel autoplay v-model="index" :height="height" loop>
		<CarouselItem v-for="item in imageList" :key="item.id">
			<router-link :to="{ name: item.name, query: { id: item.id } }" tag='img' class="demo-carousel" :style="{ backgroundImage: 'url(' + item.url + ')' }">
			</router-link>
		</CarouselItem>
	</Carousel>
</template>

<script>
	export default {
		props: {
			imageList: {
				type: Array,
				default: () => {
					return [
						{
							id: 1,
							name: 'consult',
							url: require('@/assets/img/home/carousel/1.jpg')
						},
						{
							id: 2,
							name: 'read',
							url: require('@/assets/img/home/carousel/2.jpg')
						},
						{
							id: 3,
							name: 'test',
							url: require('@/assets/img/home/carousel/3.jpg')
						}
					]
				}
			},
			value: {
				type: Number,
				default: 0
			},
			height: {
				type: Number,
				default: 300
			}
		},
		data () {
			return {
				index: this.value
			}
		}
	}
</script>

<style lang="less" scoped>
	.ivu-carousel-item {
		.demo-carousel {
			background-position: center top;
			height: 100%;
			cursor: pointer;
			width: 100%;;
		}
	}
</style>
