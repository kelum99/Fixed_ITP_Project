import React, { useState, useEffect } from "react";
import { Form, Input, Button, Select } from 'antd';
import 'antd/dist/antd.css';
import './courseStyles.css';
import addlessons from '../../image/addlessons.jpg';
import useRequest from "../../services/RequestContext";
import { useParams, useHistory } from "react-router-dom";


function CreateCourse() {


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




  const history = useHistory();
  const layout = {
    labelCol: {
      span: 10,
    },
    wrapperCol: {
      span: 40,
    },
  };






  //drop down   
  const { Option } = Select;

  //form validation
  const validateMessages = {
    required: '${label} is required!',

  };

  //on submit - console log
  const onFinish = async (values) => {
    values.cid = id;
    console.log(values);
    try {
      // console.log(values);

      const result = await request.post("course/lessonscreated", values);
      alert("Great! you can add more lessons");
    } catch (err) {
      console.log(err.response.data);
    }
  };









  return (
    <>

      <div className="main-container-askQuestion">
        <div> <img className="questionimg" src={addlessons} height={500} width={600} /> </div>
        <div className="form-questions">

          <h1>Add New Lessons </h1>


          <Form {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>


            <Form.Item
              name="lessoname"
              className="course_select"
             //   label="Name of the lesson "
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input placeholder="Please input the name of the lesson " />
            </Form.Item>



            <Form.Item name={['lesson']}
             // label="Lesson"
              className="course_select"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input.TextArea placeholder="Add the Lessons "  />
            </Form.Item>

            <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 12 }}>
              <Button className="abc" type="primary" htmlType="submit">
                Save
              </Button>
            </Form.Item>
            <button className="abc" type="primary" onClick={() => history.push(`../courseLessons/${id}`)}>
            View My Created Lessons
          </button>

          </Form>
          
        </div>
      </div>
    </>

  );


}
export default CreateCourse;