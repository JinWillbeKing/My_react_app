import React, { Component } from 'react'
import {connect} from 'react-redux'
import {createGetCategoryAsyncAction} from '../../redux/actions/category'
import { Card ,Button, Icon,Table,Modal,Input,Form} from 'antd';

@connect(
  (state) => ({categoryList:state.categoryList}),
  {getCategory:createGetCategoryAsyncAction}
)
@Form.create()
class Category extends Component {
    state = { visible: false };


    componentDidMount(){
      console.log(this.props)
      
    }

    showModal = () => {
      this.setState({visible: true,});
    };

    handleOk = () => {
      this.setState({visible: false,});
    };

    handleCancel = () => {
      this.setState({visible: false,});
    };
    
    render() {
      const {getFieldDecorator} = this.props.form
        const dataSource = [
            {
              key: '1',
              name: '胡彦斌',
              
            },
            {
              key: '2',
              name: '胡彦祖',
              
            },
          ];
          
          const columns = [
            {
              title: '分类名',
              dataIndex: 'name',
              key: 'name',
              width:'75%'
            },
            {
              title: '操作',
            //   dataIndex: 'age',
              key: 'age',
              render:() => <Button type="link">修改分类</Button>,
              align:'center',
              width:'25%'
            },
        
          ];
        return (
            <div>
              <Card extra={<Button type="primary" onClick={this.showModal}><Icon type="plus-circle"/>添加</Button>}>
                <Table dataSource={dataSource} columns={columns} bordered/>;
              </Card>
              <Modal
              title="添加分类"
              visible={this.state.visible}
              onOk={this.handleOk}
              onCancel={this.handleCancel}
              okText="确定"
              cancelText="取消"
              >


                <Form onSubmit={this.handleSubmit} className="login-form">
                    <Form.Item>
                      {getFieldDecorator('username', {
                          rules: [{required: true, message: '请输入分类名'}],
                      })(<Input  placeholder="请输入分类名"/>)}
                    </Form.Item>
                </Form>
              </Modal>
            </div>
        )
    }
}
export default Category
