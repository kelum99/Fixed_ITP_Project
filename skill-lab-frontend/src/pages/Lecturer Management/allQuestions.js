import React, { useState, useEffect } from "react";
import { Table, Button, Input, Popconfirm, message } from "antd";
import { EditOutlined, DeleteOutlined, PlusCircleOutlined } from "@ant-design/icons";
import {useHistory} from 'react-router-dom';
import './stylesLecturer.css';
import faq from '../../image/faq.jpg';
import useRequest from "../../services/RequestContext";


function AllQuestion(props) {
  //retrieve
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { request } = useRequest();
  const [questionList, setQuestionList] = useState([]);
  const history = useHistory();
  
  //fetchQuestion
  const fetchQuestion = async () => {
    setLoading(true);
    try {
      const result = await request.get("lecturer/question/findAll");
      if (result.status === 200) {
        // setData(result.data);
        setQuestionList(result.data);
      }
      console.log(" Question get ", result);
      setLoading(false);
    } catch (e) {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuestion();
  }, []);

  //confirm alert
  const text = "Are you sure you want to delete ?";

  function confirm() {
    message.info("Result Deleted Successfully !");
  }

  //delete method
  const onDelete = async value => {
    try {
      const result = await request.delete(`lecturer/question/${value._id}`);
      if (result.status === 200) {
        await fetchQuestion();
        setData(undefined);
      }
      console.log("api call Question deleted", result);
    } catch (e) {
      console.log("delete Question error", e);
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
        title: 'Student Name',
        dataIndex: 'studentName',
        key:'studentName'
      },
      {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
      },
      {
          title: 'Course Name',
          dataIndex: 'courseName',
          key: 'courseName',
      },
      {
        title: 'Topic',
        dataIndex: 'topic',
        key: 'topic',
      },
      {
          title: 'Question',
          dataIndex: 'question',
          key: 'question',
      },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (text, record, index) => (
        <React.Fragment key={index}>
          <Button type="primary" onClick={() => history.push(`/editQ/${record._id}`)} icon={<EditOutlined />} className="edit-dlt-table" />
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
              className="edit-dlt-table"
            />
          </Popconfirm>
        </React.Fragment>
      )
    }
  ];

  //search box
  const { Search } = Input;
  const onSearch = (value) => {
    let result = [];
    result = questionList.filter((data) =>{

     if (value == ""){
       window.location.reload(true);
       return data;
     }else{
       return data.question.toLowerCase().search(value) != -1 || data.email.toLowerCase().search(value) != -1 || data.courseName.toLowerCase().search(value) != -1
     }
    });
    setQuestionList(result);
  }
  


  return (
    <div className="allT">
      <Search placeholder="Search Question" onSearch={onSearch} enterButton className="searchQ"/>
      <br/><br /><center><h1 className="question_h1">Frequently Asked Questions</h1>
      <h2 className="subHeading">Any Questions? Feel free to ask!!</h2> </center>
      <center><img className="questionimg" src={faq} alt="allQList" height ={400} width ={1100}/></center>
      <a href="./askQ">
        <Button type="primary" icon={<PlusCircleOutlined />} className="btnAll">
          Ask New Question
        </Button>
      </a>
      <Table columns={columns} dataSource={questionList} size="middle" pagination={false} className="allQTable"/>
    </div>
  );
}

export default AllQuestion;
