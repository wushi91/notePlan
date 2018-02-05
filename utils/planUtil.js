
const PLANTYPES = [{ prop: "work", label: "工作", color: '#63ADF7' },
{ prop: "study", label: "学习", color: '#6FDE6F' },
{ prop: "sport", label: "运动", color: '#F7A863' },
{ prop: "life", label: "生活", color: '#DB86F0' },
{ prop: "play", label: "娱乐", color: '#F77C80' }]
  
const REPEATTYPES = [{ prop: "no-repeat", label: "不重复" },
{ prop: "day-repeat", label: "每天重复" },
{ prop: "week-repeat", label: "每周重复" },
{ prop: "month-repeat", label: "每月重复" },
{ prop: "year-repeat", label: "每年重复" }]

const REMINDTYPES = [{ prop: "no-remind", label: "不提醒" },
{ prop: "happen-remind", label: "事件发生时" },
{ prop: "5m-remind", label: "提前5分钟" },
{ prop: "10m-remind", label: "提前10分钟" },
{ prop: "15m-remind", label: "提前15分钟" },
{ prop: "30m-remind", label: "提前半小时" },
{ prop: "1h-remind", label: "提前1小时" },
{ prop: "2h-remind", label: "提前2小时" },
{ prop: "1d-remind", label: "提前1天" },
{ prop: "2d-remind", label: "提前2天" },
{ prop: "1w-remind", label: "提前1周" }]


const generateKey = function (plan) {

  let key =''
  // 如果起始时间和结束时间不是同一天
  if (plan.beginTime.year !== plan.overTime.year || plan.beginTime.month !== plan.overTime.month  || plan.beginTime.day !== plan.overTime.day){
    return key = "*_*"
  }
  // console.log('同一天')
  let date = new Date(plan.beginTime.date)
  console.log('date')
  console.log(date)
  let year = date.getFullYear()
  let month = date.getMonth()+1
  let day = date.getDate()
  let week = date.getDay()

  switch (plan.repeatType.prop) {
    case REPEATTYPES[0].prop://不重复
      key = year + '_' + month + '_' + day + '_*'
      break;
    case REPEATTYPES[1].prop://每天重复
      key = '*_*_*_*'
      break;
    case REPEATTYPES[2].prop:// 每周重复
      key = '*_*_*_' + week
      break;
    case REPEATTYPES[3].prop://每月重复
      key = "*_*_" + day + "_*"
      break;
    case REPEATTYPES[4].prop://每年重复
      key = "*_" + month + "_" + day + "_*"
      break;
  }
  
  return key
}




// 根据传入的值生成对象，这个对象用于界面数据的显示
/*vPlan 视图的plan ，sPlan为保存的 */
const createSavePlan = function (key,vPlan){
  let sPlan = {}
  // planId
  sPlan.key = key
  sPlan.planId = "id_" + new Date().getTime()
  sPlan.content = encodeURIComponent(vPlan.content)//因为要转换成json格式保存，所以要编码
  sPlan.remark = encodeURIComponent(vPlan.remark)
  sPlan.isAllDay = vPlan.isAllDay
  sPlan.completedDays = sPlan.completedDays ? sPlan.completedDays:[]
  sPlan.deletedDays = sPlan.deletedDays ? sPlan.deletedDays : []//删除重复的本次事件时的操作
  sPlan.beginTime = new Date(vPlan.beginTime.date).getTime()
  sPlan.overTime = new Date(vPlan.overTime.date).getTime()
  sPlan.repeatType = vPlan.repeatType
  sPlan.palnType = vPlan.palnType
  sPlan.remindType = vPlan.remindType
  
  sPlan.creatTime = vPlan.creatTime ? vPlan.creatTime : new Date().getTime()//如果没有创建时间，则添加时间
  sPlan.updateTime = new Date().getTime()// 修改时间.getTime()
  return JSON.stringify(sPlan)
}

// const planToString = function(plan){
//   // 只要保存以下信息
//   let planId = plan.planId
//   let content = plan.content
//   let remark = plan.remark

//   let isAllDay = plan.isAllDay
//   let completedDay = plan.completedDay

//   let beginDate = plan.beginDate
//   let overDate = plan.overDate

//   let repeatType = plan.repeatType
//   let palnType = plan.palnType
//   let remindType = plan.remindType
  
//   let creatTime = this.creatTime
//   let updateTime = this.updateTime

//   let planll = { planId, content, isAllDay, isCompleted, isCanEdit, beginDate, overDate, beginTime, overTime, repeatType, palnType, remindType, remark, creatTime, updateTime }

//   planll.content = encodeURIComponent(planll.content)
//   planll.remark = encodeURIComponent(planll.remark)

//   return JSON.stringify(planll)
// }


module.exports = {
  PLANTYPES,
  REPEATTYPES,
  REMINDTYPES,
  createSavePlan,
  generateKey 
}