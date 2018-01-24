class Plan {
  
  static PLANTYPES = [{ prop: "work", label: "工作", color: '#63ADF7' },
    { prop: "study", label: "学习", color: '#6FDE6F' },
    { prop: "sport", label: "运动", color: '#F7A863' },
    { prop: "life", label: "生活", color: '#DB86F0' },
    { prop: "play", label: "娱乐", color: '#F77C80' }]
  
  static REPEATTYPES = [{ prop: "no-repeat", label: "不重复" },
  { prop: "day-repeat", label: "每天重复" },
  { prop: "week-repeat", label: "每周重复" },
  { prop: "month-repeat", label: "每月重复" },
  { prop: "year-repeat", label: "每年重复" }]

  static REMINDTYPES = [{ prop: "no-remind", label: "不提醒" },
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

  // 构造  
  /*isCompleted是否已经完成
  isCanEdit是否可以修改或删除
  */
  constructor(content, isAllDay, isCompleted,isCanEdit,beginTime,overTime,repeatType,palnType,remindType,remark) {
    this.isCompleted = isCompleted
    this.isCanEdit = isCanEdit
    this.content = content
    this.isAllDay = isAllDay
    this.beginTime = beginTime
    this.overTime = overTime

    this.repeatType = repeatType
    this.palnType = palnType
    this.remindType = remindType
    this.remark = remark
  }

  


}
export default{ 
  Plan 
}; 