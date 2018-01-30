// components/selectionTimeItem/selectionTimeItem.js
const selectionTimeUtil = require('./selectionTimeUtil.js')

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    isAllDay: { // 属性名
      type: Boolean, // 类型（必填），目前接受的类型包括：String, Number, Boolean, Object, Array, null（表示任意类型）
      value: false // 属性初始值（可选），如果未指定则会根据类型选择一个
    },
    defaultStartTime: { // 属性名
      type: Object, // 类型（必填），目前接受的类型包括：String, Number, Boolean, Object, Array, null（表示任意类型）
      value: selectionTimeUtil.getDefaultStartTime() // 属性初始值（可选），如果未指定则会根据类型选择一个
    },
    defaultOverTime: { // 属性名
      type: Object, // 类型（必填），目前接受的类型包括：String, Number, Boolean, Object, Array, null（表示任意类型）
      value: selectionTimeUtil.getDefaultStartTime() // 属性初始值（可选），如果未指定则会根据类型选择一个
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    // selectTime:""
    selectStartTime: "",
    selectOverTime: "",
  },

  /**
   * 组件的方法列表
   */
  methods: {

    bindBeginDateChange(e) {    
      let date = new Date(e.detail.value)
      date.setHours(this.data.defaultStartTime.hour)
      date.setMinutes(this.data.defaultStartTime.minute)

      // 自动设置结束日期
      let over = new Date(e.detail.value)
      over.setHours(this.data.defaultOverTime.hour)
      over.setMinutes(this.data.defaultOverTime.minute)

      this.setData({
        defaultStartTime: selectionTimeUtil.getItemTime(date),//这里设置主要是为了选择器的数据范围方便
        defaultOverTime: selectionTimeUtil.getItemTime(over),//这里设置主要是为了选择器的数据范围方便
        selectStartTime: selectionTimeUtil.getItemTime(date),
        selectOverTime: selectionTimeUtil.getItemTime(over),
      })

      this.triggerEvent("tabSelectionTimeItem", { beginTime: selectionTimeUtil.getItemTime(date).date, overTime: selectionTimeUtil.getItemTime(over).date })
    },

    bindBeginTimeChange(e) {
      let date = new Date(this.data.defaultStartTime.date)
      let hour = Number(e.detail.value.split(":")[0])
      let minute = Number(e.detail.value.split(":")[1])
      date.setHours(hour)
      date.setMinutes(minute)


      // 自动设置结束时间
      let over = new Date(this.data.defaultOverTime.date)
      over.setHours(hour+1)
      over.setMinutes(minute)

      this.setData({
        defaultStartTime: selectionTimeUtil.getItemTime(date),//这里设置主要是为了选择器的数据范围方便
        defaultOverTime: selectionTimeUtil.getItemTime(over),//这里设置主要是为了选择器的数据范围方便
        selectStartTime: selectionTimeUtil.getItemTime(date),
        selectOverTime: selectionTimeUtil.getItemTime(over),
      })

      this.triggerEvent("tabSelectionTimeItem", { beginTime: selectionTimeUtil.getItemTime(date).date, overTime: selectionTimeUtil.getItemTime(over).date })
    },

    bindOverDateChange(e) {
      let date = new Date(e.detail.value)
      date.setHours(this.data.defaultOverTime.hour)
      date.setMinutes(this.data.defaultOverTime.minute)
      this.setData({
        defaultOverTime: selectionTimeUtil.getItemTime(date),
        selectOverTime: selectionTimeUtil.getItemTime(date),
        
      })
      if (this.data.selectStartTime){
        this.triggerEvent("tabSelectionTimeItem", { beginTime: this.data.selectStartTime.date, overTime: selectionTimeUtil.getItemTime(date).date })
      }else{
        this.triggerEvent("tabSelectionTimeItem", { beginTime: this.data.defaultStartTime.date, overTime: selectionTimeUtil.getItemTime(date).date })
      }
      
    },

    bindOverTimeChange(e) {
      let date = new Date(this.data.defaultOverTime.date)
      let hour = e.detail.value.split(":")[0]
      let minute = e.detail.value.split(":")[1]
      date.setHours(hour)
      date.setMinutes(minute)
      this.setData({
        defaultOverTime: selectionTimeUtil.getItemTime(date),
        selectOverTime: selectionTimeUtil.getItemTime(date),
      })

      if (this.data.selectStartTime) {
        this.triggerEvent("tabSelectionTimeItem", { beginTime: this.data.selectStartTime.date, overTime: selectionTimeUtil.getItemTime(date).date })
      } else {
        this.triggerEvent("tabSelectionTimeItem", { beginTime: this.data.defaultStartTime.date, overTime: selectionTimeUtil.getItemTime(date).date })
      }
    },
  }
})
