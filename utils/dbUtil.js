const Plan = require('../bean/Plan.js')
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


const generateKey = function(paln){
  let date = new Date(paln.beginDate)
  let year = date.getFullYear()
  let month = date.getMonth() + 1
  let day = date.getDate()
  let week = date.getDay()+1
  
  let repeatType = paln.repeatType

// { prop: "no-repeat", label: "不重复" },
// { prop: "day-repeat", label: "每天重复" },
// { prop: "week-repeat", label: "每周重复" },
// { prop: "month-repeat", label: "每月重复" },
// { prop: "year-repeat", label: "每年重复" }
let key = ''
switch (repeatType.prop){
  case Plan.REPEATTYPES[0].prop://不重复
    key = year + '_' + month + '_' + day + '_0'
    break;
  case Plan.REPEATTYPES[1].prop://每天重复
    key = '0_0_0_0'
    break;
  case Plan.REPEATTYPES[2].prop:// 每周重复
    key = '0_0_0_' + week
    break;
  case Plan.REPEATTYPES[3].prop://每月重复
    key = "0_0_" + day + "_0"
    break;
  case Plan.REPEATTYPES[4].prop://每年重复
    key = "0_" + month + "_" + day + "_0"
    break;
}
  return key
}




const savePlan = function(plan){
  // 需要判断根据内容判断数据的key是什么

  let key = generateKey(plan)
  console.log("--------------------------")
  console.log(key)

  let planList = wx.getStorageSync(key)
  if (!planList) {
    // Do something with return value
    planList = []
  }
  planList.push(plan.toString())
  wx.setStorage({
    key: key,
    data: planList
  })
}

const getPlan = function(year,month,day,week){
  //key为当天的数据 year_month_day_0
  //查询每天的数据  0   _0    _0  _0
  //查询每月的数据  0   _0    _day_0
  //查询每年的数据  0   _month_day_0
  //查询每周的数据  0   _0    _0  _week
 

  let currentDayPlan = getOnlyDay(year, month, day, week)
  if (getEveryDay(year, month, day, week))
  currentDayPlan = currentDayPlan.concat(getEveryDay(year, month, day, week))
  if (getEveryMonth(year, month, day, week))
  currentDayPlan = currentDayPlan.concat(getEveryMonth(year, month, day, week))
  if (getEveryYear(year, month, day, week))
  currentDayPlan = currentDayPlan.concat(getEveryYear(year, month, day, week))
  if (getEveryWeek(year, month, day, week))
  currentDayPlan = currentDayPlan.concat(getEveryWeek(year, month, day, week))

  // 最好做一次排序
  return currentDayPlan
}

const updataPlan = function(){
  //关键在于？将旧的删除，将新的修改插入，不过新的那条数据创建时间是不变的
}

const deletePlan = function(){
  //根据年月日还有数据的id去删除，获取到一个数据，需要判断他的key是什么，然后在进去key里面删除对应的id
}



module.exports = {
  savePlan,
  getPlan,
  updataPlan,
  deletePlan
}

