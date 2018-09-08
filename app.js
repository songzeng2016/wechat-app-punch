//app.js
App({
  onLaunch: function () {
    wx.BaaS = requirePlugin('sdkPlugin')
    //让插件帮助完成登录、支付等功能
    wx.BaaS.wxExtend(wx.login,
      wx.getUserInfo,
      wx.requestPayment)

    let clientID = '2704954efed61b4da75e'
    wx.BaaS.init(clientID)
  },
  globalData: {
    userInfo: null
  }
})