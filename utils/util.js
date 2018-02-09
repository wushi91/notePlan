
const planUtil = require('../utils/planUtil.js')
const dbUtil = require('../utils/dbUtil.js')
const selectionTimeUtil = require('../components/selectionTimeItem/selectionTimeUtil.js')

const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatJustTime = date => {
  const hour = date.getHours()
  const minute = date.getMinutes()

  return [hour, minute].map(formatNumber).join(':')
}

const formatTimeChinaYueRi = date => {
  return date.getFullYear()+"年"+(date.getMonth() + 1) + "月" + date.getDate() + "日"
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const isContainDate = (completedDays, date) =>{
  let dateString = date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate()
  let index = -1
  for (let i = 0; i < completedDays.length; i++) {
    let dateItem = completedDays[i]
    if (dateItem === dateString) {
      index = i
      break;
    }
  }
  if (index >= 0) {
    return true
  } else {
    return false
  }
}

const getChinaWeekNum= (date,before)=>{
  let weekNum = date.getDay()
  let chinaWeek =''
  switch(weekNum){
    case 0:
      chinaWeek = '日'
      break;
    case 1:
      chinaWeek = '一'
      break;
    case 2:
      chinaWeek = '二'
      break;
    case 3:
      chinaWeek = '三'
      break;
    case 4:
      chinaWeek = '四'
      break;
    case 5:
      chinaWeek = '五'
      break;
    case 6:
      chinaWeek = '六'
      break;
  }

  if(before){
    return before + chinaWeek
  }
  return chinaWeek
  
}

// // 输入一天，获取这一天所处的周
// const getWeek = (date)=>{
//   let weekNum = date.getDay()// 0-6
//   let beforeDay = weekNum
//   let afterDay = 6 - beforeDay

//   let week=[]
  
//   for (let i = beforeDay;i>=0;i--){
//     let tempDate = new Date(date.getTime())
//     tempDate.setDate(tempDate.getDate()-i)
//     week.push(tempDate)
//   }
//   // week.push(date)

//   for (let i = 1; i <=afterDay; i++) {
//     let tempDate = new Date(date.getTime())
//     tempDate.setDate(tempDate.getDate() +i)
//     week.push(tempDate)
//   }

//   return week
// }

// const getWeekToCalendarComponent = (date) =>{
//   let week = getWeek(date)
//   let weekToCalendarComponent =[]
//   let today = new Date()
//   for(let i=0;i<week.length;i++){
//     let date = week[i]
//     let isToday = today.getFullYear() === date.getFullYear() 
//     && today.getMonth() === date.getMonth() 
//     && today.getDate()===date.getDate()
//     let newItme = { 
//       date: date,
//       year: date.getFullYear(), 
//       month: date.getMonth() + 1,
//       day: date.getDate(),
//       china_month: '二', 
//       china_day: '廿二', 
//       china_weekNum: getChinaWeekNum(date), 
//       isToday: isToday
//       }
//     weekToCalendarComponent.push(newItme)
//   }

//   return weekToCalendarComponent
  
// }

const firstLaunch = function(){

  let isFirstLaunch = !(wx.getStorageSync('FirstLaunch'))

  if (isFirstLaunch){
    let content = ''
    let remark = ''
    let isAllDay = true
    let beginTime = selectionTimeUtil.getItemTime(new Date())
    let overTime = selectionTimeUtil.getItemTime(new Date())


    let repeatType = planUtil.REPEATTYPES[0]
    let palnType = planUtil.PLANTYPES[0]
    let remindType = planUtil.REMINDTYPES[0]

    let plan = {
      content: content,
      remark: remark,
      isAllDay: isAllDay,
      beginTime: beginTime,
      overTime: overTime,
      repeatType: repeatType,
      palnType: palnType,
      remindType: remindType
    }
    plan.content = "点击底部+添加新日程"
    dbUtil.savePlan(plan)
    plan.content = "点击该卡片查看日程详情"
    dbUtil.savePlan(plan)
    plan.content = "点击左侧方框标记为完成"
    dbUtil.savePlan(plan)
    wx.setStorageSync('FirstLaunch', "FirstLaunch")
    wx.setStorageSync('version', "v0.1")
  }
  
  
}

module.exports = {
  formatTime: formatTime,
  getChinaWeekNum,
  formatJustTime,
  formatTimeChinaYueRi,
  formatNumber,
  isContainDate,
  firstLaunch
}
