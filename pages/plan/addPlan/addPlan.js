  // pages/plan/addPlan/addPlan.js
// const Plan = require('../../../bean/Plan.js')

const planUtil = require('../../../utils/planUtil.js')
const dbUtil = require('../../../utils/dbUtil.js')
const util = require('../../../utils/util.js')
const selectionTimeUtil = require('../../../components/selectionTimeItem/selectionTimeUtil.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 解决iphone textarea的兼容问题，边距
    jianrong_margin_top :26,
    jianrong_margin_left : 30,
    
    isNew:true,//是新建还是编辑
    
    plan:{},

    // content:'',
    // remark: '',
    // isAllDay:false,

    // defaultStartTime: selectionTimeUtil.getDefaultStartTime(),
    // defaultOverTime: selectionTimeUtil.getDefaultOverTime(),

    // planStartTime: selectionTimeUtil.getDefaultStartDate().getTime(),
    // planOverTime: selectionTimeUtil.getDefaultOverDate().getTime(),
    
    // repeatType_selectItem: Plan.REPEATTYPES[0],
    // palnType_selectItem: Plan.PLANTYPES[0],
    // remindType_selectItem: Plan.REMINDTYPES[0],
    repeatType_itemList: planUtil.REPEATTYPES,
    palnType_itemList: planUtil.PLANTYPES,
    remindType_itemList: planUtil.REMINDTYPES,
  },

  
  // generatePlan(){
  //   let plan = new Plan()
  //   plan.content = this.data.content
  //   plan.isAllDay = this.data.isAllDay
  //   plan.isCompleted = false
  //   plan.isCanEdit = true
  //   plan.beginDate = this.data.planStartTime
  //   plan.overDate = this.data.planOverTime
  //   plan.repeatType = this.data.repeatType_selectItem
  //   plan.palnType = this.data.palnType_selectItem
  //   plan.remindType = this.data.remindType_selectItem
  //   plan.remark = this.data.remark
  //   return plan
  // },

  // initPlanData(plan){
  //   let content = plan.content

  //   let isAllDay = plan.isAllDay
  //   let planStartTime = plan.beginDate
  //   let planOverTime = plan.overDate
  //   let defaultStartTime = selectionTimeUtil.getItemTime(new Date(planStartTime))
  //   let defaultOverTime = selectionTimeUtil.getItemTime(new Date(planOverTime))
  //   let remark = plan.remark
  //   let repeatType_selectItem = plan.repeatType
  //   let palnType_selectItem = plan.palnType
  //   let remindType_selectItem = plan.remindType

  //   this.setData({
  //    content: content,
  //    isAllDay: isAllDay,
  //    planStartTime : planStartTime,
  //    planOverTime : planOverTime,
  //    defaultStartTime : defaultStartTime,
  //    defaultOverTime : defaultOverTime,
  //    remark : remark,
  //    repeatType_selectItem : repeatType_selectItem,
  //    palnType_selectItem : palnType_selectItem,
  //    remindType_selectItem : remindType_selectItem,
  //   })
  // },

    initData(){
      let content = ''
      let remark = ''
      let isAllDay = false

      let beginTime = selectionTimeUtil.getDefaultStartTime()
      let overTime = selectionTimeUtil.getDefaultOverTime()
    
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
      if (this.data.isNew) {
        console.log("新建")
        dbUtil.savePlan(this.data.plan)
        // this.toIndexPage()
      } else {
        console.log("编辑")
        let o_plan = this.data.o_plan
        let n_plan = this.generatePlan()
        dbUtil.updataPlan(o_plan, n_plan)
        this.toIndexPage()
      }

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
    this.initData()


    // if (options.plan){
    //   let plan = JSON.parse(options.plan)
    //   plan.content = decodeURIComponent(plan.content)
    //   plan.remark = decodeURIComponent(plan.remark)
    //   this.initPlanData(plan)

    //   this.setData({
    //     isNew:false,
    //     o_plan: plan
    //   })
    //   wx.setNavigationBarTitle({
    //     title: "编辑日程" 
    //   })
    // }else{
    //   this.setData({
    //     isNew: true
    //   })
    //   wx.setNavigationBarTitle({
    //     title: "新建日程"
    //   })
    // }
    
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
    console.log(e.detail)
    console.log("--------")
  },

})