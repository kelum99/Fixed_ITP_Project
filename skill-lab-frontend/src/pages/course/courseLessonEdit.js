import React from "react";
import { Form, Input,Button } from 'antd';
import 'antd/dist/antd.css';
import './coursestyletwo.css';
import './courseStyles.css';
import {EditOutlined} from '@ant-design/icons';
import Eraser from '../../image/Eraser.jpg';



    function EditCourse() {

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

      //on submit - console log
      const onFinish = (values) => {
        console.log(values);
      };

      return (
        <>
        
        <div className="main-container-editQuestion">
        <div> <img className="questionimg" src={Eraser} height ={500} width ={500}/> </div>
        <div className="form">
    
          
          

    

        
        <Form {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
 

       
        <h1 className="course_h1" >Edit Lesson</h1>

          <Form.Item
            name="lessoname"
            className ="course_select"
            label="Name of the lesson "
            rules={[
              {
                required: true,
              },
            ]}
          >
          <Input placeholder="Please input the name of the lesson " />
          </Form.Item>



          <Form.Item name={['lesson']} 
         label="Lesson"
        className ="course_select"
          rules={[
            {
                required: true,
            },
          ]}
          >
            <Input.TextArea placeholder="Add the Lessons "/>
          </Form.Item>

          
    
          <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 12 }}>
            <Button type="primary"icon={<EditOutlined />} htmlType="submit">
              UPDATE
            </Button>
          </Form.Item>
        </Form>
        </div>
    </div>
    </>
      );

   
    }
    export default EditCourse;