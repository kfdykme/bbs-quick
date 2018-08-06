import router from "@system.router"

function ViewImage(uri){

    console.info(uri);
    router.push({
        uri : "Other/ImageView",
        params : {
            src : uri
        }
    })
}


export default {
    ViewImage
}
