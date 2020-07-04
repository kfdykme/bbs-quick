
import DateUtil from '../../Common/DateUtil'
import UserApi from "../../Common/UserApi"
import storage from '@system.storage'

const DEFAULT_LOCAL_CONFIG_USER_SETTINGS = {
  muteUsers: {}
}
/**
 * @class UserModel
 * @constructor constructor
 */
export default class UserModel{

    /**
     * @method bindPresenter
     * @param {UserPresenter} p
     */
    bindPresenter(p){
        this.presenter = p
    }


    constructor(){
        this.KEY = "UserModel"
        this.CODE_SUCCESS = 1333
        this.CODE_EMPTY = 1111

    }


    /**
     * @method getInstance
     * @param {UserPresenter} p
     * @return {UserModel}
     */
    static getInstance(p){
        if(!this.instance){
            this.instance = new UserModel()
        }

        if(p)
            this.instance.bindPresenter(p)

        return this.instance
    }

    /**
     * @method getUserInfo
     * @param {number} uid
     */
    async getUserInfo(uid){
        var that = this
        return new Promise(function(resolve, reject) {

            UserApi.getUserInfo(
                uid,
                (re)=>{

                  that.save(uid,re)

                  resolve(re)
                },
                reject
            )
        });
    }


    async loadLocal(uid){

            const key = this.KEY+uid
            const local =  await storage.get({key : key})
            try{

              return JSON.parse(local.data)
            } catch (e){
              // console.error(e)
              return null
            }

    }


    async loadIsMute(targetUid,currentUid) {
      let key = this.KEY + currentUid + "/mute/user"
      let localConfig = await storage.get({ key: key})
      console.info('load ' + key)
      try {
        return JSON.parse(localConfig.data).muteUsers[targetUid]? true : false
      } catch (e) {
        return false
      }
    }

    async saveIsMute(targetUid, currentUid, isMute) {
      let key = this.KEY + currentUid + "/mute/user"
      let localConfig = await storage.get({ key: key})
      if (localConfig.data == "")
        localConfig = DEFAULT_LOCAL_CONFIG_USER_SETTINGS
      else {
        try {

          localConfig = JSON.parse(localConfig.data)
        } catch (err) {
          console.info('parse data from ' + localConfig.data + " error : " + err)
          localConfig = DEFAULT_LOCAL_CONFIG_USER_SETTINGS
        }
      }

      localConfig.muteUsers[targetUid] = isMute
      await storage.set({key: key , value: JSON.stringify(localConfig)})
      console.info('save ', localConfig, "to", key, "success")
      return isMute
    }

    /**
     * @method save 异步保存数据
     *
     */
    async save(uid,re){
        let data = JSON.stringify(re)

        let key = this.KEY+uid
        let res = await storage.set({key :key ,value: data})
        console.info('save ' + key + " to local cache success :" + res )
    }
}
