
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
                    resolve(re)
                    that.save(uid,re)
                    //NOTE: 现在用不上,等下改造UserApi之后再改
                    if(1 == 2){
                        reject(re)
                    }
                }
            )
        });
    }


    async loadLocal(uid){
        const that = this
        return new Promise(function(resolve, reject) {
            storage.get({
                key :that.KEY+uid,
                success : function(data){
                    if(data == '')
                        reject({data:data,code:that.CODE_EMPTY})
                    else
                        resolve({data:data,code:that.CODE_SUCCESS})
                },
                fail : function(code,data){
                    reject({data:data,code:code})
                }
            })
        });
    }


    /**
     * @method save 异步保存数据
     *
     */
    save(uid,re){
        const data = JSON.stringify(re)

        storage.set({
            key :this.KEY+uid,
            value :data,
            success :function(data){
            },
            fail :function(data,code){
            }
        })

    }
}
