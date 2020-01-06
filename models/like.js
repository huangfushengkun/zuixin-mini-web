import {HTTP} from '../util/http.js'
class LikeModel extends HTTP {
    like (behavior, artID, category,sCallback) {
        let url = behavior == 'like' ? 'like' : 'like/cancel'
        this.request({
            url,
            method: 'POST',
            data: {
                art_id:artID,
                type:category
            },
            success:sCallback
        })
    }

    getClassicLikeStatus (artID, category, sCallback) {
        this.request({
            url:'classic/'+category+'/'+artID+'/favor',
            success:sCallback
        })
    }
}
export {LikeModel}