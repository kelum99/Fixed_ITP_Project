import React,{useState,useEffect} from "react";
import './stylesFeedback.css'
import 'antd/dist/antd.css';
import { Table, Input, Space } from 'antd';
import { AudioOutlined} from '@ant-design/icons';
import useRequest from "../../services/RequestContext";



function ReviewList(){


const[data,setData] = useState([]);
const[loading,setLoading] = useState(true);
const{request} = useRequest();
const [reviewList, setReviewList] = useState([]);

const fetchReview = async () => {
  setLoading(true);
  try {
    const result = await request.get("feedback/review/findAll");
    if (result.status === 200) {
      setReviewList(result.data);
    }
    console.log(" review list get ", result);
    setLoading(false);
  } catch (e) {
    setLoading(false);
  }
};

useEffect(() => {
  fetchReview();
}, []);

 //table
const columns = [
 
    
    {
      title: 'Course Name',
      dataIndex: 'course',
      key:'course'
    },
    
    {
      title: 'Student Name',
      dataIndex: 'fname',
      key:'fname'
    },

    {
        title: 'Comment',
        dataIndex: 'comment',
        key:'comment'
      },
  ];

  // const data = [
  //   {
  //     key: '1',
  //     courseName:'course name',
  //     stId:'0000',
  //     stName:'student name',
  //     comment:'comment',
  //   },
    
  //   {
  //       key: '2',
  //       courseName:'course name',
  //       stId:'0000',
  //       stName:'student name',
  //       comment:'comment',
  //   },

  //   {
  //       key: '3',
  //       courseName:'course name',
  //       stId:'0000',
  //       stName:'student name',
  //       comment:'comment',
  //   },

  //   {
  //       key: '4',
  //       courseName:'course name',
  //       stId:'0000',
  //       stName:'student name',
  //       comment:'comment',
  //   },

  //   {
  //       key: '5',
  //       courseName:'course name',
  //       stId:'0000',
  //       stName:'student name',
  //       comment:'comment',
      
  //   },

  //   {
  //       key: '6',
  //       courseName:'course name',
  //       stId:'0000',
  //       stName:'student name',
  //       comment:'comment',
  //   },

  //   {
  //       key: '7',
  //       courseName:'course name',
  //       stId:'0000',
  //       stName:'student name',
  //       comment:'comment',
  //   },

  //   {
  //       key: '8',
  //       courseName:'course name',
  //       stId:'0000',
  //       stName:'student name',
  //       comment:'comment',
  //   },

  //   ];

    //search box
    const { Search } = Input;
    const onSearch = (value) => {
         let result = [];
      result = reviewList.filter((data) =>{
       if (value == ""){
         window.location.reload(true);
   
         return data;
   
       }else{
   
         return data.course.toLowerCase().search(value) != -1 
   
       }
   
      });
   
      setReviewList(result);
   
   
   
    }
  
    
    return( 
        <div className="reviewList">
        

        <div>
          <br/><br/> 
          <h1><center>My Review List</center></h1>
          
        </div>
          
        <div>

        <Search placeholder="Search Course " onSearch={onSearch} enterButton  allowClear className="searchbarList" />
        <Table columns={columns} dataSource={reviewList} size="middle" pagination={false} className="reviewLTable" />

        </div>
    </div>
    );

 
};

export default ReviewList;