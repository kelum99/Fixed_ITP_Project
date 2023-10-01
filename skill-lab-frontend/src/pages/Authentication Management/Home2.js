import React from "react";
import { Form, Button } from "antd";
import "antd/dist/antd.css";
import "./stylesHome.css";
import home from "../../Images/home.png";
import { useHistory} from 'react-router-dom';
import useRequest from '../../services/RequestContext';
import useUser from '../../services/UserContext';

function Home2() {
  const { updateToken } = useRequest();
  const {setUser} = useUser();
  const history = useHistory();
  
  const logout = async() => {
         await updateToken();
         setUser({});
         history.push('/signin')
         window.location.reload();
  };
  
  return (
    <>
      <div className="main-container-home">
        <Form>
          <Form.Item>
          
              <Button type="primary" htmlType="submit" className="btnLogout" onClick={logout}>
                LOGOUT
              </Button>
            
          </Form.Item>

          <Form.Item>
            <div className="heading-container">
              <div className="h1">WE OFFER YOU</div>
              <div className="h2">A BETTER</div>
              <div className="h3">FUTURE !</div>
            </div>
          </Form.Item>

          <Form.Item>
            <div className="text-container2">
              At SkillLab, we ’ve seen again and again how the presumably simple
              act of creating can be<br></br>a force for growth, change, and
              discovery in people ’s lives. We want to inspire and multiply
              <br></br>
              the kind of creative inquisition that furthers expression,
              learnedness and play.<br></br>
            </div>
          </Form.Item>

          <Form.Item>
            <div className="hme">
              <img width={600} src={home} />
            </div>
          </Form.Item>
        </Form>
      </div>
    </>
  );
}

export default Home2;
