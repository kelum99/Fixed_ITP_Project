import React,{useState} from "react";
import {Link} from 'react-router-dom';
import './jobManagement.css';

export default function Delete(){
  return(
    <div className="deleteCard">

 
<div className="card">

  <div className="card-body" id="cardBody">
    <h5 className="card-title">Instructor(IT)</h5>
    <p className="card-text">Candidates who have completed the BSc (Special) Honors Degree in IT (Field of specialization: Information 
Technology / Software Engineering / Interactive Media / Information Systems Engineering ) could apply.
(The GPA at the end of the 4th year should be 2.5 or higher)</p>
<p>Salary </p>
<Link to=""className="btn btn-primary" id="apply">Delete</Link>
  </div>
</div>

<div className="card-body" id="cardBody">
    <h5 className="card-title">Instructor(IT)</h5>
    <p className="card-text">Candidates who have completed the BSc (Special) Honors Degree in IT (Field of specialization: Information 
Technology / Software Engineering / Interactive Media / Information Systems Engineering ) could apply.
(The GPA at the end of the 4th year should be 2.5 or higher)</p>
<p>Salary </p>
<Link to="/application"className="btn btn-primary" id="apply">Apply</Link>
  </div>
</div>

    
  );


}