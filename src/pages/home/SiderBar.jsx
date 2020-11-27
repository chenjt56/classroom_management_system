import React from 'react';
import { Layout, Menu } from 'antd';
import {
  UserOutlined,
  UploadOutlined,
} from '@ant-design/icons';

const { Sider } = Layout;

class SiderBar extends React.Component {
  state = {
    collapsed: false,
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  render() {
    return (
      <Sider collapsible={true} collapsed={this.state.collapsed} onCollapse={this.toggle}>
        <Menu 
          theme="dark" 
          mode="inline" 
          defaultSelectedKeys={['1']} 
          onClick={({ key }) => {
            this.props.clickEvent(key);
          }}
        >
          <Menu.Item key="1" icon={<UserOutlined />}>
            教室信息
          </Menu.Item>
          <Menu.Item key="2" icon={<UploadOutlined />}>
            申请结果
          </Menu.Item>
        </Menu>
      </Sider>
    );
  }
}

export default SiderBar;