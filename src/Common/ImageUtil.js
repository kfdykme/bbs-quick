import router from "@system.router"

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
