import React,{Component} from 'react'
import './home.css'

export default class Home extends Component{
  render(){
    return (
      <div className="shadow_wrap" style={{display:'flex',justifyContent:'center',alignItems:'center',width:'100%',height:'100%',fontSize:'40px'}}>
				<span className="floating">欢迎使用佩奇商城后台管理系统</span>
			</div>
    )
  }
}