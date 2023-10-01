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
    const [myCourseList, setMyCourseList] = useState([]);
    const history = useHistory();
    const { user } = useUser();
    let doc;
    //fetch MyCourses
    const fetchMyCourses = async () => {
        setLoading(true);
        try {
            const result = await request.get(`student/mycourses`);
            if (result.status === 200) {
                setMyCourseList(result.data);
            }
            console.log(" My Courses get ", result);
            setLoading(false);
        } catch (e) {
            setLoading(false);
        }
    };

    useEffect(() => {
        if(user && user._id){
        fetchMyCourses();
        }
    }, [user]);


    

    //table
    const columns = [
        {
            title: '#',
            dataIndex: 'index',
            key: 'index',
            render: (text, record, index) => index + 1,
        },

        {
            title: 'Subject',
            dataIndex: 'subject',
            key: 'subject',
        },
        {
            title: 'Course',
            dataIndex: 'course',
            key: 'course',
        },
        {
            title: 'Lecturer',
            dataIndex: 'lecturer',
            key: 'lecturer',
        },
        {
            title: 'Enrolled Date',
            dataIndex: 'date',
            key: 'date',
        },
       
    ];

    //search box
    const { Search } = Input;

    const onSearch = (value) => {
        let result = [];
        result = myCourseList.filter((data) => {

            if (value == "") {
                window.location.reload(true);
                return data;

            } else {
                return data.subject.toLowerCase().search(value) != -1 || data.lecturer.toLowerCase().search(value) != -1 || data.course.toLowerCase().search(value) != -1
            }
        });
        setMyCourseList(result);
    };



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
            <Search placeholder="Search Course"  allowClear   onSearch={onSearch} enterButton className="searchbar" />
            <br /><br /><center><h1 className="enrolllHeading">Analysis Report </h1></center>
            
            <Button type="primary"  icon={<PrinterOutlined />} className="AddButton1" onClick ={downloadPDF}>
                print
            </Button>
            <Table columns={columns} dataSource={myCourseList} size="middle" pagination={false} className="crsTable" id="course_analysis" />
        </div>
    );
}

export default MyCourses;