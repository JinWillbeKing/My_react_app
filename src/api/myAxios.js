import axios from 'axios'
import qs from 'querystring'
import {message} from 'antd'
import {BASE_URL} from '../config/index'
import NProgress from 'nprogress'
import store from '../redux/store'
import {createDeleteTitleAction} from '../redux/actions/header'
import {createDeleteUserInfoAction} from '../redux/actions/login'
import 'nprogress/nprogress.css'


axios.defaults.baseURL = BASE_URL

// 请求拦截器
axios.interceptors.request.use((config) => {
    console.log(store.getState().userInfo.token)
    if(store.getState().userInfo.token){
        const {token} = store.getState().userInfo
        console.log(token)
        config.headers.Authorization = 'atguigu_' + token
    }
    NProgress.start()
    const {method,data} = config

    if (method.toLowerCase() === 'post' && data instanceof Object) {
        config.data = qs.stringify(data)
    }
    return config
})

//响应拦截器
axios.interceptors.response.use(
    (response) => {
        NProgress.done()
        return response.data
    },
    (error) => {
        NProgress.done()
        if (error.response.status === 401) {
            message.error('身份过期,请重新登陆!')
            store.dispatch(createDeleteTitleAction())
            store.dispatch(createDeleteUserInfoAction())


        }else{
            message.error('请联系乔治')
            
        }
        return new Promise(() => {})
    }
)


export default axios
