import { useState } from "react";
import 'antd/dist/antd.css';
import { Select, Button } from "antd";
import './courseStyles.css';
import create_course from '../../image/create_course.jpg';
import useRequest from "../../services/RequestContext";
import { useHistory } from "react-router-dom";



const CourseCreate = () => {


  // initial state values 
  const [values, setValues] = useState({
    name: "",
    description: "",
    price: "0.00",
    paid: false,
    loading: false,
    category: '',
    

  });
  //destructure
  const { Option } = Select; 
  const {request} = useRequest();
  
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });

  };


// redirect
  let history = useHistory();

  const redirect = () => {
    history.push('/coursesesCreatedbyLecturer')
  }


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // console.log(values);
      alert("Congratulations!!  you have created a new ");                
      const { data } = await request.post("course/coursecreate", {
        ...values,
      });
      
    } catch (err) {
      alert(err.response.data);
    }
    redirect();
  };

  //price dropdown selection array
  const priceArray = [];
  for (let i = 9.99; i <= 100.99; i++) {
    priceArray.push(<Option key={i.toFixed(2)}>${i.toFixed(2)}</Option>);
  }



  const courseCreateForm = () => (
    <form onSubmit={handleSubmit}>
      <div>
        <div>
          <input className="course_select"
            type="text"
            name="name"
            placeholder="Name of the course "
            value={values.name}
            required
            onChange={handleChange}
          />
        </div>

        <div >
          <textarea className="course_select"
            name="description"
            placeholder="Course Description"
            cols="7"
            rows="7"
            required
            value={values.description}
            onChange={handleChange}
          ></textarea>
        </div>

        <div >

          <div  >
            <Select  className="course_select"

              value={values.paid}
              onChange={(v) => setValues({ ...values, paid: v })}
            >
              <Option value={true}>Paid</Option>
              <Option value={false}>Free</Option>
            </Select>
          </div>

          {values.paid && (
            <div className="course_select">
              <b> Select the course price :</b>
              <Select className="course_select"
                defaultValue="$0.00"
                style={{ widht: "100%" }}
                onChange={(v) => setValues({ ...values, price: v })}
                tokenSeparators={[,]}
                size="large"
              >
                {priceArray}
              </Select>
            </div>
          )}
        </div>


        <div>
          <input className="course_select"
            type="text"
            name="category"
            placeholder="Course category"
            required
            value={values.category}
            onChange={handleChange}
          />
        </div>
        <br /><br />
        <div  >
          <Button className="btncourse"
            onClick={handleSubmit}
            loading={values.loading}
            type="primary"
            size="large"
            shape="round"
          >
            {values.loading ? "Saving..." : "Save & Continue"}
          </Button>
        </div>
      </div>

    </form>
  );

  



  return (
    <div >

      <h1 className="course_h1" >Create  Courses</h1>
      <img src={create_course} alt="image 1" className="create_course_image" />
      <div className="course_form"> {courseCreateForm()} </div>



    </div>
  );
};

export default CourseCreate;
