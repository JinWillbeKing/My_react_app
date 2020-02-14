import axios from 'axios'
import qs from 'querystring'
import {message} from 'antd'
import {BASE_URL} from '../config/index'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'


axios.defaults.baseURL = BASE_URL

// 请求拦截器
axios.interceptors.request.use((config) => {
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
        message.warning(error.message)
        return new Promise(() => {})
    }
)


export default axios
