// pages/plan/planDetail/planDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    plan:''
  },



  showDeleteThePlan: function () {
    wx.showModal({
      title: '确认删除',
      content: '删除该日程之后将不可恢复',
      cancelText: '确定',
      cancelColor: '#F24949',
      confirmText: '取消',
      confirmColor: '#000000',
      success: res => {
        if (res.confirm) {
          //这里是取消，因为调换了按钮的位置
          console.log('用户点击确定')
        } else if (res.cancel) {
          //这里是确定
          this.deleteTheRenter(this.data.userId, this.data.bookid)
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      plan: JSON.parse(options.plan),
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