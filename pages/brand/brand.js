//brand.js
const util = require('../../utils/util.js')

Page({
  data: {
		// 控制是否显示加载中
		isHidden: false,
    // 品牌街List
    brandList: []
  },
  onLoad: function () {
    // 请求品牌街List数据
		wx.request({
			url: "https://api.octinn.com/store/brand/brand_item",
			data: {
				category:'cake',
				cityId:110100,
				r:'cakeBrand'
			},
			header: {
				'content-type': 'application/json',
				'OI-APPKEY': 'b2fc67038bd1e30caf14850e926fb817'
			},
			success: res => {
			  let imgsArr = []
				res.data.items.forEach((val) => {
					let {id,img,name} = val
					imgsArr.push(val)
				})
				this.setData({
					brandList:imgsArr
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
  }
})
