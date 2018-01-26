  // pages/plan/addPlan/addPlan.js
const Plan = require('../../../bean/Plan.js')
const dbUtil = require('../../../utils/dbUtil.js')
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
    beginDateText: (new Date().getMonth() + 1) + '月' + new Date().getDate()+"日",
    overDateText: (new Date().getMonth() + 1) + '月' + new Date().getDate() + "日",
    beginDate: new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate(),
    overDate: new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate(),
    beginWeek: new Date().getDay() + 1,
    overWeek: new Date().getDay() + 1,
    beginTime: new Date().getHours()+':00',
    overTime: new Date().getHours()+1+':00',
    // repeatType: Plan.REPEATTYPES[0],
    // palnType: Plan.PLANTYPES[0].prop,
    // remindType: Plan.REMINDTYPES[0].prop,
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
    
    plan.beginDate = this.data.beginDate
    plan.overDate = this.data.overDate
    plan.beginTime = this.data.beginTime
    plan.overTime = this.data.overTime
    plan.repeatType = this.data.repeatType_selectItem
    plan.palnType = this.data.palnType_selectItem
    plan.remindType = this.data.remindType_selectItem
    plan.remark = this.data.remark
    plan.creatTime = new Date().getTime()
    plan.updateTime = new Date().getTime()

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

  bindBeginDateChange(e){
    console.log(e)

    let date = new Date(e.detail.value)
    console.log(date)
    this.setData({
      beginDate: e.detail.value,
      beginDateText: (date.getMonth() + 1) + '月' + date.getDate() + "日",
      beginWeek: date.getDay() + 1,
    })
  },

  bindBeginTimeChange(e) {
    
    this.setData({
      beginTime: e.detail.value
    })
  },

  bindOverDateChange(e) {
    let date = new Date(e.detail.value)
    this.setData({
      overDate: e.detail.value,
      overDateText: (date.getMonth() + 1) + '月' + date.getDate() + "日",
      overWeek: date.getDay() + 1,
    })
  },

  bindOverTimeChange(e) {
    this.setData({
      overTime: e.detail.value
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
    console.log(e.detail.selectionItem)
  },

  toSavePlan() {
    this.addPlan()
    this.toIndexPage()
  },

  toIndexPage: function () {
    wx.navigateTo({
      url: "/pages/index/index"
    })
  },

})