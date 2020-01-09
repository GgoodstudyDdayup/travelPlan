const globalUrl = 'http://nt.liaozhifeng.cn/api/'
const post = (url, parms) => {
  let http = new Promise((resolve, reject) => {
    wx.request({
      url: `${globalUrl}${url}`,
      data: parms,
      method: 'POST',
      success: (e) => {
        resolve(e)
      },
      fail: (err) => {
        reject(err)
      }
    })
  })
  return http
}
const get = (url, parms) => {
  let http = new Promise((resolve, reject) => {
    wx.request({
      url: `${globalUrl}${url}`,
      data: parms,
      success: (e) => {
        resolve(e)
      },
      fail: (err) => {
        reject(err)
      }
    })
  })
  return http
}
const Http = {
  post,
  get
}
module.exports = Http 
