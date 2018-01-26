// const Plan = require('../../bean/Plan.js')
const dbUtil = require('../../utils/dbUtil.js')
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

  catchItemTab(e) {
    switch (e.detail.tabItem) {
      case -1://
        this.toAddPlanPage()
        console.log('点击了添加日程')
        break;
      case 0://
        console.log('点击了日程列表')
        break;
      case 1://
        console.log('点击了我的')
        break;
    }
  },

  bindchange(e){
    console.log("-----------")
    console.log("bindchange")
    console.log(e)
    // let weeks = this.data.weeks

    // weeks.push({ day: weeks[weeks.length - 1].day + 1 })
    // console.log(weeks)
    // this.setData({
    //   weeks: weeks
    // })

    if (e.detail.current === 0) {
      //到了page1，设置上下页的数据,上一页是page3,下一页是page2
      let page3 = this.data.page3
      let page2 = this.data.page2
      page3.day = this.data.page1.day - 1
      page2.day = this.data.page1.day + 1
      this.setData({
        page3: page3,
        page2: page2
      })
    }

    if (e.detail.current === 1) {
      //到了page2，设置上下页的数据,上一页是page1,下一页是page3
      let page1 = this.data.page1
      let page3 = this.data.page3
      page1.day = this.data.page2.day - 1
      page3.day = this.data.page2.day + 1
      this.setData({
        page1: page1,
        page3: page3
      })
    }

    if (e.detail.current===2){
      //到了page3，设置上下页的数据,上一页是page2,下一页是page1
      let page1 = this.data.page1
      let page2 = this.data.page2
      
      page2.day = this.data.page3.day-1
      page1.day = this.data.page3.day + 1
      
      this.setData({
        page2: page2,
        page1: page1
      })
    }
    //设置上一页的数据
    if(e.detail.currejt===0){
      //上一页是page3,下一页是page2
      let page3 = this.data.page3
      let page2 = this.data.page2
      page3.day = this.data.page1.day - 1
      page2.day = this.data.page1.day + 1
      this.setData({
        page2: page2,
        page3: page3
      })
      console.log(this.data.page1)
      console.log(this.data.page3)
    }
      
  },
  bindanimationfinish(){
    
    console.log("bindanimationfinish")
    
  },
  onLoad: function () {
    


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
    let date = new Date()
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
    this.setData({
      planList: planList
    })
  },
  showDialog() {
    this.dialog.showDialog();
  },

  
})
