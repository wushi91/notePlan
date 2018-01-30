// const Plan = require('../../bean/Plan.js')
const dbUtil = require('../../utils/dbUtil.js')
const util = require('../../utils/util.js')
//获取应用实例
const app = getApp()

Page({
  data: {
    
    showPlanPage:true,
    planList:[],
   
    username: '微信授权登录',
    headerimagesrc: '/images/icon-head-default.png',
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
        this.setData({
          showPlanPage:true
        })
        wx.setNavigationBarTitle({
          title: "行动管理笔记"
        })
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
    console.log(e.detail.date)
    this.getPlan(new Date(e.detail.date))
  },

  onLoad: function () {

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


  tapPlanItem(e){
    console.log('------------------------')
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
