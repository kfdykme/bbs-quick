import { LOGINTYPE, knictCliService, BBSService } from '../src/index'
import { Knict } from 'knict'
import { FetchClientBuilder} from 'knict-fetch'
import crypto from "md5" 
import { http as HTTPC , CLIV} from '../src/knict/KnictBBSContants'




function appHash(){

    const KEY_APP_BY_ME = "appbyme_key"
  let time = new Date().getTime().toString();

  let authkey = KEY_APP_BY_ME

  let authString = time.substring(0,5) + authkey

  let hashkey = crypto(authString)

  let appHashValue = hashkey.substring(8,16);

  return appHashValue
};

let user:any = {}
let currentPage = 1;
let currentTag = ''

const handleHomeTag = ():Promise<any> => {
    return Promise.resolve(0).then(() => {
        if (currentTag === CLIV.choiceHomeReply) {
            return  BBSService.newReply(currentPage, appHash(), user.secret, user.token)
        } else if (currentTag === CLIV.choiceHomePost) {
            return BBSService.newPost(currentPage, appHash(), user.secret, user.token)
        } else if (currentTag === CLIV.choiceHomeHot) {
            return BBSService.getTodayHot(currentPage, appHash(), user.secret, user.token)
        } else {
            return Promise.resolve(new Error('currentTag error: ' + currentTag))
        }
    })
    .then(res => res.data)
    .then((data:any) => {
        console.info(data)
        const showData = data.list.map((i:any) => {
            return {
                title: i.title
            }
        })
        console.info({
            currentPage,
            currentTag,
            showData
        })
        return knictCliService.afterHomeTag()
    })
    .then(res => res.afterHomeTag)
    .then((choice:string) => {
        if (choice === CLIV.choiceAfterHomeBack) {
            currentPage = 1
            return home()
        } else if (choice === CLIV.choiceAfterHomeNext) {
            currentPage++
            return handleHomeTag()
        } else if (choice === CLIV.choiceAfterHomePre) {
            if (currentPage <= 1) {
                return knictCliService.afterHomeTag()
            } else {
                currentPage--
                return handleHomeTag()
            }
        }
    })
}

const nextHome = ():Promise<any> => {
    return Promise.resolve(0).then(() => {
       
    })
}

const home = ():Promise<any> => {
    return Promise.resolve(0).then(() => {
        currentTag = ''
        return knictCliService.homeTag()
    })
    .then((res: any) => {
        const { homeTag } = res
        currentTag = homeTag
        return handleHomeTag()
    })
    .catch((res) => {
        const status = res && res.response && res.response.status
        console.error('home',  status || res)
        return home()
    })
}

const main = async () => {

    const { username, password } = await knictCliService.login('', '')


    // Knict.builder(new FetchClientBuilder())
    // Knict.builder(new FetchClientBuilder().baseUrl('https://bbs.uestc.edu.cn/mobcent/'))

    BBSService.login(LOGINTYPE.login, username, password)
        .then((res:any) => {
            return res.data   
        })
        .then((data: any) => {
            user = data
            return home()
        })
 
}

main()
