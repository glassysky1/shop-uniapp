/**
 * 全局封装请求
 */
import enums from '@/libs/enums.js'

const UploadUrl = enums.uploadUrl
const DOMAIN_REQUEST_PATH = enums.DOMAIN_REQUEST_PATH

	/*上传图片 并返回图片地址*/
	const fetch4UploadImg = (filePath) => {

		return new Promise((resolve, reject) => {


			uni.uploadFile({
				url: UploadUrl,
				filePath: filePath,
				name: 'file',
				formData: {
					type: 'image/*',
					name: 'file.jpg'
				},
				success: (res) => {
					var status = res.statusCode
					if (status == 200) {
						var data = JSON.parse(res.data)
						var imgUrl = data.filePath
						resolve({
							'imgUrl': imgUrl
						});
					} else {
						resolve({
							'imgUrl': ''
						})
					}
				},
				fail() {
					resolve({
						'imgUrl': ''
					})
				}
			});
		})
	}
/**
 * 请求别的服务地址
 */

const fetch4DirectlyUrl = (url = url, data = data || {}, method = method || 'GET') => {
	return new Promise((resolve, reject) => {
		uni.request({
			url: url,
			method: method,
			data: data,
			header: {
				'ACCESS-TOKEN': uni.getStorageSync('token'),
				'content-type': 'application/json'
			},
			success: res => {
				let resData = {}
				if(res.statusCode == 200){
					//代表数据请求正常--直接返回报文信息
					if(resData.code == undefined){
						resData.code = '200'
						resData.body = res.data
						resData.msg='获取成功'
					}else{
						resData = res.data
					}
				}else if(res.statusCode == 500){
					//说明请求数据有误 --如需公共处理可以在这边直接处理  需要页面单独处理的可在页面根据code处理
					resData = res.data
				}
				resolve(resData);
							
			},
			fail: (err) => {
				reject(err)
			},
			complete: () => {}
		});
	})
}

/**
 * 同时返回完整的业务CODE及BODY信息。表单提交
 */

const formFetch4Resp = (url = url, data = data || {}, method = method || 'GET') => {
	return new Promise((resolve, reject) => {
		url = DOMAIN_REQUEST_PATH + url
		let token = ''
		if (uni.getStorageSync('isLogin') == true) {
			token = uni.getStorageSync('token')
		}
		uni.request({
			url: url,
			method: method,
			data: data,
			header: {
				'content-type': 'application/x-www-form-urlencoded',
				'ACCESS-TOKEN': token
			},
			success: res => {
				uni.stopPullDownRefresh()
				let resData = {}
				if(res.statusCode == 200){
					//代表数据请求正常--直接返回报文信息
					resData.code = '200'
					resData.body = res.data
					resData.msg='获取成功'
				}else if(res.statusCode == 500){
					//说明请求数据有误 --如需公共处理可以在这边直接处理  需要页面单独处理的可在页面根据code处理
					resData = res.data
				}
				resolve(resData);
			},
			fail: (err) => {
				reject(err)
			},
			complete: () => {}
		});
	})
}

/**
 * 同时返回完整的业务CODE及BODY信息。
 */
const fetch4Resp = (url = url, data = data || {}, method = method || 'GET') => {
	return new Promise((resolve, reject) => {
		url = DOMAIN_REQUEST_PATH + url
		uni.request({
			url: url,
			method: method,
			data: data,
			header: {
				'ACCESS-TOKEN': uni.getStorageSync('token'),
				'content-type': 'application/json'
			},
			success: res => {
				let resData = {}
				if(res.statusCode == 200){
					//代表数据请求正常--直接返回报文信息
					resData.code = '200'
					resData.body = res.data
					resData.msg='获取成功'
				}else if(res.statusCode == 500){
					//说明请求数据有误 --如需公共处理可以在这边直接处理  需要页面单独处理的可在页面根据code处理
					resData = res.data
				}
				resolve(resData);
							
			},
			fail: (err) => {
				reject(err)
				console.log('888888------8')
				
			},
			complete: () => {}
		});
	})
}



