
import {config} from "../config.js"
import { Base64 } from 'js-base64'

const tips = {
    1: '抱歉，出现了一个未知错误',
    1005:'开发者key无效',
    3000:'期刊不存在'
}
class HTTP {
    request (params) {
        
        if(!params.method) {
            params.method="GET"
        }
        wx.request({
            url:config.api_base_url + params.url,
            method:params.method,
            data:params.data,
            header: {
                'content-type':'application/json',
                Authorization: this._encode()
                // 'appkey':config.appkey
            },
            success: (res) => {
                let code = res.statusCode.toString()
                if(code.startsWith('2')) {
                    params.success && params.success(res.data)
                } else {
                    let error_code = res.data.error_code
                    this._show_error(error_code)
                }
            },
            fail: (err) => {
                this._show_error(1)
            }
        })
    }

    _show_error(error_code) {
        if (!error_code) {
            error_code = 1
        }
        const tip = tips[error_code]
        wx.showToast({
            title:tip?tip:tips[1],
            icon:'none',
            duration:2000
        })
    }
    _encode() {
      const token = wx.getStorageSync('token')
      const base64 = Base64.encode(token + ':')
      // console.log('Basic ' + base64)
      return 'Basic ' + base64
    }
}

export {HTTP}