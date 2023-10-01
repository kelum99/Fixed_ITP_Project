import React from "react";
import { Form } from 'antd';
import 'antd/dist/antd.css';
import './stylesTerms.css'
import children from '../../Images/children.png';


function AboutUs() {

  return (

    <>
      <div className="main-container-terms">

        <Form>



          <Form.Item>
            <div className="terms-container">
              <div className="terms"><b>Terms of Service and Privacy Policy</b></div><hr></hr>

            </div>
          </Form.Item>

          <Form.Item>
            <div className="termstext-container">

              You will use the Service only for lawful purposes and agree to not use the Service in any way that will infringe upon the use or rights of any other user.<br></br>

              Your use of the Service is subject to all applicable laws and regulations, and you are solely responsible for the substance of your communications through the Service.<br></br>

              You assume full responsibility for the content of the Service offered.<br></br>

              You understand that classes posted are publicly available to be viewed and accessed by any student.<br></br>

              You will not share content from the Service with anyone who is not properly licensed to access the content.<br></br>

              You will not partake in any behavior that victimizes, harasses, degrades, or intimidates an individual or group of individuals on the basis of religion, gender, sexual orientation, race, ethnicity, age, or disability.<br></br>

              You will not impersonate any person or entity, including any of our employees or representatives.<br></br>

              SkillLab reserves the right to, but is under no obligation, to delete the listing of any class at any time and for any reason.<br></br>

              You may access class content for your information and personal use only.<br></br>

              No refunds are offered for Premium Membership fees or any other fees collected by the Service.<br></br>

              SkillLab is not responsible or liable for any refunds for Premium Membership, workshops, or other purchases on the Service.<br></br>

              We can make changes to the SkillLab Site and Services without notice or liability.<br></br>

            </div>
          </Form.Item>

        </Form>

      </div>
    </>

  );
}

export default AboutUs;