const checkNewVersion = function() {
	//检查版本更新
	const updateManager = uni.getUpdateManager();
	updateManager.onCheckForUpdate(function(res) {
		if (res.hasUpdate) {
			updateManager.onUpdateReady(function() {
				uni.showModal({
					title: '更新提示',
					content: '新版本已经准备好，点击确定重新启动',
					showCancel: true,
					success: res => {
						if (res.confirm) {
							updateManager.applyUpdate();
						}
					}
				})
			})
			updateManager.onUpdateFailed(function() {
				uni.showModal({
					title: '提示',
					content: '检查到有新版本，但是下载失败，请检查网络设置',
					showCancel: false
				})
			})
		}
	})
}
//保存fromId 用于小程序推送--地址是之前项目的地址  还未更换
const saveFormId = function(formId) {
	console.log('formId', formId)
	
	if (formId != undefined && formId != 'the formId is a mock one') {
		// this.fetch4Resp('/dbl/v1/wxMini/save/' + fromId).then(res => {

		// })
	}
}

/*根据角色进行页面的处理*/
const changePortalPage = function(info) {


}
/*支付接口  还不确定能否用到  先不删除了*/
const pay = function(payType, orderNo, sceneType) {
	var req_data = {
		orderId: orderNo
	}
	var that = this
	if (payType == 1) {
		//微信支付
		// #ifdef MP-WEIXIN 
		req_data.flag = 'mini';
		this.fetch4Resp("/dbl/v1/order/wxPay", req_data, "POST").then(res => {
			uni.hideLoading()
			if (res.code == 200) {
				var data = res.body;
				uni.requestPayment({
					provider: 'wxpay',
					timeStamp: data.timeStamp.toString(),
					nonceStr: data.nonceStr.toString(),
					package: data.package.toString(),
					signType: data.signType.toString(),
					paySign: data.sign.toString(),
					success: function(res) {
						console.log('success:' + JSON.stringify(res));
						that.paySuccessNavToPage(sceneType)
					},
					fail: function(err) {
						console.log('fail:' + JSON.stringify(err));
						uni.showToast({
							title: '支付异常，请稍后再试',
							icon: 'none'
						});
					}
				});
			} else {
				uni.showToast({
					title: '支付异常，请稍后再试',
					icon: 'none'
				});
			}
		})
		// #endif 

		// #ifdef APP-PLUS 
		req_data.flag = 'app';
		var that = this
		this.fetch4Resp("/dbl/v1/order/wxPay", req_data, "POST").then(res => {
			uni.hideLoading()
			if (res.code == 200) {
				var data = res.body;
				var payData = {
					appid: data.appid.toString(),
					partnerid: data.partnerid.toString(),
					prepayid: data.prepayid.toString(),
					package: data.package.toString(),
					noncestr: data.noncestr.toString(),
					timestamp: data.timestamp.toString(),
					sign: data.sign.toString()
				}
				uni.requestPayment({
					provider: 'wxpay',
					orderInfo: JSON.stringify(payData),
					success: function(res) {
						console.log('success:' + JSON.stringify(res));
						that.paySuccessNavToPage(sceneType)

					},
					fail: function(err) {
						console.log('fail:' + JSON.stringify(err));
						uni.showToast({
							title: '支付异常，请稍后再试',
							icon: 'none'
						});
					}
				});
			} else {
				uni.showToast({
					title: '支付异常，请稍后再试',
					icon: 'none'
				});
			}
		})
		// #endif 
	} else if (payType == 2) {
		//支付宝支付
		var that = this
		this.fetch4Resp("/dbl/v1/order/aliPay", req_data, "POST").then(res => {
			uni.hideLoading()
			if (res.code == 200) {
				var data = res.body;
				uni.requestPayment({
					provider: 'alipay',
					orderInfo: data.orderInfo,
					success: function(res) {
						console.log('success:' + JSON.stringify(res));
						that.paySuccessNavToPage(sceneType)
					},
					fail: function(err) {
						uni.$emit('refreshCashier', {})
						console.log('fail:' + JSON.stringify(err));
						uni.showToast({
							title: '支付异常，请稍后再试',
							icon: 'none'
						});
					}
				});
			} else {
				uni.$emit('refreshCashier', {})
				uni.showToast({
					title: '支付异常，请稍后再试',
					icon: 'none'
				});
			}
		})
	} else if (payType == 3) {
		//余额支付

		this.fetch4Resp("/dbl/v1/order/account", req_data, 'POST').then(res => {
			uni.hideLoading()

			let code = res.code;
			if (code == 200) {
				that.paySuccessNavToPage(sceneType)
			} else if (code == 2001) {
				uni.$emit('refreshCashier', {})
				uni.showToast({
					title: '支付失败，您的账户余额不足',
					icon: 'none'
				});
			} else {
				uni.$emit('refreshCashier', {})
				uni.showToast({
					title: '支付异常，请稍后再试',
					icon: 'none'
				});
			}
		})
	} else if (payType == 4) {
		//余额支付  
		this.fetch4Resp("/dbl/v1/order/mili", req_data, 'POST').then(res => {
			uni.hideLoading()
			let code = res.code;

			if (code == 200) {
				that.paySuccessNavToPage(sceneType)
			} else if (code == 2001) {
				uni.$emit('refreshCashier', {})
				uni.showToast({
					title: '支付失败，您的米粒不足',
					icon: 'none'
				});
			} else {
				uni.$emit('refreshCashier', {})
				uni.showToast({
					title: '支付异常，请稍后再试',
					icon: 'none'
				});
			}

		})

	}
}
//支付成功跳转页面
const paySuccessNavToPage = function(sceneType) {
	var that = this
	uni.showToast({
		title: '支付成功',
		complete() {
			that.navToPage(sceneType)
		}

	})
}
const navToPage = function(sceneType) {

	console.log('支付成功', sceneType)

}
//把本地缓存置为空
const clearUserStorage = function() {
	
	uni.setStorage({
		data: '',
		key: 'token'
	})
	uni.setStorage({
		data: '',
		key: 'currentUserInfo'
	})
	uni.setStorage({
		key: 'isLogin',
		data: false
	})
	uni.setStorage({
		key: 'childIndex',
		data: '0'
	})
	uni.removeStorageSync('childList')
	uni.removeStorageSync('roles')
	uni.removeStorageSync('currentRole')
}

