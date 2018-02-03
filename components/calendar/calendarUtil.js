const dbUtil = require('../../utils/dbUtil.js')
const util = require('../../utils/util.js')
const lunarUtil = require('../../utils/lunarUtil.js')

const getChinaWeekNum = (date, before) => {
  let weekNum = date.getDay()
  let chinaWeek = ''
  switch (weekNum) {
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

  if (before) {
    return before + chinaWeek
  }
  return chinaWeek
}

const getWeekLastOrNext = (date,next=0,showPlan=false) => {
  // 指定哪一天

  let _date = new Date(date.getTime())
  _date.setDate(date.getDate() + 7*next)
  // 这一天位于一个星期的位置
  let weekNum = _date.getDay()// 0-6
  let beforeDay = weekNum
  let afterDay = 6 - beforeDay
  let week = []

  // 获取这个星期的天，同时完成组件显示格式
  for (let i = beforeDay; i >= 0; i--) {
    let tempDate = new Date(_date.getTime())
    tempDate.setDate(tempDate.getDate() - i)
    let nongTempDate = lunarUtil.calendar.solar2lunar(tempDate.getFullYear(), tempDate.getMonth(), tempDate.getDate())
    let item = {
      date: tempDate,
      year: tempDate.getFullYear(),
      month: tempDate.getMonth(),
      day: tempDate.getDate(),
      china_month: '二',
      china_day: nongTempDate.IDayCn,
      china_weekNum: getChinaWeekNum(tempDate)
    }
    if (showPlan){
      item.planList = toGetPlanList(tempDate)
    }
    week.push(item)
  }
  // week.push(date)

  for (let i = 1; i <= afterDay; i++) {
    let tempDate = new Date(_date.getTime())
    tempDate.setDate(tempDate.getDate() + i)
    let nongTempDate = lunarUtil.calendar.solar2lunar(tempDate.getFullYear(), tempDate.getMonth(), tempDate.getDate())
    let item = {
      date: tempDate,
      year: tempDate.getFullYear(),
      month: tempDate.getMonth(),
      day: tempDate.getDate(),
      china_month: '二',
      china_day: nongTempDate.IDayCn,
      china_weekNum: getChinaWeekNum(tempDate)
    }
    if (showPlan) {
      item.planList = toGetPlanList(tempDate)
    }
    week.push(item)

    
  }
  return week
}


const toGetPlanList = (date)=> {
  let planList = []
  let stringList = dbUtil.getPlanList(date)
  // console.log(stringList)
  for (let i = 0; i < stringList.length; i++) {
    let item = JSON.parse(stringList[i])
    // 把beginTime，overTime提取出来
    item.content = decodeURIComponent(item.content)
    item._beginTime = util.formatJustTime(new Date(item.beginTime))
    item._overTime = util.formatJustTime(new Date(item.overTime))
    item.isCompleted = util.isContainDate(item.completedDays, date)
    planList.push(item)
  }

  return planList
}


module.exports = {
  getWeekLastOrNext
}
