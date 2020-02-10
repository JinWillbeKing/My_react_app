import React, {Component} from 'react'
import logo from './images/logo.png'
import './css/login.less'
import {Form, Icon, Input, Button} from 'antd';

class Login extends Component {
    render() {

        const { getFieldDecorator } = this.props.form;

        return (
            <div id="login">
                <div className="header">
                    <img src={logo} alt="logo"/>
                    <h1>商品管理系统</h1>
                </div>
                
                <div className="content">
                    <h2>用户登录</h2>

                    <Form onSubmit={this.handleSubmit} className="login-form">
                        <Form.Item>
                            {getFieldDecorator('username', {
                               rules: [
                                {required: true, message: '你让我猜你叫啥啊?'},
                                {max:8,message: '别tm输太多你是不傻'},
                                {min:2,message: '你起名就一个字阿?'},
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
                                    { required: true, message: '我给你记密码阿?' },
                                    {pattern:/^\w+$/,message: '别逼我骂你啊'}
                                    

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


export default Form.create()(Login);