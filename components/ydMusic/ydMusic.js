// components/ydMusic/ydMusic.js
import {classicBeh} from './classic-beh.js'
const mMgr = wx.getBackgroundAudioManager()

Component({
  /**
   * 组件的属性列表
   */
  behaviors: [classicBeh],  //可以继承多个

  properties: {
    src:String,
    title:String,
  },
  //声明周期
  lifetimes: {
    created () {
      // console.log(mMgr)
      mMgr.onTimeUpdate( () => {
        //获取到当前的currenTime
        // console.log(mMgr.currentTime)
        const width = mMgr.currentTime / mMgr.duration * 100
        this.setData({
          width
        })
        this.formatTimes(mMgr.currentTime, mMgr.duration)
      })

    }
  },
  //监听数据的变化
  observers: {
    // url (value) {
    //   console.log(value)
    //   console.log(value.slice(15,value.length))
    //   value = 'http://yuedufm.com'+value.slice(15,value.length)
    //   app.globalData.audio.src = value
    //     // console.log(app.globalData.audio)
    //   console.log(value)

    // }
  },

  /**
   * 组件的初始数据
   */
  data: {
    width: 0,
    time: '00:00',
    playing:false,
    pauseSrc: '../../images/stop.png',
    playSrc: '../../images/play.png',
    status: false
  },

  attached:function (event) {
    this._recoverStatus()
    this._monitorSwitch()
  },

  /**
   * 组件的方法列表
   */
  methods: {
    formatTimes (currentTime,duration) {
      const time = duration - currentTime
      let min = Math.floor(time / 60)
      let sec = Math.floor(time % 60)
      min = min < 10 ? '0' + min : min
      sec = sec < 10 ? '0' + sec : sec
      // return min + ':' + sec 
      this.setData({
        time: min + ':' + sec 
      })
    },
    onPlay:function (event) {
      // console.log(this.properties)

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
      // console.log(this.properties)
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
