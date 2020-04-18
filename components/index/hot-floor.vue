<template>
	<view class="hot-floor">
		<view class="floor-img-box">
			<image class="floor-img" :src="bgImage" mode="scaleToFill"></image>
		</view>
		<scroll-view class="floor-list" scroll-x>
			<view class="scoll-wrapper">
				<view 
					v-for="(item, index) in goodsList" :key="index"
					class="floor-item"
					@click="navToDetailPage(item)"
				>	
					
					<image v-if="listType===1" :src="item.image" mode="aspectFill"></image>
					<image v-if="listType===2" :src="item.image2" mode="aspectFill"></image>
					<image v-if="listType===3" :src="item.image3" mode="aspectFill"></image>
					<text class="title clamp">{{item.title}}</text>
					<text class="price">￥{{item.price}}</text>
				</view>
				<view class="more">
					<text>查看全部</text>
					<text>More+</text>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default{
		props:{
			goodsList:Array,
			listType:Number,
			bgImage:String
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
	// 分类推荐楼层
	.hot-floor{
		width: 100%;
		overflow: hidden;
		margin-bottom: 20upx;
		.floor-img-box{
			width: 100%;
			height:320upx;
			position:relative;
			&:after{
				content: '';
				position:absolute;
				left: 0;
				top: 0;
				width: 100%;
				height: 100%;
				background: linear-gradient(rgba(255,255,255,.06) 30%, #f8f8f8);
			}
		}
		.floor-img{
			width: 100%;
			height: 100%;
		}
		.floor-list{
			white-space: nowrap;
			padding: 20upx;
			padding-right: 50upx;
			border-radius: 6upx;
			margin-top:-140upx;
			margin-left: 30upx;
			background: #fff;
			box-shadow: 1px 1px 5px rgba(0,0,0,.2);
			position: relative;
			z-index: 1;
		}
		.scoll-wrapper{
			display:flex;
			align-items: flex-start;
		}
		.floor-item{
			width: 180upx;
			margin-right: 20upx;
			font-size: $font-sm+2upx;
			color: $font-color-dark;
			line-height: 1.8;
			image{
				width: 180upx;
				height: 180upx;
				border-radius: 6upx;
			}
			.price{
				color: $uni-color-primary;
			}
		}
		.more{
			display:flex;
			align-items: center;
			justify-content: center;
			flex-direction: column;
			flex-shrink: 0;
			width: 180upx;
			height: 180upx;
			border-radius: 6upx;
			background: #f3f3f3;
			font-size: $font-base;
			color: $font-color-light;
			text:first-child{
				margin-bottom: 4upx;
			}
		}
	}
</style>
