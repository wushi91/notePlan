// pages/plan/editPlan/editPlan.js

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
    jianrong_margin_top: 26,
    jianrong_margin_left: 30,

    plan: {},

    repeatType_itemList: planUtil.REPEATTYPES,
    palnType_itemList: planUtil.PLANTYPES,
    remindType_itemList: planUtil.REMINDTYPES,
  },

  initData(key,planId) {
    let plan = JSON.parse(dbUtil.getPlan(key, planId))
    plan.content = decodeURIComponent(plan.content)
    plan.remark = decodeURIComponent(plan.remark)
    plan.beginTime = selectionTimeUtil.getItemTime(new Date(plan.beginTime))
    plan.overTime = selectionTimeUtil.getItemTime(new Date(plan.overTime))

    this.setData({
      plan: plan
    })

  },

  toUpdatePlan() {
    console.log("编辑")
    // key值和planId保持不变
    dbUtil.updatePlan(this.data.plan)
    app.updatePlanList()
    setTimeout(() => {
      this.toIndexPage()
    }, 300)
  },

  toIndexPage: function () {
    wx.navigateBack({
      delta: 2
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let key = options.key
    let planId = options.planId
    
    this.initData(key, planId)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.jianrongiPhone()
  },

  jianrongiPhone() {
    let IPHONE_MARGIN_TOP = 12
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
  bindPlanContent(e) {
    let plan = this.data.plan
    plan.content = e.detail.value
    this.setData({
      plan: plan
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

  bindtabRepeatTypeSelectionItem(e) {
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

  bindtabSelectionTimeItem(e) {
    let plan = this.data.plan
    console.log(plan)
    plan.beginTime = e.detail.beginTime
    plan.overTime = e.detail.overTime
    // this.setData({
    //   plan: plan
    // })

    console.log(e.detail)
    console.log(this.data)
  },

})