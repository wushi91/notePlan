// const Plan = require('../../bean/Plan.js')
const dbUtil = require('../../utils/dbUtil.js')
const util = require('../../utils/util.js')
const calendarUtil = require('../../components/calendar/calendarUtil.js')

//获取应用实例
const app = getApp()

Page({
  data: {
    
    showPlanPage:true,
    planList:[],
    selectDay: { year: new Date().getFullYear(), month: new Date().getMonth(), day: new Date().getDate() },
    week0: {},
    week1: {},
    week2: {},
    currentpage:1,
    username: '微信授权登录',
    headerimagesrc: '/images/icon-head-default.png',
  },

  initData(){
    let date = new Date()
    date.setFullYear(this.data.selectDay.year)
    date.setMonth(this.data.selectDay.month)
    date.setDate(this.data.selectDay.day)
    let planList = this.toGetPlanList(date)
    let week0 = calendarUtil.getWeekLastOrNext(date, -1)
    let week1 = calendarUtil.getWeekLastOrNext(date, 0, true)
    let week2 = calendarUtil.getWeekLastOrNext(date, 1)
    let currentpage = 1
    this.setData({
      planList: planList,
      week0: week0,
      week1: week1,
      week2: week2,
      currentpage: currentpage
    })
  },

  toGetPlanList(date) {
    let planList = []
    let stringList = dbUtil.getPlanList(date)
    // console.log(stringList)
    for (let i = 0; i < stringList.length; i++) {
      let item = JSON.parse(stringList[i])
      // 把beginTime，overTime提取出来
      item.content = decodeURIComponent(item.content)
      item._beginTime = util.formatJustTime(new Date(item.beginTime))
      item._overTime = util.formatJustTime(new Date(item.overTime))
      item.isCompleted = util.isContainDate(item.completedDays,date)
      planList.push(item)
    }
    return planList
  },

  toAddPlanPage: function () {
    wx.navigateTo({
      url: "/pages/plan/addPlan/addPlan?year=" + this.data.selectDay.year + '&month=' + this.data.selectDay.month +'&day=' + this.data.selectDay.day
    })
  },

  toPlanDetailPage: function (plan) {
    wx.navigateTo({
      url: "/pages/plan/planDetail/planDetail?key=" + plan.key+"&planId="+plan.planId
    })
  },

  catchItemTab(e) {
    switch (e.detail.tabItem) {
      case -1://
        this.toAddPlanPage()
        break;
      case 0://

        if (this.data.showPlanPage){
          this.setData({
            selectDay: { year: new Date().getFullYear(), month: new Date().getMonth(), day: new Date().getDate() }
          })
          // 回到当天
          this.initData()
        }else{
          this.setData({
            showPlanPage: true
          })
          wx.setNavigationBarTitle({
            title: "行动管理笔记"
          })
        }
        
        console.log('点击了日程列表')
        break;
      case 1://
        this.setData({
          showPlanPage: false
        })
        wx.setNavigationBarTitle({
          title: "我的"
        })
        console.log('点击了我的')
        break;
    }
  },

  bindcatchPlanItemTab(){
    console.log('bindcatchPlanItemTab')
  },

  


 

  tabSelectDay(e){

    let selectDay = { year: e.detail.data.year, month: e.detail.data.month, day: e.detail.data.day }
    this.setData({
      selectDay: selectDay,
      planList: e.detail.data.planList
    })
  },

  onLoad: function () {
    this.initData()
    app.updatePlanList = this.initData//监听
  },
  
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    //获得dialog组件
    // this.dialog = this.selectComponent("#dialog");
  },
  /**
     * 生命周期函数--监听页面显示
     */
  onShow: function () {
    
  },

  tabCheckBox(e) {
    let plan = e.detail.plan
    console.log(plan)
    this.toCompletePlan(plan.key, plan.planId)
  
    // 只是界面的更新 更新当前的planList
    let planList = this.data.planList
    for (let i = 0; i < planList.length;i++){
      if (planList[i].planId === plan.planId){
        planList[i].isCompleted = !planList[i].isCompleted
        break;
        }
      }
      this.setData({
        planList: planList
    })

  },

  toCompletePlan(key, planId){
    let plan = JSON.parse(dbUtil.getPlan(key, planId))
    let completedDays = plan.completedDays
    let dateString = this.data.selectDay.year + '-' + this.data.selectDay.month + "-" + this.data.selectDay.day
    let delIndex = -1
    for (let i = 0; i < completedDays.length; i++) {
      let date = completedDays[i]
      if (date === dateString) {
        delIndex = i
        break;
      }
    }
    if (delIndex >= 0) {
      // 如果存在则要设置为未完成
      completedDays.splice(delIndex, 1)
    } else {
      //设置为已完成
      completedDays.push(dateString)
    }
    // 保存修改
    dbUtil.compeltePlan(key, planId, plan.completedDays)
  },
  tapPlanItem(e){
    let plan = e.detail.plan
    plan.content = encodeURIComponent(plan.content)
    plan.remark = encodeURIComponent(plan.remark)
    this.toPlanDetailPage(plan)
  }

  
  
})
