import React from 'react';
import 'antd/dist/antd.css';
import lecCourseMain from '../../image/lecCourseMain.jpg';
import { useHistory } from 'react-router-dom';
import './courseStyles.css';


function Courseforlecturer() {

    const history = useHistory();



    return (
    <div classname="myCrs">
        <button className="c_button1" onClick={() => history.push('./courseCreate')}>Create a new course </button>
        <button className="c_button1" onClick={() => history.push('./coursesesCreatedbyLecturer')}  >View my  created courses  </button>
        <img className="lecimg" src={lecCourseMain} alt="image 2" />
    </div>

    );
};

export default Courseforlecturer;



