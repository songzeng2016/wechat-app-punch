// pages/clock/clock.js

const tableID = 51019
let date = new Date()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    year: date.getFullYear(), // 年份
    month: date.getMonth() + 1, // 月份
    day: date.getDate(),

    days_style: [],
    clock: false,
    count: 0,
    userId: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.showLoading({
      title: 'loading',
    })
    // 微信用户登录小程序
    wx.BaaS.login(false).then(res => {
      // 登录成功
      const userId = res.openid
      let query = new wx.BaaS.Query()

      this.data.userId = userId
      query.compare('userId', '=', userId)

      // 应用查询对象
      let Product = new wx.BaaS.TableObject(tableID)
      Product.setQuery(query).find().then(res => {
        // success
        const list = res.data.objects

        const days_count = new Date(this.data.year, this.data.month, 0).getDate();
        let days_style = [];
        let clock = false;
        for (let i = 1; i <= days_count; i++) {
          let color = '#9487cd';
          let background;

          // 设置周末颜色
          if (new Date(`${this.data.year}-${this.padStartDate(this.data.month)}-${this.padStartDate(i)}`).getDay() === 0) {
            color = '#e99ecb';
          }

          list.forEach(item => {
            if (item.day === this.data.day) {
              clock = true;
            }
            if (item.day === i) {
              color = 'white';
              background = this.getRandomColor();
              return false;
            }
          });

          days_style.push({
            month: 'current',
            day: i,
            color,
            background,
          });
        }

        this.setData({
          days_style,
          clock,
          count: list.length,
        })
        wx.hideLoading()
      }, err => {
        // err
      })

    }, res => {
      // 登录失败
    })
  },

  clickButton() {
    const {
      userId,
      year,
      month,
      day
    } = this.data
    let data = {
      userId,
      year,
      month,
      day,
    }
    let Books = new wx.BaaS.TableObject(tableID) //实例化对应 tableID 的数据表对象
    let book = Books.create() // 创建一条记录

    wx.showLoading({
      title: 'loading',
    })
    // 调用创建数据项接口，进行数据的持久化存储，详见：https://doc.minapp.com/js-sdk/schema/create-record.html
    book.set(data)
      .save()
      .then(() => {
        //...
        let {
          days_style,
          count
        } = this.data

        days_style[day - 1].color = 'white'
        days_style[day - 1].background = this.getRandomColor()

        this.setData({
          days_style,
          clock: true,
          count: count + 1
        })
        wx.showToast({
          title: '打卡成功',
          icon: 'success'
        })
      })
  },

  // 获取随机颜色值
  getRandomColor() {
    return `rgb(${parseInt(Math.random() * 255)}, ${parseInt(Math.random() * 255)}, ${parseInt(Math.random() * 255)})`
  },
  // 补全日期
  padStartDate(str) {
    str = str.toString()
    return str.padStart(2, '0')
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})