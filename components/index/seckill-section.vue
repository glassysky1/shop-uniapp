<template>
	<view class="seckill-section m-t">
		<view class="s-header">
			<image class="s-img" src="/static/temp/secskill-img.jpg" mode="widthFix"></image>
			<text class="tip">8点场</text>
			<text class="hour timer">07</text>
			<text class="minute timer">13</text>
			<text class="second timer">55</text>
			<text class="yticon icon-you"></text>
		</view>
		<scroll-view class="floor-list" scroll-x>
			<view class="scoll-wrapper">
				<view 
					v-for="(item, index) in goodsList" :key="index"
					class="floor-item"
					@click="navToDetailPage(item)"
				>
					<image :src="item.image" mode="aspectFill"></image>
					<text class="title clamp">{{item.title}}</text>
					<text class="price">￥{{item.price}}</text>
				</view>
			</view>
		</scroll-view>
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
	.m-t{
		margin-top: 16upx;
	}
	.seckill-section{
		padding: 4upx 30upx 24upx;
		background: #fff;
		.s-header{
			display:flex;
			align-items:center;
			height: 92upx;
			line-height: 1;
			.s-img{
				width: 140upx;
				height: 30upx;
			}
			.tip{
				font-size: $font-base;
				color: $font-color-light;
				margin: 0 20upx 0 40upx;
			}
			.timer{
				display:inline-block;
				width: 40upx;
				height: 36upx;
				text-align:center;
				line-height: 36upx;
				margin-right: 14upx;
				font-size: $font-sm+2upx;
				color: #fff;
				border-radius: 2px;
				background: rgba(0,0,0,.8);
			}
			.icon-you{
				font-size: $font-lg;
				color: $font-color-light;
				flex: 1;
				text-align: right;
			}
		}
		.floor-list{
			white-space: nowrap;
		}
		.scoll-wrapper{
			display:flex;
			align-items: flex-start;
		}
		.floor-item{
			width: 150upx;
			margin-right: 20upx;
			font-size: $font-sm+2upx;
			color: $font-color-dark;
			line-height: 1.8;
			image{
				width: 150upx;
				height: 150upx;
				border-radius: 6upx;
			}
			.price{
				color: $uni-color-primary;
			}
		}
	}
</style>
