// pages/articleList/articleList.js

import {ClassicModel} from '../../models/classic.js'
let classicModel = new ClassicModel()
import {LikeModel} from '../../models/like.js'
let likeModel = new LikeModel()
import {CommentModel} from '../../models/comment.js'
const commentModel = new CommentModel()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    article: {},
    comments:[]
    
  },
  // methods: {
    onLike:function (event) {
      let behavior = event.detail.behavior
      likeModel.like(behavior,this.data.article.id,this.data.article.type)
      // this.setData({
      //   article
      // })
    },
  // },


  setLike() {
    this.setData({
      'article.isLiked': true
    })
  },

  getArticle(type,id) {
    wx.showLoading({
      title: '请求中...',
    })
    classicModel.getArticleInfo(type,id,(res) => {
      // console.log(res)
      this.setData({
        article: res
      }, function () {
        wx.hideLoading()
      })
      wx.setNavigationBarTitle({
        title: this.data.article.title,
      })
    })
  },

  getComments(id,type) {
    commentModel.getComments(id,type,(res) => {
      console.log(res)
      this.setData({
        comments:res
      })
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const id = options.id
    const type = options.type
    this.getArticle(type,id)
    this.getComments(id,type)
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})