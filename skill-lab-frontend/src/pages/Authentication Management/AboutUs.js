import React from "react";
import { Form } from 'antd';
import 'antd/dist/antd.css';
import './stylesAboutus.css'
import children from '../../Images/children.png';


function AboutUs() {

        return (

                <>
                        <div className="main-container-aboutus">

                                <Form>



                                        <Form.Item>
                                                <div className="about-container">
                                                        <div className="aboutus"><b>ABOUT US</b></div>
                                                        <hr></hr>
                                                </div>
                                        </Form.Item>

                                        <Form.Item>
                                                <div className="abouttext-container">
                                                        At SkillLab, we ’ve seen again and again how the presumably simple act of creating can be <br></br>
                                                        a force for growth, change, and discovery in people ’s lives. We want to inspire and multiply <br></br>
                                                        the kind of creative inquisition that furthers expression, learnedness and play. <br></br>
                                                        <hr></hr>
                                                        SkillLab is an online literacy community with classes for Information technology. <br></br>
                                                        On SkillLab, millions of members come together to find anguish and take the succeeding step in their creative trek.
                                                        <hr></hr>

                                                        <b>At SkilLab, We Empower:</b>

                                                        <div className="A1">
                                                                <b>Members to</b><br></br>
                                                                Get inspired.<br></br>
                                                                Learn new skills.<br></br>
                                                                Make discoveries.
                                                        </div>

                                                        <div className="A2">
                                                                <b>Teachers to</b><br></br>
                                                                Share expertise.<br></br>
                                                                Earn money.<br></br>
                                                                Give back.
                                                        </div>

                                                        <div className="A3">
                                                                <b>Employees to</b><br></br>
                                                                Be curious.<br></br>
                                                                Make an impact.<br></br>
                                                                Live a full life.
                                                        </div>


                                                </div>
                                        </Form.Item>

                                        <Form.Item>
                                                <div className="child">
                                                        <img width={1250} src={children}/>
                                                </div>
                                        </Form.Item>

                                </Form>


                        </div>
                </>

        );
}

export default AboutUs;
