import React, { useEffect, useState } from "react";
import { Table, Button, Popconfirm, message } from "antd";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import "antd/dist/antd.css";
import UseRequest from "../../services/RequestContext";
import { useHistory, Link } from "react-router-dom";
import useUser from "../../services/UserContext";
import image from "../../image/book5.jpg";

function DisplayItem() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState([]);
  const [itemList, setItemList] = useState([]);
  const history = useHistory();
  const { request } = UseRequest();
  const {user} = useUser();

  const fetchProductDetails = async () => {
    setLoading(true);
    try {
      const result = await request.get(`store/product/findAll/${user._id}`);
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

  const onDelete = async value => {
    try {
      const result = await request.delete(`store/product/${value._id}`);
      if (result.status === 200) {
        await fetchProductDetails();
        setData(undefined);
      }
      console.log("api call item deleted", result);
    } catch (e) {
      console.log("delete item error", e);
    }
  };

  

  const columns = [
    {
      title: "Product ID",
      dataIndex: "productId",
      key: "productId"
    },

    {
      title: "Product Name",
      dataIndex: "productName",
      key: "productName"
    },

    {
      title: "Category",
      dataIndex: "category",
      key: "category"
    },

    {
      title: "Price",
      dataIndex: "price",
      key: "price"
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (text, record, index) => (
        <React.Fragment key={index}>
          <Button type="primary" onClick={() => history.push(`/EditItem/${record._id}`)} icon={<EditOutlined />} className="edit-dlt" />
          <Popconfirm
            placement="right"
            title={text}
            onConfirm={() => onDelete(record)}
            okText="Yes"
            cancelText="No"
          >
            <Button
              danger
              type="primary"
              icon={<DeleteOutlined />}
              className="edit-dlt"
            />
          </Popconfirm>
        </React.Fragment>
      )
    }
  ];

  return (

   

    <div className="MainContaner-Diaplay">

     <center>
        <h1 className="itemheading">Skill Lab Study Matetials</h1>
        <img class="displatimg" src={image}/>
        </center>
      
      <Link to="/AddItem" >
        <Button type="primary" icon={<PlusOutlined />} className="addProduct">
        Add Product
        </Button>
        </Link>
        
        
      

      <Table
        columns={columns}
        dataSource={itemList}
        className="addItem-table"
        pagination= {false}
      />
      
    </div>
  );
}

export default DisplayItem;
