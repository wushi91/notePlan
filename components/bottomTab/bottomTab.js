// components/bottomTab/bottomTab.js
Component({
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  /**
   * 组件的属性列表
   */
  properties: {
    // // 弹窗标题
    // title: { // 属性名
    //   type: String, // 类型（必填），目前接受的类型包括：String, Number, Boolean, Object, Array, null（表示任意类型）
    //   value: '标题' // 属性初始值（可选），如果未指定则会根据类型选择一个
    // },
    // // 弹窗内容
    // content: {
    //   type: String,
    //   value: '弹窗内容'
    // },
    // // 弹窗取消按钮文字
    // cancelText: {
    //   type: String,
    //   value: '取消'
    // },
    // // 弹窗确认按钮文字
    // confirmText: {
    //   type: String,
    //   value: '确定'
    // }
  },

  /**
   * 组件的初始数据
   */
  data: {
    tabStatus: [
      { prop: 'schedule', label: '日程', iconnormal: '/images/icon-tabbar-schedule-default.png', iconselected: '/images/icon-tabbar-schedule-selected.png' },
      { prop: 'myinfo', label: '我的', iconnormal: '/images/icon-tabbar-me-default.png', iconselected: '/images/icon-tabbar-me-selected.png' }
      ],
    currentStatus: 'schedule',
    centerImage:'/images/icon-tabbar-add-normal.png',
    normalCenterImage:'/images/icon-tabbar-add-normal.png',
    pressCenterImage: '/images/icon-tabbar-add-pressed.png',
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // /*
    //  * 公有方法
    //  */
    // //隐藏弹框
    // hideDialog() {
    //   this.setData({
    //     isShow: !this.data.isShow
    //   })
    // },
    // //展示弹框
    // showDialog() {
    //   this.setData({
    //     isShow: !this.data.isShow
    //   })
    // },

    /*
     * 内部私有方法建议以下划线开头
     * triggerEvent 用于触发事件
     */

    _bindCenterItemTouchstart(){
      this.setData({
        centerImage: this.data.pressCenterImage,
      })
    },
    _bindCenterItemTouchend(){
      this.setData({
        centerImage: this.data.normalCenterImage,
      })
    },
    _catchCenterItemTab(){
      this.triggerEvent("catchItemTab", { tabItem: -1 })
    },
    _catchItemTab(e){
      this.setData({
        currentStatus: e.currentTarget.dataset.status
      })
      switch (e.currentTarget.dataset.status){
        case this.data.tabStatus[0].prop:
          this.triggerEvent("catchItemTab", { tabItem: 0 })
        break;
        case this.data.tabStatus[1].prop:
          this.triggerEvent("catchItemTab", { tabItem: 1 })
          break;
      }
      
    },
  }
})
