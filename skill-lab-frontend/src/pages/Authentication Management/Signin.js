import React, { useState } from "react";
import { Form, Input, Button, Checkbox, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import './stylesSignin.css'
import logo from '../../Images/logo.png';
import { Link } from "react-router-dom";
import useRequest from "../../services/RequestContext";
import useUser from "../../services/UserContext";
import { Redirect } from 'react-router'
import { useHistory } from 'react-router-dom';

function Signin() {
  const { request, updateToken } = useRequest();
  const { decodeToken, user, setUser } = useUser();
  const history = useHistory();

  const layout = {
    labelCol: {
      span: 8
    },
    wrapperCol: {
      span: 14
    }

  };

  const onFinish = async (values) => {
    console.log('Received values of form: ', values);
    try {
      const result = await request.post('AuthenticationRoute/login', values)
      if (result.status === 200) {
        await updateToken(result.data.data.token);
        decodeToken(result.data.data.token)
        message.success(result.data.message)
        history.push("/home2")
      } else {
        message.error(result.data.message)
      }
      console.log("login ruslt ", result);
    } catch (error) {
      console.log("login error ", error);
      message.error(error.message)
    }
  };

  const [setValue] = React.useState(1);

  const onChange = e => {
    console.log('radio checkedd', e.target.value);
    setValue(e.target.value);
  };

  return (
    <>
      <div className="main-container-signin">

        <div className="form-signin">

          <h1>Login</h1>

          <div className="form-container">
            <img
              width={300}
              src={logo} alt="Logo"
            />

            <Form

              name="normal_login"
              className="login-form"
              initialValues={{
                remember: true,
              }}
              onFinish={onFinish}
            >
              <Form.Item
                name="email"
                rules={[
                  {
                    required: true,
                    message: 'Please input your Username!',
                  },
                ]}
              >
                <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" />
              </Form.Item>

              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: 'Please input your Password!',
                  },
                ]}
              >
                <Input
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  type="password"
                  placeholder="Password"
                />
              </Form.Item>

              <Form.Item>
                <Form.Item name="remember" valuePropName="checked" noStyle>
                  <Checkbox>Remember me  |</Checkbox>
                </Form.Item>

                <a href="/areYou">Sign up</a>

              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit" className="login-form-button">
                  Login
                </Button>
              </Form.Item>
            </Form>
          </div>

        </div>
      </div>
    </>
  );
}

export default Signin;
