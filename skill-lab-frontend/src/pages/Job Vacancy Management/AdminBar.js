import React,{useState} from "react";

import  admin from '../../image/admin.png'
import './New.css';



import {Link} from 'react-router-dom';

export default function Slide(){


return(
<>
<div className="">
  <div className="row">
    
    <div className="col-4">
    <h3 className="adminHeader">SKILL LAB</h3>

    <div className="img-topic-admin">
       <img src={admin} className="adminavatar" alt="Looking for job?"/>
       <h6 className="AdminTopic">Admin</h6>
    </div>
       <div className="Link-Container">
         <h5 className="Adminh">Job Vacancy Management</h5>
         <ul className="Adminul">
          <a href="#"> <li>Add a new vacancy</li></a>
          <a href="#"> <li>Update vacancy</li></a>
          <a href="#"> <li>Delete a vacancy</li></a>
          <a href="#"> <li>Delete Careere Requests</li></a>
         </ul>

       
       </div>
    <button className="Admin-sider-Button">Logout</button>
    </div>

    <div className="col">


        Content


    </div>

      </div>
  </div>

</>

);


}













