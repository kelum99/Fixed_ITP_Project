import React, { useState, useEffect } from "react";
import './stylesManagement.css'
import { Table, Button, Input, Popconfirm, message } from 'antd';
import { DeleteOutlined, PrinterOutlined } from '@ant-design/icons';
import useRequest from "../../services/RequestContext";
import moment from "moment";
import { Link } from "react-router-dom";


function LecManagement() {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { request } = useRequest();




  function confirm(e) {
    console.log(e);
    message.success('Click on Yes');
  }

  function cancel(e) {
    console.log(e);
    message.error('Click on No');
  }

  const fetchAuthenticationLecturer = async () => {
    setLoading(true);

    try {
      const result = await request.get("AuthenticationRoute/CommonSignup");

      if (result.status === 200) {
        
        setData(result.data.map(vl => ({ ...vl, birthday: moment(vl.birthday).local().format("YYYY-MM-DD") })));
      }
      console.log(" lec list get ", result);
      setLoading(false);

    } catch (e) {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAuthenticationLecturer();
  }, []);

  const onDelete = async value => {
    try {

      const result = await request.delete(`AuthenticationRoute/CommonSignup/${value._id}`);

      console.log("api call data deleted", result);
      window.location.reload(true);

    } catch (e) {
      console.log("error", e);
    }
  };

  //table

  const columns = [

    {
      title: <b>First Name</b>,
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: <b>Last Name</b>,
      dataIndex: 'name1',
      key: 'name1',
    },
    {
      title: <b>Birthday</b>,
      dataIndex: 'birthday',
      key: 'birthday',
    },
    {
      title: <b>Gender</b>,
      dataIndex: 'gender',
      key: 'gender',
    },
    {
      title: <b>NIC</b>,
      dataIndex: 'nic',
      key: 'nic',
    },
    {
      title: <b>Email</b>,
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: <b>Mobile No.</b>,
      dataIndex: 'number',
      key: 'number',
    },
    {
      title: <b>Role</b>,
      dataIndex: 'role',
      key: 'role',
    },
    {
      title: <b>Action</b>,
      dataIndex: 'action',
      key: 'action',
      render: (text, record, index) => (
        <React.Fragment key={index}>

          <Popconfirm placement="right" title="Are you sure to delete this task?"
            onConfirm={() => onDelete(record)}
            onCancel={cancel}
            okText="Yes"
            cancelText="No" >
            <Button type="primary" icon={<DeleteOutlined />} className="dlt" />
          </Popconfirm>

        </React.Fragment>

      )
    },

  ];

  //search box
  const { Search } = Input;

  const onSearch = (value) => {
    let result = [];
    result = data.filter((data) => {

      if (value == "") {
        window.location.reload(true);
        return data;

      } else {
        return data.nic.toLowerCase().search(value) != -1 || data.name.toLowerCase().search(value) != -1
          || data.name1.toLowerCase().search(value) != -1 || data.email.toLowerCase().search(value) != -1
          || data.role.toLowerCase().search(value) != -1
      }
    });
    setData(result);
  };

  return (
    <div className="Au-manage">
      <Search placeholder="Search Here" onSearch={onSearch} enterButton className="searchbar" />

      <br /><br /><h1 className="Heading1">Authentication Administrator</h1>

      <Link to="/authenticationreport">
         <Button type="primary" className="btnReport" icon={<PrinterOutlined />}> Get Report </Button>
      </Link>

      <Table columns={columns} dataSource={data} size="middle" pagination={false} className="tbl" />

    </div>
  );
}

export default LecManagement;

