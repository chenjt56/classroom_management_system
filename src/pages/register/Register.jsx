import React, { Component } from 'react';
import { Input, Button, Form } from 'antd';
import { Helmet } from 'react-helmet';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import Mock from '../../mock/mock'
import axios from 'axios';
import md5 from 'js-md5';
import './login.css';

Mock.mock('/register', "注册成功");
export default class Login extends Component {
  handleSubmit = (values) => {
    let { password } = values;
    values.password = md5(password);
    axios.post('/register', values)
      .then(response => {
        // console.log(response.data);
        alert(response.data + "，点击确认跳转至登录界面");
        this.props.history.replace('/login');
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    const formItemclassName = 'form-item active';
    return (
      <div className="root">
        <Helmet title="注册" />
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
                      注册
                    </Button>
                  )}
                </Form.Item>
              </div>
            </Form>
          </div>
        </div>
      </div>
    );
  }
}