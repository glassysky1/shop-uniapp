<template>
	<view class="group-section">
		<swiper class="g-swiper" :duration="500">
			<swiper-item
				class="g-swiper-item"
				v-for="(item, index) in goodsList" :key="index"
				v-if="index%2 === 0"
				@click="navToDetailPage(item)"
			>
				<view class="g-item left">
					<image :src="item.image" mode="aspectFill"></image>
					<view class="t-box">
						<text class="title clamp">{{item.title}}</text>
						<view class="price-box">
							<text class="price">￥{{item.price}}</text> 
							<text class="m-price">￥188</text> 
						</view>
						
						<view class="pro-box">
						  	<view class="progress-box">
						  		<progress percent="72" activeColor="#fa436a" active stroke-width="6" />
						  	</view>
							<text>6人成团</text>
						</view>
					</view>
					            
				</view>
				<view class="g-item right">
					<image :src="goodsList[index+1].image" mode="aspectFill"></image>
					<view class="t-box">
						<text class="title clamp">{{goodsList[index+1].title}}</text>
						<view class="price-box">
							<text class="price">￥{{goodsList[index+1].price}}</text> 
							<text class="m-price">￥188</text> 
						</view>
						<view class="pro-box">
						  	<view class="progress-box">
						  		<progress percent="72" activeColor="#fa436a" active stroke-width="6" />
						  	</view>
							<text>10人成团</text>
						</view>
					</view>
				</view>
			</swiper-item>
	
		</swiper>
	</view>
</template>

<script>
	export default{
		props:{
			goodsList:Array
		},
		methods:{
			//详情页
			navToDetailPage(item) {
				console.log(1)
				//测试数据没有写id，用title代替
				this.$emit('navToDetailPage',item)
			},
		}
	}
</script>

<style scoped lang="scss">
	.group-section{
		background: #fff;
		.g-swiper{
			height: 650upx;
			padding-bottom: 30upx;
		}
		.g-swiper-item{
			width: 100%;
			padding: 0 30upx;
			display:flex;
		}
		image{
			width: 100%;
			height: 460upx;
			border-radius: 4px;
		}
		.g-item{
			display:flex;
			flex-direction: column;
			overflow:hidden;
		}
		.left{
			flex: 1.2;
			margin-right: 24upx;
			.t-box{
				padding-top: 20upx;
			}
		}
		.right{
			flex: 0.8;
			flex-direction: column-reverse;
			.t-box{
				padding-bottom: 20upx;
			}
		}
		.t-box{
			height: 160upx;
			font-size: $font-base+2upx;
			color: $font-color-dark;
			line-height: 1.6;
		}
		.price{
			color:$uni-color-primary;
		}
		.m-price{
			font-size: $font-sm+2upx;
			text-decoration: line-through;
			color: $font-color-light;
			margin-left: 8upx;
		}
		.pro-box{
			display:flex;
			align-items:center;
			margin-top: 10upx;
			font-size: $font-sm;
			color: $font-base;
			padding-right: 10upx;
		}
		.progress-box{
			flex: 1;
			border-radius: 10px;
			overflow: hidden;
			margin-right: 8upx;
		}
	}
</style>
