//首页
//获取应用实例
const app = getApp()

Page({
	data: {
		// 控制是否显示加载中
		isHidden: false,
		/*
		* 顶部轮播图的属性配置
		* */
		bannerUrls: [],
		indicatorDots: true,
		autoplay: true,
		interval: 3000,
		duration: 1000
	},
	onLoad: function () {
		// 请求banner数据
		wx.request({
			url: "https://api.octinn.com/banner",
			data: {
				pos:51,
				cityId:152900,
				r:'main'
			},
			header: {
				'content-type': 'application/json',
				'OI-APPKEY': 'b2fc67038bd1e30caf14850e926fb817'
			},
			success: res => {
				let imgsArr = []
				res.data.forEach((val) => {
					imgsArr.push(val.img_large)
				})
				this.setData({
					bannerUrls:imgsArr
				})
				console.log(this.data.bannerUrls)
			},
			fail: res => {
				wx.showToast({
					title: '失败',
					icon: 'success',
					duration: 2000
				})
			},
			complete: res => {
				this.setData({
					isHidden:!this.data.isHidden
				})
			}
		})
	}
})
