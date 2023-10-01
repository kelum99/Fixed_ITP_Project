import React, { useEffect, useState } from "react";
import moment from "moment";
import {
  Form,
  Input,
  InputNumber,
  Select,
  Button,
  Modal,
  message,
  Table,
  DatePicker,
  Typography
} from "antd";
import "./stylesFinance.css";
import "antd/dist/antd.css";
import { jsPDF } from "jspdf";
import {  DownloadOutlined } from "@ant-design/icons";
import useRequest from "../../services/RequestContext";

function Analysis() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [dataList, setDataList] = useState([]);
  const { Text } = Typography;
  const { Option } = Select;
  const {request} = useRequest();
  const [form] = Form.useForm();
  const { Search } = Input;
  const  months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const month = new Date();
  const monthName = months[month.getMonth()];
  const monthVal = month.getMonth()+1;
  const year = month.getFullYear();
  let doc;

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const onReset = () => {
    form.resetFields();
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const onFinish = async values => {
    values.month = monthName;
    values.date = moment(values.expireDate).format("YYYY-MM-DD");
    console.log("value",values);
      try{
          const result = await request.post('finance/financeAnalysis', values);
          console.log("api call Add Income/Expense ", result);
          message.success(result.data.message)
          form.resetFields();
          fetchWallet();
    } catch(e){
      console.log("post wallet error ",e);
    } 
  };

  const fetchWallet = async () => {
    setLoading(true);
    try {
      const result = await request.get(`finance/financeAnalysis`);
      if (result.status === 200) {
        console.log(result.data);
        setDataList(result.data.map(vl => ({...vl,  date: moment(vl.date).local().format("YYYY-MM-DD")})));
      }
      console.log(" wallet list get ", result);
      setLoading(false);
    } catch (e) {
      setLoading(false);
    }
  };

  const onSearch = value => {
    let result = [];
    result = dataList.filter((data) =>{
     if (value == ""){
       fetchWallet(); 
       return data;
     }else{
       return data.date.search(value) != -1 
     }
    });
    setDataList(result);
  };

  const downloadPDF = () => {
    doc = new jsPDF({
      orientation : "landscape",
      unit :"pt",
      format : [1700,1000]
    })
     doc.html(document.getElementById('printTable'), {
       callback: function (pdf) {
         pdf.setFontSize(26);
         pdf.save("Income&Expenses.pdf");
       },
     });
   };

  useEffect(() => {
    fetchWallet(); 
  }, []);

  const columns = [
    {
      title: "Type",
      dataIndex: "type",
      key: "type"
    },
    {
      title: "Amount($)",
      dataIndex: "amount",
      key: "amount"
    },
    {
      title: "Reason",
      dataIndex: "reason",
      key: "reason"
      
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      // filters: [
      //   {
      //     text: 'Current Month',
      //     value: `${year}-${monthVal}`
      //   }
      // ],
      // onFilter: (value, record) => record.date.indexOf(value) === 0,
    }
  ];

    return(
        <>
      <Button type="primary" onClick={showModal} className="addIEbtn">
        Add Income/Expense
      </Button>
      <Modal title="Income and Expenses"
        visible={isModalVisible} 
        onCancel={handleCancel}
        width={700}
        style={{padding:15}}
        cancelText="Reset"
        footer={[
          <Button
            onClick={onReset}
          >
           Reset
          </Button>,
           <Button
           type="primary"
             onClick={handleOk}
           >
            OK
          </Button>,
        ]}
        >
        <Form
        form={form}
        layout="vertical"
        name="analysis-form"
        onFinish={onFinish}>
        <Form.Item
              name={["type"]}
              label="Type"
              rules={[{ required: true }]}
            >
              <Select placeholder="Select Your Bank">
                <Option value="Expense">Expense</Option>
                <Option value="Income">Income</Option>
              </Select>
        </Form.Item>
        <Form.Item
              name={["reason"]}
              label="Reason"
              rules={[{ required: true }]}
            >
              <Input autocomplete="off" />
            </Form.Item>
            <Form.Item
              name={["amount"]}
              label="Amount"
              rules={[{ required: true }]}
            >
              <InputNumber autocomplete="off"  />
            </Form.Item>

            <Form.Item
              name={"date"}
              label="Date"
            >
              <DatePicker picker="date" defaultValue={moment()} disabled />
            </Form.Item>


            <Button type="primary" htmlType="submit" className="updateBtn" >
                  Submit
            </Button>
        </Form>
      </Modal>

      <h2 className="titleIE">Monthly Income And Expenses</h2>
    
      <div className="search">
        <Search
        placeholder="Year - Month "
        allowClear
        enterButton="Search"
        size="large"
        onSearch={onSearch}
        style={{ width: 400 }}
      />
      <span className="search-span">Enter Month in Numeric Format</span>
    </div>

      <div className="paymentHistory-table" id="printTable">
        <Table 
        bordered={true}
        dataSource={dataList}
        columns={columns}
        pagination={false} 
        size="small"
        summary={pageData => {
          let total = 0;
          pageData.forEach(({ amount}) => {
            total = total+amount;
          });
  
          return (
            <>
              <Table.Summary.Row fixed>
                <Table.Summary.Cell>Balance($)</Table.Summary.Cell>
                <Table.Summary.Cell colSpan={1} >
                  <Text type="danger">{total}</Text>
                </Table.Summary.Cell>
              </Table.Summary.Row>
            </>
          );
        }}
        />
      </div>

        <Button type="primary" className="dowloadBtn"  icon={<DownloadOutlined />} onClick={downloadPDF}>
          Download Report
        </Button>
        </>
    );
};
export default Analysis;