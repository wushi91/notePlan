// components/calendar/calendar.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    days:[
      { year: 2018, month: 1, day: 6, china_month: '二', china_day: '廿二', week: '日', isToday: false ,isSelect:false},
      { year: 2018, month: 1, day: 7, china_month: '二', china_day: '廿三', week: '一', isToday: false, isSelect: false},
      { year: 2018, month: 1, day: 8, china_month: '二', china_day: '廿四', week: '二', isToday: false, isSelect: false},
      { year: 2018, month: 1, day: 9, china_month: '二', china_day: '廿五', week: '三', isToday: false, isSelect: true},
      { year: 2018, month: 1, day: 10, china_month: '二', china_day: '廿六', week: '四', isToday: false,isSelect: false},
      { year: 2018, month: 1, day: 11, china_month: '二', china_day: '廿七', week: '五', isToday: true, isSelect: false},
      { year: 2018, month: 1, day: 12, china_month: '二', china_day: '廿八', week: '六', isToday: false, isSelect: false}
    ]

  },

  /**
   * 组件的方法列表
   */
  methods: {
    selectDay(e){
      console.log(e)
    }
  }
})
