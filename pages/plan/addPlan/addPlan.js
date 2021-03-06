  // pages/plan/addPlan/addPlan.js
// const Plan = require('../../../bean/Plan.js')

const planUtil = require('../../../utils/planUtil.js')
const dbUtil = require('../../../utils/dbUtil.js')
const util = require('../../../utils/util.js')
const selectionTimeUtil = require('../../../components/selectionTimeItem/selectionTimeUtil.js')

const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 解决iphone textarea的兼容问题，边距
    jianrong_margin_top :26,
    jianrong_margin_left : 30,
    
    plan:{},

    repeatType_itemList: planUtil.REPEATTYPES,
    palnType_itemList: planUtil.PLANTYPES,
    remindType_itemList: planUtil.REMINDTYPES,
  },


  initData(defaultBeginTime,defaultOverTime){
      let content = ''
      let remark = ''
      let isAllDay = false

      let beginTime = selectionTimeUtil.getItemTime(defaultBeginTime)
      let overTime = selectionTimeUtil.getItemTime(defaultOverTime)
    
      let repeatType = this.data.repeatType_itemList[0]
      let palnType = this.data.palnType_itemList[0]
      let remindType = this.data.remindType_itemList[0]

      let plan = {
        content:content,
        remark: remark,
        isAllDay: isAllDay,
        beginTime: beginTime,
        overTime: overTime,
        repeatType: repeatType,
        palnType: palnType,
        remindType: remindType
      }
      this.setData({
        plan: plan
      })

    },

    toSavePlan() {
      console.log("新建")
      dbUtil.savePlan(this.data.plan)
      app.updatePlanList()
      // 这里的延时主要是等待首页刷新完毕
      setTimeout(() => {
        this.toIndexPage()
      }, 300)
      // wx.showToast({
      //   title: "添加成功",
      //   icon: "success",
      //   duration: 600,
      //   success: res => {
      //     setTimeout(() => {
      //       this.toIndexPage()
      //     }, 300)

      //   }
      // })
    
    },

    toIndexPage: function () {
      wx.navigateBack({
        delta: 1
      })
    },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let defaultBeginTime = new Date()
    defaultBeginTime.setFullYear(options.year)
    defaultBeginTime.setMonth(options.month)
    defaultBeginTime.setDate(options.day)
    defaultBeginTime.setMinutes(0)
    defaultBeginTime.setSeconds(0)
    defaultBeginTime.setMilliseconds(0)
    let defaultOverTime = new Date()
    defaultOverTime.setFullYear(options.year)
    defaultOverTime.setMonth(options.month)
    defaultOverTime.setDate(options.day)
    defaultOverTime.setMinutes(0)
    defaultOverTime.setSeconds(0)
    defaultOverTime.setMilliseconds(0)
    defaultOverTime.setHours(defaultOverTime.getHours() + 1)
    this.initData(defaultBeginTime, defaultOverTime)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.jianrongiPhone()
  },

  jianrongiPhone() {
    let IPHONE_MARGIN_TOP =  12
    let IPHONE_MARGIN_LEFT = 24
    wx.getSystemInfo({
      success: res => {
        // console.log('苹果手机666')
        if (res.system.startsWith("iOS")) {
          this.setData({
            jianrong_margin_top: IPHONE_MARGIN_TOP,
            jianrong_margin_left: IPHONE_MARGIN_LEFT,
          })
        }
      }
    })
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

  //对输入监控，非业务，放到没人看到的地方
  bindPlanContent(e){
    let plan = this.data.plan
    plan.content = e.detail.value
    this.setData({
      plan:plan
    })
  },

  bindAllDayCheckChange() {
    let plan = this.data.plan
    plan.isAllDay = !plan.isAllDay
    this.setData({
      plan: plan
    })
  },

  bindPlanRemark(e) {
    let plan = this.data.plan
    plan.remark = e.detail.value
    this.setData({
      plan: plan
    })
  },

  bindtabRepeatTypeSelectionItem(e){
    let plan = this.data.plan
    plan.repeatType = e.detail.selectionItem
    this.setData({
      plan: plan
    })
  },

  bindtabPlanTypeSelectionItem(e) {
    let plan = this.data.plan
    plan.palnType = e.detail.selectionItem
    this.setData({
      plan: plan
    })
  },

  bindtabRemindTypeSelectionItem(e) {
    let plan = this.data.plan
    plan.remindType = e.detail.selectionItem
    this.setData({
      plan: plan
    })
  },

  bindtabSelectionTimeItem(e){
    let plan = this.data.plan
    plan.beginTime = e.detail.beginTime
    plan.overTime = e.detail.overTime
    this.setData({
      plan: plan
    })

  },

})