import React from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";

import editReview from "../src/pages/Feedback Management/editReview";
import review from './pages/Feedback Management/review';
import contactUs from "./pages/Feedback Management/contactUs";
import myReview from "./pages/Feedback Management/myReview";
import reviewList from "./pages/Feedback Management/reviewList";
import issues from "./pages/Feedback Management/issues";


import AddMarks from "./pages/Student Management/AddMarks";
import Enroll from "./pages/Student Management/Enroll";
import MyCourses from "./pages/Student Management/MyCourses";
import MyPerformance from "./pages/Student Management/MyPerformance";
import UpdateEnroll from "./pages/Student Management/UpdateEnroll";
import UpdateMarks from "./pages/Student Management/UpdateMarks";
import ViewMarks from "./pages/Student Management/ViewMarks";
import ReportPerform from "./pages/Student Management/ReportPerform";

import courseMain from  "../src/pages/course/courseMain.js";
import courseCreate from "./pages/course/courseCreate";
import courseEdit from "./pages/course/courseEdit";
import courseforlecturer from  "./pages/course/courseforlecturer";
import coursesesCreatedbyLecturer from  "./pages/course/coursesesCreatedbyLecturer";
import courseContentCreate from "./pages/course/courseContentCreate";
import courseLessons from "./pages/course/courseLessons";
import viewACourseLesson from "./pages/course/viewACourseLesson";
import courseLessonEdit from "./pages/course/courseLessonEdit";
import analysis from "./pages/course/analysis";


import askQuestion from './pages/Lecturer Management/askQuestion';
import editQuestion from "./pages/Lecturer Management/editQuestion";
import noticeCreate from "./pages/Lecturer Management/noticeCreate";
import allQuestions from "./pages/Lecturer Management/allQuestions";
import allQuestionList from "./pages/Lecturer Management/allQuestionList";
import noticesAll from "./pages/Lecturer Management/noticesAll";
import noticeView from "./pages/Lecturer Management/noticeView";


import DeleteRequest from "./pages/Job Vacancy Management/DeleteRequest";
import Careere from "./pages/Job Vacancy Management/Career";
import Application from "./pages/Job Vacancy Management/Application";
import Sucsess from "./pages/Job Vacancy Management/Sucsess";
import Failed from "./pages/Job Vacancy Management/Failed";
import Print from "./pages/Job Vacancy Management/Print";
import AddJob from "./pages/Job Vacancy Management/AddJob";
import Report from "./pages/Job Vacancy Management/Report";

import UpdateAndDelete from "./pages/Job Vacancy Management/UpdateAndDelete";
import AdminBar from "./pages/Job Vacancy Management/AdminBar";
import UpdateJob from "./pages/Job Vacancy Management/UpdateJob";

import SignupLec from "../src/pages/Authentication Management/SignupLec";
import SignupStd from "../src/pages/Authentication Management/SignupStd";
import AreYou from "../src/pages/Authentication Management/AreYou";

import AuthenticationReport from "../src/pages/Authentication Management/AuthenticationReport";

import Signin from "../src/pages/Authentication Management/Signin";
//import LecProfile from "../src/pages/Authentication Management/LecProfile";

import StdProfile from "../src/pages/Authentication Management/StdProfile";
import LecManagement from "./pages/Authentication Management/LecManagement";
// import StdManagement from "./pages/Authentication Management/StdManagement";

import Home from "./pages/Authentication Management/Home";
import Home2 from "./pages/Authentication Management/Home2";
import AboutUs from "./pages/Authentication Management/AboutUs";
import Terms from "./pages/Authentication Management/Terms";

import AddItem from "../src/pages/store Management/addItem";
import DisplayItem from "../src/pages/store Management/displayItem";
import EditItem from "../src/pages/store Management/EditItem";
import viewStore from "../src/pages/store Management/viewStore";
import UserView from "../src/pages/store Management/UserView";
import AddCart from "../src/pages/store Management/AddCart";
import Cart from "../src/pages/store Management/Cart";

import Payment from "../src/pages/Finance Management/Payment";
import Withdraw from "../src/pages/Finance Management/Withdraw"
import PaymentHistory from "../src/pages/Finance Management/PaymentHistory"
import WithdrawalHistory from "../src/pages/Finance Management/WithdrawalHistory"
import UpdateWallet from "../src/pages/Finance Management/UpdateWallet"
import UpdateBankt from "../src/pages/Finance Management/UpdateBank"
import Checkout from "../src/pages/Finance Management/checkoutPayment"
import FinanceAnalysis from "../src/pages/Finance Management/FinanceAnalysis"
import PaymentSuccess from "../src/pages/Finance Management/PaymentSuccess"


