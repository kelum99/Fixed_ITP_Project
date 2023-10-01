import React from "react";
import image from "../../image/enrollment5.jpg";
import image2 from "../../image/mycourse4.jpg";
import image3 from "../../image/enroll2.jpg";
import { Form, Button, DatePicker, Select, message, Row } from 'antd';
import 'antd/dist/antd.css';
import './stylesStudent.css';
import useRequest from "../../services/RequestContext";
import { useHistory } from 'react-router-dom'

function Enroll() {
    //form
    const [form] = Form.useForm();

    //on finish method
    const { request } = useRequest();

    //redirect
    let history = useHistory();

    const redirect = () => {
        history.push('/MyCourses')
    }

    const onFinish = async (values) => {
        console.log("values", values);
        try {
            const result = await request.post('student/enroll', values);
            console.log("api call enroll result ", result);
            message.success('You Enrolled Successfully to the Course !');
        }
        catch (e) {
            console.log("post enroll error ", e);
        }
        form.resetFields();
        redirect();
    };

    const onReset = () => {
        form.resetFields();
    };

    const layout = {
        labelCol: {
            span: 8,
        },
        wrapperCol: {
            span: 16,
        },
    };
    const tailLayout = {
        wrapperCol: {
            offset: 8,
            span: 16,
        },
    };

    //datepicker
    function onChange(date, dateString) {
        console.log(date, dateString);
    }

    return (
        <div className="enroll">

            <center><img src={image} ></img></center>
            <div>
                <div ><img src={image3} className="myenrollImg" /></div>

                {/*Course Details Form */}
                <div className="crsEnroll">
                    <center><h2 className="enrolllHeading">Course Details</h2></center>
                    <Form {...layout} form={form} name="courseEnroll" onFinish={onFinish}>
                        <Form.Item
                            name="subject"
                            label="Subject"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <Select placeholder="Select Subject" >
                                <Select.Option value="Software Engineering">Software Engineering</Select.Option>
                                <Select.Option value="E-Commerce">E-Commerce</Select.Option>
                                <Select.Option value="Object Oriented Programming">Object Oriented Programming</Select.Option>
                                <Select.Option value="Information Systems">Information Systems</Select.Option>
                                <Select.Option value="Computer Science">Computer Science</Select.Option>
                                <Select.Option value="Network and Security">Network and Security</Select.Option>
                            </Select>
                        </Form.Item>
                        <Form.Item
                            name="course"
                            label="Course"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <Select placeholder="Select Course">
                                <Select.Option value="Database Systems">Database Systems</Select.Option>
                                <Select.Option value="Numerical Analysis">Numerical Analysis</Select.Option>
                                <Select.Option value="Programming Languages">Programming Languages</Select.Option>
                                <Select.Option value="Java">Java</Select.Option>
                                <Select.Option value="Python">Python</Select.Option>
                                <Select.Option value="Mern Stack">Mern Stack</Select.Option>
                                <Select.Option value="Web App development">Web App development</Select.Option>
                                <Select.Option value="Operating Systems">Operating Systems</Select.Option>
                                <Select.Option value="Software Development Life Cycle">Software Development Life Cycle</Select.Option>
                            </Select>
                        </Form.Item>
                        <Form.Item
                            name="lecturer"
                            label="Lecturer"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <Select placeholder="Select Lecturer">
                                <Select.Option value="Mr.John mathew">Mr.John mathew</Select.Option>
                                <Select.Option value="Mrs. Elizabeth Linda">Mrs. Elizabeth Linda</Select.Option>
                                <Select.Option value="Prof. Gamage">Prof. Gamage</Select.Option>
                                <Select.Option value="Mr.William David">Mr.William David</Select.Option>
                                <Select.Option value="Prof.Richard">Prof.Richard</Select.Option>
                            </Select>
                        </Form.Item>
                        <Form.Item
                            name="date"
                            label="Date"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <DatePicker onChange={onChange} className="ant-input" placeholder="Select Date" />
                        </Form.Item>
                        <center><img src={image2} className="enrollImage"></img></center>
                        <Form.Item {...tailLayout}>
                            <Row>
                                <Button type="primary" htmlType="submit" >
                                    Submit
                                </Button>
                                <Button htmlType="button" onClick={onReset} className="resetBtn" >
                                    Reset
                                </Button>
                            </Row>
                        </Form.Item>
                    </Form>
                </div>

            </div>
        </div>

    );
}

export default Enroll;