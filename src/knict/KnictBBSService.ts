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
}

Knict.builder(new FetchClientBuilder().baseUrl('https://bbs.uestc.edu.cn/mobcent/'))


export const BBSService = Knict.create<KnictBBSService>(new KnictBBSService())

