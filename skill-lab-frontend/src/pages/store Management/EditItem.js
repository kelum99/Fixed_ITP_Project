import React, {useState,useEffect} from 'react';
import { Form, Input, Select, Button } from 'antd';
import { useParams } from "react-router-dom";
import useRequest from "../../services/RequestContext";
import 'antd/dist/antd.css';
import './styleStore.css'

function EditItem(){

  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const { request } = useRequest();
  const { id } = useParams();


    const layout = {
        labelCol: {
          span: 8,
        },
        wrapperCol: {
          span: 14,
        },
      };

      
      const validateMessages = {
        required: '${label} is required!',
        types: {
          email: '${label} is not a valid email!',
          number: '${label} is not a valid number!',
        },
        number: {
          range: '${label} must be between ${min} and ${max}',
        },
      };

      const fetchProductDetails = async value => {
        setLoading(true);
        try {
          const result = await request.get(`store/product/${id}`);
    
          if (result.status === 200) {
              const tempItem ={...result.data};
            setData(tempItem);
            console.log("test ", tempItem);
          }
    
          setLoading(false);
        } catch (e) {
          setLoading(false);
        }
      };
    
      useEffect(() => {
        if (id) {
          fetchProductDetails(id);
        }
      }, [id]);

      const onFinish = async values => {
        try {
          const result = await request.put(`store/product/update/${data._id}`,values);
          console.log("api call product updated", result);
          window.location.reload(true);
        } catch (e) {
          console.log("update error ", e);
        }
      };
    

      const { Option } = Select;

    return(
        
        <div className = "MainContainer-Item">

        <div className="form-item">

            <h1>Edit Product Details</h1>

        {data && <Form  name="AddItems-Form" onFinish={onFinish} initialValues={data} key={data._id} validateMessages={validateMessages} layout="vertical">
      <Form.Item
        name={['productId']}
        label="Product ID"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name={['productName']}
        label="Product Name"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name={['price']}
        label="Price"
        rules={[
          {
            required: true

          },
        ]}
      >
        <Input/>
      </Form.Item>


      <Form.Item name={['description']} label="Description">
        <Input.TextArea />
      </Form.Item>

      <Form.Item name={['category']} label="Category">
      <Select>
      <Option value="ebook">e-Book</Option>
      <Option value="web templates"> Web Templates</Option>
      </Select>
      </Form.Item>

      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 6 }}>
        <Button type="primary" htmlType="submit">
          UPDATE
        </Button>
      </Form.Item>
    </Form>}

        </div>
        </div>
        
    );
}

export default EditItem;