import React, { useState, useEffect } from "react";
import { Form, Input, Select, Button, Space,Card,Rate} from "antd";
import book5 from '../../image/book5.jpg';
import book14 from '../../image/book14.jpg';
import book1 from '../../image/book1.jpg';
import book4 from '../../image/book4.jpg';
import book12 from '../../image/book12.jpg';
import book13 from '../../image/book13.jpg';
import "antd/dist/antd.css";
import "./styleStore.css";
import { Carousel } from 'antd';
import UseRequest from "../../services/RequestContext";
import productImg from '../../Images/logo.png';
import { useHistory, Link } from "react-router-dom";


function UserView() {
  const { Option } = Select;
  const history = useHistory();
  const [data, setData] = useState();
  const [itemList, setItemList] = useState([]);
  const [loading, setLoading] = useState([]);

  const fetchProductDetails = async () => {
    setLoading(true);
    try {
      const result = await request.get("store/productDetails");
      if (result.status === 200) {
        setItemList(result.data);
      }
      console.log(" Product Deatils list get ", result);
      setLoading(false);
    } catch (e) {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductDetails();
  }, []);

  const { request } = UseRequest();

  const onSelect = value => {
    if (value && value._id) {
      const item = itemList.find(val => val._id === value._id);
      console.log("Item Selected ", item);
      setData({ ...item });
    }
  };
 
 const { Search } = Input;
 const onSearch = (value) => {
   let result = [];
   result =itemList.filter((data) =>{
    if (value == ""){
      window.location.reload(true);
      return data;
    }else{
      return data.productName.toLowerCase().search(value) != -1 
    }
   });
   setItemList(result);

 }

  return (
    <>
    <div >
      <Carousel autoplay>
        <div>
          <img className="book" src={book5} alt="image 1" height={500} width={1200} />
        </div>
        <div>
          <img className="book" src={book14} alt="image 2"  height={500} width={1200} />
        </div>
        <div>
          <img className="book" src={book1} alt="image 2"  height={500} width={1200}/>
        </div>
        <div>
          <img className="book" src={book4} alt="image 2" height={500} width={1200} />
        </div>
        <div>
          <img className="book" src={book12} alt="image 2"  height={500} width={1200}/>
        </div>
        <div>
          <img className="book" src={book13} alt="image 2" height={500} width={1200} />
        </div>
      </Carousel>
    </div>

<div className="description">
<br/>
<h1 className ="cc">WELCOME TO SKILL LAB STORE.  </h1>
</div>
    

    <div>
      <Space direction="vertical" >
        <Search
          className="item-search"
          placeholder="Search your item here "
          allowClear
          enterButton="Search SkillLab item"
          size="large"
          onSearch={onSearch}
        />

      </Space>
    </div>

      {/* <div className="select-item-filter">
          <Select placeholder="Category">
            <Option value="ebook">e-Book</Option>
            <Option value="web templates"> Web Templates</Option>
            <Option value="sample Projects"> Sample Projects</Option>
            <Option value="web templates"> Web Templates</Option>
          </Select>
    
      </div> */}

      <div className="item-container">
      
      {itemList.map(item => (
        <div  key={item._Id} onClick={() => onSelect(item)}>

      <Card title={item.productName}
       style={{ width: 350 , backgroundColor:"#bae2f0", margin:12 , fontSize:"16px" }}
        hoverable 
        cover={
          <img
            alt="example"
            src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
          />}
          className="cardView"
        >
          <p>{item.category}</p>
          <h5>Price: {item.price}$</h5>
          <Rate allowHalf defaultValue={4.5} />
          <div>
          <Link to="#" >
          <Button type="primary" id="addCartBtn" onClick={() => history.push(`/checkout/${item._id}`)}>
                Buy Now
            </Button></Link>
            </div>
            </Card>
        </div>    
      ))}
      </div>
        
      </>
  );
}

export default UserView;
