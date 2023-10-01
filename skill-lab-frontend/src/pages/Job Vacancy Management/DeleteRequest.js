import React, { Component, useState, useEffect } from "react";
import useRequest from "../../services/RequestContext";
import { Table, Button,Input,Popconfirm, message,} from 'antd';
import { EditOutlined ,DeleteOutlined,AudioOutlined} from '@ant-design/icons';
import './jobManagement.css';
import moment from "moment";

function DeleteRequest() {

//retrieve
const [data, setData] = useState([]);
const [loading, setLoading] = useState(true);
const { request } = useRequest();

//fetchMarks
const fetchCareere = async () => {
    setLoading(true);
    try {
        const result = await request.get("job/applicationview");
        if (result.status === 200) {
            //setData(result.data);
            setData(result.data.map(vl => ({...vl, birthDate: moment(vl.birthDate).local().format("DD-MM-YYYY")})));
        }
        console.log(" Jobs get ", result);
        setLoading(false);
    } catch (e) {
        setLoading(false);
    }
};

useEffect(() => {
  fetchCareere();
}, []);


//delete method
const onDelete = async value => {
  try {
    const result = await request.delete(`job/deleteapplicant/${value._id}`);
    if (result.status === 200) {
      await fetchCareere();
      setData(undefined);
    }
    console.log("api call applicant request deleted", result);
    window.location.reload(true);
  } catch (e) {
    console.log("delete applicant request error", e);
  }
};


const msg = 'Are you sure you want to delete ?';

function confirm() {
    message.info('Result Deleted Successfully !');
}

//Search method
const { Search } = Input;

    const onSearch =  (value) => {
        let result = [];
        result = data.filter((data) =>{
            
            if(value == ""){
                window.location.reload(true);
                return data;
                
            }else{
            return data.firstName.toLowerCase().search(value) != -1 || data.lastName.toLowerCase().search(value) != -1 || data.address.toLowerCase().search(value) != -1 || data.nic.toLowerCase().search(value) != -1  ||data.email.toLowerCase().search(value) != -1        
            }
        });
        setData(result);
      };


//table
const columns = [
    {
        title: 'Position',
        dataIndex: 'position',
        key : 'position'
      },
    {
      title: 'First Name',
      dataIndex: 'firstName',
      key : 'firstName'
    },
    {
      title: 'Last Name',
      dataIndex: 'lastName',
      key : 'lastName'
    },
    {
      title: 'E-mail',
      dataIndex: 'email',
      key : 'email'
    },
    {
        title: 'Phone',
        dataIndex: 'phone',
        key : 'phone'
      },
      {
        title: 'Address',
        dataIndex: 'address',
        key : 'address'
      },
      {
        title: 'NIC',
        dataIndex: 'nic',
        key : 'nic'
      },
      {
        title: 'Birth Date',
        dataIndex: 'birthDate',
        key : 'birthDate'
      },
      {
        title: 'Employyment Status',
        dataIndex: 'status',
        key : 'status'
      },
      {
        title: "Action",
        dataIndex: "action",
        key: "action",
        render: (text, record, index) => (
          <React.Fragment key={index}>
            
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
      <Search placeholder="Search Course" onSearch={onSearch} enterButton className="searchApplicant" />  
        <div className="myCourses">
          
         
            <br /><br /><center><h2 className="add-header">Delete Applicant requests</h2></center>
            

        
            <Table columns={columns} dataSource={data} size="large" pagination={false} className="crsTable" />
            <br/>
            <br/>
         
      
        
        </div>
        </>
    );
}

export default DeleteRequest;