import React, { useState, useEffect } from "react";

import { Table, Button, Input, message } from 'antd';
import { PrinterOutlined} from '@ant-design/icons';
import '../Student Management/stylesStudent.css';
import { useHistory, Link } from 'react-router-dom';
import useRequest from "../../services/RequestContext";
import useUser from "../../services/UserContext";
import { jsPDF } from "jspdf";
import  admin from '../../image/admin.png';
import '../Job Vacancy Management/New.css';



function Issues(props) {
   //retrieve
   const [data, setData] = useState([]);
   const [loading, setLoading] = useState(true);
   const { request } = useRequest();
   const [reviewList, setReviewList] = useState([]);
   const history = useHistory();
   const { user } = useUser();
   let doc;

  //fetchReviews
  const fetchContact = async () => {
    setLoading(true);
    try {
      const result = await request.get("feedback/contact/findAll");
      if (result.status === 200) {
        // setData(result.data);
        setReviewList(result.data);
      }
      console.log(" Marks get ", result);
      setLoading(false);
    } catch (e) {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContact();
  }, []);

  //confirm alert
  const text = "Are you sure you want to delete ?";

  function confirm() {
    message.info("Result Deleted Successfully !");
  }

  //delete method
  const onDelete = async value => {
    try {
      const result = await request.delete(`feedback/contact/${value._id}`);
      if (result.status === 200) {
        await fetchContact();
        setData(undefined);
      }
      console.log("api call review deleted", result);
    } catch (e) {
      console.log("delete review error", e);
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
        title: 'Name',
        dataIndex: 'name',
        key:'name'
      },
      {
        title: 'Email',
        dataIndex: 'email',
        key:'email'
      },
      {
        title: 'Issue Type',
        dataIndex: 'issuetype',
        key:'issuetype'
      },
      {
        title: 'Subject',
        dataIndex: 'subject',
        key:'subject'
      },
      {
        title: 'Message',
        dataIndex: 'message',
        key:'message'
      },
  
  ];

  //print report as a pdf 
  const downloadPDF = () => {
    // doc = new jsPDF("p", "pt", [1000, 600]);
     doc = new jsPDF({
       orientation : "landscape",
       unit :"pt",
       format : [1700,1000]
     })    
     doc.html(document.getElementById("course_analysis"), {
       callback: function (pdf) {
         pdf.save("Analysis.pdf");
       },
     });
   }

  

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
           <h5 className="Adminh">Feedback Management</h5>

           <ul className="Adminul">
           <Link to="/issues"> <li>Customer Complaints</li></Link>
           </ul>

           <ul className="Adminul">
         
          </ul>
       </div>


       <br/><br/><br/>

    <button className="Admin-sider-Button">Logout</button>
    </div>

    <div className="col-9">
     
    <div className="issues">
          
        
          <br/><br/>
  
          <div><h1><center> Monthly Complaints Report</center></h1></div>
          <Button type="primary"  icon={<PrinterOutlined />} className="printR" onClick ={downloadPDF}>
                  print
          </Button>
          <br/><br/>
          <Table columns={columns} dataSource={reviewList} size="middle" pagination={false} className="iTable" id="course_analysis" />
          
          </div>


    </div>

    </div>
    </div>

</>
  );
}

export default Issues;