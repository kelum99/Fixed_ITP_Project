import React, { useState, useEffect } from "react";
import { Table, Button, Input, Popconfirm, message, Card } from "antd";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import {useHistory} from 'react-router-dom';
import './stylesFeedback.css'
import useRequest from "../../services/RequestContext";
import useUser from "../../services/UserContext";

function MyReview(props) {
  //retrieve
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { request } = useRequest();
  const [reviewList, setReviewList] = useState([]);
  const history = useHistory();
  const { user } = useUser();
  //fetchReviews
  const fetchReviews = async () => {
    setLoading(true);
    try {
      const result = await request.get(`feedback/review/findAll/${user._id}`);
      if (result.status === 200) {
        // setData(result.data);
        setReviewList(result.data);
      }
      console.log(" Marks get ", result);
      setLoading(false);
    } catch (e) {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  //confirm alert
  const text = "Are you sure you want to delete ?";

  function confirm() {
    message.info("Result Deleted Successfully !");
  }

  //delete method
  const onDelete = async value => {
    try {
      const result = await request.delete(`feedback/review/${value._id}`);
      if (result.status === 200) {
        await fetchReviews();
        setData(undefined);
      }
      console.log("api call review deleted", result);
    } catch (e) {
      console.log("delete review error", e);
    }
  };


  //table

  const columns = [
    {
      title: "#",
      dataIndex: "index",
      key: "index",
      render: (text, record, index) => index + 1
    },
    {
        title: 'Course',
        dataIndex: 'course',
        key:'course'
      },
      {
        title: 'Comment',
        dataIndex: 'comment',
        key:'comment'
      },
      {
        title: 'No of Stars',
        dataIndex: 'rate',
        key:'rate'
      },
  
  
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (text, record, index) => (
        <React.Fragment key={index}>
          <Button type="primary" onClick={() => history.push(`/editR/${record._id}`)} icon={<EditOutlined />} className="edit-dlt" />
          <Popconfirm
            placement="right"
            title={text}
            onConfirm={() => onDelete(record)}
            okText="Yes"
            cancelText="No"
          >
            <Button
             
              type="primary"
              icon={<DeleteOutlined />}
              className="edit-dlt"
            />
          </Popconfirm>
        </React.Fragment>
      )
    }
  ];

  //search box
  const { Search } = Input;
  const onSearch = value => console.log(value);

  return (
    <div className="myReview">
          
        
        <br/><br/>

        <div><h1><center>Edit Review</center></h1></div>
        <Table columns={columns} dataSource={reviewList} size="middle" pagination={false} className="rTable" />
        
    </div>
  );
}

export default MyReview;