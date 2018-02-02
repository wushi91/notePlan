// components/calendar/calendar.js

const calendarUtil = require('./calendarUtil.js')

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    days: { // 属性名
      type: Array, // 类型（必填），目前接受的类型包括：String, Number, Boolean, Object, Array, null（表示任意类型）
      value: '' // 属性初始值（可选），如果未指定则会根据类型选择一个
    },

    weekZero: { // 属性名
      type: Array, // 类型（必填），目前接受的类型包括：String, Number, Boolean, Object, Array, null（表示任意类型）
      value: calendarUtil.getWeekLastOrNext(new Date(), -1) // 属性初始值（可选），如果未指定则会根据类型选择一个
    },
    weekOne: { // 属性名
      type: Array, // 类型（必填），目前接受的类型包括：String, Number, Boolean, Object, Array, null（表示任意类型）
      value: calendarUtil.getWeekLastOrNext(new Date()) // 属性初始值（可选），如果未指定则会根据类型选择一个
    },
    weekTwo: { // 属性名
      type: Array, // 类型（必填），目前接受的类型包括：String, Number, Boolean, Object, Array, null（表示任意类型）
      value: calendarUtil.getWeekLastOrNext(new Date(), 1) // 属性初始值（可选），如果未指定则会根据类型选择一个
    },
    currentpage:{
      type: Number, 
      value:1
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    // week0: calendarUtil.getWeekLastOrNext(new Date(),-1),
    // week1: calendarUtil.getWeekLastOrNext(new Date()),
    // week2: calendarUtil.getWeekLastOrNext(new Date(), 1),

    selectDay:{ year: new Date().getFullYear(),
                month: new Date().getMonth(),
                day: new Date().getDate()},
    today: {
      year: new Date().getFullYear(),
      month: new Date().getMonth(),
      day: new Date().getDate(),
    }
              
  },


  /**
   * 组件的方法列表
   */
  methods: {
    selectDay(e){
      let day = e.currentTarget.dataset.day
      let selectDay = { year: day.year, month: day.month, day: day.day}
      // console.log(day)
      // console.log(selectDay)
      this.setData({
        selectDay: selectDay
      })
      this.triggerEvent("tabSelectDay", { date: e.currentTarget.dataset.day.date })
      // console.log(e.currentTarget.dataset)
    },

    bindchange(e) {
      console.log("-----------")
      console.log("bindchange")
      let week0 = this.data.weekZero
      let week1 = this.data.weekOne
      let week2 = this.data.weekTwo

      switch (e.detail.current){
        case 0://到了week0，设置上下页的数据,上一周是week2,下一周是week1
          let dayInWeek0 = new Date(week0[0].date)
           week2 = calendarUtil.getWeekLastOrNext(dayInWeek0, -1)
           week1 = calendarUtil.getWeekLastOrNext(dayInWeek0, 1)
           this.setData({
             weekTwo: week2,
             weekOne: week1
           })
        break;

        case 1://到了week1，设置上下页的数据,上一周是week0,下一周是week2
          let dayInWeek1 = new Date(week1[0].date)
           week0 = calendarUtil.getWeekLastOrNext(dayInWeek1, -1)
           week2 = calendarUtil.getWeekLastOrNext(dayInWeek1, 1)
           this.setData({
             weekZero: week0,
             weekTwo: week2
           })
          break;

        case 2://到了week2，设置上下页的数据,上一周是week1,下一周是week0
          let dayInWeek2 = new Date(week2[0].date)
           week1 = calendarUtil.getWeekLastOrNext(dayInWeek2, -1)
           week0 = calendarUtil.getWeekLastOrNext(dayInWeek2, 1)
           this.setData({
             weekOne: week1,
             weekZero: week0
           })
          break;
      }
  

      

    },
    bindanimationfinish() {
      // console.log("bindanimationfinish")
    },
    
  }
})
