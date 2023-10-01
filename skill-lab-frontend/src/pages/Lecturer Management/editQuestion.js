import React ,{ useState, useEffect } from "react";
import { Form, Input,Button ,Select,message} from 'antd';
import 'antd/dist/antd.css';
import './stylesLecturer.css';
import {EditOutlined} from '@ant-design/icons';
import editQ1 from '../../image/editQ1.jpg';
import useRequest from "../../services/RequestContext";
import { useParams } from "react-router-dom";

function EditQuestion() {
  
  const layout = {
    labelCol: {
       span: 8,
    },
    wrapperCol: {
       span: 16,
    },
};

 //retrieve
 const [data, setData] = useState();
 const [loading, setLoading] = useState(false);
 const { request } = useRequest();
 const { id } = useParams();

 //fetchMarks
 const fetchQuestion = async val => {
   setLoading(true);
   try {
     const result = await request.get(`lecturer/question/${val}`);

     if (result.status === 200) {
         const temp ={...result.data};
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
     fetchQuestion(id);
   }
 }, [id]);
    

    //drop down
    const { Option } = Select;
    
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
        const result = await request.put(`lecturer/question/${data._id}`,values);
        console.log("api call question updated", result);
        message.success('Your data Updated Successfully !');
        window.location.reload(true);
      } catch (e) {
        console.log("update error ", e);
      }
    };

      return (
        <>
        <div className="main-container-editQuestion">
        <div> <img className="questionimg" src={editQ1} alt="editQuestion" height ={500} width ={500}/> </div>
        <div className="lecform">
    
        <h1>Edit Question!!</h1>

        {data&&<Form {...layout} name="lecturer management" onFinish={onFinish} initialValues={data}  key={data._id} validateMessages={validateMessages}>
 
          <Form.Item name={['studentName']} label="Student Name" rules={[{required: true,},]}>
            <Input placeholder="Please input your name"/>
          </Form.Item>
 
          <Form.Item name={['email']} label="Email" rules={[{type: 'email',required: true,},]}>
            <Input  placeholder="Please input your email"/>
          </Form.Item>
          
          <Form.Item name="courseName" label="Course Name" rules={[{required: true,},]}>
          <Select placeholder="Please select course">
            <Option value="Java">Java</Option>
            <Option value="Machine lerning">Machine lerning</Option>
            <Option value="Data science">Data science</Option>
            <Option value="other">Other</Option>
          </Select>
          </Form.Item>
          
          <Form.Item name={['topic']} label="Topic" rules={[{required: true,},]}>
            <Input  maxLength={35} placeholder="Please input topic"/>
          </Form.Item>

          <Form.Item name={['question']} label="Question" rules={[{required: true,},]}>
            <Input.TextArea placeholder="edit your question"/>
          </Form.Item>

          <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 12 }}>
            <Button className = "btnQuestion" type="primary"icon={<EditOutlined />} htmlType="submit">
              UPDATE
            </Button>
          </Form.Item>

        </Form>}
        </div>
        </div>
        </>
      );
}
    export default EditQuestion;