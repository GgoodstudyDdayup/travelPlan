// pages/qianzheng/qianzheng.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    img:'../img/WechatIMG1085@2x.png'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  saveImg() {
    let that = this
    let imgSrc = that.data.img
    that.shouquan(imgSrc)
  },
  shouquan(imgSrc) {
    let that = this
    wx.getSetting({
      success(res) {
        console.log(!res.authSetting['scope.writePhotosAlbum'])
        if (!res.authSetting['scope.writePhotosAlbum']) {
          wx.authorize({
            scope: 'scope.writePhotosAlbum',
            success(res) {
              console.log(res)
              // 用户已经同意小程序使用录音功能，后续调用 wx.startRecord 接口不会弹窗询问
              that.fileload(imgSrc)
            }
          })
        } else {
          that.fileload(imgSrc)
        }
      }
    })
  },
  fileload(imgSrc) {
    wx.showLoading({
      title: '保存中...',
      mask: true,
    })
    wx.downloadFile({
      url: imgSrc,
      success: function(res) {
        console.log(res);
        //图片保存到本地
        wx.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
          success: function(data) {
            wx.hideLoading()
            wx.showToast({
              title: '保存成功',
              icon: 'success',
              duration: 2000
            })
          },
          fail: function(err) {
            console.log(err);
            if (err.errMsg === "saveImageToPhotosAlbum:fail auth deny") {
              console.log("当初用户拒绝，再次发起授权")

            }
          },
          complete(res) {
            console.log(res);
          }
        })
      }
    })
  }
})