import React, { useState, useEffect } from "react";
import { Form, Input, Button, Select, message, DatePicker,InputNumber } from "antd";
import "./stylesStudent.css";
import useRequest from "../../services/RequestContext";
import { useParams, useHistory } from "react-router-dom";
import moment from 'moment';
import image from "../../image/profmark2.jpg";

  
function UpdateMarks() {
  //retrieve
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const { request } = useRequest();
  const { id } = useParams();

  //fetchMarks
  const fetchMark = async val => {
    setLoading(true);
    try {
      const result = await request.get(`student/perform/${val}`);

      if (result.status === 200) {
        const temp = { ...result.data, uploadDate: moment(result.data.uploadDate) };
        setData(temp);
        console.log("test ", temp);
      }

      setLoading(false);
    } catch (e) {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchMark(id);
    }
  }, [id]);

  //redirect
  let history = useHistory();

  const redirect = () => {
    history.push('/ViewMarks')
  }

  //form
  const [form] = Form.useForm();

  const onFinish = async values => {
    try {
      const result = await request.put(`student/performance/${data._id}`, values);
      console.log("api call marks updated", result);
      //window.location.reload(true);
      message.success("Marks Updated Successfully !");
    } catch (e) {
      console.log("update error ", e);
    }
    redirect();
  };

  //validate messages
  const validateMessages = {
    required: "'${label}' is required!",
   String:{
       Range:'${label} must be between ${min} and ${max}',
   },
  };

  const layout = {
    labelCol: {
      span: 8
    },
    wrapperCol: {
      span: 16
    }
  };
  const tailLayout = {
    wrapperCol: {
      offset: 8,
      span: 16
    }
  };

  return (
    <div>
      <img src={image} height={585} className="addmarkImg" />
      <div className="addMarks">
        <center>
          <h2 className="enrolllHeading">Update Marks</h2>
        </center>

        {data && <Form {...layout} name="updatemarks" onFinish={onFinish} initialValues={data} form={form} key={data._id} validateMessages={validateMessages}>
          <Form.Item
            name="stdNIC"
            label="Student NIC"
            rules={[
              {
                required: true,
                type: 'string',
                min: 10,
                max: 12,
              }
            ]}

          >
            <Input placeholder="Student NIC" minLength={10} maxLength={12}/>
          </Form.Item>
          <Form.Item
            name="subject"
            label="Subject"
            rules={[
              {
                required: true
              }
            ]}
          >
            <Select placeholder="Select Subject">
              <Select.Option value="Software Engineering">
                Software Engineering
              </Select.Option>
              <Select.Option value="E-Commerce">E-Commerce</Select.Option>
              <Select.Option value="Object Oriented Programming">
                Object Oriented Programming
              </Select.Option>
              <Select.Option value="Information Systems">
                Information Systems
              </Select.Option>
              <Select.Option value="Computer Science">
                Computer Science
              </Select.Option>
              <Select.Option value="Network and Security">
                Network and Security
              </Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="course"
            label="Course"
            rules={[
              {
                required: true
              }
            ]}
          >
            <Select placeholder="Select Course">
              <Select.Option value="Database Systems">
                Database Systems
              </Select.Option>
              <Select.Option value="Numerical Analysis">
                Numerical Analysis
              </Select.Option>
              <Select.Option value="Programming Languages">
                Programming Languages
              </Select.Option>
              <Select.Option value="Java">Java</Select.Option>
              <Select.Option value="Python">Python</Select.Option>
              <Select.Option value="Mern Stack">Mern Stack</Select.Option>
              <Select.Option value="Web App development">
                Web App development
              </Select.Option>
              <Select.Option value="Operating Systems">
                Operating Systems
              </Select.Option>
              <Select.Option value="Software Development Life Cycle">
                Software Development Life Cycle
              </Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="uploadDate"
            label="Date"
            rules={[
              {
                required: true
              }
            ]}
          >
            <DatePicker
              className="ant-input"
              placeholder="Select Date"
            />
          </Form.Item>
          <Form.Item
            name="assignmentCode"
            label="Assignment Code"
            rules={[
              {
                required: true,
                type: 'string',
                min: 6,
                max: 6,
              }
            ]}
          >
            <Input placeholder="Assignment Code" minLength={6} maxLength={6}/>
          </Form.Item>
          <Form.Item
            name="result"
            label="Result"
            rules={[
              {
                required: true
              }
            ]}
          >
             <InputNumber min={0} max={100} placeholder="reuslt"/>
          </Form.Item>

          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit" className="updtMarkBtn" className="updtMark">
              Update
            </Button>

          </Form.Item>
        </Form>}
      </div>
    </div>
  );
}

export default UpdateMarks;
