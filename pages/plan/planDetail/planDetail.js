// pages/plan/planDetail/planDetail.js

const util = require('../../../utils/util.js')
const dbUtil = require('../../../utils/dbUtil.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    plan:''
  },


  toPlanEditPage: function () {

     
    let plan = this.data.plan
    plan.content = encodeURIComponent(plan.content)
    plan.remark = encodeURIComponent(plan.remark)
    plan = JSON.stringify(plan)

    wx.navigateTo({
      url: "/pages/plan/addPlan/addPlan?plan=" + plan
    })
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
          dbUtil.deletePlan(this.data.plan)
          
          wx.showToast({
            title:"删除成功",
            icon:"success",
            duration:500,
            success:res=>{
              setTimeout(()=>{
                this.toIndexPage()
              },500)
              
            }
          })
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    // console.log(options.plan)


    let plan = JSON.parse(options.plan)
    plan.content = decodeURIComponent(plan.content)
    plan.remark = decodeURIComponent(plan.remark)
    plan.beginDateText = (new Date(plan.beginDate).getMonth() + 1) + "月" + new Date(plan.beginDate).getDate()+"日"
    plan.weekText = util.getChinaWeekNum(new Date(plan.beginDate),"周")

    this.setData({
      plan: plan,
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
  
  },

  toIndexPage: function () {
    wx.navigateBack({
      delta: 1
    })
  },
})