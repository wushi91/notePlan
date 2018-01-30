

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


const getDefaultStartDate = function () {
  let date = new Date()
  date.setMinutes(0)
  return date
}

const getDefaultStartTime = function(){
  let date = new Date()
  date.setMinutes(0)
  return getItemTime(date)
}

const getDefaultOverDate = function(){
  let date = new Date()
  date.setHours(date.getHours() + 1)
  date.setMinutes(0)
  return date
}

const getDefaultOverTime = function () {
  let date = new Date()
  date.setHours(date.getHours()+1)
  date.setMinutes(0)
  return getItemTime(date)
}

const getItemTime = function (date){

  if(date){
    // 这个是属于初始时间 
  }else{
    // 推荐的默认时间
   date = new Date()
  }
  
  let item = {
    date: date,
    year: date.getFullYear(),
    month: formatNumber(date.getMonth()+1),
    day: formatNumber(date.getDate()),
    hour: formatNumber(date.getHours()),
    minute: formatNumber(date.getMinutes()),
    china_weekNum: getChinaWeekNum(date, "周")
  }
  return item
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

module.exports = {
  getItemTime,
  getDefaultStartTime,
  getDefaultOverTime,
  getDefaultStartDate,
  getDefaultOverDate
}