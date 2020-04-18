<template>
	<view class="container">
		<!-- 小程序头部兼容 -->
		<!-- #ifdef MP -->
		<view class="mp-search-box">
			<input class="ser-input" type="text" value="输入关键字搜索" disabled />
		</view>
		<!-- #endif -->
		
		<!-- 头部轮播 -->
		<carousel-section :carouselList="carouselList" @navToDetailPage="navToDetailPage"></carousel-section>
		<!-- 分类 -->
		<cate-section></cate-section>
		
		<view class="ad-1">
			<image src="/static/temp/ad1.jpg" mode="scaleToFill"></image>
		</view>
		
		<!-- 秒杀楼层 -->
		<seckill-section :goodsList="goodsList" @navToDetailPage="navToDetailPage"></seckill-section>
		
		
		<!-- 团购楼层 -->
		<f-header tit="精品团购" tit2="Boutique Group Buying" titleImage="/static/temp/h1.png"></f-header>
		<group-section :goodsList="goodsList" @navToDetailPage="navToDetailPage"></group-section>

		
		<!-- 分类推荐楼层 -->
		<f-header tit="分类精选" tit2="Competitive Products For Yo" titleImage="/static/temp/h1.png"></f-header>
		<hot-floor :goodsList="goodsList" @navToDetailPage="navToDetailPage" :listType="1" :bgImage="'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1553409398864&di=4a12763adccf229133fb85193b7cc08f&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201703%2F19%2F20170319150032_MNwmn.jpeg'"></hot-floor>
		<hot-floor :goodsList="goodsList" @navToDetailPage="navToDetailPage" :listType="2" :bgImage="'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1553409984228&di=dee176242038c2d545b7690b303d65ea&imgtype=0&src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2F5ef4da9f17faaf4612f0d5046f4161e556e9bbcfdb5b-rHjf00_fw658'"></hot-floor>
		<hot-floor :goodsList="goodsList" @navToDetailPage="navToDetailPage" :listType="3" :bgImage="'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1553409794730&di=12b840ec4f5748ef06880b85ff63e34e&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F01dc03589ed568a8012060c82ac03c.jpg%40900w_1l_2o_100sh.jpg'"></hot-floor>
		
		
		

		<!-- 猜你喜欢 -->
		<f-header tit="猜你喜欢" tit2="Guess You Like It" titleImage="/static/temp/h1.png"></f-header>
		<guess-section :goodsList="goodsList" @navToDetailPage="navToDetailPage"></guess-section>
		

	</view>
</template>

<script>
	import carouselSection from '../../components/index/carousel-section.vue'
	import cateSection from '../../components/index/cate-section.vue'
	import seckillSection from '../../components/index/seckill-section.vue'
	import fHeader from '../../components/index/f-header.vue'
	import groupSection from '../../components/index/group-section.vue'
	import hotFloor from '../../components/index/hot-floor.vue'
	import guessSection from '../../components/index/guess-section.vue'
	export default {
		components:{
			carouselSection,
			cateSection,
			seckillSection,
			fHeader,
			groupSection,
			hotFloor,
			guessSection
		},
		data() {
			return {
				titleNViewBackground: '',
				swiperCurrent: 0,
				swiperLength: 0,
				carouselList: [],
				goodsList: []
			};
		},

		onLoad() {
			this.loadData();
		},
		methods: {
			/**
			 * 请求静态数据只是为了代码不那么乱
			 * 分次请求未作整合
			 */
			async loadData() {
				let carouselList = await this.$api.json('carouselList');
				this.titleNViewBackground = carouselList[0].background;
				this.swiperLength = carouselList.length;
				this.carouselList = carouselList;
				
				let goodsList = await this.$api.json('goodsList');
				this.goodsList = goodsList || [];
			},
			//轮播图切换修改背景色
			swiperChange(e) {
				const index = e.detail.current;
				this.swiperCurrent = index;
				this.titleNViewBackground = this.carouselList[index].background;
			},
			//详情页
			navToDetailPage(item) {
				//测试数据没有写id，用title代替
				let id = item.title;
				uni.navigateTo({
					url: `/pages/product/product?id=${id}`
				})
			},
		},
		// #ifndef MP
		// 标题栏input搜索框点击
		onNavigationBarSearchInputClicked: async function(e) {
			this.$api.msg('点击了搜索框');
		},
		//点击导航栏 buttons 时触发
		onNavigationBarButtonTap(e) {
			const index = e.index;
			if (index === 0) {
				this.$api.msg('点击了扫描');
			} else if (index === 1) {
				// #ifdef APP-PLUS
				const pages = getCurrentPages();
				const page = pages[pages.length - 1];
				const currentWebview = page.$getAppWebview();
				currentWebview.hideTitleNViewButtonRedDot({
					index
				});
				// #endif
				uni.navigateTo({
					url: '/pages/notice/notice'
				})
			}
		}
		// #endif
	}
</script>

<style lang="scss">
	/* #ifdef MP */
	.mp-search-box{
		position:absolute;
		left: 0;
		top: 30upx;
		z-index: 9999;
		width: 100%;
		padding: 0 80upx;
		.ser-input{
			flex:1;
			height: 56upx;
			line-height: 56upx;
			text-align: center;
			font-size: 28upx;
			color:$font-color-base;
			border-radius: 20px;
			background: rgba(255,255,255,.6);
		}
	}

	/* #endif */
	
	
	page {
		background: #f5f5f5;
	}
	
	.ad-1{
		width: 100%;
		height: 210upx;
		padding: 10upx 0;
		background: #fff;
		image{
			width:100%;
			height: 100%; 
		}
	}
	
	

</style>
