import React, { useState, useEffect } from "react";
import { Form, Input, Button } from 'antd';
import 'antd/dist/antd.css';
import './coursestyletwo.css';
import './courseStyles.css';
import { EditOutlined } from '@ant-design/icons';
import Eraser from '../../image/Eraser.jpg';
import { useParams, useHistory } from "react-router-dom";
import useRequest from "../../services/RequestContext";

function EditCourse() {

  //retrieve
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const { request } = useRequest();
  const { id } = useParams();

  //fetchCourses
  const fetchcourse = async val => {
    setLoading(true);
    try {
      const result = await request.get(`course/coursecreate/${val}`);

      if (result.status === 200) {
        const temp = { ...result.data };
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
      fetchcourse(id);
    }
  }, [id]);


  const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };



  //form validation
  const validateMessages = {
    required: '${label} is required!',
    types: {
      email: '${label} is not a valid email!',
    },
  };



  //redirect
  let history = useHistory();
  const redirect = () => {
    history.push('/coursesesCreatedbyLecturer')
  }

  //on submit - console log
  const onFinish = async values => {
    try {
      const result = await request.put(`course/coursecreate/${data._id}`, values);
      console.log("api call courses updated", result);
      alert("Course details updated ");

    } catch (e) {
      console.log("update error ", e);
    }
    redirect();
  };

  return (
    <>
     <h1 className="course_h1" >Edit Course</h1>
      <div className="main-container-editQuestion">
        <div> <img className="questionimg" src={Eraser} height={500} width={500} /> </div>
        <div className="form">




          {data && <Form {...layout} name="nest-messages" onFinish={onFinish} initialValues={data} key={data._id} validateMessages={validateMessages} >

          


            <Form.Item
              name={['name']}
              label="Name of the course "
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input placeholder="Name Of the Course " />
            </Form.Item>


            <Form.Item
              name={['category']}
              label="Course Category"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input placeholder="Course Category  " />
            </Form.Item>



            <Form.Item
              name={['paid']}
              label=" Paid /Free"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input placeholder="Paid /Free  " />
            </Form.Item>

            <Form.Item
              name={['price']}
              label=" Price in $"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input placeholder="price in $  " />
            </Form.Item>


            <Form.Item
              name={['description']}
              label=" Course description "
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input.TextArea placeholder="Course Description  " />
            </Form.Item>


            <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 12 }}>
              <Button type="primary" icon={<EditOutlined />} htmlType="submit">
                UPDATE
              </Button>
            </Form.Item>
          </Form>}
        </div>
      </div>
    </>
  );


}
export default EditCourse;