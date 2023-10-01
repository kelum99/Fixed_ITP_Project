import React,{useState,useEffect} from "react";
import './stylesLecturer.css';
import 'antd/dist/antd.css';
import { Table,Input } from 'antd';
import viewNote1 from '../../image/viewNote1.jpg';
import useRequest from "../../services/RequestContext";

function NoticeView() {

  // retrive
  const[data,setData] = useState([]);
  const[loading,setLoading] = useState(true);
  const{request} = useRequest();
  const [noticeList, setNoticeList] = useState([]);

  const fetchNotice = async () => {
    setLoading(true);
    try {
      const result = await request.get("lecturer/notice/findAll");
      if (result.status === 200) {
        //setData(result.data);
        setNoticeList(result.data);
      }
      console.log(" notice list get ", result);
      setLoading(false);
    } catch (e) {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotice();
  }, []);


  //table
  const columns = [
    {
    title: '#',
    dataIndex: 'index',
    key:'index',
    render:(text,record,index) => index +1,
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key:'date'
    },
    {
      title: 'Notice',
      dataIndex: 'notice',
      key:'notice'
    },
  ];
   
  //search box
  const { Search } = Input;
  const onSearch = (value) => {
    let result = [];
    result = noticeList.filter((data) =>{

     if (value == ""){
       window.location.reload(true);
       return data;
     }else{
       return data.notice.toLowerCase().search(value) != -1 
     }
    });
    setNoticeList(result);
  }

  return (
        <div className="allT"> 
            <Search placeholder="Search Notice" onSearch={onSearch} enterButton className="searchQ"/>
            <h1 className="notice_h1">News and Announcements</h1>
            <div> <center><img className="questionimg" src={viewNote1} alt="viewNotice" height ={450} width ={1350}/></center> </div>
            <Table columns={columns} dataSource={noticeList} size="middle" pagination={false} className="allQTable1" /> 
        </div>
    );  
}

export default NoticeView;