import React from 'react'
import { Layout } from 'antd'; 
import { LogoutOutlined } from '@ant-design/icons';

const { Header } = Layout;

class MyHeader extends React.Component {
  clickEvent = () => {
    this.props.history.replace('/login');
  }

  render() {
    return (
      <Header>
        <LogoutOutlined
          title="退出登录"
          style={{
            fontSize: '24px', 
            color: "white", 
            position: 'absolute', 
            top: "20px", 
            right: '20px'
          }}
          onClick={this.clickEvent}
        />
        <h1>教室管理系统</h1>
      </Header>
    )
  }
}

export default MyHeader;