import myAxios from './myAxios'
import jsonp from 'jsonp'
import {WEATHER_URL,WEATHER_AK} from '../config/index'
import {message} from 'antd'

//登录
export const requestLogin = (username,password)=> myAxios.post('/login',{username,password})

//天气
export const requestWeather = ()=> {

    const url = `${WEATHER_URL}?location=大连&output=json&ak=${WEATHER_AK}`
    return new Promise((resolve,reject) => {
        jsonp(url,(err,data) => {
            if (!err) {
                const{temperature} = data.results[0].weather_data[0]
                const{dayPictureUrl} = data.results[0].weather_data[0]
                const weatherMessage =  {temperature,dayPictureUrl}
                resolve(weatherMessage)
            }else{
                message.error('请求失败!请联系佩奇')
            }
        })
    })
}


