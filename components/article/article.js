// components/article/article.js
// import { LikeModel } from './../../models/like'
// let likeModel = new LikeModel()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    article: {
      type:Object,
      value: {}
    },
    like_status:{
      type:Boolean
    },
    comments:{
      type:Array
    }
  },


  /**
   * 组件的初始数据
   */
  data: {
    // like:null
  },

  //声明周期
  lifetimes: {
    ready() {
      console.log(this.properties.article)

    },
    created () {
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    like (e) {
      const like_status = this.properties.like_status
      this.setData({
        
        like_status:!like_status
      })
      let behavior = !like_status ? 'like' : 'cancel'
      this.triggerEvent('like',{
        behavior,
      },{})
      // likeModel.like(behavior,id,type)

    }
  }
})
