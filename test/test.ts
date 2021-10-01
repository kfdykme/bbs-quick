import BBS, { LOGINTYPE } from '../src/index' 
import fs from 'fs'
import path from 'path'

let username = ''
let password = ''
try {
    const [ u, p ] = fs.readFileSync('./local/user', { encoding: 'utf-8'}).split(':')
    username = u
    password = p
} catch (err) {
    console.error(err)

    // TODO: add
}
 

BBS.login(LOGINTYPE.login, username, password)
    .then(res => {
        // console.info(res)
    })

 