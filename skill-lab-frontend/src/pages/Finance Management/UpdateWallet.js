import React, { useEffect, useState } from "react";
import useRequest from "../../services/RequestContext";
import { Link } from "react-router-dom";
import {
  Form,
  Input,
  InputNumber,
  Button,
  DatePicker,
  Spin,
  Row,
  message,
  Popconfirm
} from "antd";
import "./stylesFinance.css";
import "antd/dist/antd.css";
import moment from "moment";
import useUser from "../../services/UserContext";

function UpdateWallet() {
  const [data, setData] = useState();
  const [cardList, setCardList] = useState([]);
  const [loading, setLoading] = useState(true);
  const { request } = useRequest();
  const {user} = useUser();

  const layout = {
    labelCol: {
      span: 8
    },
    wrapperCol: {
      span: 14
    }
  };
  const onSuccess = () => {
    message.success("Card Updated Successfully !");
  };

  const validateMessages = {
    required: "${label} is required!",

    types: {
      number: "${label} is not a valid number!"
    }
  };

  const fetchWallet = async () => {
    setLoading(true);
    try {
      const result = await request.get(`finance/wallet/findAll/${user._id}`);
      if (result.status === 200) {
        console.log(result.data);
        setCardList(result.data);
      }
      console.log(" wallet list get ", result);
      setLoading(false);
    } catch (e) {
      setLoading(false);
    }
  };


  useEffect(() => {
   if(user && user._id){
    fetchWallet(); 
   }
  }, [user]);

  const onFinish = async values => {
    try {
      const result = await request.put(
        `finance/wallet/update/${data._id}`,
        values
      );
      values.expireDate = moment(values.expireDate).format("YYYY-MM");
      console.log("api call wallet updated", result);
      window.location.reload();
    } catch (e) {
      console.log("update error ", e);
    }
  };

  const onDelete = async value => {
    try {
      const result = await request.delete(`finance/wallet/${value._id}`);
      if (result.status === 200) {
        await fetchWallet();
        setData(undefined);
      }
      console.log("api call wallet deleted", result);
    } catch (e) {
      console.log("post bank error ", e);
    }
  };
  const onCardSelect = val => {
    if (val && val._id) {
      const item = cardList.find(vl => vl._id === val._id);
      console.log("selected card ", item);
      setData({ ...item, expireDate: moment(item.expireDate) });
    }
  };

  return (
    <div className="main-container-updateWallet">
    <div className="addButton">
    <Link to="/payment">
    <Button type="primary">Add New Card</Button> </Link>
    </div>
      {cardList.length > 0 ? (
        <div className="savedCards">
          <label className="lable">My Saved Cards</label>
          {cardList.map(card => (
            <div
              className="save-card"
              onClick={() => onCardSelect(card)}
              key={card._id}
              cardNumber={card.cardNumber}
            >
              <h5>{card.nickName}</h5>
              <span>{card.cardNumber}</span>
            </div>
          ))}
        </div>
      ) : (
        <Spin />
      )}

      <div className={data !== undefined ? "updateForm" : "afterDelete"}>
        <h1>Update Card Details</h1>
        {data && (
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
              label="Cardholder's Name"
              rules={[{ required: true }]}
            >
              <Input autocomplete="off" />
            </Form.Item>

            <Form.Item
              name={["cardNumber"]}
              label="Card Number"
              rules={[{ required: true }]}
            >
              <Input maxLength={16} />
            </Form.Item>

            <Form.Item
              name={"expireDate"}
              label="Expire Month/Year"
              rules={[{ required: true }]}
            >
              <DatePicker picker="month" />
            </Form.Item>

            <Form.Item
              name={["cvv"]}
              label="CVV"
              rules={[
                {
                  type: "number",
                  required: true
                }
              ]}
            >
              <InputNumber maxLength={3} />
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
export default UpdateWallet;
