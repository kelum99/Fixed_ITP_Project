import React from "react";
import { Form, Button } from 'antd';
import 'antd/dist/antd.css';
import './stylesHome.css'
import home from '../../Images/home.png';
import { Link } from "react-router-dom";

function Home() {

return (

<>
      <div className="main-container-home">

<Form>

    <Form.Item > 
    
        <Link to ="/signin" >
            <Button type="primary" htmlType="submit" className="btnSignin">
            SIGNIN
            </Button></Link>
        <Link to ="/areYou" >        
            <Button type="primary" htmlType="submit" className="btnReg">
            REGISTER
            </Button></Link>
        
    </Form.Item>

    <Form.Item>
            <div className="heading-container2">
            <div className="h1">WE OFFER YOU</div>
            <div className="h2">A BETTER</div>
            <div className="h3">FUTURE !</div>
            </div>              
    </Form.Item>

    <Form.Item>
            <div className="text-container">
            <div className="txt1">Skill Lab was established with the aim of giving a</div>
            <div className="txt2">new aspect to online learning. Within such a</div>
            <div className="txt3">short span of a time we've been able to acquire a</div>
            <div className="txt4">huge user satisfaction and reputation</div>
            </div>              
    </Form.Item>

    <Form.Item>
            <Link to="/areyou">
            <Button type="primary" htmlType="submit" className="btn1" >
            JOIN WITH US
            </Button>
            </Link>
    </Form.Item>

    <Form.Item>
            <div className="hme">
            <img width={600} src={home}/>
            </div>
    </Form.Item>

</Form>
        
  
    </div>
    </>
      
  );
}

export default Home;
