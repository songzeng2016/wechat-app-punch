// pages/record/record.js
Page({

    /**
     * 页面的初始数据
     */
    data: {

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {
        const days = 365; // 一年的总天数
        const size = 50 / 3; // 每个格子的大小
        let row = 0; // 行
        let clumn = 0; // 列
        const clumnNumber = 21;
        const borderSize = 2;
        // 使用 wx.createContext 获取绘图上下文 context
        const context = wx.createCanvasContext('firstCanvas')

        // context.setFillStyle("#00ff00")
        // context.setStrokeStyle("#00ff00")
        // context.setLineWidth(1)
        for (let i = 0; i < days; i++) {
            if (i % clumnNumber === 0) {
                clumn = 0;
                row++;
            }
            if (i % 6 === 0) {
                context.setFillStyle("#8dc679")
            } else {
                context.setFillStyle("#ebedf0")
            }
            context.fillRect(clumn * size + borderSize, row * size + borderSize, size - borderSize, size - borderSize)
            clumn++
        }
        // context.stroke()


        // context.setStrokeStyle("#00ff00")
        // context.setLineWidth(5)
        // context.rect(0, 0, 200, 200)
        // context.stroke()
        // context.setStrokeStyle("#ff0000")
        // context.setLineWidth(2)
        // context.moveTo(160, 100)
        // context.arc(100, 100, 60, 0, 2 * Math.PI, true)
        // context.moveTo(140, 100)
        // context.arc(100, 100, 40, 0, Math.PI, false)
        // context.moveTo(85, 80)
        // context.arc(80, 80, 5, 0, 2 * Math.PI, true)
        // context.moveTo(125, 80)
        // context.arc(120, 80, 5, 0, 2 * Math.PI, true)
        // context.stroke()
        context.draw()
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