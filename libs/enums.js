/**
 * Created by lizhipeng on 2018/5/18.
 */


export default {
	uploadUrl: 'https://k12api.gzeducard.com/fileupload/fileupload/partupload/edu',
	extH5Url:'https://k12.gzeducard.com',

	/*请求地址 测试与正式*/
	DOMAIN_REQUEST_PATH: "http://api.china-veteran.cn/",
	
	
	/*统一的自定义导航栏配置 （有自定义导航时可用）*/
	config: {
		title: "退休军人", //title					
		type: 2, //type 1，3胶囊 2，4无胶囊模式						
		transparent: false, //是否背景透明 默认白色					
		linear: false, //是为开启下滑渐变					
		share: false, //是否将主页按钮显示为分享按钮	
		bgcolor: "#FFFFFF", //背景颜色	
		fontcolor: "#333333",
		showBackBtn: true,
	},
	loginArr: [{
		text: "取消",
		type: "green",
		plain: true //是否空心
	}, {
		text: "登录",
		type: "green",
		plain: false
	}],
	mapKey: 'CLPBZ-M6CCF-GRAJB-N4FK6-TQQK2-TRBKA',
	
};
