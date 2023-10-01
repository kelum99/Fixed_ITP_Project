import React, { useState, useEffect } from "react";
import { Form, Input, Button, Popconfirm, message } from "antd";
import './stylesProfile.css'
import 'antd/dist/antd.css';
import useRequest from "../../services/RequestContext";
import useUser from "../../services/UserContext";
import { Alert } from 'antd';
import { useHistory} from "react-router-dom";


function Stdprofile() {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const {request} = useRequest();
  const {user} = useUser();
  const history = useHistory();


  const layout = {
    labelCol: {
      span: 8
    },
    wrapperCol: {
      span: 14
    }

  };

  const onSuccess = () => {
    message.success("User details Updated Successfully !");
  };

  function confirm(e) {
    console.log(e);
    message.success('Click on Yes');
  }

  function cancel(e) {
    console.log(e);
    message.error('Click on No');
  }

  const validateMessages = {
    required: "${label} is required!",
    types: {
      number: "${label} is not a valid number!"
    }
  };

  const [value] = React.useState(1);

  const fetchAuthenticationStudent = async () => {
    setLoading(true);

    try {
      const result = await request.get(`AuthenticationRoute/CommonSignup/${user._id}`);
      if (result.status === 200) {
        setData(result.data);
      }
      console.log(" std list get ", result);
      setLoading(false);
    } catch (e) {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user && user._id) {
      fetchAuthenticationStudent();
    }
  }, [user]);


  const onFinish = async values => {
    try {
      const result = await request.put(
        `AuthenticationRoute/CommonSignup/update/${data._id}`,
        values
      );

      console.log("api user details updated", result);
      window.location.reload(true);
    } catch (e) {
      console.log("update error ", e);
    }
  };

  const redirect = () => {
    history.push('/home')
  }
  const onDelete = async value => {
    try {
      const result = await request.delete(`AuthenticationRoute/CommonSignup/${value._id}`);
      if (result.status === 200) {
        await fetchAuthenticationStudent();
        setData(undefined);
        redirect();
      }
      console.log("api call profile deleted", result);
    } catch (e) {
      console.log(" error ", e);
    }
  };

  return (

    <>
      <div className="main-container-profile">

        <div className="form-profile">

          <h3>Skill Lab</h3>
          <h1>User Profile</h1>

          {data && (
            <Form layout="vertical" name="StdProfile"
              onFinish={onFinish}
              validateMessages={validateMessages}
              initialValues={data}
              key={data._id}>

              <Form.Item
                name={["name"]}
                label="First Name"
              >
                <Input />
              </Form.Item>

              <Form.Item
                name={["name1"]}
                label="Last Name"
              >
                <Input />
              </Form.Item>

              <Form.Item
                name={["email"]}
                label="Email"
              >
                <Input />
              </Form.Item>

              <Form.Item
                name={["number"]}
                label="Mobile Number"
              >
                <Input />
              </Form.Item>

              <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                <Button type="primary" htmlType="submit" onClick={onSuccess}>
                  Update
                </Button>

                <Popconfirm
                  title="Are you sure to delete your profile?"
                  onConfirm={() => onDelete(data)}
                  onCancel={cancel}
                  okText="Yes"
                  cancelText="No"
                >
                  <Button type="primary" htmlType="submit">
                    Delete my Account
                  </Button>
                </Popconfirm>

              </Form.Item>

            </Form>
          )}
        </div>
      </div>
    </>
  );
}

export default Stdprofile;
