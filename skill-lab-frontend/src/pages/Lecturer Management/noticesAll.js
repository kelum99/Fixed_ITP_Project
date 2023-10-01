import React,{useState,useEffect} from "react";
import './stylesLecturer.css';
import 'antd/dist/antd.css';
import { Table, Button,message,Popconfirm } from 'antd';
import {DeleteOutlined,PlusCircleOutlined} from '@ant-design/icons';
import useRequest from "../../services/RequestContext";
import { useHistory } from 'react-router-dom';

function NoticesAll() {

  //navigate to page 
  const history = useHistory();

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

 //delete method
 const onDelete = async value => {
  try {
    const result = await request.delete(`lecturer/notice/${value._id}`);
    if (result.status === 200) {
      await fetchNotice();
      setData(undefined);
    }
    console.log("api call notice deleted", result);
  } catch (e) {
    console.log("delete notice error", e);
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
      title: 'Date',
      dataIndex: 'date',
      key:'date'
    },
    {
      title: 'Notice',
      dataIndex: 'notice',
      key:'notice'
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

    return (
        
        <div className="allT">
            
            <h1 className="notice_h1">All news and <br></br> announcements</h1>
            <div> <Button type="primary" icon={<PlusCircleOutlined />} className="btnAllN"onClick={() => history.push('./createN')}>Add Notice</Button></div>
            <Table columns={columns} dataSource={noticeList} size="middle" pagination={false} className="allQTable3" />
            

        </div>
    
    );
}

export default NoticesAll;