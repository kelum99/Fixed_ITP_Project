import React, { useState, useEffect } from "react";
import { Table, Button, Input } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import "./stylesStudent.css";
import useRequest from "../../services/RequestContext";
import useUser from "../../services/UserContext";
import { jsPDF } from "jspdf";
import logoprint from "../../image/log.png";
import moment from 'moment';

function ReportPerform() {
  //retrieve
  const [loading, setLoading] = useState(true);
  const { request } = useRequest();
  const [markList, setMarkList] = useState([]);
  const { user } = useUser();
  let doc;

  //fetchMarks
  const fetchMarks = async () => {
    setLoading(true);
    try {
      const result = await request.get(`student/performance/${user._id}`);
      if (result.status === 200) {
        setMarkList(result.data.map(vl => ({ ...vl, uploadDate: moment(vl.uploadDate).local().format("DD-MM-YYYY") })));
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

  //Report Generate
  const downloadPDF = () => {
    doc = new jsPDF({
      orientation: "landscape",
      unit: "pt",
      format: [1700, 1000]
    })
    doc.html(document.getElementById("printTable"), {
      callback: function (pdf) {
        pdf.save("PerformanceReport.pdf");
      },
    });
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
        <h1 className="enrolllHeading">Performance Reports</h1>
      </center>

      <Button type="primary" className="AddButton" icon={<DownloadOutlined />} onClick={downloadPDF}>
        Download Report
      </Button>
      <div id="printTable">
        <div className="perform-report-Head">
          <center>
            <img src={logoprint} alt="logo" className="performlogoprint" />

            <h5>SKILL-LAB</h5>
            <p>Tel:- 011-2548741<br />
              e-mail:- skilllab.edu@gmail.com</p>
          </center>
        </div>
        <Table
          columns={columns}
          dataSource={markList}
          size="middle"
          pagination={false}
          className="crsTable"
        /></div>
    </div>
  );
}

export default ReportPerform;
