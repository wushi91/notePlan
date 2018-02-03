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
  let plans = wx.getStorageSync(key)

  return plans
}
// 每月的1号
const getMonthPlans = function (year, month, day, week) {
  let key = "*_*_" + day + "_*"
  let plans = wx.getStorageSync(key)

  return plans
}
// 每年的12月1号
const getYearPlans = function (year, month, day, week) {
  let key = "*_" + month + "_" + day + "_*"
  let plans = wx.getStorageSync(key)

  return plans
}
// 每周一
const getWeekPlans = function (year, month, day, week) {
  let key = "*_*_*_" + week
  let plans = wx.getStorageSync(key)
  
  return plans
}

const getLianxuPlans = function (year, month, day, week) {
  // 获取某一天的日程，通过连续日程去查找，如果起始时间是当天之后结束天之前，就要返回。
  let key = "*_*"
  let plans = []
  let allLianxuPlans = wx.getStorageSync(key)
  // console.log(allLianxuPlans)
  let currentTime = new Date(year + "-" + month + "-" + day).getTime()
  for (let i = 0; i < allLianxuPlans.length;i++){
    let item = JSON.parse(allLianxuPlans[i])

    // 起始的当天00:00
    let beginTime = new Date(item.beginTime)
    beginTime.setHours(0)
    beginTime.setMinutes(0)
    beginTime.setSeconds(0)
    beginTime.setMilliseconds(0)

    // 结束当天23:59 其实这个可以不用控制，因为我用的是当天的0点
    let overTime = new Date(item.overTime)
    // overTime.setDate(overTime.getDate()+1)
    // overTime.setHours(0)
    // overTime.setMinutes(0)
    // overTime.setSeconds(0)
    // overTime.setMilliseconds(-1)
    // console.log(item)
    // console.log("currentTime:" + currentTime)
    // console.log('beginTime:' + beginTime)
    // console.log('overTime:' + overTime)
    if (currentTime >= beginTime.getTime() && currentTime <= overTime.getTime()){
      //这就是我想要的planId
      plans.push(allLianxuPlans[i])
    }
  }
  // console.log(plans)
  return plans
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
  
  // 最好做一次排序
  return currentDayPlanList
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
  compeltePlan
}

