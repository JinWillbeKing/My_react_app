import {SAVE_USERINFO,DELETE_USERINFO} from '../action_types'


// const user = localStorage.getItem('user')
// const token = localStorage.getItem('token')
// let initState
// if (user && token) {
//     initState = {
//         user:user,
//         token:token
//     }
// }else{
//     initState = {
//         user:{},
//         token:''
//     }
// }


const _user = JSON.parse(localStorage.getItem('user')) 
const _token = localStorage.getItem('token')

let initState = {
    user:_user || {},
    taken:_token || '',
    isLogin:(_user && _token) ? true : false
}

/* 
简单的写法:
const _user = JSON.parse(localStorage.getItem('user')) // 把 字符串的 user转换为对象
const _token = localStorage.getItem('token')

let initState = {
    user:_user || {},
    taken:_token || ''
}

*/



export default function (preState=initState,action) {
    const {type,data} = action
    let newState 
    switch (type) {
        case SAVE_USERINFO:
            const {user,token} = data
            newState ={user,token,isLogin:true}
            return newState
         case DELETE_USERINFO:
            newState ={user:{},token:'',isLogin:false}
            return newState
    
        default:
            return preState
    }
}