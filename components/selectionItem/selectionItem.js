// components/selectionItem/selectionItem.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

    defaultItem: { // 属性名
      type: Object, // 类型（必填），目前接受的类型包括：String, Number, Boolean, Object, Array, null（表示任意类型）
      value: '' // 属性初始值（可选），如果未指定则会根据类型选择一个
    },
    itemList:{
      type: Array,
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    
    selectItem:'',
    isSelecting:false,
    // defaultItem: { prop: "play", label: "娱乐", color: '#F77C80' },
    // itemList:[{ prop: "work", label: "工作", color: '#63ADF7' },
    // { prop: "study", label: "学习", color: '#6FDE6F' },
    // { prop: "sport", label: "运动", color: '#F7A863' },
    // { prop: "life", label: "生活", color: '#DB86F0' },
    // { prop: "play", label: "娱乐", color: '#F77C80' }],
    // PLANTYPES :[{ prop: "work", label: "工作", color: '#63ADF7' },
    // { prop: "study", label: "学习", color: '#6FDE6F' },
    // { prop: "sport", label: "运动", color: '#F7A863' },
    // { prop: "life", label: "生活", color: '#DB86F0' },
    // { prop: "play", label: "娱乐", color: '#F77C80' }],
    // REPEATTYPES :[{ prop: "no-repeat", label: "不重复" },
    // { prop: "day-repeat", label: "每天重复" },
    // { prop: "week-repeat", label: "每周重复" },
    // { prop: "month-repeat", label: "每月重复" },
    // { prop: "year-repeat", label: "每年重复" }]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    showSelection(){
      // console.log('toSelection')

      this.setData({
        isSelecting: true
      })
    },

    toSelect(e){
      // console.log(e.currentTarget.dataset.item)
      this.setData({
        isSelecting: false,
        selectItem: e.currentTarget.dataset.item
      })

      this.triggerEvent("tabSelectionItem", { selectionItem: e.currentTarget.dataset.item })
    }
  }
})
