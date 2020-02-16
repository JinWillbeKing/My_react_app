import React,{Component} from 'react'
import {connect} from 'react-redux'
import { Redirect } from 'react-router-dom'



export default function (TargetComponent) {
    @connect(
        (state) => ({isLogin:state.userInfo.isLogin})
        
    )

    class NewComponent extends Component{
        render(){
        const {isLogin} = this.props
        const {pathname} = this.props.location

        if (!isLogin && pathname === '/admin') {
            return <Redirect to="/login"/>
        }
        if (isLogin && pathname ==='/login') {
            return <Redirect to="/admin"/>
        }
            return <TargetComponent {...this.props}/>
        }
    }
    return NewComponent
}