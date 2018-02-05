const Plan = require('../bean/Plan.js')

const planUtil = require('../utils/planUtil.js')


/*
  内部方法
*/
// 具体的天数的
const getTodayPlans = function (year, month, day, week) {

  let key = year + "_" + month + "_" + day + "_*"
  let plans = wx.getStorageSync(key)
  return plans
}
const getDayPlans = function (year, month, day, week) {
  let key = "*_*_*_*"
  let plans = []
  let allDayPlans = wx.getStorageSync(key)

  for (let i = 0; i < allDayPlans.length; i++) {
    let item = JSON.parse(allDayPlans[i])
    //判断当天是否删除了
    if (hasTheDayDelete(year, month, day, item.deletedDays)) {
      break;
    }
    // 判断日程的起始时间是否处于当天
    if (isTheDayInBeginToOver(year, month, day, item.beginTime, "2100-12-31")) {
      plans.push(allDayPlans[i])
    }
  }

  return plans
}
// 每月的1号
const getMonthPlans = function (year, month, day, week) {
  let key = "*_*_" + day + "_*"
  let plans = []
  let allMonthPlans = wx.getStorageSync(key)

  for (let i = 0; i < allMonthPlans.length; i++) {
    let item = JSON.parse(allMonthPlans[i])
    //判断当天是否删除了
    if (hasTheDayDelete(year, month, day, item.deletedDays)) {
      break;
    }
    // 判断日程的起始时间是否处于当天
    if (isTheDayInBeginToOver(year, month, day, item.beginTime, "2100-12-31")) {
      plans.push(allMonthPlans[i])
    }
  }

  return plans
}
// 每年的12月1号
const getYearPlans = function (year, month, day, week) {
  let key = "*_" + month + "_" + day + "_*"
  let plans = []
  let allYearPlans = wx.getStorageSync(key)

  for (let i = 0; i < allYearPlans.length; i++) {
    let item = JSON.parse(allYearPlans[i])
    //判断当天是否删除了
    if (hasTheDayDelete(year, month, day, item.deletedDays)) {
      break;
    }
    // 判断日程的起始时间是否处于当天
    if (isTheDayInBeginToOver(year, month, day, item.beginTime, "2100-12-31")) {
      plans.push(allYearPlans[i])
    }
  }
  


  return plans
}
// 每周一
const getWeekPlans = function (year, month, day, week) {
  let key = "*_*_*_" + week
  let plans = []
  let allWeekPlans = wx.getStorageSync(key)
  
  for (let i = 0; i < allWeekPlans.length; i++) {
    let item = JSON.parse(allWeekPlans[i])
    //判断当天是否删除了
    if (hasTheDayDelete(year, month, day, item.deletedDays)) {
      break;
    }
    // 判断日程的起始时间是否处于当天
    if (isTheDayInBeginToOver(year, month, day, item.beginTime, "2100-12-31")) {
      plans.push(allWeekPlans[i])
    }
  }

  return plans



  return plans
}

const getLianxuPlans = function (year, month, day, week) {
  // 获取某一天的日程，通过连续日程去查找，如果起始时间是当天之后结束天之前，就要返回。
  let key = "*_*"
  let plans = []
  let allLianxuPlans = wx.getStorageSync(key)

  for (let i = 0; i < allLianxuPlans.length;i++){
    let item = JSON.parse(allLianxuPlans[i])
    //判断当天是否删除了
    if (hasTheDayDelete(year, month, day, item.deletedDays)){
      break;
    }
    // 判断日程的起始时间是否处于当天
    if (isTheDayInBeginToOver(year, month, day, item.beginTime, item.overTime)){
      plans.push(allLianxuPlans[i])
    }
  }

  return plans
}

const hasTheDayDelete = function (year, month, day, deletedDays){
  let isDelete = false
  for (let i = 0; i < deletedDays.length; i++) {
    let theDay = year + '-' + (month - 1) + '-' + day
    if (theDay === deletedDays[i]) {
      isDelete = true
      break;
    }
  }
  return isDelete
}

// 比如设置了连续的日期7号到10号，因为key的原因，所有连续日程都放在*_*中，即所有*_*为连续日程，里面有个7号到10号的，要通过以下方法获取
const isTheDayInBeginToOver = function (year, month, day, beginTime,overTime){
  let theDay = new Date(year + "-" + month + "-" + day).getTime()
  // 判断起始时间// 起始的当天00:00
  beginTime = new Date(beginTime)
  beginTime.setHours(0)
  beginTime.setMinutes(0)
  beginTime.setSeconds(0)
  beginTime.setMilliseconds(0)
  overTime = new Date(overTime)
  if (theDay >= beginTime.getTime() && theDay <= overTime.getTime()) {
    //这就是我想要的planId
    return true
  }
  return false
}


const addPlanToKey = function(key,sPlan){
  let planList = wx.getStorageSync(key)
  if (!planList) planList = []
  planList.push(sPlan)
  wx.setStorageSync(key, planList)
}

// const addPlanToKeyPlanId = function (planId,plan) {
//   wx.setStorageSync(planId, plan)
// }

/*
 核心代码：获取日程的时候key指向planId，planId指向plan。删除日程的时候，根据planId去删除。*/
const savePlan = function (vPlan){
  // 需要判断根据内容判断数据的key是什么
  let key = planUtil.generateKey(vPlan)
  let sPlan = planUtil.createSavePlan(key,vPlan)
  console.log("key值：" + key)
  addPlanToKey(key, sPlan)
}

