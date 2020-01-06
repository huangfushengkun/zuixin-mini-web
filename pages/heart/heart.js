// pages/heart/heart.js

import {ClassicModel} from '../../models/classic.js'
let classicModel = new ClassicModel()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    articles: [],
    currentPage: 1,
    noData: false,
    flag: true,
    id: 1,
    types: [],
    scroll: 0
  },
  //创建trggeer函数
  getData(e) {
    const id = e.detail.id
    // console.log(e)
    this.setData({
      flag: true,
      id,
      currentPage: 1
    })
    //调用请求数据的函数
    this.getArticles(this.data.id, 1, 'replace')
    wx.pageScrollTo({
      scrollTop: 0,
      duration: 0
    })
  },

  //请求导航数据
  getNavData() {
    classicModel.getNavTypes((res) => {
      // console.log(res)
      this.setData({
        types: res
      })
    })
  },

  //请求数据的函数
  getArticles(id = 1, page = 1, type = "push") {
    if (this.data.flag) {
      wx.showLoading({
        title: '正在加载...',
      })
      classicModel.getArticles(id,page,(res) => {
        // console.log(res)
        if(res.length) {  //有数据
          let articles
          if(type==='push') { //判断数据更新的类型
            articles = this.data.articles.concat(res)
          } else if (type === 'replace') {
            articles = res
          }
          this.setData({
            articles,
            flag: true
          }, function () {
            wx.hideLoading()
          })
        } else {  //没有数据了
          wx.hideLoading()
          this.setData({
            noData: true
          })
        }
      })
      this.setData({
        flag: false
      })
    }



  },

  goArticle(e) {
    const id = e.target.dataset.id
    if (id) {
      wx.navigateTo({
        url: `/pages/articleList/articleList?id=${id}&type=400`,
      })
      
    }
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getNavData()
    this.getArticles()
    
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
    // console.log('底部')
    const currentPage = this.data.currentPage + 1
    this.setData({
      currentPage
    })

    this.getArticles(this.data.id, currentPage)
  },
  onPageScroll(e) {
    // console.log(e.scrollTop)
    this.setData({
      scroll: e.scrollTop
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})