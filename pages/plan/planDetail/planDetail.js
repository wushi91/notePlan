// pages/plan/planDetail/planDetail.js

const util = require('../../../utils/util.js')
const dbUtil = require('../../../utils/dbUtil.js')
const planUtil = require('../../../utils/planUtil.js')
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    plan:'',
    date:{}
  },


  toEditPlanPage: function () {
    let plan = this.data.plan
    wx.navigateTo({
      url: "/pages/plan/editPlan/editPlan?key=" + plan.key + "&planId=" + plan.planId
    })
  },

  toDeleteThePlan() {
    
    if (this.data.plan.repeatType.prop === planUtil.REPEATTYPES[0].prop){
      
      
      
      let beginTime = new Date(this.data.plan.beginTime)
      let overTime = new Date(this.data.plan.overTime)
      if (beginTime.getFullYear() !== overTime.getFullYear() || beginTime.getMonth() !== overTime.getMonth() || beginTime.getDate() !== overTime.getDate()) {
        // 不重复的事件，连续事件
        this.showDeleteActionSheet()
      }else{
        // 不重复的事件，当天事件
        this.showDeleteThePlan()
      }
      
    }else{
      // 重复的事件
      this.showDeleteActionSheet()
      console.log(this.data.plan.repeatType)
    }
  },


  showDeleteActionSheet(){
    wx.showActionSheet({
      itemList: ['删除本次事件', '删除所有事件'],
      success: res=> {
        switch (res.tapIndex){
          case 0:
          //删除本次事件
            this.showoDeleteTheRepeatPlanByDay()
            break;
          case 1:
          //删除所有事件
            this.showDeleteThePlan()
            break;
        }
       
      },
      fail: function (res) {
        console.log(res.errMsg)
      }
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

  showoDeleteTheRepeatPlanByDay() {

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
          let deletedDays = this.data.plan.deletedDays
          console.log( deletedDays)
          let dateString = this.data.date.year + '-' + this.data.date.month + "-" + this.data.date.day
          deletedDays.push(dateString)
          dbUtil.deleteRepeatPlanByDay(this.data.plan.key, this.data.plan.planId, deletedDays)
          console.log(dateString)
          app.updatePlanList()
          wx.showToast({
            title: "删除成功",
            icon: "success",
            duration: 300,
            success: res => {
              setTimeout(() => {
                this.toIndexPage()
              }, 300)

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
    let plan = JSON.parse(dbUtil.getPlan(key, planId))
    plan.content = decodeURIComponent(plan.content)
    plan.remark = decodeURIComponent(plan.remark)
    let currentTime = new Date(options.year + '-' + (Number(options.month) + 1) + '-' + options.day).getTime()
    let currentTime2359 = new Date(options.year + '-' + (Number(options.month) + 1) + '-' + options.day)
    currentTime2359.setHours(23)
    currentTime2359.setMinutes(59)
    currentTime2359.setSeconds(59)
    currentTime2359.setMilliseconds(999)
    console.log("currentTime2359")
    console.log(currentTime2359)
    // 开始时间小于当天00:00，代表的是前天开始。那么当天显示00:00
    if (new Date(plan.beginTime).getTime() < currentTime){
      plan._beginTime = "00:00"
    }else{
      plan._beginTime = util.formatJustTime(new Date(plan.beginTime))
    }
    // 结束时间大于于当天23:59，代表的是后天结束。那么当天显示23:59
    if (new Date(plan.overTime).getTime() > currentTime2359) {
      plan._overTime = "23:59"
    } else {
      plan._overTime = util.formatJustTime(new Date(plan.overTime))
    }
    // plan._beginTime = util.formatJustTime(new Date(plan.beginTime))
    // plan._overTime = util.formatJustTime(new Date(plan.overTime))
    plan._beginTimeText = util.formatTimeChinaYueRi(new Date(currentTime))//2018年12月1日
    plan.weekText = util.getChinaWeekNum(new Date(plan.beginTime), "周")

    this.setData({
      plan: plan,
      date: { year: options.year, month: options.month, day: options.day}
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