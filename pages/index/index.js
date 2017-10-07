//首页
//获取应用实例
const app = getApp()

Page({
	data: {
		// 控制是否显示加载中
		isHidden: false,
		winWidth: 0,
		/*
		* 顶部轮播图的属性配置
		* */
		bannerUrls: [],
		indicatorDots: true,
		autoplay: true,
		interval: 3000,
		duration: 1000,
		circular: true,
		/* 搜索部分*/
		hideSearch: true,
		/* 分类*/
		categoryIcons : [{
			title: '限时抢购',
			imgUrl: '../../assets/images/category-icon1.png'
		},{
			title: '当天到达',
			imgUrl: '../../assets/images/category-icon2.png'
		},{
			title: '新人礼券',
			imgUrl: '../../assets/images/category-icon3.png'
		},{
			title: '全部商品',
			imgUrl: '../../assets/images/category-icon4.png'
		},{
			title: '水果蛋糕',
			imgUrl: '../../assets/images/category-icon5.png'
		},{
			title: '奶油蛋糕',
			imgUrl: '../../assets/images/category-icon6.png'
		},{
			title: '创意蛋糕',
			imgUrl: '../../assets/images/category-icon7.png'
		},{
			title: '新品推荐',
			imgUrl: '../../assets/images/category-icon8.png'
		}],
		// 品牌街
		brandList: [],
		// 推荐列表
		recommendList: []
	},
	onLoad: function () {
		let that = this
		// 请求banner数据
		wx.request({
			url: "https://api.octinn.com/banner",
			data: {
				pos:51,
				cityId:110100,
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
		});
		// 请求品牌街数据
		wx.request({
			url: "https://api.octinn.com/store/brand/brand_item",
			data: {
				category:"cake",
				cityId:110100,
				r:'main'
			},
			header: {
				'content-type': 'application/json',
				'OI-APPKEY': 'b2fc67038bd1e30caf14850e926fb817'
			},
			success: res => {
				let genArray = []
				res.data.items.forEach((val) => {
					let {uri,img} = val
					genArray.push({
						uri,
						imgUrl:img
					})
				})
				this.setData({
					brandList:genArray
				})
			},
			fail: res => {
				wx.showToast({
					title: '失败',
					icon: 'success',
					duration: 2000
				})
			}
		})
		// 请求推荐商品数据
		wx.request({
			url: "https://api.octinn.com/store/rec",
			data: {
				cate: 'cake',
				cityId: 110100,
				r: 'main',
				page: 0,
				limit: 20
			},
			header: {
				'content-type': 'application/json',
				'OI-APPKEY': 'b2fc67038bd1e30caf14850e926fb817'
			},
			success: res => {
				let genArr = []
				res.data.items.forEach((val) => {
					let {id,img,name,brandName,skuPrice,oriPrice,info1,info2} = val
					genArr.push({id,img,name,brandName,skuPrice,oriPrice,info1,info2})
				})
				this.setData({
					recommendList: genArr
				})
			},
			fail: res => {
				wx.showToast({
					title: '失败',
					icon: 'success',
					duration: 2000
				})
			}
		});
	},
	// 页面函数部分
	showSearchBtn() {
		this.setData({
			hideSearch:false
		})
	},
	hideSearchBtn() {
		this.setData({
			hideSearch:true
		})
	}
})
