import React, { Component } from 'react'
import check from '../check/check'
import { Layout } from 'antd';
import Header from '../header/header'
import './css/admin.less'


const {Footer, Sider, Content } = Layout;


@check
 class Admin extends Component {    
     
    render() {

        return (
            <Layout className="admin">
                <Sider>Sider</Sider>
                <Layout>
                    <Header/>
                    <Content>Content</Content>
                    <Footer>Footer</Footer>
                </Layout>
            </Layout>
        
        )
    }
}
export default Admin
