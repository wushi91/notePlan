// const Plan = require('../../bean/Plan.js')
const dbUtil = require('../../utils/dbUtil.js')
const util = require('../../utils/util.js')
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    imgUrls: [
      'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
    ],
    indicatorDots: false,
    autoplay: true,
    interval: 2000,
    duration: 500,
    page1:{ day: 14},
    page2:{day:15},
    page3: { day: 16 },

    defaultItem: { prop: "play", label: "娱乐", color: '#F77C80' },
    itemList: [{ prop: "work", label: "工作", color: '#63ADF7' },
    { prop: "study", label: "学习", color: '#6FDE6F' },
    { prop: "sport", label: "运动", color: '#F7A863' },
    { prop: "life", label: "生活", color: '#DB86F0' },
    { prop: "play", label: "娱乐", color: '#F77C80' }],
    
    planList:[],

    week1:[],
    week2:[],
    week3:[],
   
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },


  toAddPlanPage: function () {
    wx.navigateTo({
      url: "/pages/plan/addPlan/addPlan"
    })
  },

  toPlanDetailPage: function (plan) {
    plan = JSON.stringify(plan)
    wx.navigateTo({
      url: "/pages/plan/planDetail/planDetail?plan=" + plan
    })
  },

  catchItemTab(e) {
    switch (e.detail.tabItem) {
      case -1://
        this.toAddPlanPage()
        break;
      case 0://
        console.log('点击了日程列表')
        break;
      case 1://
        console.log('点击了我的')
        break;
    }
  },

  bindcatchPlanItemTab(){
    console.log('bindcatchPlanItemTab')
  },

  bindchange(e){
    console.log("-----------")
    console.log("bindchange")
    if (e.detail.current === 0) {
      //到了page1，设置上下页的数据,上一页是page3,下一页是page2

      let week1 = this.data.week1
      let week2 = this.data.week2
      let week3 = this.data.week3
      
      let today = new Date(week1[0].date)
      let shangzhou = new Date()
      let xiazhou = new Date()
      shangzhou.setDate(today.getDate() - 7)
      xiazhou.setDate(today.getDate() + 7)
      week3 = util.getWeekToCalendarComponent(shangzhou)
      week2 = util.getWeekToCalendarComponent(xiazhou)
      this.setData({
        week3: week3,
        week2: week2
      })
    }

    if (e.detail.current === 1) {
      //到了page2，设置上下页的数据,上一页是page1,下一页是page3

      let week1 = this.data.week1
      let week2 = this.data.week2
      let week3 = this.data.week3

      let today = new Date(week2[0].date)
      let shangzhou = new Date()
      let xiazhou = new Date()
      shangzhou.setDate(today.getDate() - 7)
      xiazhou.setDate(today.getDate() + 7)
      week1 = util.getWeekToCalendarComponent(shangzhou)
      week3 = util.getWeekToCalendarComponent(xiazhou)
      this.setData({
        week1: week1,
        week3: week3
      })





      // let page1 = this.data.page1
      // let page3 = this.data.page3
      // page1.day = this.data.page2.day - 1
      // page3.day = this.data.page2.day + 1
      // this.setData({
      //   page1: page1,
      //   page3: page3
      // })
    }

    if (e.detail.current===2){
      //到了page3，设置上下页的数据,上一页是page2,下一页是page1

      let week1 = this.data.week1
      let week2 = this.data.week2
      let week3 = this.data.week3

      let today = new Date(week3[0].date)
      let shangzhou = new Date()
      let xiazhou = new Date()
      shangzhou.setDate(today.getDate() - 7)
      xiazhou.setDate(today.getDate() + 7)
      console.log('week3[0]')
      console.log(week3[0].date)
      console.log('today')
      console.log(today)
      console.log('xiazhou')
      console.log(xiazhou)

      week2 = util.getWeekToCalendarComponent(shangzhou)
      week1 = util.getWeekToCalendarComponent(xiazhou)
      this.setData({
        week2: week2,
        week1: week1
      })

      
    }
    // //设置上一页的数据
    // if (e.detail.current===0){
    //   //上一页是page3,下一页是page2
    //   let page3 = this.data.page3
    //   let page2 = this.data.page2
    //   page3.day = this.data.page1.day - 1
    //   page2.day = this.data.page1.day + 1
    //   this.setData({
    //     page2: page2,
    //     page3: page3
    //   })
    //   console.log(this.data.page1)
    //   console.log(this.data.page3)
    // }
      
  },
  bindanimationfinish(){
    console.log("bindanimationfinish")
  },

  setWeekData(){
    let today = new Date()
    let shangzhou = new Date()
    let xiazhou = new Date()
    shangzhou.setDate(today.getDate() - 7)
    xiazhou.setDate(today.getDate() + 7)

    let last_week = util.getWeekToCalendarComponent(shangzhou)
    let current_week = util.getWeekToCalendarComponent(today)
    let next_week = util.getWeekToCalendarComponent(xiazhou)

    this.setData({
      week1: last_week,
      week2: current_week,
      week3: next_week
    })
  },

  tabSelectDay(e){
    console.log(e.detail.date)
    this.getPlan(new Date(e.detail.date))
  },

  onLoad: function () {

  // console.log(week)
  // let week = [
  //   { year: 2018, month: 1, day: 6, china_month: '二', china_day: '廿二', week: '日', isToday: false, isSelect: false },
  //   { year: 2018, month: 1, day: 7, china_month: '二', china_day: '廿三', week: '一', isToday: false, isSelect: false },
  //   { year: 2018, month: 1, day: 8, china_month: '二', china_day: '廿四', week: '二', isToday: false, isSelect: false },
  //   { year: 2018, month: 1, day: 9, china_month: '二', china_day: '廿五', week: '三', isToday: false, isSelect: true },
  //   { year: 2018, month: 1, day: 10, china_month: '二', china_day: '廿六', week: '四', isToday: false, isSelect: false },
  //   { year: 2018, month: 1, day: 11, china_month: '二', china_day: '廿七', week: '五', isToday: true, isSelect: false },
  //   { year: 2018, month: 1, day: 12, china_month: '二', china_day: '廿八', week: '六', isToday: false, isSelect: false }
  // ]
  

  // console.log(week)
    this.setWeekData(this.data.today)
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
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
    this.getPlan(new Date())
  },
  showDialog() {
    this.dialog.showDialog();
  },

  tapPlanItem(e){
    console.log(e.detail.plan)
    this.toPlanDetailPage(e.detail.plan)
  },

  getPlan(date){
    
    let year = date.getFullYear()
    let month = date.getMonth() + 1
    let day = date.getDate()
    let week = date.getDay() + 1

    let planList = []

    let stringList = dbUtil.getPlan(year, month, day, week)
    for (let i = 0; i < stringList.length; i++) {
      let item = stringList[i]
      let newItem = JSON.parse(item)
      planList.push(newItem)
    }

    console.log(planList)
    this.setData({
      planList: planList
    })
  }
  
})
