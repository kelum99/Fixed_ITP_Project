import React from 'react'
import * as FaIcons from 'react-icons/fa';
import * as IoIcons from 'react-icons/io';
import * as AiIcons from 'react-icons/ai'

export const SidebarItemsLecturer = [
    {
        title: "My Profile",
        path: "/stdprofile",
        icon: <FaIcons.FaUserCircle />,
        className: "nav-text"
    },
    {
        title: "My Courses",
        path: "/courseforlecturer",
        icon: <FaIcons.FaBook />,
        className: "nav-text"
    },
    {
        title: "Q & A",
        path: "/allQL",
        icon: <FaIcons.FaEdit />,
        className: "nav-text"
    },
    {
        title: "Notices",
        path: "/allN",
        icon: <IoIcons.IoMdNotifications />,
        className: "nav-text"
    },
    {
        title: "Performance",
        path: "/ViewMarks",
        icon: <FaIcons.FaArrowCircleUp />,
        className: "nav-text"
    },
    {
        title: "Analysis",
        path: "/analysis",
        icon: <FaIcons.FaChartLine />,
        className: "nav-text"
    },
    {
        title: "Reviews",
        path: "/reviewList",
        icon: <FaIcons.FaStarHalfAlt />,
        className: "nav-text"
    },
    {
        title: "My Products",
        path: "/DisplayItem",
        icon: <FaIcons.FaListAlt />,
        className: "nav-text"
    },
    {
        title: "Withdraw Methods",
        path: "/updateBank",
        icon: <AiIcons.AiFillBank />,
        className: "nav-text"
    },  
    {
        title: "Withdraw History",
        path: "/withdrawHistory",
        icon: <FaIcons.FaMoneyCheckAlt />,
        className: "nav-text"
    }
    
];

export const SidebarItemsStudent = [
    {
        title: "My Profile",
        path: "/stdprofile",
        icon: <FaIcons.FaUserCircle />,
        className: "nav-text"
    },
    {
        title: "My Courses",
        path: "/MyCourses",
        icon: <FaIcons.FaBook />,
        className: "nav-text"
    },
    {
        title: "Q & A",
        path: "/allQ",
        icon: <FaIcons.FaEdit />,
        className: "nav-text"
    },
    {
        title: "Performance",
        path: "/MyPerformance",
        icon: <FaIcons.FaArrowCircleUp />,
        className: "nav-text"
    },
    {
        title: "Notices",
        path: "/viewN",
        icon: <IoIcons.IoMdNotifications />,
        className: "nav-text"
    },
    {
        title: "Reviews",
        path: "/myReview",
        icon: <FaIcons.FaStarHalfAlt />,
        className: "nav-text"
    },
    {
        title: "Wallet",
        path: "/updateWallet",
        icon: <FaIcons.FaCreditCard />,
        className: "nav-text"
    },
    {
        title: "Payment History",
        path: "/paymentHistory",
        icon: <FaIcons.FaMoneyCheckAlt />,
        className: "nav-text"
    }
    
];

export const SidebarItemsAdmin = [
    {
        title: "Job Vacancy Management",
        className: "nav-text2",
        path:"#"
    },
    {
        title: "Add a new vacancy",
        path: "/addcareere",
        icon: <FaIcons.FaArrowAltCircleRight />,
        className: "nav-text"
    },
    {
        title: "Update & Delete vacancy",
        path: "/updatedelete",
        icon: <FaIcons.FaArrowAltCircleRight />,
        className: "nav-text"
    },
    {
        title: "Delete Career Requests",
        path: "/deleteRequest",
        icon: <FaIcons.FaArrowAltCircleRight />,
        className: "nav-text"
    },
    {
        title: "Genarate Report",
        path: "/jobreport",
        icon: <FaIcons.FaArrowAltCircleRight />,
        className: "nav-text"
    },
    {
        title: "Authentication Management",
        path: "/lecmanagement",
        className: "nav-text2"
    },

    {
        title: "Finance Management",
        path: "/financeanalysis",
        className: "nav-text2"
    },

    {
        title: "Feedback Management",
        path: "/issues",
        className: "nav-text2"
    },
    {
        title: "Store Management",
        path: "/viewStore",
        className: "nav-text2"
    }
];



