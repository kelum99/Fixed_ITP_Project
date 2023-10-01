import React, { useState, useEffect } from "react";
import { Table, Input } from 'antd';
import './stylesStudent.css';
import image from "../../image/result.jpg";
import useRequest from "../../services/RequestContext";
import useUser from "../../services/UserContext";
import moment from 'moment';

function MyPerformance() {

  //retrieve
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { request } = useRequest();
  const [markList, setMarkList] = useState([]);
  const { user } = useUser();

  //fetchMarks
  const fetchMarks = async () => {
    setLoading(true);
    try {
      const result = await request.get(`student/myperformance/${user.nic}`);
      if (result.status === 200) {
        setMarkList(result.data.map(vl => ({...vl, uploadDate: moment(vl.uploadDate).local().format("YYYY-MM-DD")})));
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

  //table
  const columns = [
    {
      title: "#",
      dataIndex: "index",
      key: "index",
      render: (text, record, index) => index + 1
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
          || data.assignmentCode.toLowerCase().search(value) != -1 || data.uploadDate.toLowerCase().search(value) != -1
      }
    });
    setMarkList(result);
  };

  return (
    <div className="myCrs">
      <Search placeholder="Search Result" onSearch={onSearch} enterButton className="searchbar" />
      <center><img class="performImg" src={image} /></center>
      <Table columns={columns} dataSource={markList} size="middle" pagination={false} className="crsTable" />
    </div>
  );
}

export default MyPerformance;