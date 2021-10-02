import { LOGINTYPE, knictCliService, BBSService } from '../src/index'
import { Knict } from 'knict'
import { FetchClientBuilder} from 'knict-fetch'
import crypto from "md5" 




function appHash(){

    const KEY_APP_BY_ME = "appbyme_key"
  let time = new Date().getTime().toString();

  let authkey = KEY_APP_BY_ME

  let authString = time.substring(0,5) + authkey

  let hashkey = crypto(authString)

  let appHashValue = hashkey.substring(8,16);

  return appHashValue
};

const main = async () => {

    const { username, password } = await knictCliService.login('', '')


    let user:any = {}
    // Knict.builder(new FetchClientBuilder())
    // Knict.builder(new FetchClientBuilder().baseUrl('https://bbs.uestc.edu.cn/mobcent/'))

    BBSService.login(LOGINTYPE.login, username, password)
        .then((res:any) => {
            return res.data   
        })
        .then((data: any) => {
            user = data
        })
        .then(() => {
            return BBSService.newReply(1, appHash(), user.secret, user.token)
        })
        .then(res => res.data)
        .then((data:any) => {
            const showData = data.list.map((i:any) => {
                return {
                    title: i.title
                }
            })
            console.info(showData)
        })
        .then(() => {
            return BBSService.getTodayHot(1, appHash(), user.secret, user.token)
        })
        .then(res => res.data)
        .then((data:any) => {
            const showData = data.list.map((i:any) => {
                return {
                    title: i.title
                }
            })
            console.info(showData)
        })
 
}

main()
