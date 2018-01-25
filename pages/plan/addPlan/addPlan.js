// pages/plan/addPlan/addPlan.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 解决iphone textarea的兼容问题，边距
    IPHONE_MARGIN_TOP:12,
    IPHONE_MARGIN_LEFT:24,
    jianrong_margin_top :26,
    jianrong_margin_left : 30,
  },


  jianrongiPhone(){
    console.log('苹果手机666')
    this.setData({
      jianrong_margin_top: this.data.IPHONE_MARGIN_TOP,
      jianrong_margin_left: this.data.IPHONE_MARGIN_LEFT,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.getSystemInfo({
      success:res=>{
        console.log(res.system)
        if (res.system.startsWith("iOS")){
          this.jianrongiPhone()
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})