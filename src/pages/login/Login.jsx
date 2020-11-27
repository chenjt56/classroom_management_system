import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { Input, Button, Form } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import './login.css';
import Mock from '../../mock/mock'
import axios from 'axios';
import md5 from 'js-md5';

Mock.mock(/login/g, "登录成功");

export default class Login extends Component {
  state = {
    isMount: false,
  };

  componentDidMount() {
    setTimeout(() => this.setState({ isMount: true }), 300);
  }

  handleSubmit = (values) => {
    axios.post('/user/sign-in', {
      passprot: values.userName,
      password: values.password
    }).then(() => {
      this.props.history.replace("/home");
    }).catch(error => {
      console.log(error);
    })
  };

  render() {
    const { isMount } = this.state;
    const formItemclassName = isMount ? 'form-item active' : 'form-item';

    return (
      <div className="root">
        <Helmet title="欢迎登录" />
        <div className="right">
          <div className="box">
            <Form
              ref={form => this.form = form}
              name="login"
              className='inputLine'
              onFinish={this.handleSubmit}
            >
              <div className={formItemclassName}>
                <div className="header">教室管理系统</div>
              </div>
              <div className={formItemclassName}>
                <Form.Item
                  name="userName"
                  rules={[{ required: true, message: '请输入用户名' }]}
                >
                  <Input allowClear autoFocus prefix={<UserOutlined className="site-form-item-icon" />} placeholder="用户名" />
                </Form.Item>
              </div>
              <div className={formItemclassName}>
                <Form.Item
                  name="password"
                  rules={[{ required: true, message: '请输入密码' }]}
                >
                  <Input.Password prefix={<LockOutlined className="site-form-item-icon" />} placeholder="密码" />
                </Form.Item>
              </div>
              <div className={formItemclassName}>
                <Form.Item shouldUpdate={true} style={{ marginBottom: 0 }}>
                  {() => (
                    <Button
                      className="submit-btn"
                      type="primary"
                      htmlType="submit"
                      disabled={
                        !this.form?.isFieldsTouched(true) ||
                        this.form?.getFieldsError().filter(({ errors }) => errors.length).length
                      }
                    >
                      登录
                    </Button>
                  )}
                </Form.Item>
              </div>
            </Form>
            <Link to="/register" replace>去注册</Link>
          </div>
        </div>
      </div>
    );
  }
}
