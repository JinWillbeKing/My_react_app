import React, {Component} from 'react'
import {Form, Icon, Input, Button, message} from 'antd';
import {connect} from 'react-redux'
import {createSaveUserInfoAction} from '../../redux/actions/login'
import logo from '../../static/imgs/logo.png'
import './css/login.less'
import {requestLogin} from '../../api/index'
import check from '../check/check'


@connect(
    (state) => ({userInfo:state.userInfo}),
    {saveUser:createSaveUserInfoAction}
)
@Form.create()
@check
class Login extends Component {

    validatorPassword = (rule, value, callback) => {
        if (!value) {
            callback('请输入密码')
        }else if (value.length > 12) {
            callback('密码必须小于12位')
        }else if (value.length < 4) {
            callback('密码必须大于4位')
        }else if (!(/^\w+$/)) {
            callback('密码必须是英文、数字或下划线组成')
        }else{
            callback()
        }
    }
    
    handleSubmit = (e) => {
        e.preventDefault()
        this.props.form.validateFields(async(err, values) => {
            if (!err) {
                const {username,password} = values
                let result = await requestLogin(username,password)
                const {status,data,msg} = result
                if (status === 0) {
                    message.success('欢迎光临红浪漫')
                    this.props.saveUser(data)
                    this.props.history.replace('/admin')
                }else{
                    message.error(msg)
                }
            }
        });
    }
    
    render() {
        // const {isLogin} = this.props.userInfo
        // if (isLogin) {
        //     return <Redirect to="/admin"/>
        // }
        const { getFieldDecorator } = this.props.form;
        return (
            <div id="login">
                <div className="header">
                    <img src={logo} alt="logo"/>
                    <h1>佩奇网上商城管理系统</h1>
                </div>
                <div className="content">
                    <h2>用户登录</h2>

                    <Form onSubmit={this.handleSubmit} className="login-form">
                        <Form.Item>
                            {getFieldDecorator('username', {
                               rules: [
                                {required: true, message: '请输入用户名!'},
                                {max:8,message: '用户名必须小于8位!'},
                                {min:2,message: '用户名必须大于2位'},
                                {pattern:/^\w+$/,message: '用户名必须是英文、数字或下划线组成'}
                                ],
                            })(
                                <Input
                                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder="登录名"
                                />,
                            )}
                        </Form.Item>
                        <Form.Item>
                            {getFieldDecorator('password', {
                                rules: [
                                   {validator:this.validatorPassword}
                                ],
                            })(
                                <Input
                                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                type="password"
                                placeholder="密码"
                                />,
                            )}
                            </Form.Item>
                            <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                登录
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        )
    }
}

export default Login

// export default connect(
//     (state) => ({userInfo:state.userInfo}),
//     {saveUser:createSaveUserInfoAction}
    
// )(Form.create()(Login))