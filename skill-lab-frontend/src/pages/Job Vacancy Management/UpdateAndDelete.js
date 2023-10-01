import React, { Component, useState, useEffect } from "react";
import useRequest from "../../services/RequestContext";
import { Table, Button,Input,Popconfirm, message } from 'antd';
import { EditOutlined ,DeleteOutlined,AudioOutlined} from '@ant-design/icons';
import './jobManagement.css';
import {useHistory} from 'react-router-dom';
import  admin from '../../image/admin.png'
import './New.css';
import {Link} from 'react-router-dom';

function UpdateJob() {

//retrieve
const [data, setData] = useState([]);
const [jobList, setJobList] = useState([]);
const [loading, setLoading] = useState(true);
const { request } = useRequest();
const history = useHistory();

//fetchMarks
const fetchJobs = async () => {
    setLoading(true);
    try {
        const result = await request.get("job/jobview");
        if (result.status === 200) {
          setJobList(result.data); 
        }
        console.log(" Jobs get ", result);
        setLoading(false);
    } catch (e) {
        setLoading(false);
    }
};




useEffect(() => {
  fetchJobs();
}, []);



//delete method
const onDelete = async value => {
  try {
    const result = await request.delete(`job/deletejob/${value._id}`);
    if (result.status === 200) {
      await fetchJobs();
      setData(undefined);
    }
    console.log("api call job deleted", result);
    window.location.reload(true);
  } catch (e) {
    console.log("delete job error", e);
  }
};

//popconfirm
const msg = 'Are you sure you want to delete ?';

function confirm() {
    message.info('Result Deleted Successfully !');
}

//table
const columns = [
    {
        title: '#',
        key: 'index',
        dataIndex: 'index',
        render: (text,record,index) => index + 1,
      },
    {
      title: 'Job ID',
      dataIndex: 'jobId',
      key: 'jobId'
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title'
    },
    {
      title: 'Salary',
      dataIndex: 'salary',
      key: 'salary'
    },
    {
        title: 'Description',
        dataIndex: 'description',
        key: 'description'
      },
      {
        title: "Action",
        dataIndex: "action",
        key: "action",
        render: (text, record, index) => (
          <React.Fragment key={index}>
            <Button type="primary" onClick={() => history.push(`/update/${record._id}`)} icon={<EditOutlined />} className="edit-dlt" />
           
            <Popconfirm
              placement="right"
              title={msg}
              onConfirm={() => onDelete(record)}
              okText="Yes"
              cancelText="No"
            >
              <Button
                danger
                type="primary"
                icon={<DeleteOutlined />}
                className="edit-dlt"
              />
            </Popconfirm>
          </React.Fragment>
  ),
      },
  ];



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


        <div className="updatevacancy">
            
            <br /><br /> <center><h2 className="">Update and Delete vacancies</h2>
            
        
        
           <Table columns={columns} dataSource={jobList} size="maximum" pagination={false} className="updatetable" /></center>
         
        
        
        </div>


    </div>

      </div>
  </div>
      
      </>

        
    );
}

export default UpdateJob;