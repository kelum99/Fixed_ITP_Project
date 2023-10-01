import React, { useState, useEffect } from "react";
import { Form, Input, Button } from 'antd';
import 'antd/dist/antd.css';
import './coursestyletwo.css';
import './courseStyles.css';
import { CheckOutlined } from '@ant-design/icons';
import { useParams, useHistory } from "react-router-dom";
import useRequest from "../../services/RequestContext";

function EditCourse() {

  //retrieve
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const { request } = useRequest();
  const { id } = useParams();

  //fetchCourses
  const fetchlessons = async val => {
    setLoading(true);
    try {
      const result = await request.get(`course/lessonscreated/${val}`);

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
      fetchlessons(id);
    }
  }, [id]);

  //form validation
  const validateMessages = {
    required: '${label} is required!',
    types: {
      email: '${label} is not a valid email!',
    },
  };

  //on submit - console log
  const onFinish = async values => {
    try {

      alert("Congratulations! You have completed a lesson  ");

    } catch (e) {
      console.log(" error ", e);
    }

  };

  return (
    <>

      <div >

        <div className="lessonview" >

          {data && <Form ClassName="nest-messages" onFinish={onFinish} initialValues={data} key={data._id} validateMessages={validateMessages} >
            <Form.Item className ="lessoncontent"
              name={['lesson']}
            >
              <Input.TextArea rows={15} coloms={15} />
            </Form.Item>

            <Form.Item >
              <Button className="btnlesson" type="primary" icon={<CheckOutlined />} htmlType="submit">
                Done
              </Button>
            </Form.Item>
          </Form>}
        </div>
      </div>
    </>
  );


}
export default EditCourse;