import router from "@system.router"

function ViewImage(uri,type){

    if(type == null) type == 'view'

    // console.info(uri);
    router.push({
        uri : "Other/ImageView",
        params : {
            src : uri,
            type :type
        }
    })
}


export default {
    ViewImage
}
