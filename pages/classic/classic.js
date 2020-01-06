// pages/classic/classic.js
import {ClassicModel} from '../../models/classic.js'
let classicModel = new ClassicModel()
import {LikeModel} from '../../models/like.js'
let likeModel = new LikeModel()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    classic:null,
    latest:true,
    first:false,
    likeStatus: false,
    likeCount:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取token
    wx.login({
      success: (res) => {
        // console.log(res.code)
        if (res.code) {
          wx.request({
            url: 'http://localhost:3000/v1/token',
            // url: 'https://island.huangfushengkun.online/v1/token/',
            method: "POST",
            data: {
              account: res.code,
              type: 100
            },
            success: (res) => {
              // console.log(res)
              // 判断状态码是否是2开头的
              const code = res.statusCode.toString()
              if (code.startsWith('2')) {
                // 写入缓存
                wx.setStorageSync('token', res.data.token)
                // 更新数据
                classicModel.getLatest((res) => {
                  // console.log(111)
                  this.setData({
                    classic: res,
                    likeStatus: res.like_status,
                    likeCount: res.fav_nums
                  })
                  // console.log(this.data.classic)
                  // latestClassic currentClassic
                })
              }
            }
          })
        }
      }
    })

  },

  onLike:function (event) {
    let behavior = event.detail.behavior
    likeModel.like(behavior,this.data.classic.id,this.data.classic.type)
  },


  onNext: function (event) {
    this._updateClassic('next')
  },

  onPrevious:function (event) {
    this._updateClassic('previous')
  },

  _updateClassic:function (nextOrPrevious) {
    let index = this.data.classic.index
    classicModel.getClassic(index, nextOrPrevious, (res) => {
      // console.log(res)
      this._getLikeStatus(res.id,res.type)
      this.setData({
        classic:res,
        latest: classicModel.isLatest(res.index),
        first:classicModel.isFirst(res.index)
      })
    })
  },

  _getLikeStatus:function (artID,category) {
    likeModel.getClassicLikeStatus(artID,category,(res) => {
      this.setData({
        likeStatus: res.like_status,
        likeCount:res.fav_nums
      })
    })
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