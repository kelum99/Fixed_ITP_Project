import React, { useState, useEffect } from "react";
import { Table, Button, Input, Popconfirm, message } from "antd";
import { EditOutlined, DeleteOutlined, PlusOutlined, LineChartOutlined } from "@ant-design/icons";
import { useHistory, Link } from 'react-router-dom';
import "./stylesStudent.css";
import useRequest from "../../services/RequestContext";
import image from "../../image/stdmark.jpg";
import useUser from "../../services/UserContext";
import moment from 'moment';

function ViewMarks() {
  //retrieve
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { request } = useRequest();
  const [markList, setMarkList] = useState([]);
  const history = useHistory();
  const { user } = useUser();

  //fetchMarks
  const fetchMarks = async () => {
    setLoading(true);
    try {
      const result = await request.get(`student/performance/${user._id}`);
      if (result.status === 200) {
        setMarkList(result.data.map(vl => ({...vl, uploadDate: moment(vl.uploadDate).local().format("DD-MM-YYYY")})));
      }
      console.log(" Marks get ", result);
      setLoading(false);
    } catch (e) {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user && user._id) {
      fetchMarks();
    }

  }, [user]);

  //confirm alert
  const msg = "Are you sure you want to delete ?";

  //delete method
  const onDelete = async value => {
    try {
      const result = await request.delete(`student/performance/${value._id}`);
      if (result.status === 200) {
        await fetchMarks();
        setData(undefined);
        message.info("Result Deleted Successfully !");
      }
      console.log("api call mark deleted", result);
    } catch (e) {
      console.log("delete mark error", e);
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
      title: "Student NIC",
      dataIndex: "stdNIC",
      key: "stdNIC"
    },
    {
      title: "Subject",
      dataIndex: "subject",
      key: "subject"
    },
    {
      title: "Course",
      dataIndex: "course",
      key: "course"
    },
    {
      title: "Date Uploaded",
      dataIndex: "uploadDate",
      key: "uploadDate"
    },
    {
      title: "Assignment Code",
      dataIndex: "assignmentCode",
      key: "assignmentCode"
    },
    {
      title: "Result",
      dataIndex: "result",
      key: "result"
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (text, record, index) => (
        <React.Fragment key={index}>
          <Button type="primary" onClick={() => history.push(`/UpdateMarks/${record._id}`)} icon={<EditOutlined />} className="edit-dlt-btn" />
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
              className="edit-dlt-btn"
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
    result = markList.filter((data) => {

      if (value == "") {
        window.location.reload(true);
        return data;

      } else {
        return data.subject.toLowerCase().search(value) != -1 || data.course.toLowerCase().search(value) != -1
          || data.assignmentCode.toLowerCase().search(value) != -1 || data.stdNIC.toLowerCase().search(value) != -1
          || data.uploadDate.toLowerCase().search(value) != -1
      }
    });
    setMarkList(result);
  };

  return (
    <div className="myCrs">
      <Search
        placeholder="Search Mark"
        onSearch={onSearch}
        enterButton
        className="searchbar"
      />
      <br />
      <br />
      <center>
        <h1 className="enrolllHeading">Student Performance</h1>
        <img src={image} />
      </center>
      <Link to="/AddMarks">
        <Button type="primary" icon={<PlusOutlined />} className="AddButton">
          Add New Mark
        </Button></Link>
      <Link to="/ReportPerform">
        <Button type="primary" icon={<LineChartOutlined />} className="AddButton">
          Reports
        </Button></Link>
      <div id="printTable"><Table
        columns={columns}
        dataSource={markList}
        size="middle"
        pagination={false}
        className="crsTable"
      /></div>
    </div>
  );
}

export default ViewMarks;
