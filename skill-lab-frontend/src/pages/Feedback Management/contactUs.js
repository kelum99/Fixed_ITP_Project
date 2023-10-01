import React from "react";
import 'antd/dist/antd.css';
import { Form, Input ,Button, Radio, Space,message } from 'antd';
import './stylesFeedback.css'
import contact from "../../image/contact.jpg";
import useRequest from "../../services/RequestContext";

import { useHistory } from "react-router-dom";





function ContactUs(){

    //alert msg
    const success = () => {
       
    };


    const layout = {
      labelCol: {
        span: 8,
      },
      wrapperCol: {
        span: 14,
      },
    };

    
    //Form Vilidation 
    const validateMessages = {
      required: "${label} is required!" ,
      types: {
        email: "${label} is not a valid email!"
      },
      String: {
        range: "${label} must be ${min} charactors",
        range: '${label} must be ${max} '
      },
    };

    
    const {request} = useRequest();

// // shebc ehe 
//     let history = useHistory();
//     const redirect = () => {
//     history.push('/review')

//   }
    
     //on submit - console log
    const onFinish =  async values => {
    console.log("value",values);
    try{
      const result = await request.post('feedback/contact', values);
      console.log("api call contact details", result);
      message.success('Thanks for getting in touch !!!  We have recieved your issue..');
    } catch(e){
      console.log("post contact details error ",e);
      }
    
      // //n sxhee
      // redirect();
  };

    const onChange= values =>{
      console.log(values);
    }
    const { TextArea } = Input;
  

 


    return (

    <>
    <div className="main-container-contactUs">
    
  

    <div className="contactform">
    
        
    
    
    <Form {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
        <h5>Please complete this form and one of our agents will reply to you by email as soon as possible.</h5>
        <br/>
      <Form.Item
        name={[ 'name']}
        label="Name"
        rules={[
          {
            required: true,
            type:'string',min: 5,



          },
        ]}
      >
        <Input  minLength={5}/>
      </Form.Item>
      <Form.Item
        name={[ 'email']}
        label="Email"
        rules={[

          {
              required:true,
              type:'email',
          },
      ]}
      >
        <Input />
      </Form.Item>
      
      <Form.Item 
         name="issuetype" 
         label="Issue Type"
         rules={[
           {
             required:true,
             
           },
           {
            message :'Pleace select type !!',
           }
         ]}>

        <Radio.Group>
          <Radio value="tecnical">Technical</Radio>
          <Radio value="financial">Financial</Radio>
          
        </Radio.Group>
      </Form.Item>


        <Form.Item
        name={[ 'subject']}
        label="Subject"
        rules={[
          {
            required: true,
            type:'string',max: 50,
          },
        ]}
      >
        <Input  />
      </Form.Item>


      <Form.Item
        name={[ 'message']}
        label="Message"
        rules={[
            {
              required: true,
              type:'string',max: 500,
            },
          ]}
        
      >
        <TextArea rows={4} />
        </Form.Item>

      
      <Form.Item shouldUpdate wrapperCol={{ ...layout.wrapperCol, offset:10 }}>
        <Button type="primary" htmlType="submit" onClick={success}>
            Submit
        </Button>
        
        </Form.Item>
      
    </Form>
   
   
    </div>

    <div>
        <img className="contactimg" src ={contact} height={500} width={500}/>
    </div>
  
    </div>

  </>
  );
  
};

export default ContactUs;
