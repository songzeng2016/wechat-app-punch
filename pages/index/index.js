//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function() {

    let tableID = 51019
    // 实例化查询对象
    let query = new wx.BaaS.Query()

    query.compare('userId', '=', '0')

    // 应用查询对象
    let Product = new wx.BaaS.TableObject(tableID)
    Product.setQuery(query).find().then(res => {
      // success
    }, err => {
      // err
    })

    // 不设置查询条件
    Product.find().then()

    // let data = {
    //   userId: '0',
    //   year: '2018',
    //   month: '9',
    //   day: '8',
    // }
    // let bookName = this.data.creatingBookName // 缓存在 data 对象中的输入框输入的书名
    // let tableID = '51019' // 从知晓云后台的数据表中获取到的对应数据表的 ID
    // let Books = new wx.BaaS.TableObject(tableID) //实例化对应 tableID 的数据表对象
    // let book = Books.create() // 创建一条记录

    // // 调用创建数据项接口，进行数据的持久化存储，详见：https://doc.minapp.com/js-sdk/schema/create-record.html
    // book.set( data )
    //   .save()
    //   .then(() => {
    //     //...
    //   })

    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})