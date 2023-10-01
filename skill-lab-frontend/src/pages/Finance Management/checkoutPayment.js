import React, { useEffect, useState } from "react";
import {
  Form,
  Input,
  InputNumber,
  Select,
  Button,
  Card
} from "antd";
import "./stylesFinance.css";
import payment from '../../image/payment.svg';
import payment2 from '../../image/payment2.svg';
import "antd/dist/antd.css";
import { useParams, useHistory } from "react-router-dom";
import useRequest from "../../services/RequestContext";
import useUser from "../../services/UserContext";


function CheckOut() {
    const {user} = useUser();
    const { Option } = Select;
    const [cardList, setCardList] = useState([]);
    const [item, setItem] = useState();
    const [loading, setLoading] = useState(true);
    const { request } = useRequest();
    const  history  = useHistory();
    const { id } = useParams();
    
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

      const fetchItem = async () => {
        setLoading(true);
        try {
          const result = await request.get(`store/product/${id}`);
          if (result.status === 200) {
            console.log("Item",result);
            setItem(result);
          }
          console.log(" get Item  ", result);
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

       useEffect(() => {
        if (id) {
          fetchItem(id);
        }
      }, [id]);

      const onFinish = () => {
        history.push('/paymentsuccess');
      };
     
    return(

      <div className="site-card-border-less-wrapper">
       <img src={payment2} className="crdImg"/>  
      <Card title="Payment Checkout" bordered={false} style={{ width: 600, background:"#bae2f0" }}
    
      >

        <Form
        name="checkout-form"
        layout="vertical"
        onFinish ={onFinish}
        >
        {item && (

          <>
            <Form.Item
              name={["pName"]}
              label="Product Name"
            >
              <Input autocomplete="off" defaultValue={item.data.productName} disabled/>
            </Form.Item>
            <Form.Item
              name={["pCategory"]}
              label="Category"
             
            >
              <Input autocomplete="off" defaultValue={item.data.category} disabled/>
            </Form.Item>
            <Form.Item
              name={["pPrice"]}
              label="Price"
              
            >
              <InputNumber autocomplete="off" defaultValue={item.data.price} disabled/>
            </Form.Item>
            </>
        )}

              <Form.Item
              name={["cardName"]}
              label="Select Card"
              rules={[{ required: true }]}
            >
              <Select placeholder="Select Your Bank">
                {cardList.map(card => (
                    <Option key={card._id} value={card.nickName}>{card.nickName}</Option>
                ))}
              </Select>

            </Form.Item>

                <Button type="primary" htmlType="submit" className="updateBtn">
                  Pay Now
                </Button>

        </Form>
        </Card>
        <img src={payment} className="crdImg1"/>  
  </div>
    );

}
export default CheckOut;