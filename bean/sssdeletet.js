const Plan = require('../bean/Plan.js')

const planUtil = require('../utils/planUtil.js')


/*
  内部方法
*/
// 具体的天数的
const getOnlyDay = function (year, month, day, week) {
  return wx.getStorageSync(year + "_" + month + "_" + day + "_0")
}
const getEveryDay = function (year, month, day, week) {
  return wx.getStorageSync("0_0_0_0")
}
// 每月的1号
const getEveryMonth = function (year, month, day, week) {
  return wx.getStorageSync("0_0_" + day + "_0")
}
// 每年的12月1号
const getEveryYear = function (year, month, day, week) {
  return wx.getStorageSync("0_" + month + "_" + day + "_0")
}
// 每周一
const getEveryWeek = function (year, month, day, week) {
  return wx.getStorageSync("0_0_0_" + week)
}


// const generateKey = function(paln){
//   let date = new Date(paln.beginDate)
//   let year = date.getFullYear()
//   let month = date.getMonth() + 1
//   let day = date.getDate()
//   let week = date.getDay()+1

//   let repeatType = paln.repeatType

// // { prop: "no-repeat", label: "不重复" },
// // { prop: "day-repeat", label: "每天重复" },
// // { prop: "week-repeat", label: "每周重复" },
// // { prop: "month-repeat", label: "每月重复" },
// // { prop: "year-repeat", label: "每年重复" }
// let key = ''
// switch (repeatType.prop){
//   case Plan.REPEATTYPES[0].prop://不重复
//     key = year + '_' + month + '_' + day + '_0'
//     break;
//   case Plan.REPEATTYPES[1].prop://每天重复
//     key = '0_0_0_0'
//     break;
//   case Plan.REPEATTYPES[2].prop:// 每周重复
//     key = '0_0_0_' + week
//     break;
//   case Plan.REPEATTYPES[3].prop://每月重复
//     key = "0_0_" + day + "_0"
//     break;
//   case Plan.REPEATTYPES[4].prop://每年重复
//     key = "0_" + month + "_" + day + "_0"
//     break;
// }
//   return key
// }



/*
 核心代码：获取日程的时候key指向planId，planId指向plan。删除日程的时候，根据planId去删除。*/
const savePlan = function (plan) {
  // 需要判断根据内容判断数据的key是什么
  let key = ''
  let planId = "id_" + new Date().getTime()

  let sPlan = planUtil.createSavePlan(plan)

  console.log("------------------------------------------")
  console.log("savePlan")
  console.log(key)
  console.log(planId)
  console.log(sPlan)
  console.log("------------------------------------------")


  // let planList = wx.getStorageSync(key)
  // if (!planList) {
  //   // Do something with return value
  //   planList = []
  // }

  // //如果没有创建时间，则添加时间
  // if (!plan.creatTime){
  //   plan.creatTime = new Date().getTime()
  // }
  // // 修改时间
  // plan.updateTime = new Date().getTime()

  // //这里进行转码，后期数据需要处理成json
  // plan.content = encodeURIComponent(plan.content)
  // plan.remark = encodeURIComponent(plan.remark)
  // planList.push(plan.toString())

  // wx.setStorage({
  //   key: key,
  //   data: planList
  // })
}

const getPlan = function (year, month, day, week) {
  //key为当天的数据 year_month_day_0
  //查询每天的数据  0   _0    _0  _0
  //查询每月的数据  0   _0    _day_0
  //查询每年的数据  0   _month_day_0
  //查询每周的数据  0   _0    _0  _week


  let currentDayPlan = []
  let EveryDay = getEveryDay(year, month, day, week)
  let OnlyDay = getOnlyDay(year, month, day, week)
  let EveryMonth = getEveryMonth(year, month, day, week)
  let EveryYear = getEveryYear(year, month, day, week)
  let EveryWeek = getEveryWeek(year, month, day, week)
  if (EveryDay) currentDayPlan = currentDayPlan.concat(EveryDay)
  if (OnlyDay) currentDayPlan = currentDayPlan.concat(OnlyDay)
  if (EveryMonth) currentDayPlan = currentDayPlan.concat(EveryMonth)
  if (EveryYear) currentDayPlan = currentDayPlan.concat(EveryYear)
  if (EveryWeek) currentDayPlan = currentDayPlan.concat(EveryWeek)


  // 最好做一次排序
  return currentDayPlan
}

const updataPlan = function (o_plan, n_plan) {
  /* 因为有可能修改了项目的起始时间，重复模式，所以key值会改变，统一删除旧的数据，然后插入新的数据，新的那条数据创建时间是不变的
  */
  // 删掉旧的日程
  deletePlan(o_plan)
  // 
  savePlan(n_plan)
}

const deletePlan = function (plan) {
  //根据年月日还有数据的id去删除，获取到一个数据，需要判断他的key是什么，然后在进去key里面删除对应的id


  // console.log("--------------------------")
  // console.log(plan.beginDate)

  // console.log("--------------------------")
  // console.log(plan)
  let key = generateKey(plan)
  let planId = plan.planId
  let planList = wx.getStorageSync(key)


  let delIndex = -1
  for (let i = 0; i < planList.length; i++) {
    let item = planList[i]
    let newItem = JSON.parse(item)
    if (newItem.planId === planId) {
      delIndex = i
      break;
    }
  }
  if (delIndex >= 0) {
    planList.splice(delIndex, 1)
    wx.setStorageSync(key, planList)
  }
  console.log("--------------------------")
  console.log("删除成功")
  console.log("--------------------------")
}



module.exports = {
  savePlan,
  getPlan,
  updataPlan,
  deletePlan
}

