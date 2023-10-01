import React from "react";
import { Form, Input,Button,DatePicker,message} from "antd";
import 'antd/dist/antd.css';
import './stylesLecturer.css';
import news from '../../image/news.jpg';
import {SaveOutlined} from '@ant-design/icons';
import useRequest from "../../services/RequestContext";

function NoticeCreate() {

    const layout = {
      labelCol: {
        span: 8
      },
      wrapperCol: {
        span: 14
      }
    };

  

    //Form Vilidation 
    const validateMessages = {
      required: "${label} is required!"
    };


    //on submit - console log
    const {request} = useRequest();

      const onFinish = async (values) => {
        console.log("value",values);
          try{
              const result = await request.post('lecturer/notice', values);
              console.log("api call notice result ", result);
              message.success('Your data Save Successfully !');
        } catch(e){
          console.log("post notice error ",e);
        }
    };
  
    return (
      <>
      
      <div className="main-container-createNotice"> 
      <center><img className="questionimg" src={news} alt="allQList" height ={400} width ={600}/></center>
      <div className="lecform">
        
               <h1>Add Notice</h1><br></br>
  
        {/* Form start */}
        <Form name="lecturer management" onFinish={onFinish} validateMessages={validateMessages} layout="vertical">
         
              <Form.Item  name={["date"]} label="Date" rules={[{ required: true }]}>
                    <DatePicker picker = 'YYYY-MM-DD' />
              </Form.Item> 

              <Form.Item name={['notice']} label="Notice" rules={[{ required: true }]}>
                    <Input.TextArea placeholder="Please type description"/>
              </Form.Item>
  
              <Form.Item shouldUpdate wrapperCol={{ ...layout.wrapperCol, offset:10 }}>
              <br></br><Button className="btnQuestion" type="primary"icon={<SaveOutlined />} htmlType="submit">
                  Save
              </Button>
              </Form.Item>
  
        </Form>
        {/* Form end */}
      </div>
      </div>
      </>
    );
  }
  
  export default NoticeCreate;

  