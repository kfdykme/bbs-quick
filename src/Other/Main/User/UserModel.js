
import DateUtil from '../../Common/DateUtil'
import UserApi from "../../Common/UserApi"
import storage from '@system.storage'

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
                function(re){
                    that.save(uid,re)

                    resolve(re)
                }
            )
        });
    }


    async loadLocal(uid){

            const key = this.KEY+uid
            const local =  await storage.get({key : key}) 

            return JSON.parse(local.data)

    }


    /**
     * @method save 异步保存数据
     *
     */
    async save(uid,re){
        const data = JSON.stringify(re)

        const key = this.KEY+uid
        const res = await storage.set({key :key ,value: data})
    }
}
