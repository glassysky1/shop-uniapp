<template>
	<view class="f-header m-t">
		<image :src="titleImage"></image>
		<view class="tit-box">
			<text class="tit">{{tit}}</text>
			<text class="tit2">{{tit2}}</text>
		</view>
		<text class="yticon icon-you"></text>
	</view>
</template>

<script>
	export default{
		props:{
			tit:String,
			tit2:String,
			titleImage:String
		}
	}
</script>

<style scoped lang="scss">
	.m-t{
		margin-top: 16upx;
	}
	.f-header{
		display:flex;
		align-items:center;
		height: 140upx;
		padding: 6upx 30upx 8upx;
		background: #fff;
		image{
			flex-shrink: 0;
			width: 80upx;
			height: 80upx;
			margin-right: 20upx;
		}
		.tit-box{
			flex: 1;
			display: flex;
			flex-direction: column;
		}
		.tit{
			font-size: $font-lg +2upx;
			color: #font-color-dark;
			line-height: 1.3;
		}
		.tit2{
			font-size: $font-sm;
			color: $font-color-light;
		}
		.icon-you{
			font-size: $font-lg +2upx;
			color: $font-color-light;
		}
	}
</style>
