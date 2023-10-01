import React from 'react';
import { Form, Input, Select, Button, Table, Space } from 'antd';
import 'antd/dist/antd.css';
import './styleStore.css'

function Cart() {

    const layout = {
        labelCol: {
          span: 8,
        },
        wrapperCol: {
          span: 14,
        },
      };

    const columns = [
        {
            title: 'Product Details',
            dataIndex: 'productDetails',
            key: 'productDetails',
        },

        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
        },

        {
            title: 'Clear Cart',
            dataIndex: 'clearCart',
            key: 'clearCart',
            render: (text, record) => (
                <Space size="middle">
                  <a>Delete</a>
                </Space>
            ),
        },


    ];


    const dataSource = [
        {
            key: '1',
            productDetails: 'Title,Lecturer',
            price: 'Price',

        },
        {
            key: '2',
            productDetails: 'Title,Lecturer',
            price: 'Price',
        },
        {
            key: '3',
            productDetails: 'Title,Lecturer',
            price: 'Price',
        },


    ];

    const { Option } = Select;



    return (
        <div className="MainContaner-display">

            <Table columns={columns} dataSource={dataSource}  className="cart-table"/>
           


            <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 6 }}>
            <div class="btn"> 
                <Button type="primary" htmlType="store">
                    Back to Store
                </Button>

                <Button type="primary" htmlType="check">
                    Checkout
                </Button>
                </div>
            </Form.Item>

        </div>
    );


}
export default Cart;