import React from "react";
import { Form, Input, Button, DatePicker, Radio, } from "antd";
import './stylesSignup.css'
import 'antd/dist/antd.css';
import useRequest from "../../services/RequestContext";
import moment from "moment";

function SignupLec() {

  const layout = {
    labelCol: {
      span: 8
    },
    wrapperCol: {
      span: 14
    }

  };

  const validateMessages = {
    required: "${label} is required!",

    types: {
      number: "${label} is not a valid number!"
    }
  };

  const { request } = useRequest();

  const onFinish = async (values) => {
    values.role = "Lecturer";
    values.birthday = moment(values.birthday).format("YYYY-MM-DD")
    console.log("value", values);
    try {
      const result = await request.post('AuthenticationRoute/CommonSignup', values);
      console.log("api sinlec result ", result);
    } catch (e) {
      console.log("post sinlec error ", e);
    }

  };

  const [value,] = React.useState(1);

  return (

    <>
      <div className="main-container-signup">

        <div className="form-common" >

          <h1>Sign Up</h1>
          <h2>As Lecturer</h2>

          <br></br>

          <Form layout="vertical" name="signupLec" onFinish={onFinish} validateMessages={validateMessages}>

            <Form.Item
              name={['name']}
              label="First Name"
              rules={[
                {
                  required: true,
                },
              ]}>
              <Input />
            </Form.Item>

            <Form.Item
              name={['name1']}
              label="Last Name"
              rules={[
                {
                  required: true,
                },
              ]}>
              <Input />
            </Form.Item>

            <Form.Item
              name={["birthday"]}
              label="Date of Birth"
              rules={[{ required: true }]}>
              <DatePicker />
            </Form.Item>

            <Form.Item
              name={['gender']}
              label="Gender"
              rules={[
                {
                  required: true,
                },
              ]}>

              <Radio.Group value={value}>
                <Radio value={"Male"}>Male</Radio>
                <Radio value={"Female"}>Female</Radio>

              </Radio.Group>
            </Form.Item>

            <Form.Item
              name={['nic']}
              label="NIC"
              rules={[
                {
                  required: true,
                },
                {
                  max: 12,
                  min: 10,
                  message: 'NIC is not valid',
                }
              ]}>
              <Input />
            </Form.Item>

            <Form.Item
              name={['email']}
              label="Email"
              rules={[
                {
                  type: 'email',
                  message: 'The input is not valid E-mail!',
                },
                {
                  required: true,
                  message: 'Please input your E-mail!',
                },
              ]}>
              <Input />
            </Form.Item>

            <Form.Item
              name={['number']}
              label="Mobile Number"
              rules={[
                {
                  required: true,
                },
                {
                  max: 10,
                  min: 10,
                  message: 'Invalid phone number',
                }
              ]} >
              <Input />
            </Form.Item>

            <Form.Item name={['inputpw']} label="Create a Password"
              rules={[
                {
                  required: true,
                },
                {
                  min: 5,
                  message: 'Enter more than 5 characters',
                }
              ]}>
              <Input.Password />
            </Form.Item>

            <Form.Item
              name="confirm"
              label="Confirm Password"
              dependencies={['password']}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: 'Please confirm your password!',
                },

                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('inputpw') === value) {
                      return Promise.resolve();
                    }

                    return Promise.reject(new Error('The two passwords that you entered do not match!'));
                  },
                }),
              ]}
            >
              <Input.Password />
            </Form.Item>

            <hr></hr>
            By signing up you agree to SkillLab's <a href="/terms">Terms of Service and Privacy Policy</a>
            <hr></hr>

            <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>

          </Form>

        </div>
      </div>
    </>
  );
}

export default SignupLec;
