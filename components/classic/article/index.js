// components/classic/music/index.js
import {classicBeh} from '../classic-beh.js'

const mMgr = wx.getBackgroundAudioManager()

Component({
  /**
   * 组件的属性列表
   */
  behaviors: [classicBeh],  //可以继承多个

  properties: {
    src:String,
    title:String
  },

  /**
   * 组件的初始数据
   */
  data: {
    playing:false,
    pauseSrc: 'images/player@waitting.png',
    playSrc: 'images/player@playing.png',
  },

  attached:function (event) {
    this._recoverStatus()
    this._monitorSwitch()
  },

  //声明周期
  lifetimes: {
    created () {
      // console.log(mMgr)
      // if (mMgr.src == this.properties.src) {
      //   this.setData({
      //     playing:true
      //   })
      // }else {
      //   this.setData({
      //     playing:true
      //   })
      // }
      // mMgr.onTimeUpdate(() => {
      //   //获取到当前的currenTime
      //   // console.log(mMgr.currentTime)
      //   const width = mMgr.currentTime / mMgr.duration * 100
      //   this.setData({
      //     width
      //   })
      //   this.formatTimes(mMgr.currentTime, mMgr.duration)
      // })
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    onPlay:function (event) {
      this.setData({
        playing:!this.data.playing
      })
      if (this.data.playing) {
        mMgr.src = this.properties.src
        mMgr.title = this.properties.title
      }else {
        mMgr.pause()
      }
    },

    _recoverStatus:function () {
      if (mMgr.paused) {
        this.setData({
          playing:false
        })
        return
      }
      if (mMgr.src == this.properties.src) {
        this.setData({
          playing:true
        })
      }
    },

    _monitorSwitch:function () {
      mMgr.onPlay ( ()=> {
        this._recoverStatus()
      })
      mMgr.onPause ( ()=> {
        this._recoverStatus()
      })
      mMgr.onStop ( ()=> {
        this._recoverStatus()
      })
      mMgr.onEnded ( ()=> {
        this._recoverStatus()
      })
    }
  }


})
