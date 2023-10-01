import React , { useState, useEffect }from "react";
import 'antd/dist/antd.css';
import { Form, Input ,Button ,Rate,message} from 'antd';
import './stylesFeedback.css';
import useRequest from "../../services/RequestContext";
import edit from "../../image/edit.jpg";
import { useParams,useHistory  } from "react-router-dom";


function EditReview(){
  //retrieve
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const { request } = useRequest();
  const { id } = useParams();

  //fetchReview
  const fetchReview = async val => {
    setLoading(true);
    try {
      const result = await request.get(`feedback/review/${val}`);

      if (result.status === 200) {
          const temp ={...result.data, };
        setData(temp);
        console.log("test ", temp);
      }

      setLoading(false);
    } catch (e) {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchReview(id);
    }
  }, [id]);

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


    //form validaations 
    const validateMessages = {
        required: 'Course Name is required!',
        String: {

          range: "${label} must be ${min} charactors",
          range: '${label} must be ${max} ',
    
        },
        
      };

      
    //redirect
    let history = useHistory();

    const redirect = () => {
      history.push('/myReview')
    }

      //on submit - console log
      const onFinish = async values => {
        try {
          const result = await request.put(`feedback/review/${data._id}`,values);
          console.log("api call review updated", result);
          window.location.reload(true);
          message.success("Review Updated Successfully !");
        } catch (e) {
          console.log("update error ", e);
        }
        redirect();

      };
      const { TextArea } = Input;
      

      return (

        <>
       
        <div className="main-container-editReview">
       
        <div>
                  <img className="box" src ={edit} height={700} width={500}/>
        </div> 


        <div className= "editRform">
            <h2 ><center>Edit Review</center></h2>
             
        <br/>
       
      
        {data && <Form {...layout} name="update-review" onFinish={onFinish} initialValues={data}     key={data._id} validateMessages={validateMessages}>
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
            label="Message"
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
            <Button className="btneditR" type="primary" htmlType="submit">
                Submit
            </Button>
            </Form.Item>
          
        </Form>}
       
        </div>
      </div>
      </>
      );
    
  

}
        
        export default EditReview;
