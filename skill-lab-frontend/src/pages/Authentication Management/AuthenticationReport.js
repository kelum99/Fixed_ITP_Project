import React, { useState, useEffect } from "react";
import './stylesManagement.css'
import { Table, Button, Input, message } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import { jsPDF } from "jspdf"
import useRequest from "../../services/RequestContext";
import moment from "moment";
import logo from "../../image/logo11.png";


function LecManagement() {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const { request } = useRequest();
    let doc;

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
        }, 
        []);

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

    const downloadPDF = () => {

        doc = new jsPDF({
            orientation: "landscape",
            unit: "pt",
            format: [2500, 1000]
        })

        doc.html(document.getElementById("autReport"), {
            callback: function (pdf) {
                pdf.save("AuthenticationReport.pdf");

            },

        });

    }

    return (
        <div className="Au-manage">
            <Search placeholder="Search Here" onSearch={onSearch} enterButton className="searchbar" />

            <div id="autReport">

                <div className="aut-report-Head">
                    <center><img src={logo} alt="logo" className="logoAut" /></center>
                    <h5>SKILL-LAB</h5><p>Tel:- 011-2548741<br />e-mail:- skilllab.edu@gmail.com</p>
                </div>
                
                <br/><br/><h1 className="autcenter"><center>Authentication Report</center></h1>

                <Table columns={columns} dataSource={data} size="middle" pagination={false} className="tbl" />
            </div>

            <Button type="primary" className="btnReport" onClick={downloadPDF} icon={<DownloadOutlined />}> Download Report </Button>
        </div>
    );
}

export default LecManagement;

