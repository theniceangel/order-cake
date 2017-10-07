import Promise from './promise.js'

const http = (method,url,data = {},header = {}) => {
	return new Promise ((resolve, reject) => {
		let params = {
			url,
			method,
			data,
			header,
			success (res) {
				resolve(res.data)
			},
			fail (err) {
				reject(err)
			}
		}
		wx.request(params)
	})
}
module.exports = http