import React from "react";
import { Form, Input, InputNumber, Button} from "antd";
import 'antd/dist/antd.css';
import './jobManagement.css';
import useRequest from "../../services/RequestContext";
import  admin from '../../image/admin.png'
import './New.css';
import {Link} from 'react-router-dom';



function AddJob() {

  const [form] = Form.useForm();

  const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };


  const {request} = useRequest();

  const onFinish = async (values) => {
    console.log("value",values);
      try{
          const result = await request.post('job/job', values);
          console.log("api call job add result ", result);
          alert("Sucsessfully added");
          window.location.reload(true);
    } catch(e){
      console.log("post job add error ",e);
    }
  
    form.resetFields();
  };

  /* eslint-disable no-template-curly-in-string */
  
  const validateMessages = {
    required: '${label} is required!',
    types: {
      email: '${label} is not a valid email!',
      number: '${label} is not a valid number!',
    },
    number: {
      range: '${label} must be between ${min} and ${max}',
    },
  };
  
 

  return (
    <>
    <div className="">
  <div className="row">
    
    <div className="col-4">
    <h3 className="adminHeader">SKILL LAB</h3>

    <div className="img-topic-admin">
       <img src={admin} className="adminavatar" alt="Looking for job?"/>
       <h6 className="AdminTopic">Admin</h6>
    </div>
       <div className="Link-Container">
         <h5 className="Adminh">Job Vacancy Management</h5>
         <ul className="Adminul">
         <Link to="/addcareere"> <li>Add a new vacancy</li></Link>
          <Link to="/updatedelete"> <li>Update and Delete vacancy</li></Link>
          <Link to="/deleteRequest"> <li>Delete Careere Requests</li></Link>
          <Link to="/jobreport"> <li>Genarate Report</li></Link>
         </ul>

       
       </div>
       <br/>
    <button className="Admin-sider-Button">Logout</button><br/><br/>
    </div>

    <div className="col">


    <div>
      <center>
<h2 className="add-header">Add a new career opportunity</h2>
    <div className="AddForm">
     
    <Form {...layout} name="deleteRequ" className="job-add-form" onFinish={onFinish} validateMessages={validateMessages}>

      <div className="add-form-items">
    <Form.Item
      name={['jobId']}
      label="Job ID"
      rules={[
        {
          required: true,
        },
      ]}
    >
      <Input />
    </Form.Item>
    <Form.Item
      name={['title']}
      label="Title"
      rules={[
        {
         required: true,
        },
      ]}
    >
    <Input />
      
    </Form.Item>
    <Form.Item name={['salary']} 
            label="Salary"
            rules={[
                {
                 required: true,
                },
            ]}
            >
      <Input />
    </Form.Item>
    <Form.Item name={['description']}
     label="Description"
     rules={[
        {
         required: true,
        },
    ]}
     >
      <Input.TextArea />
    </Form.Item>
    <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>

      <div >
      <Button className="add-view-btn" type="primary" htmlType="submit">
        Add vacancy
      </Button>
   
      </div>
    </Form.Item>
    </div>
  </Form>
  </div>
  </center>
  </div>


    </div>

      </div>
  </div>
    
    </>

  );
    };
  

export default AddJob;
