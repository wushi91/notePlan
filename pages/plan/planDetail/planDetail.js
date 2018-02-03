// pages/plan/planDetail/planDetail.js

const util = require('../../../utils/util.js')
const dbUtil = require('../../../utils/dbUtil.js')
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    plan:''
  },


  toEditPlanPage: function () {
    let plan = this.data.plan
    wx.navigateTo({
      url: "/pages/plan/editPlan/editPlan?key=" + plan.key + "&planId=" + plan.planId
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
          dbUtil.deletePlan(this.data.plan.key, this.data.plan.planId)
          app.updatePlanList()
          wx.showToast({
            title:"删除成功",
            icon:"success",
            duration:300,
            success:res=>{
              setTimeout(()=>{
                this.toIndexPage()
              },300)
              
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

    
    let key = options.key
    let planId = options.planId
    console.log("key ="+key)
    console.log("planId ="+planId)
    console.log(dbUtil.getPlan(key, planId))
    let plan = JSON.parse(dbUtil.getPlan(key, planId))
    plan.content = decodeURIComponent(plan.content)
    plan.remark = decodeURIComponent(plan.remark)
    plan._beginTime = util.formatJustTime(new Date(plan.beginTime))
    plan._overTime = util.formatJustTime(new Date(plan.overTime))
    plan._beginTimeText = util.formatTimeChinaYueRi(new Date(plan.beginTime))//12月1日
    plan.weekText = util.getChinaWeekNum(new Date(plan.beginTime), "周")

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