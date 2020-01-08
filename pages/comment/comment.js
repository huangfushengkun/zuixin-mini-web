// pages/like/like.js
import {CommentModel} from '../../models/comment'
let commentModel = new CommentModel()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    classics:[]

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getMyConnents()
  },
  getMyConnents() {
    commentModel.getMyConnents(res => {
      // console.log(res)
      this.setData({
        classics:res
      })
    })
  },

  onPreviewTap(e) {
    // console.log(e.detail)
    const id = e.detail.id
    const type = e.detail.type
    if (id && type) {
      wx.navigateTo({
        url: `/pages/articleList/articleList?id=${id}&type=${type}`,
      })
    }
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