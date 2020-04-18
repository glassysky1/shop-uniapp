<template>
	<view class="cate-section">
		<view class="cate-item">
			<image src="/static/temp/c3.png"></image>
			<text>环球美食</text>
		</view>
		<view class="cate-item">
			<image src="/static/temp/c5.png"></image>
			<text>个护美妆</text>
		</view>
		<view class="cate-item">
			<image src="/static/temp/c6.png"></image>
			<text>营养保健</text>
		</view>
		<view class="cate-item">
			<image src="/static/temp/c7.png"></image>
			<text>家居厨卫</text>
		</view>
		<view class="cate-item">
			<image src="/static/temp/c8.png"></image>
			<text>速食生鲜</text>
		</view>
	</view>
</template>

<script></script>

<style scoped lang="scss">
/* #ifdef MP */
.cate-section {
	position: relative;
	z-index: 5;
	border-radius: 16upx 16upx 0 0;
	margin-top: -20upx;
}
/* #endif */
.cate-section {
	display: flex;
	justify-content: space-around;
	align-items: center;
	flex-wrap: wrap;
	padding: 30upx 22upx;
	background: #fff;
	.cate-item {
		display: flex;
		flex-direction: column;
		align-items: center;
		font-size: $font-sm + 2upx;
		color: $font-color-dark;
	}
	/* 原图标颜色太深,不想改图了,所以加了透明度 */
	image {
		width: 88upx;
		height: 88upx;
		margin-bottom: 14upx;
		border-radius: 50%;
		opacity: 0.7;
		box-shadow: 4upx 4upx 20upx rgba(250, 67, 106, 0.3);
	}
}
</style>
