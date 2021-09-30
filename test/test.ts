import BBS from '../src/index'
import { LOGINTYPE } from '../src/knict/KnictBBSService'
import fs from 'fs'

const [ username, password ] = fs.readFileSync('./local/user', { encoding: 'utf-8'}).split(':')
 

console.info(BBS)


BBS.login(LOGINTYPE.login, username, password)
    .then(res => {
        console.info(res)
    })

 