// pages/welcome/welcome.js
const app = getApp()
import Http from "../../utils/util"
Page({
  data: {
  },
  onLoad() {
    const that = this
    if (wx.getStorageSync('openid')) {
      wx.reLaunch({
        url: '../index/index',
      })
    } else {
      wx.login({
        success(res) {
          Http.post('user/login', { code: `${res.code}` }).then(res => {
            switch (res.data.code) {
              case 0:
                wx.showToast({
                  title: '获取失败',
                })
                break;
              case 1:
                wx.setStorageSync('openid', res.data.data.openid)
                that.setData({
                  openid: res.data.data.openid
                })
                break
              case 2:
                wx.reLaunch({
                  url: '../index/index',
                })
            }
          })
        }
      })
    }
  },
  formSubmit(e) {
    console.log(wx.getStorageSync('openid'))
    const that = this
    const filter = {
      passport: e.detail.value.code,
      username: `${e.detail.value.user}${e.detail.value.name}`,
      openid: `${that.data.openid}`
    }
    this.onGotUserInfo(filter)
  },
  onGotUserInfo(int) {
    const that = this
    Http.post(`user/dologin`, int).then(e => {
      if (e.data.code == 1) {
        wx.showToast({
          title: '登录成功',
        })
        setTimeout(() => {
          wx.reLaunch({
            url: '../index/index',
          })
        }, 1000);
      } else {
        wx.showToast({
          title: `${e.data.msg}`,
        })
      }
    })
  }
})