import React, { useState, useEffect } from "react";
import 'antd/dist/antd.css';
import { Carousel } from 'antd';
import num1 from '../../image/num1.jpg';
import num2 from '../../image/num2.jpg';
import num3 from '../../image/num3.jpg';
import num4 from '../../image/num4.jpg';
import num5 from '../../image/num5.jpg';
import num56 from '../../image/num56.jpg';
import num6 from '../../image/num6.jpg';
import coursemain from '../../image/coursemain.jpg';
import { Card} from 'antd';
import './courseStyles.css'
import { Input, Space } from 'antd';
import useRequest from "../../services/RequestContext";
import { Link } from 'react-router-dom';

function CourseMain() {


  const [data, setData] = useState([]);
  const [courseList, setCourseList] = useState([]);
  const [loading, setLoading] = useState(true);
  const { Meta } = Card;
  const { request } = useRequest();

  const fetchCourses = async () => {
    setLoading(true);
    try {
      const result = await request.get("course/coursecreate");
      if (result.status === 200) {
        setCourseList(result.data);
      }
      console.log(" course Deatils list get ", result);
      setLoading(false);
    } catch (e) {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);



  const onSelect = value => {
    if (value && value._id) {
      const courses = courseList.find(val => val._id === value._id);
      console.log("course Selected ", courses);
      setData({ ...courses });
    }
  };


  //search box
  const { Search } = Input;
  const onSearch = (value) => {
    let result = [];
    result = courseList.filter((data) => {
      if (value == "") {
        window.location.reload(true);
        return data;
      } else {
        return data.name.toLowerCase().search(value) != -1
      }
    });
    setCourseList(result);

  }



  return (
    <>
      <div >
        <div >
          <Carousel autoplay>
            <div>
              <img className="eduimg" src={num1} alt="image 1" height={500} width={1200} />
            </div>
            <div>
              <img className="eduimg" src={num2} alt="image 2" height={500} width={1200} />
            </div>
            <div>
              <img className="eduimg" src={num3} alt="image 2" height={500} width={1200} />
            </div>
            <div>
              <img className="eduimg" src={num4} alt="image 2" height={500} width={1200} />
            </div>
            <div>
              <img className="eduimg" src={num5} alt="image 2" height={500} width={1200} />
            </div>
            <div>
              <img className="eduimg" src={num6} alt="image 2" height={500} width={1200} />
            </div>
          </Carousel>
        </div>
        <div className="description"  >
          <br />
          <h2 className="cquote">Every expert was once a beginner .Start your first step  with  SKILL Lab  </h2>
        </div>

        <div  >
          <Space direction="vertical" >

            <Search
              className="course_search"
              placeholder="Search your course here "
              allowClear
              enterButton="Search SkillLab courses"
              size="large"
              onSearch={onSearch}
            />
          </Space>
        </div>
        <div >

          <div className="item-container" >
            {courseList.map(courses => (
              <div className="one-item1" key={courses._Id} onClick={() => onSelect(courses)}>
                <div className="card" id="course-car">
                  <img src={num56} className="card-img-top" alt="course" />
                  <div className="card-body" id="cardBody-course">
                    <div className="card-title" > <h4 >{courses.name}</h4> </div>
                    <div className="card-text">  <h5>{courses.category}</h5> </div>
                    <div className="card-text">  <p>{courses.description}</p> </div>
                    <div className="card-text">  <h5 >{courses.paid}</h5> </div>
                    <div className="card-text">  <h5 > ${courses.price}</h5> </div>
                    <Link to="/enroll" className="btn btn-primary" id="apply1">Enroll</Link>
                    <Link to="/review" className="btn btn-primary" id="apply1">Review</Link>
                  </div>
                </div>
              </div>

            ))}

          </div>
        </div>
      </div>
    </>

  );
}

export default CourseMain;