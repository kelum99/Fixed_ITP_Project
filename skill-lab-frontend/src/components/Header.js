import React from "react";
import "./StylesHeader.css";
import SliderLecturer from "./SliderLecturer";
import SliderStudent from "./SliderStudent";
import AdminSlider from "./SliderAdmin";
import logo from "../Images/logo.png";
import { Link } from "react-router-dom";
import useUser from "../services/UserContext";

function Header() {
  const { user } = useUser();
  console.log("User", user);

  if (user == undefined) {
    return (
      <>
        <div className="conatiner">
          <div className="header">
            <img src={logo} alt="logo" className="logo" />

            <ul className="pages">
              <Link to="/">
                <li>Home</li>
              </Link>
              <Link to="/aboutus">
                <li>About</li>
              </Link>
              <Link to="/courseMain">
                <li>Courses</li>
              </Link>
              <Link to="/UserView">
                <li>Store</li>
              </Link>
              <Link to="/careere">
                <li>Career</li>
              </Link>
              <Link to="/contactUs">
                <li>Contact Us</li>
              </Link>
            </ul>
          </div>
        </div>
      </>
    );
  } else if (user.role == "Student") {
    return (
      <>
        <div className="conatiner">
          <div className="header">
            <SliderStudent />
            <img src={logo} alt="logo" className="logo" />

            <ul className="pages">
              <Link to="/home2">
                <li>Home</li>
              </Link>
              <Link to="/aboutus">
                <li>About</li>
              </Link>
              <Link to="/courseMain">
                <li>Courses</li>
              </Link>
              <Link to="/UserView">
                <li>Store</li>
              </Link>
              <Link to="/careere">
                <li>Career</li>
              </Link>
              <Link to="/contactUs">
                <li>Contact Us</li>
              </Link>
            </ul>
          </div>
        </div>
      </>
    );
  } else if (user.role == "Lecturer") {
    return (
      <>
        <div className="conatiner">
          <div className="header">
            <SliderLecturer />
            <img src={logo} alt="logo" className="logo" />

            <ul className="pages">
              <Link to="/home2">
                <li>Home</li>
              </Link>
              <Link to="/aboutus">
                <li>About</li>
              </Link>
              <Link to="/courseMain">
                <li>Courses</li>
              </Link>
              <Link to="/UserView">
                <li>Store</li>
              </Link>
              <Link to="/careere">
                <li>Career</li>
              </Link>
              <Link to="/contactUs">
                <li>Contact Us</li>
              </Link>
            </ul>
          </div>
        </div>
      </>
    );
  } else if(user.role = "Admin"){
    return (
      <>
        <div className="conatiner">
          <div className="header">
            <AdminSlider />
            <img src={logo} alt="logo" className="logo" />

            <ul className="pages">
              <Link to="/home2">
                <li>Home</li>
              </Link>
              <Link to="/aboutus">
                <li>About</li>
              </Link>
              <Link to="/courseMain">
                <li>Courses</li>
              </Link>
              <Link to="/UserView">
                <li>Store</li>
              </Link>
              <Link to="/careere">
                <li>Career</li>
              </Link>
              <Link to="/contactUs">
                <li>Contact Us</li>
              </Link>
            </ul>
          </div>
        </div>
      </>
    );
  }
  else{
    
  }
}
export default Header;