// const getPlanList = function (year, month, day, week) {
//   let planList = []
//   let planIds = getCurrentDayPlanIds(year, month, day, week)

//   console.log('我操')
//   for (let i = 0; i < planIds.length;i++){
//     planList.push(wx.getStorageSync(planIds[i])) 
//   }
//   return planList
// }

const getPlan = function(key,planId){
  let plan = {}
  let plans = wx.getStorageSync(key)

  for (let i = 0; i < plans.length; i++) {
    let item = JSON.parse(plans[i])
    if (item.planId === planId) {
      return plans[i]
    }
  }
}

const getPlanList = function(date){

  let year = date.getFullYear()
  let month = date.getMonth() + 1
  let day = date.getDate()
  let week = date.getDay()

  let currentDayPlanList = []
  
  
  let dayPlans = getDayPlans(year, month, day, week)
  let todayPlans = getTodayPlans(year, month, day, week)
  let monthPlans= getMonthPlans(year, month, day, week)
  let yearPlans = getYearPlans(year, month, day, week)
  let weekPlans = getWeekPlans(year, month, day, week)
  let lianxuPlans = getLianxuPlans(year, month, day, week)
  if (dayPlans) currentDayPlanList = currentDayPlanList.concat(dayPlans)
  if (todayPlans) currentDayPlanList = currentDayPlanList.concat(todayPlans)
  if (monthPlans) currentDayPlanList = currentDayPlanList.concat(monthPlans)
  if (yearPlans) currentDayPlanList = currentDayPlanList.concat(yearPlans)
  if (weekPlans) currentDayPlanList = currentDayPlanList.concat(weekPlans)
  if (lianxuPlans) currentDayPlanList = currentDayPlanList.concat(lianxuPlans)
  
  // 做一次冒泡排序
  
  return maoPaoPaiXu(currentDayPlanList)
  // return currentDayPlanList
}

const  maoPaoPaiXu = function(planList){
  // 全天事件排最前
  for (let i = 0; i < planList.length;i++){
    
    for (let j = i+1 ; j < planList.length;j++){
      let item1 = JSON.parse(planList[i])
      let item2 = JSON.parse(planList[j])
      let beginTime1 = 0
      if (item1.isAllDay){
        console.log(item1)
        console.log('----------')
      }else{
        console.log('sbsbsbsbsbsb')
        console.log(item1)
      }
      
      if (!item1.isAllDay) {
        beginTime1 = new Date(item1.beginTime)
        beginTime1.setHours(new Date(item1.beginTime).getHours())
        beginTime1.setMinutes(new Date(item1.beginTime).getMinutes())
        beginTime1.setSeconds(new Date(item1.beginTime).getSeconds())
        beginTime1 = new Date(beginTime1).getTime()
      }else{
        console.log('全天事件1')
      }
      let beginTime2 = 0
      if (!item2.isAllDay) {
        beginTime2 = new Date(item2.beginTime)
        beginTime2.setHours(new Date(item2.beginTime).getHours())
        beginTime2.setMinutes(new Date(item2.beginTime).getMinutes())
        beginTime2.setSeconds(new Date(item2.beginTime).getSeconds())
        beginTime2 = new Date(beginTime2).getTime()
      } else {
        console.log('全天事件2')
      }
      //如果beginTim1大于beginTime2交换位置
      if (beginTime1 > beginTime2){
        let temp = planList[j]
        planList[j] = planList[i] 
        planList[i] = temp
       
      }
    }
  }

  return planList
}

const updatePlan = function(plan){
  /* 因为有可能修改了项目的起始时间，重复模式，所以key值会改变，统一删除旧的数据，然后插入新的数据，新的那条数据创建时间是不变的
  */
  // 删掉旧的日程
  deletePlan(plan.key,plan.planId)
  // 
  savePlan(plan)
}

const deletePlan = function (key,planId){
  //根据年月日还有数据的id去删除，获取到一个数据，需要判断他的key是什么，然后在进去key里面删除对应的id
  let plans = wx.getStorageSync(key)
  let delIndex =-1
  for (let i = 0; i < plans.length;i++){
    let item = JSON.parse(plans[i])
    if (item.planId === planId){
      delIndex = i
      break;
    }
  }
  if (delIndex>=0){
    plans.splice(delIndex, 1)
    wx.setStorageSync(key, plans)
  }
  console.log("--------------------------")
  console.log("删除成功")
  console.log("--------------------------")
}

const deleteRepeatPlanByDay = function (key, planId, deletedDays) {
  //如果plan中有一个属性，completedDays，保存完成了的日期
  let plans = wx.getStorageSync(key)
  for (let i = 0; i < plans.length; i++) {
    let item = JSON.parse(plans[i])
    if (item.planId === planId) {
      // 找到了
      item.deletedDays = deletedDays
      plans[i] = JSON.stringify(item)
      wx.setStorageSync(key, plans)
      break;
    }
  }
}


const compeltePlan = function (key,planId,completedDays){
  //如果plan中有一个属性，completedDays，保存完成了的日期
  let plans = wx.getStorageSync(key)
  for (let i = 0; i < plans.length; i++) {
    let item = JSON.parse(plans[i])
    if (item.planId === planId) {
      // 找到了
      item.completedDays = completedDays
      plans[i] = JSON.stringify(item)
      wx.setStorageSync(key, plans)
      break;
    }
  }
}


module.exports = {
  savePlan,
  getPlanList,
  getPlan,
  updatePlan,
  deletePlan,
  compeltePlan,
  deleteRepeatPlanByDay
}