function MainRouter() {
  return (

  <>


        <Route path="/home2" exact component={Home2}/>
        <Route path="/signin" exact component={Signin}/>
        <Route path="/" exact component={Home}/>

        <Route path="/aboutus" exact component={AboutUs}/>

        <Route path="/enroll" exact component={Enroll}/>
        <Route path="/MyCourses" exact component={MyCourses}/>
        <Route path="/MyPerformance" exact component={MyPerformance}/>
        <Route path="/UpdateEnroll/:id" exact component={UpdateEnroll}/>
        <Route path="/AddMarks" exact component={AddMarks} />
        <Route path="/UpdateMarks/:id" exact component={UpdateMarks} />
        <Route path="/ViewMarks" exact component={ViewMarks} />
        <Route path="/ReportPerform" exact component={ReportPerform} />

        <Route path="/courseMain" exact component={courseMain} />
        <Route path="/courseCreate" exact component={courseCreate} />
        <Route path="/courseEdit/:id" exact component={courseEdit} />
        <Route path="/courseforlecturer" exact component={courseforlecturer} />
        <Route path="/courseLessonEdit" exact component={courseLessonEdit} />
        <Route path="/coursesesCreatedbyLecturer" exact component={coursesesCreatedbyLecturer} />
        <Route path="/courseContentCreate/:id" exact component={courseContentCreate} />
        <Route path="/courseLessons/:id" exact component={courseLessons} />
        <Route path="/viewACourseLesson/:id" exact component={viewACourseLesson} />
        <Route path="/analysis" exact component={analysis} />
        
        

        <Route path="/editR" exact component={editReview}/>
        <Route path="/editR/:id" exact component={editReview}/>
        <Route path="/review" exact component={review}/>
        <Route path="/contactUs" exact component={contactUs}/>
        <Route path="/myReview" exact component={myReview} />
        <Route path="/reviewList" exact component={reviewList}/>
        <Route path="/issues" exact component={issues}/>
        
        

        <Route path="/askQ" exact component={askQuestion} />
        <Route path="/EditQ/:id" exact component={editQuestion} />
        <Route path="/createN" exact component={noticeCreate} />
        <Route path="/allQ" exact component={allQuestions} />
        <Route path="/allQL" exact component={allQuestionList} />
        <Route path="/allN" exact component={noticesAll} />
        <Route path="/viewN" exact component={noticeView} />
        

        <Route path="/careere" exact component={Careere} />
        <Route path="/deleteRequest" exact component={DeleteRequest} />
        <Route path="/application" exact component={Application} />
        <Route path="/sucsess" exact component={Sucsess} />
        <Route path="/error" exact component={Failed} />
        <Route path="/print" exact component={Print} />
        <Route path="/addcareere" exact component={AddJob} />
        <Route path="/updateDelete" exact component={UpdateAndDelete} />
        <Route path="/admin" exact component={AdminBar} />
        <Route path="/update/:id" exact component={UpdateJob} />
        <Route path="/jobreport" exact component={Report} />
       
        
        <Route path="/signuplec" exact component={SignupLec} />
        <Route path="/signupstd" exact component={SignupStd} />
        {/* <Route path="/signin" exact component={Signin} /> */}
        <Route path="/" exact component={Signin}/>
        <Route path="/areyou" exact component={AreYou} />
        {/* <Route path="/lecprofile" exact component={LecProfile} /> */}
        <Route path="/stdprofile" exact component={StdProfile} />
        <Route path="/lecmanagement" exact component={LecManagement} />
        <Route path="/authenticationreport" exact component={AuthenticationReport} />
        {/* <Route path="/stdmanagement" exact component={StdManagement} /> */}
        <Route path="/terms" exact component={Terms} />

      
        <Route path="/AddItem" exact component={AddItem} />
        <Route path="/DisplayItem" exact component={DisplayItem}/>
        <Route path="/EditItem/:id" exact component={EditItem} />
        <Route path="/viewStore" exact component={viewStore}/>
        <Route path="/UserView" exact component={UserView}/>
        <Route path="/AddCart/:id" exact component={AddCart}/>
        <Route path="/Cart" exact component={Cart}/>

        <Route path="/payment" exact component={Payment} />
        <Route path="/withdraw" exact component={Withdraw} />
        <Route path="/paymentHistory" exact component={PaymentHistory} />
        <Route path="/withdrawHistory" exact component={WithdrawalHistory} />
        <Route path="/updateWallet" exact component={UpdateWallet} />
        <Route path="/updateBank" exact component={UpdateBankt} />
        <Route path="/checkout/:id" exact component={Checkout} />
        <Route path="/financeanalysis" exact component={ FinanceAnalysis } />
        <Route path="/paymentsuccess" exact component={ PaymentSuccess } />
    </>
  );
}
export default MainRouter;
