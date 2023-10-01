import React from "react";
import { Form } from 'antd';
import 'antd/dist/antd.css';
import './stylesAreyou.css'
import lec from '../../Images/lec.png';
import student from '../../Images/student.png';
import { Link } from "react-router-dom";

function AreYou() {

      return (

            <>
                  <div className="main-container-areyou">

                        <div className="form-areYou">

                              <h1>How do you want to continue?</h1>
                              <br></br>

                              <div className="areYou">

                                    <Link to="/signuplec" >
                                          <img className="img1"
                                                width={350}
                                                src={lec}/> 
                                    </Link>
                                        
                                    <Link to="/signupstd" >
                                          <img className="img1"
                                                width={350}
                                                src={student}/>
                                    </Link>
                                    <span><div className="areuLec"> As Lecturer </div></span>
                                    <span><div className="areuStd"> As Student </div></span>

                              </div>

                              <Form>
                                    <br></br>
                                    <Link to="/signin" >
                                          <a className="login-form-forgot" href="">Already have an account ? </a>
                                    </Link>
                              </Form>

                        </div>
                  </div>
            </>
      );
}

export default AreYou;
