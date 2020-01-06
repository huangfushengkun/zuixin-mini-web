import {
    HTTP
} from '../util/http-p.js'

class Token  {
    verify (){
        wx.login({
            success: (res) => {
              // console.log(res.code)
              if(res.code){
                wx.request({
                  url: 'http://localhost:3000/v1/token',
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
                      wx.setStorageSync('token',res.data.token)
                    }
                  }
                })
              }
            }
          })
        // return this.request({
        //     url: 'token',
        //     method: 'POST',
        //     data: {
        //         book_id:bid,
        //         content:comment
        //     }
        // })
    }
}

export {Token}