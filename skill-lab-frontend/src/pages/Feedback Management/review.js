import React from "react";
import 'antd/dist/antd.css';
import { Rate,Progress,Space,Input,Form,Button,Comment,  List,message} from  'antd';
import avatar  from '../../image/avatar.jpg'
import './stylesFeedback.css'
import useRequest from "../../services/RequestContext";
import { useHistory } from "react-router-dom";


function Review() {

  //alert msg
  const success = () => {
    
 };  
  
  const layout = {
        labelCol: {
          span: 8,
        },
        wrapperCol: {
          span: 14,
        },
      };
  
  
    //Form Vilidation 
    const validateMessages = {
      required:  '${label} is required! ',
      String: {
        range: "${label} must be ${min} charactors",
        range: '${label} must be ${max} ',
      },
       };


    const {request} = useRequest();

    //redirect
    let history = useHistory();

    const redirect = () => {
      history.push('/myReview')
    }
    
    //on submit - console log
   const onFinish =  async values => {
   console.log("value",values);
   try{
     const result = await request.post('feedback/review', values);
     console.log("api call reviews ", result);
     message.success('Thanks for your comment !!');
   } catch(e){
    console.log("post review details error ",e);
}
redirect();

 };


       
     
 


    const { TextArea } = Input;


  
    
    return (

    <>
    <div className="main-container-Review">
    <div className= "review">

        <div>
            <br/>
            
            <h1>Reviews</h1>
            </div>
            <br/>
           
 
            
        <br/><br/>
        
    
    <>

    <div className="addR"> 
    
    <Form {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages} size={"large"} text-size={"18px"}>
          <Form.Item
            name={[ 'stid']}
            label="Student ID"
            rules={[
              {
                required: true,

                type:'string',max:10,

              },
            ]}
            
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={[ 'fname']}
            label="Name"
            rules={[
              {
                required: true,

                type:'string',min: 5,

              },
            ]}
            
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={[ 'course']}
            label="Course"
            rules={[
              {
                required: true,

                type:'string',max: 50,

              },
            ]}
            
          >
            <Input />
          </Form.Item>

            <Form.Item
            name={['rate']}
            label="Rate"
            rules={[
              {
                required: true,
              },
            ]}
            
          >
            <Rate />
            </Form.Item>
            
                  
          <Form.Item
            name={[ 'comment']}
            label="Comment"
            rules={[
              {
                required: true,
                type:'string',max: 500,
              },
            ]}
            
          >
            <TextArea rows={4} />
            
          </Form.Item>

          <Form.Item shouldUpdate wrapperCol={{ ...layout.wrapperCol, offset:10 }}>
            <Button className="btneditR" type="primary" onClick={success} htmlType="submit">
                Add Comment
            </Button>
            </Form.Item>
    </Form>
    </div>
    </>
    <> 
    <div>
      
    {/* <List className="comntL"

    className="comment-list"
    item-Space="20px"
    itemLayout="horizontal"
    dataSource={data}
    renderItem={item => (
      <li>
        <Comment
          
          author={item.author}
          content={item.content}
          avatar={<img  src ={avatar} height={100} width={100}></img>}
          rate={ item.rate}
        
          
        />
      </li>
    )}
  />,
   */}
    </div>
    </>
        
        
      
    </div>
    
    </div>
    </>
  
);

};

export default Review;
