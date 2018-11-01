import router from "@system.router"

/**
 * @method ViewImage
 * @param {string} uri
 * @param {array} images
 * @param {string} type
 */
function ViewImage(uri,images,type){

    if(type == null) type == 'view'


    router.push({
        uri : "Other/ImageView",
        params : {
            src:uri,
            images : images,
            type :type
        }
    })
}


export default {
    ViewImage
}
