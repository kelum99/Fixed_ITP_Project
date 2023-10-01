
import React,{useState} from "react";
import axios from "axios";
import im from '../../image/jb.jpeg';
import './jobManagement.css';
import { Form, Input, InputNumber, Button, message} from "antd";
import moment from "moment";

export default function JobApply(){

  const [position,setPosition] = useState("");
  const [firstName,setFirstName] = useState("");
  const [lastName,setLastName] = useState("");
  const [address,setAddress] = useState("");
  const [email,setEmail] = useState("");
  const [phone,setPhone] = useState("");
  const [nic,setNic] = useState("");
  const [birthDate,setBirthDate] = useState("");
  const [status,setStatus] = useState("");

  function sendData(e){
    e.preventDefault();

    const newJob = {
      position,
      firstName,
      lastName,
      address,
      email,
      phone,
      nic,
      birthDate,
      status

    }
console.log(newJob)

    axios.post("http://localhost:4000/api/job/apply",newJob).then(()=>{

        message.success("Application submit Sucsessfully");
        window.location.reload(true);
        

    }).catch((error)=>{
      message.error("Submission Failed");
      
    })
  }

    return(
<div class="">
  <div class="row">
    <div class="col">
    <div className="positionIMG">
    <h1 className="application-header">Start your career with us</h1>
<img src={im} className="applyimage" alt="apply"/>

<div className="notice-In-Application">
  <h6>NOTICE !</h6>
  <p>Please be alert with your email we will sent you some special notices and documents to your email.</p>
  <span>- SKILL-LAB Management -</span>
</div>

  </div>
</div>


    <div class="col">
    <div className="formPosition" id="formPosition">
<form onSubmit={sendData}>

<div class="form-group" > 
    <label for="position">Position</label>
    <input type="text" class="form-control" name="position" id="position" required placeholder="eg:-(Intern Ship, Instructor)"
    
    onChange={(e)=>{

      setPosition(e.target.value);
    }}
    />
</div>

  <div class="form-row">
    <div class="form-group col-md-6">
      <label for="firstName">First Name </label>
      <input type="text" class="form-control" name="firstName" id="firstName" required  placeholder="Required"
        onChange={(e)=>{

          setFirstName(e.target.value);
        }}
      
      />

    </div>

    <div class="form-group col-md-6">
      <label for="lastName">Last Name </label>
      <input type="text" class="form-control" name="lastName" id="lastName" required  placeholder="Required"
      
      onChange={(e)=>{

        setLastName(e.target.value);
      }}
      
      />
    </div>
  </div>

  <div class="form-row">
    <div class="form-group col-md-6">
      <label for="email">E-mail</label>
      <input type="text" class="form-control" name=" email" id="email" required  placeholder="Required" type="email"
      
      onChange={(e)=>{

        setEmail(e.target.value);
      }}
      />
    </div>
 
    <div class="form-group col-md-6">
      <label for="phone">Phone</label>
      <input type="text" class="form-control" name="phone" id="phone" required   placeholder="Required" 
      
      onChange={(e)=>{

        setPhone(e.target.value);
      }}
      />
    </div>
  </div>



  


  <div class="form-group">
    <label for="address">Address</label>
    <input type="text" class="form-control" name="address" id="address" required placeholder="Required"
    
    onChange={(e)=>{

      setAddress(e.target.value);
    }}
    />
  </div>


  <div class="form-row">
    <div class="form-group col-md-6">
      <label for="nic">NIC</label>
      <input type="text" class="form-control" name="nic" id="nic"  required placeholder="Required"
      
      onChange={(e)=>{

        setNic(e.target.value);
      }}
      />


    </div>
    <div class="form-group col-md-6">
      <label for="birthDate">Birth Date</label>
      <input type="date" class="form-control" name="birthDate" id="birthDate"  required placeholder="Required"
      
      onChange={(e)=>{

        setBirthDate(e.target.value);
      }}
      
      />
    </div>
  </div>

  <div class="form-group">
    <label for="status">Employment Status</label>
    <input type="text" class="form-control" name="status" id="status" required placeholder="eg:-(Student, Self Employed, Unemployed)"
    
    onChange={(e)=>{

      setStatus(e.target.value);
    }}
    />
  


  </div>
  <button type="submit" class="btn btn-primary" id="apply-form" data-toggle="modal" data-target="#exampleModal">Register Now</button>

  
</form>

</div>
        
    </div>
   
  </div>
</div>



    )

}

