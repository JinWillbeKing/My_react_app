import React, { Component } from 'react'
import {Switch,Route,Redirect} from 'react-router-dom'
import check from '../check/check'
import { Layout } from 'antd';
import Header from '../header/header'
import './css/admin.less'
import LeftNav from '../leftNav/leftNav';
import Home from '../../components/home/home';
import Category from '../category/category'
import Product from '../product/product'
import Role from '../role/role'
import User from '../user/user'
import Bar from '../../components/bar/bar'
import Line from '../../components/line/line'
import Pie from '../../components/pie/pie'



const {Footer, Sider, Content } = Layout;


@check
 class Admin extends Component {    
     
    render() {

        return (
            <Layout className="admin">
                <Sider>
                    <LeftNav/>
                </Sider>
                <Layout>
                    <Header/>
                    <Content className="content">
                        <Switch>
                            <Route path="/admin/home" component={Home}/>
                            <Route path="/admin/prod_about/category" component={Category}/>
                            <Route path="/admin/prod_about/product" component={Product}/>
                            <Route path="/admin/user" component={User}/>
							<Route path="/admin/role" component={Role}/>
							<Route path="/admin/charts/bar" component={Bar}/>
							<Route path="/admin/charts/line" component={Line}/>
							<Route path="/admin/charts/pie" component={Pie}/>
							<Redirect to="/admin/home"/>
                        </Switch>
                    </Content>
                    <Footer className="footer">推荐使用乔治家的浏览器打开</Footer>
                </Layout>
            </Layout>
        
        )
    }
}
export default Admin