Promise.prototype.finally = function(callback) {
	var Promise = this.constructor;
	return this.then(
		function(value) {
			Promise.resolve(callback()).then(
				function() {
					return value;
				}
			);
		},
		function(reason) {
			Promise.resolve(callback()).then(
				function() {
					throw reason;
				}
			);
		}
	);
}
/**
 * 为H5初始化与用户Token相关的必须的环境：需要严格判断情况。
 * @param {Object} token
 */
const setUserEnv4H5ByToken = function(token) {
	var that = this;
	let currentToken = uni.getStorageSync('token');
	if (token != undefined && currentToken == token) {
		//构造需要currentUserInfo	
		uni.setStorage({
			key: 'token',
			data: token,
			success() {
				/*获取个人信息 */
				api.getCurrentUserInfo('').then(res => {
					var info = res.params;
					uni.setStorage({
						key: 'currentUserInfo',
						data: info,
					})
				})
			}
		})
		uni.setStorage({
			key: 'isLogin',
			data: true
		})
	}
}

const replaceUrlSpecialChar=function(urlStr){
	return encodeURIComponent(urlStr);//.replace("/?/g","::").replace("/&/g",";;");
}
const De_replaceUrlSpecialChar=function(urlStr){
	return decodeURIComponent(urlStr);//.replace("/::/g","?").replace("/;;/g","&");
}


export default {
	fetch4Resp,
	pay,
	saveFormId,
	changePortalPage,
	paySuccessNavToPage,
	navToPage,
	formFetch4Resp,
	fetch4UploadImg,
	clearUserStorage,
	setUserEnv4H5ByToken,
	checkNewVersion,
	fetch4DirectlyUrl,
	replaceUrlSpecialChar,
	De_replaceUrlSpecialChar
}
