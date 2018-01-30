  // pages/plan/addPlan/addPlan.js
const Plan = require('../../../bean/Plan.js')
const dbUtil = require('../../../utils/dbUtil.js')
const util = require('../../../utils/util.js')
const selectionTimeUtil = require('../../../components/selectionTimeItem/selectionTimeUtil.js')

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
    
    content:'',
    isAllDay:false,

    defaultStartTime: selectionTimeUtil.getDefaultStartTime(),
    defaultOverTime: selectionTimeUtil.getDefaultOverTime(),

    planStartTime: selectionTimeUtil.getDefaultStartDate().getTime(),
    planOverTime: selectionTimeUtil.getDefaultOverDate().getTime(),
    remark:'',

    repeatType_selectItem: Plan.REPEATTYPES[0],
    repeatType_itemList: Plan.REPEATTYPES,

    palnType_selectItem: Plan.PLANTYPES[0],
    palnType_itemList: Plan.PLANTYPES,

    remindType_selectItem: Plan.REMINDTYPES[0],
    remindType_itemList: Plan.REMINDTYPES,
  },

  jianrongiPhone(){
    wx.getSystemInfo({
      success: res => {
        // console.log(res.system)
        if (res.system.startsWith("iOS")) {
          // console.log('苹果手机666')
          this.setData({
            jianrong_margin_top: this.data.IPHONE_MARGIN_TOP,
            jianrong_margin_left: this.data.IPHONE_MARGIN_LEFT,
          })
        }
      }
    }) 
  },

  addPlan(){
    let plan = new Plan()
    plan.planId = new Date().getTime()
    plan.content = this.data.content
    plan.isAllDay = this.data.isAllDay
    plan.isCompleted = false
    plan.isCanEdit = true
    

    
    plan.beginDate = this.data.planStartTime
    plan.overDate = this.data.planOverTime
    
    plan.repeatType = this.data.repeatType_selectItem
    plan.palnType = this.data.palnType_selectItem
    plan.remindType = this.data.remindType_selectItem
    plan.remark = this.data.remark


    dbUtil.savePlan(plan)
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.jianrongiPhone()
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



  //对输入监控，非业务，放到没人看到的地方
  bindPlanContent(e){
    this.setData({
      content: e.detail.value
    })
  },

  bindAllDayCheckChange() {
    this.setData({
      isAllDay: !this.data.isAllDay
    })
  },

  bindPlanRemark(e) {
    this.setData({
      remark: e.detail.value
    })
  },

  bindtabRepeatTypeSelectionItem(e){
    
    this.setData({
      repeatType_selectItem : e.detail.selectionItem
    })
  },

  bindtabPlanTypeSelectionItem(e) {
    this.setData({
      palnType_selectItem: e.detail.selectionItem
    })
  },

  bindtabRemindTypeSelectionItem(e) {

    this.setData({
      remindType_selectItem: e.detail.selectionItem
    })
  },

  bindtabSelectionTimeItem(e){

    this.setData({
      planStartTime: new Date(e.detail.beginTime).getTime(),
      planOverTime: new Date(e.detail.overTime).getTime()
    })
    console.log(e.detail)
    console.log("--------")
  },
  toSavePlan() {
    this.addPlan()
    this.toIndexPage()
  },

  toIndexPage: function () {
    wx.navigateBack({
      delta: 1
    })
  },

})