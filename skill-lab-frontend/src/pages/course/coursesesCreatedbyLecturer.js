import React, { useState, useEffect } from "react";
import { Table, Button, Input, Popconfirm, message, Card } from "antd";
import { EditOutlined, DeleteOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { useHistory } from 'react-router-dom';
import "./courseStyles.css";
import useRequest from "../../services/RequestContext";
import useUser from "../../services/UserContext";


function ViewCourses() {
  //retrieve
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { request } = useRequest();
  const [courseList, setCourseList] = useState([]);
  const history = useHistory();
  const { user } = useUser();

  //fetchCourses
  const fetchCourses = async () => {
    setLoading(true);
    try {
      const result = await request.get(`course/coursecreate/findAll/${user._id}`);
      if (result.status === 200) {
        // setData(result.data);
        setCourseList(result.data);
      }
      console.log(" Course get ", result);
      setLoading(false);
    } catch (e) {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  //confirm alert
  const text = "Are you sure you want to delete ?";

  function confirm() {
    message.info("Result Deleted Successfully !");
  }

  //delete method
  const onDelete = async value => {
    try {
      const result = await request.delete(`course/coursecreate/${value._id}`);
      if (result.status === 200) {
        await fetchCourses();
        setData(undefined);
        alert("Course deleted !");
      }
      console.log(" course deleted", result);
    } catch (e) {
      console.log("delete course error", e);
    }
  };


  //table

  const columns = [
    {
      title: "#",
      dataIndex: "index",
      key: "index",
      render: (text, record, index) => index + 1
    },
    {
      title: 'Course Name',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Price in $ ',
      dataIndex: 'price',
      key: 'price',
    },
    
    {
      title: 'Course Category',
      dataIndex: 'category',
      key: 'category',
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (text, record, index) => (

        <React.Fragment key={index}>
          <Button type="primary" onClick={() => history.push(`/courseEdit/${record._id}`)} icon={<EditOutlined />} className="edit-dlt" />
          <Button type="primary" onClick={() => history.push(`./courseContentCreate/${record._id}`)} icon={<PlusCircleOutlined />} className="edit-dlt" />
          <Popconfirm
            placement="left"
            title={text}
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
      )
    }
  ];

  //search box
  const { Search } = Input;
  const onSearch = (value) => {
    let result = [];
    result = courseList.filter((data) => {
      if (value == "") {
        window.location.reload(true);
        return data;
      } else {
        return data.name.toLowerCase().search(value) != -1
      }
    });
    setCourseList(result);
  }


  return (
    <div className="myCrs1">
      <Search
        placeholder="Search courses"
        onSearch={onSearch}
        allowClear
        enterButton="Search"
        className="searchbar"
      />
      <br />
      <br />
      <center>
        <h1 className="enrolllHeading">All Created Courses </h1>
      </center>

      <Table
        columns={columns}
        dataSource={courseList}
        size="middle"
        pagination={false}
        className="coursetable"
      />
    </div>
  );
}

export default ViewCourses;
