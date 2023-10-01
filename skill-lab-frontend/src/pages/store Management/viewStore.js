import React, { useState, useEffect } from "react";
import { Table, Menu,  Space, Form, Select, Option,Button } from 'antd';
import 'antd/dist/antd.css';
import { jsPDF } from "jspdf";
import {  DownloadOutlined } from "@ant-design/icons";
import { useHistory} from 'react-router-dom';
import useRequest from "../../services/RequestContext";
import useUser from "../../services/UserContext";

function ViewStore(){

   
   const [loading, setLoading] = useState(true);
   const { request } = useRequest();
   const [markList, setMarkList] = useState([]);
   const history = useHistory();
   const { user } = useUser();
   let doc;

  
    const columns = [
        {
          title: 'Product ID',
          dataIndex: 'productID',
          key: 'productID',
        },

        {
          title: 'Product Name',
          dataIndex: 'productName',
          key: 'productName',
        },

        {
          title: 'Category',
          dataIndex: 'category',
          key: 'category',
        },

        {
            title: 'Number of Sells',
            dataIndex: 'numberofSells',
            key: 'numberofSells',
          },

          {
            title: 'Total',
            dataIndex: 'total',
            key: 'total',
          },

        
      ];


      const dataSource = [
        {
          key: '1',
          productID: 'PD100',
          productName: 'Retail Apoocalypse',
          category: 'e-book',
          numberofSells: '02',
          total:'$24',
        },
        {
          key: '2',
          productID: 'PD101',
          productName: 'Information Technology Law',
          category: 'e-book',
          numberofSells: '07',
          total:'$21',
        },

        {
            key: '3',
            productID: 'PD102',
            productName: 'KnightOne',
            category: 'web templete',
            numberofSells: '05',
            total:'$35',
          },

          {
            productID: 'PD103',
            productName: 'JavaScript',
            category: 'web template',
            numberofSells: '06',
            total:'$36',
          },

          {
            productID: 'PD104',
            productName: 'Appland',
            category: 'web template',
            numberofSells: '10',
            total:'$120',
          },

          {
            productID: 'PD105',
            productName: 'Softland',
            category: 'web template',
            numberofSells: '02',
            total:'$16',
          },
      ];

      const { Option } = Select;

      //Report Generate
  const downloadPDF = () => {
    // doc = new jsPDF("p", "pt", [1000, 600]);
     doc = new jsPDF({
       orientation : "landscape",
       unit :"pt",
       format : [1700,1000]
     })
     doc.html(document.getElementById("printTable"), {
       callback: function (pdf) {
         pdf.save("StoreReport.pdf");
       },
     });
   };
      
return(
<>
    <div className = "MainContaner-display">

<div class="month">
    <Form.Item name={['month']} >
      <Select placeholder="Month">
      <Option value="january">January</Option>
      <Option value="february"> February</Option>
      <Option value="march">March </Option>
      <Option value="april"> April</Option>
      <Option value="may"> May</Option>
      <Option value="june"> June</Option>
      <Option value="july"> July</Option>
      <Option value="august"> August</Option>
      </Select>
      </Form.Item>
   

    </div>

<Table columns={columns}
 dataSource={dataSource}
 id="printTable" 
 size="middle"
 pagination={false}/>
    
    </div>

<Button type="primary" className="AddButton"  icon={<DownloadOutlined />} onClick={downloadPDF}>
Download Report
</Button>

</>    
); 
}

 export default ViewStore;