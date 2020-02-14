import React, { Component } from 'react'
import {connect} from 'react-redux'
import { Redirect } from 'react-router-dom'
import {Button} from 'antd';
import './css/admin.less'

import {createDeleteUserInfoAction} from '../../redux/actions/login'


 class Admin extends Component {    
     logOff = () => {
         this.props.deleteUser()
     }
     
    render() {
        const {isLogin} = this.props.userInfo
        if (!isLogin) {
            return <Redirect to="/login"/>
        }
        return (
        <div className="admin_box">
            欢迎{this.props.userInfo.user.username}先生光临猪浪漫!
            <Button type="primary" onClick={this.logOff} className="logOff">注销</Button>
            
        </div>
        
        )
    }
}
export default connect(
    (state) => ({userInfo:state.userInfo}),
    {deleteUser:createDeleteUserInfoAction}
    
)(Admin)
