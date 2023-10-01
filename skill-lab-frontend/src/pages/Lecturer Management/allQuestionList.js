import React ,{useState,useEffect} from "react";
import './stylesLecturer.css';
import 'antd/dist/antd.css';
import { Table, Button,Input,message,Popconfirm } from 'antd';
import {DeleteOutlined,AudioOutlined} from '@ant-design/icons';
import allList2 from '../../image/allList2.jpg';
import useRequest from "../../services/RequestContext";

function AllQuestionList() {

  // retrive data
  const[data,setData] = useState([]);
  const[loading,setLoading] = useState(true);
  const{request} = useRequest();
  const [questionList, setQuestionList] = useState([]);

  const fetchQuestion = async () => {
    setLoading(true);
    try {
      const result = await request.get("lecturer/question/findAll");
      if (result.status === 200) {
        setQuestionList(result.data);
      }
      console.log(" question list get ", result);
      setLoading(false);
    } catch (e) {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuestion();
  }, []);

  //delete method
  const onDelete = async value => {
    try {
      const result = await request.delete(`lecturer/question/${value._id}`);
      if (result.status === 200) {
        await fetchQuestion();
        setData(undefined);
      }
      console.log("api call question deleted", result);
    } catch (e) {
      console.log("delete question error", e);
    }
  };

   //Alert mg
   const text = 'Are you sure you want to delete ?';

   function confirm() {
       message.info('Result Deleted Successfully !');
   }



   //table
   const columns = [
    {
        title: '#',
        dataIndex: 'index',
        key:'index',
        render:(text,record,index) => index +1,
    },
    {
      title: 'Student Name',
      dataIndex: 'studentName',
      key:'studentName'
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key:'email'
    },
    {
        title: 'Course Name',
        dataIndex: 'courseName',
        key:'courseName'
    },
    {
      title: 'Topic',
      dataIndex: 'topic',
      key:'topic'
    },
    {
        title: 'Question',
        dataIndex: 'question',
        key:'question'
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key:'action',
      render: (text, record, index) =>(
        <React.Fragment key={index}>
        <span>
        <Popconfirm placement="right" title={text}  onConfirm={() => onDelete(record)} okText="Yes" cancelText="No">
          <Button type="primary"icon={<DeleteOutlined />} className="edit-dlt-table"/>
        </Popconfirm>
        </span>
        </React.Fragment>
      ),
    },
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
            <Search placeholder="Search Question" onSearch={onSearch} enterButton className="searchQ" />
            <h1 className="question_h1">All Questions List</h1>
            <center><img className="questionimg" src={allList2} alt="allQList" height ={400} width ={1400}/></center>
           <div> <Table columns={columns} dataSource={questionList} size="middle" pagination={false} className="allQTable2" /> </div> 
        </div>
      
    );
}

export default AllQuestionList;