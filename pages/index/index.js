//index.js
//获取应用实例
const app = getApp()
import Http from '../../utils/util'
Page({
  data: {
  },
  onLoad: function () {
    const that = this
    const date = that.getNowFormatDate()
    const parmas = {
      openid: wx.getStorageSync('openid')
    }
    Http.post(`plan/getlist`, parmas).then(res => {
      const outList = Object.keys(res.data.data).reduce((acc, key) => {
        acc.push({ time: key, data: res.data.data[key], date: res.data.data[key].date })
        return acc
      }, []);
      outList.forEach(res => {
        delete res.data.date
      })
      that.setData({
        outList,
        date,
        queue:res.data.queue
      })
      console.log(that.data.queue)
    })
  },
  getNowFormatDate() {
    let date = new Date();
    let seperator1 = "-";
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let strDate = date.getDate();
    if (month >= 1 && month <= 9) {
      month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
      strDate = "0" + strDate;
    }
    let currentdate = month + seperator1 + strDate;
    return currentdate;
  },
  Info(e) {
    console.log(e.currentTarget.dataset.name)
    switch (e.currentTarget.dataset.name) {
      case `plan`:
        wx.navigateTo({
          url: `../planinfo/planinfo?id=${e.currentTarget.dataset.id}`
        })
        break;
      case `hotel`:
        wx.navigateTo({
          url: `../hotel/hotel?id=${e.currentTarget.dataset.id}`
        })
        break
    }
  },
  loadImg() {
    wx.navigateTo({
      url: '../qianzheng/qianzheng',
    })
  },
  tel(e){
    console.log(e)
    wx.makePhoneCall({
      phoneNumber: `${e.currentTarget.dataset.tel}`
    })
  }
})
