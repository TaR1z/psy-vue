<!-- 首页页面 -->
<template>
	<div>
		<home-carousel :imageList="imageList"></home-carousel>
	</div>
</template>

<script>
	import HomeCarousel from '_c/carousel'
	export default {
		name: 'home',
		data () {
			return {
				imageList: [
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
		components: {
			HomeCarousel
		}
	}
</script>
<style lang="less" scoped>

</style>