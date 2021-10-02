import { HttpMethod, Knict, FetchClientBuilder } from 'knict-fetch'

const { POST, PostData, OnUnsupport, PostType } = HttpMethod


export enum LOGINTYPE {
    login = 'login',
}



export default class KnictBBSService {

    @POST('app/web/index.php?r=user/login/', PostType.urlencoded)
    login(@PostData('type') type: LOGINTYPE, @PostData('username') username: string, @PostData('password') password: string): Promise<any> {
        return OnUnsupport()
    }

    @POST('app/web/index.php?r=forum/topiclist&pageSize=20')
    newReply(@PostData('page') page: number, @PostData('apphash') apphash: string, @PostData('accessSecret') accessSecret: string, @PostData('accessToken') accessToken: string): Promise<any> {
        return OnUnsupport()
    }

    @POST('app/web/index.php?r=portal/newslist&moduleId=2&pageSize=20')
    getTodayHot(@PostData('page') page: number, @PostData('apphash') apphash: string, @PostData('accessSecret') accessSecret: string, @PostData('accessToken') accessToken: string): Promise<any> {
        return OnUnsupport()
    }
}



const BBSService = Knict.builder(new FetchClientBuilder().baseUrl('https://bbs.uestc.edu.cn/mobcent/'))
    .create<KnictBBSService>(new KnictBBSService())
export {
    BBSService
}
