import React from 'react'
import * as FaIcons from 'react-icons/fa';
import * as IoIcons from 'react-icons/io';
import * as AiIcons from 'react-icons/ai'

export const SidebarItemsAdmin = [
    {
        title: "Job Vacancy Management",
        className: "nav-text"
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
        icon: <IoIcons.FaArrowAltCircleRight />,
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
        className: "nav-text"
    },

    {
        title: "Finance Management",
        path: "",
        className: "nav-text"
    },

    {
        title: "Feedback Management",
        path: "",
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


