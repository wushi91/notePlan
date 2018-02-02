// components/planItem/planItem.js
const dbUtil = require('../../utils/dbUtil.js')
const Plan = require('../../bean/Plan.js')

Component({
  /**
   * 组件的属性列表
   */
  properties: {

    planList: { // 属性名
      type: Array, // 类型（必填），目前接受的类型包括：String, Number, Boolean, Object, Array, null（表示任意类型）
      value: [] // 属性初始值（可选），如果未指定则会根据类型选择一个
    },
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    toPlanClass(planStr) {
      let plan = new Plan()
      plan.planId = planStr.planId 
      plan.content = planStr.content
      plan.isAllDay = planStr.isAllDay
      plan.isCompleted = planStr.isCompleted
      plan.isCanEdit = planStr.isCanEdit

      plan.beginDate = planStr.beginDate
      plan.overDate = planStr.overDate
      plan.beginTime = planStr.beginTime
      plan.overTime = planStr.overTime
      plan.repeatType = planStr.repeatType
      plan.palnType = planStr.palnType
      plan.remindType = planStr.remindType
      plan.remark = planStr.remark
      return plan
    },
    tabCheckBox(e){
      let plan = e.currentTarget.dataset.plan
      

      let planList = this.data.planList
      for (let i = 0; i < planList.length;i++){
        let item = planList[i]
        if (planList[i].planId === plan.planId){
          planList[i].isCompleted = !planList[i].isCompleted
          break;
        }
      }

      this.setData({
        planList: planList
      })

      plan.isCompleted = !plan.isCompleted
      dbUtil.updataPlan(this.toPlanClass(plan), this.toPlanClass(plan))
    },


    tapPlanItem(e){
      let plan = e.currentTarget.dataset.plan
      this.triggerEvent("tapPlanItem", { plan: plan})
    },

  }
})
