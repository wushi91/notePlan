const Plan = require('../bean/Plan.js')

const planUtil = require('../utils/planUtil.js')


/*
  内部方法
*/
// 具体的天数的
const getTodayPlanIds = function (year, month, day, week) {

  let key = year + "_" + month + "_" + day + "_*"
  let planIds = wx.getStorageSync(key)
  return planIds
}
const getDayPlanIds = function (year, month, day, week) {
  let key = "*_*_*_*"
  let planIds = wx.getStorageSync(key)

  return planIds
}
// 每月的1号
const getMonthPlanIds = function (year, month, day, week) {
  let key = "*_*_" + day + "_*"
  let planIds = wx.getStorageSync(key)

  return planIds
}
// 每年的12月1号
const getYearPlanIds = function (year, month, day, week) {
  let key = "*_" + month + "_" + day + "_*"
  let planIds = wx.getStorageSync(key)

  return planIds
}
// 每周一
const getWeekPlan = function (year, month, day, week) {
  let key = "*_*_*_" + week
  let planIds = wx.getStorageSync(key)
  
  return planIds
}

const getLianxuPlanIds = function (year, month, day, week) {

  let key = "*_*"
  let planIds = []
  let allLianxuPlanIds = JSON.parse(wx.getStorageSync(key))
  let currentTime = new Date(year + "-" + month + "-" + day).getTime()
  for (let i = 0; i < allLianxuPlanIds.length;i++){
    let item = allLianxuPlanIds[0]
    if (currentTime > item.beginTime && currentTime <item.overTime){
      //这就是我想要的planId
      planIds.push(item.planId)
    }
  }

  return planIds
}


const addPlanIdToKey = function(key,planId){
  let planIdList = wx.getStorageSync(key)
  if (!planIdList) planIdList = []
  planIdList.push(planId)
  wx.setStorageSync(key,planIdList)
}

const addPlanToKeyPlanId = function (planId,plan) {
  wx.setStorageSync(planId, plan)

}

/*
 核心代码：获取日程的时候key指向planId，planId指向plan。删除日程的时候，根据planId去删除。*/
const savePlan = function(plan){
  // 需要判断根据内容判断数据的key是什么
  let key = planUtil.generateKey(plan)
  let planId = "id_" + new Date().getTime()
  let sPlan = planUtil.createSavePlan(plan)
  console.log("key值：" + key)
  console.log("planId值：" + planId)
  addPlanIdToKey(key, planId)
  addPlanToKeyPlanId(planId, sPlan)
}

const getPlanList = function (year, month, day, week) {
  let planList = []
  let planIds = getCurrentDayPlanIds(year, month, day, week)
  for (let i = 0; i < planIds.length;i++){
    planList.push(wx.getStorageSync(planIds[i])) 
  }

  return planList
}

const getPlan = function(){
  
}

const getCurrentDayPlanIds = function(year,month,day,week){
  let currentDayPlanIds = []
  //key为当天的数据 year_month_day_*
  //查询每天的数据  *   _*    _*  _*
  //查询每月的数据  *   _*    _day_*
  //查询每年的数据  *   _month_day_*
  //查询每周的数据  *   _*    _*  _week
  //查询连续的数据  *   _*
  
  let dayPlanIds = getDayPlanIds(year, month, day, week)
  let todayPlanIds = getTodayPlanIds(year, month, day, week)
  let monthPlanIds= getMonthPlanIds(year, month, day, week)
  let yearPlanIds = getYearPlanIds(year, month, day, week)
  let weekPlanIds = getWeekPlanIds(year, month, day, week)
  let lianxuPlanIds = getLianxuPlanIds(year, month, day, week)
  if (dayPlanIds) currentDayPlanIds = currentDayPlanIds.concat(dayPlanIds)
  if (todayPlanIds) currentDayPlanIds = currentDayPlanIds.concat(todayPlanIds)
  if (monthPlanIds) currentDayPlanIds = currentDayPlanIds.concat(monthPlanIds)
  if (yearPlanIds) currentDayPlanIds = currentDayPlanIds.concat(yearPlanIds)
  if (weekPlanIds) currentDayPlanIds = currentDayPlanIds.concat(weekPlanIds)
  if (lianxuPlanIds) currentDayPlanIds = currentDayPlanIds.concat(lianxuPlanIds)
  
  // 最好做一次排序
  return currentDayPlanIds
}

const updataPlan = function(o_plan,n_plan){
  /* 因为有可能修改了项目的起始时间，重复模式，所以key值会改变，统一删除旧的数据，然后插入新的数据，新的那条数据创建时间是不变的
  */
  // 删掉旧的日程
  deletePlan(o_plan)
  // 
  savePlan(n_plan)
}

const deletePlan = function (plan){
  //根据年月日还有数据的id去删除，获取到一个数据，需要判断他的key是什么，然后在进去key里面删除对应的id


  // console.log("--------------------------")
  // console.log(plan.beginDate)

  // console.log("--------------------------")
  // console.log(plan)
  let key = generateKey(plan)
  let planId = plan.planId
  let planList = wx.getStorageSync(key)


  let delIndex =-1
  for (let i = 0; i < planList.length;i++){
    let item = planList[i]
    let newItem = JSON.parse(item)
    if (newItem.planId === planId){
      delIndex = i
      break;
    }
  }
  if (delIndex>=0){
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

