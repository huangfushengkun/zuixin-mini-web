// components/comments/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    comments:{
      type:Array
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    // hiddenmodalput:false,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    modalinput:function(){  
      this.triggerEvent('add',{},{})
    },
  }
})
