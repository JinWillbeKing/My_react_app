import React, { Component } from 'react'
import {Link,withRouter} from 'react-router-dom'
import { Menu, Icon} from 'antd';
import {connect} from 'react-redux'
import {createSaveTitleAction} from '../../redux/actions/header'
import logo from '../../static/imgs/logo.png'
import './css/leftNav.less'
import menus from '../../config/menu-config'

const { SubMenu,Item} = Menu;

@connect(
    (state) => ({title:state.headerTitle}),
    {saveTitle:createSaveTitleAction}
)
@withRouter
class LeftNav extends Component {
    getTitle = () => {
        let title = ''
        let {pathname} = this.props.location
        if (pathname === '/admin') pathname = '/admin/home'
        let key = pathname.split('/').reverse()[0]
        menus.forEach((menuObj) => {
            if (menuObj.children instanceof Array) {
                let result = menuObj.children.find((childMenu) => {
                    return childMenu.key === key
                })
                if(result) title = result.title
            }else{
                if(menuObj.key === key ) title = menuObj.title
            }
        })
        this.props.saveTitle(title)
    }
    

    componentDidMount(){
        if (!this.props.title) {
            this.getTitle()
        }
    }


    createMenu = (menuArr) => {
        return menuArr.map((menuObj) => {
            if (!menuObj.children) {
                return (
                    <Item key={menuObj.key} onClick={()=>{this.props.saveTitle(menuObj.title)}}>
                        <Link to={menuObj.path}>
                            <Icon type={menuObj.icon} />
                            <span>{menuObj.title}</span>
                        </Link>
                  </Item>
                )
            }else{
                return(
                    <SubMenu
                        key={menuObj.key}
                        title={
                      <span>
                        <Icon type={menuObj.icon}/>
                        <span>{menuObj.title}</span>
                      </span>
                    }
                  >
                   {
                       this.createMenu(menuObj.children)
                   }
                  </SubMenu>
                )
            }
        })
    }
    
    render() {
        const {pathname} = this.props.location
        
        return (
            <div className="leftNav">
                <div className="navTop">
                    <img src={logo} alt="logo"/>
                    <h1>佩奇の后台系统</h1>
                </div>
                

                <div>
                    <Menu
                    selectedKeys={[pathname.split('/').reverse()[0]]}
                    defaultOpenKeys={pathname.split('/')}
                    mode="inline"
                    theme="dark"
                    >
                        {this.createMenu(menus)}


                    </Menu>
                </div>
            </div>
        )
    }
}
export default  LeftNav