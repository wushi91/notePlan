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
    
  },

  /**
   * 组件的初始数据
   */
  data: {
    week0: calendarUtil.getWeekLastOrNext(new Date(),-1),
    week1: calendarUtil.getWeekLastOrNext(new Date()),
    week2: calendarUtil.getWeekLastOrNext(new Date(), 1),

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
      let week0 = this.data.week0
      let week1 = this.data.week1
      let week2 = this.data.week2

      switch (e.detail.current){
        case 0://到了week0，设置上下页的数据,上一周是week2,下一周是week1
          let dayInWeek0 = new Date(week0[0].date)
           week2 = calendarUtil.getWeekLastOrNext(dayInWeek0, -1)
           week1 = calendarUtil.getWeekLastOrNext(dayInWeek0, 1)
           this.setData({
             week2: week2,
             week1: week1
           })
        break;

        case 1://到了week1，设置上下页的数据,上一周是week0,下一周是week2
          let dayInWeek1 = new Date(week1[0].date)
           week0 = calendarUtil.getWeekLastOrNext(dayInWeek1, -1)
           week2 = calendarUtil.getWeekLastOrNext(dayInWeek1, 1)
           this.setData({
             week0: week0,
             week2: week2
           })
          break;

        case 2://到了week2，设置上下页的数据,上一周是week1,下一周是week0
          let dayInWeek2 = new Date(week2[0].date)
           week1 = calendarUtil.getWeekLastOrNext(dayInWeek2, -1)
           week0 = calendarUtil.getWeekLastOrNext(dayInWeek2, 1)
           this.setData({
             week1: week1,
             week0: week0
           })
          break;
      }
  

      

    },
    bindanimationfinish() {
      // console.log("bindanimationfinish")
    },
    
  }
})
