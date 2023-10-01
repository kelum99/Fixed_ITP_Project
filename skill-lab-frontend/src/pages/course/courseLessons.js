import React,{useState,useEffect} from "react";
import './courseStyles.css';
import 'antd/dist/antd.css';
import { Table, Button} from 'antd';
import { RightOutlined } from '@ant-design/icons';
import useRequest from "../../services/RequestContext";
import { useParams,useHistory } from "react-router-dom";
  
 

function Lessons() {

  const history = useHistory();
  const { id } = useParams();
  // retrive
  const[data,setData] = useState([]);
  const[loading,setLoading] = useState(true);
  const{request} = useRequest();

  const fetchcourses = async () => {
    setLoading(true);
    try {
      const result = await request.get(`course/lessonscreated/findAll/${id}`) 
      if (result.status === 200) {
        setData(result.data);
      }
      console.log(" question list get ", result);
      setLoading(false);
    } catch (e) {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchcourses();
  }, []);
  


//table
const columns = [
 
  
//index

{
  title: '#',
  dataIndex: 'index',
  key:'index',
  render:(text,record,index) => index +1,
  },
  

/*
    {
      title: 'Course Name',
      dataIndex: 'cname',
      key:'cname'
    },
    */
    {
      title: 'Lesson Name',
      dataIndex: 'lessoname',
      key: 'lessoname',
    },
    
    
    
    {
      title: '', 
      dataIndex: 'action',
      key:'action',
      render: (text, record, index) =>(
        <span>
        <>
        <Button type="primary "icon={<RightOutlined />} onClick={() => history.push(`../viewACourseLesson/${record._id}`)} className="edit-dlt-table"/>
        </>
        </span>
      ),
    },

  ];
  



  


    return (
        
        <div className="allQuestions">
            <h1 className="course_h1" >Course Content </h1>
            <Table columns={columns} dataSource={data} size="middle" pagination={false} className="allQTable" />
            
        </div>
    
    );
}

export default Lessons;













