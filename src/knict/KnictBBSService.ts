import { HttpMethod, Knict, FetchClientBuilder } from 'knict-fetch'
import { http as HTTPC, http } from './KnictBBSContants'

const { POST, PostData, OnUnsupport, PostType } = HttpMethod


export enum LOGINTYPE {
    login = 'login',
}



export default class KnictBBSService {

    @POST(HTTPC.urlLogin, PostType.urlencoded)
    login(@PostData('type') type: LOGINTYPE, @PostData('username') username: string, @PostData('password') password: string): Promise<any> {
        return OnUnsupport()
    }

    @POST(HTTPC.urlNewReply)
    newReply(@PostData('page') page: number, @PostData('apphash') apphash: string, @PostData('accessSecret') accessSecret: string, @PostData('accessToken') accessToken: string): Promise<any> {
        return OnUnsupport()
    }

    @POST(HTTPC.urlTodayHot)
    getTodayHot(@PostData('page') page: number, @PostData('apphash') apphash: string, @PostData('accessSecret') accessSecret: string, @PostData('accessToken') accessToken: string): Promise<any> {
        return OnUnsupport()
    }

    @POST(HTTPC.urlNewPost)
    newPost(@PostData('page') page: number, @PostData('apphash') apphash: string, @PostData('accessSecret') accessSecret: string, @PostData('accessToken') accessToken: string, @PostData('sortby') sortby: string = 'new'): Promise<any> {
        return OnUnsupport()
    }

}



const BBSService = Knict.builder(new FetchClientBuilder().baseUrl(HTTPC.baseUrl))
    .create<KnictBBSService>(new KnictBBSService())
export {
    BBSService
}
