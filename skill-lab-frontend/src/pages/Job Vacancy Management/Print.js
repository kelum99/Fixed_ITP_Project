import React,{useState} from "react";
import axios from "axios";
import {Link} from 'react-router-dom';
import logo from '../../image/logo11.png'
import './jobManagement.css';

function Print(){
    return(

 <div className="tableDiv">
 <img src={logo} className="logo" alt="Looking for job?"/>
<table class="table table-borderless" id="printtable" border="0">
  <tr>
      <td>Position</td>
      <td>Rusiru</td>
  </tr>

  <tr>
      <td>Position</td>
      <td>Rusiru dsfgsdfghsfdgh</td>
  </tr>

  <tr>
      <td>Position</td>
      <td>Rusiru</td>
  </tr>

  <tr>
      <td>Position</td>
      <td>Rusiru</td>
  </tr>

  <tr>
      <td>Position</td>
      <td>Rusiru</td>
  </tr>

  <tr>
      <td>Position</td>
      <td>Rusiru</td>
  </tr>

  <tr>
      <td>Position</td>
      <td>Rusiru</td>
  </tr>

  <tr>
      <td>Position</td>
      <td>Rusiru</td>
  </tr>

</table>

        </div>
 
    );
}
export default Print;