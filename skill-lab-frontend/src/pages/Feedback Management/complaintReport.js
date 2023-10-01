import React, { useState, useEffect } from "react";
import { Table, Button, Input, message } from 'antd';
import { PrinterOutlined} from '@ant-design/icons';
import '../Student Management/stylesStudent.css';
import { useHistory, Link } from 'react-router-dom';
import useRequest from "../../services/RequestContext";
import useUser from "../../services/UserContext";
import { jsPDF } from "jspdf";

function MyCourses() {

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
        <div className="myCrs">
            
            <br /><br /><center><h1 className="enrolllHeading">Analysis Report </h1></center>
            
            <Button type="primary"  icon={<PrinterOutlined />} className="AddButton1" onClick ={downloadPDF}>
                print
            </Button>
            <Table columns={columns} dataSource={reviewList} size="middle" pagination={false} className="crsTable" id="course_analysis" />
        </div>
    );
}

export default MyCourses;