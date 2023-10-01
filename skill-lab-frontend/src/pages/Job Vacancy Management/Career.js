import React,{useState,useEffect} from "react";
import axios from "axios";
import job from '../../image/girl.jpg';
import mailalert from '../../image/m1.jpg'
import pay from '../../image/p1.jpg'
import quick from '../../image/q1.jpg'
import {Link} from 'react-router-dom';
import './jobManagement.css';
import useRequest from "../../services/RequestContext";
import {Input} from 'antd';


export default function Careere(){


const [data, setData] = useState([]);
const [careerList, setCareerList] = useState([]);
const [loading, setLoading] = useState(true);


//retrieve
const fetchCareers = async () => {
  setLoading(true);
  try {
    const result = await request.get("job/careereview");
    if (result.status === 200) {
      setCareerList(result.data);
    }
    console.log(" career Deatils list get ", result);
    setLoading(false);
  } catch (e) {
    setLoading(false);
  }
};

useEffect(() => {
  fetchCareers();
}, []);


const onSelect = value => {
  if (value && value._id) {
    const career = careerList.find(val => val._id === value._id);
    console.log("careere Selected ", career);
    setData({ ...career });
  }
};

const {request} = useRequest();


//Search method
const { Search } = Input;

    const onSearch =  (value) => {
        let result = [];
        result = careerList.filter((data) =>{
            
            if(value == ""){
                window.location.reload(true);
                return data;
                
            }else{
            return data.title.toLowerCase().search(value) != -1 || data.title.toUpperCase().search(value) != -1 || data.salary.toLowerCase().search(value) != -1 || data.description.toLowerCase().search(value) != -1        
            }
        });
        setCareerList(result);
      };
     

    return(


<>

<div className="searchPosition">
<form className="example"  action="">
<Search placeholder="Search Course" onSearch={onSearch} enterButton className="searchcareere" />
</form>
</div>

  <div className="row">
    <div className="col-sm">
      <h2 className="card-title " id="vacancyHead">CAREERS AT SKILL-LAB</h2>
    <img src={job} className="img-fluid" alt="Looking for job?"/>

    
   <div className="vacancies">
  <h4 className="text-secondary">Available Vacancies</h4>
 
 <ul className="ulList" type="none">
 {careerList.map(career => (
   <Link to="/application">
 <li key={career._Id} className="available-vacancies" name="vacancies"><i className="far fa-hand-point-right" id="iconHand"> </i>   {career.title}</li>
  </Link>
       ))}
     </ul>
    </div>


  </div>

    
    <div className="col-sm" id="jobCards">

    <div className="">
  

  {careerList.map(career => (
     <div key={career._Id} onClick={() => onSelect(career)}>
       <div className="card">
<div className="card-body" id="cardBody">
   <div className="card-title"> <h5> {career.title}</h5> </div>
   <div className="card-text">  <p> {career.description}</p> </div>
   <div className="card-text">  <p>Basic salary.  USD {career.salary}$</p></div>
   <Link to="/application"className="btn btn-primary" id="apply-btn">Apply</Link>
     </div>
     </div>
     </div>
  ))}


  </div>

    </div>
  



</div>

<div className="row" id="details">
  
  <div className="services" id="detail1">
  <div className="head"> <img src={pay} className="img-fluid" alt="Responsive image"/></div>
  <div className="card-body">
    <h5 className="card-title">Salary & payments</h5>
    <p className="card-text">See how your salary compares to others with the same job title in your area. Not only can you compare your salary, but you can also see what skills you are missing to earn more money</p>
  </div>
</div>

<div className="services" id="detail2">
  <div className="head"><img src={quick} className="img-fluid" alt="Responsive image"/></div>
  <div className="card-body">
    <h5 className="card-title">Quick Apply</h5>
    <p className="card-text">Easily apply to multiple jobs with one click! Quick Apply shows you recommended 
    jobs based off your most recent search and allows you to apply to jobs in a matter 
    of seconds!</p>
  </div>
</div>

<div className="services" id="detail3">
  <div className="head"><img src={mailalert} className="img-fluid" alt="Responsive image"/></div>
  <div className="card-body">
    <h5 className="card-title">Job Alert Emails</h5>
    <p className="card-text">Keep track of positions that you're interested in by signing up for job alert emails. You'll be notifed 
    via email when new jobs are posted in that search.</p>
  </div>
</div>

</div>
</>


        



    )

}
