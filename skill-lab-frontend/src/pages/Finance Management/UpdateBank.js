import React, { useEffect, useState } from "react";
import useRequest from "../../services/RequestContext";
import { Form, Input, Button,Spin, Row, Select,Popconfirm,message } from "antd";
import "./stylesFinance.css";
import "antd/dist/antd.css";
import { Link } from "react-router-dom";
import useUser from "../../services/UserContext";

function UpdateBank() {
  const [data, setData] = useState();
  const [bankList, setBankList] = useState([]);
  const [loading, setLoading] = useState(true);
  const { request } = useRequest();
  const { Option } = Select;
  const {user} = useUser();

  const layout = {
    labelCol: {
      span: 8
    },
    wrapperCol: {
      span: 14
    }
  };

  const validateMessages = {
    required: "${label} is required!",

    types: {
      number: "${label} is not a valid number!"
    }
  };

  const fetchBank = async () => {
    console.log("fetch bank ", user)
    setLoading(true);
    try {
      const result = await request.get(`finance/bank/findAll/${user._id}`);
      if (result.status === 200) {
        console.log(result.data);
        setBankList(result.data);
      }
      console.log(" bank list get ", result);
      setLoading(false);
    } catch (e) {
      setLoading(false);
    }
  };

  useEffect(() => {
   if(user&&user._id){
    fetchBank(); 
   }
  }, [user]);

  const onFinish = async (values) => {
    if(data !== undefined){
    try {
      const result = await request.put(`finance/bank/update/${data._id}`, values);
      console.log("api call bank updated", result);
      window.location.reload(true);
    } catch (e) {
      console.log("update error ", e);
    }
  }else {
      console.log("Failed");
  }
 };

  const onDelete = async (value) => {
    try {
      const result = await request.delete(`finance/bank/${value._id}`);
      if(result.status === 200){
        await fetchBank();
        setData(undefined);
      }
      console.log("api call bank deleted", result);
    } catch (e) {
      console.log("post bank error ", e);
    }
  };
  const onCardSelect = val => {
    if (val && val._id) {
      const item = bankList.find(vl => vl._id === val._id);
      console.log("selected card ", item)
      setData({ ...item });
    }
  };
  const onSuccess = () => {
    message.success("Bank Details Updated Successfully !");
  };


  return (
    <div className="main-container-updateBank">
     <div className="addButtonBank">
       <Link to="/withdraw">
    <Button type="primary">Add New Bank Account</Button> </Link>
    </div>
      {bankList.length > 0 ? (
        <div className="savedCards">
          <label className="lable">My Saved Bank Details</label>
          {bankList.map(bank => (
            <div className="save-card"
              onClick={() => onCardSelect(bank)}
              key={bank._id}
            
              >
              <h5>{bank.bankName}</h5>
              <span>{bank.accountNumber}</span>
            </div> 
              
            
          ))}
        </div>
      ) : (
        <Spin />
      )}

      <div className={data !== undefined ? "updateForm" : "afterDelete"}>
        <h1>Edit Bank Details</h1>
        {data  && (
          <Form
            name="withdraw-form"
            onFinish={onFinish}
            validateMessages={validateMessages}
            layout="vertical"
            initialValues={data}
            key={data._id}
         >
            <Form.Item
              name={["name"]}
              label="AccountHolder's Name"
              rules={[{ required: true }]}
            >
              <Input autocomplete="off" />
            </Form.Item>

            <Form.Item
              name={["accountNumber"]}
              label="Account Number"
              rules={[{ required: true }]}
            >
              <Input maxLength={10} autocomplete="off" />
            </Form.Item>

            <Form.Item
              name={["bankName"]}
              label="Bank Name"
              rules={[{ required: true }]}
            >
              <Select placeholder="Select Your Bank">
                <Option value="Bank of Ceylone">Bank of Ceylone</Option>
                <Option value="Peoples Bank">Peoples Bank</Option>
                <Option value="Sampath Bank">Sampath Bank</Option>
                <Option value="Commercial Bank">Commercial Bank</Option>
              </Select>
            </Form.Item>

            <Form.Item
              name={["branch"]}
              label="Branch"
              rules={[{ required: true }]}
            >
              <Input autocomplete="off" />
            </Form.Item>

           <Row className="update-wallet-btn-row"> 
           <Form.Item
              shouldUpdate
              wrapperCol={{ ...layout.wrapperCol, offset: 6 }}
              className="walletUpdate-btn"
            >
           <Button type="primary" htmlType="submit" className="updateBtn" onClick={onSuccess}>
                  Update
                </Button>
              </Form.Item>
              <Popconfirm
                title="Are you sure to delete this card?"
                okText="Yes"
                okButtonProps={{ danger: true }}
                cancelText="No"
                cancelButtonProps={{ type: "primary" }}
                onConfirm={() => onDelete(data)}
              >
                <Button danger type="primary">
                  Delete
                </Button>
              </Popconfirm>
        </Row>
          </Form>
        
        )}

      </div>
    </div>
  );
}
export default UpdateBank;
