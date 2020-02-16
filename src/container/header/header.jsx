import React, { Component } from 'react'
import { Button,Icon,Modal} from 'antd';
import {connect} from 'react-redux'
import{createDeleteUserInfoAction} from '../../redux/actions/login'
import screenfull from 'screenfull'
import './css/header.less'
import dayjs from 'dayjs'
import {requestWeather} from '../../api/index'




const { confirm } = Modal;


@connect(
    (state) => ({userInfo:state.userInfo}),
    {deleateUserInfo:createDeleteUserInfoAction}
)
class Header extends Component {
    state = {
        isScreen:false,
        date:dayjs(Date.now()).format('YYYY年 MM月 DD日 HH:mm:ss'),
        weatherData:{pic:'',tem:''}
    }
    fullscreen = () => {
        screenfull.toggle()
    }

    getWeatherData = async () => {

        let weatherData = await requestWeather()
        const {temperature,dayPictureUrl} = weatherData
        this.setState({weatherData:{pic:dayPictureUrl,tem:temperature}})
    }

    componentDidMount(){
        screenfull.on('change',() => {
            const isScreen = !this.state.isScreen
            this.setState({isScreen})
        })
        this.timeId = setInterval((params) => {
            this.setState({date:dayjs(Date.now()).format('YYYY年 MM月 DD日 HH:mm:ss')})
        },1000)


        this.getWeatherData()

       
    }
    
    

    componentWillUnmount(){
        clearInterval(this.timeId)
    }
    logOut = () => {
        confirm({
            title: '真的要离开佩奇商城吗?',
            content: '真的不爱我了吗?',
            okText:'狠心离开',
            cancelText:'我要留下',
            onOk:()=> {
                this.props.deleateUserInfo()
            },
        });

    }
    

    render() {
        return (
            <div className="header">
                <div className="headerTop">
                  <Button size="small" onClick={this.fullscreen}>
                  <Icon type={this.state.isScreen ? 'fullscreen-exit' : 'fullscreen'}/>
                  </Button>
                    <span>欢迎, {this.props.userInfo.user.username}光临红浪漫</span>
                  <Button type="link" onClick={this.logOut}>退出登录</Button>
                </div>
                <div className="headerBottom">
                    <div className="bottomLeft">
                        <span>首页</span>
                    </div>
                    <div className="bottomRight">
                        <span>{this.state.date}</span>
                        <img src={this.state.weatherData.pic} alt="天气图片"/>
                        <i>温度 : {this.state.weatherData.tem}</i>
                    </div>

                </div>

            </div>
        )
    }
}
export default Header