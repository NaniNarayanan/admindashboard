import React from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";
import * as RiIcons from "react-icons/ri";
import * as BsIcons from "react-icons/bs";
import * as BiIcons from "react-icons/bi";
import * as ImIcons from "react-icons/im";

export const SidebarData = [
    {
        title:"Dashboard",
        path:"/home",
        icon:<BsIcons.BsGridFill style={{color:"gray"}}/>,
    },
    {   
        title:"Add Course",
        path:"/home/courses/add",
        icon:<BiIcons.BiBookAdd style={{color:"gray"}}/>,
        iconClosed:<RiIcons.RiArrowDownFill style={{color:"gray"}}/>,
        iconOpened:<RiIcons.RiArrowUpSFill style={{color:"gray"}}/>,

    subNav:[
        {
            title:"Categories",
            path:"/home/courses/add/categories",
            icon:<IoIcons.IoIosPaper style={{color:"gray"}}/>,
        },
        {
            title:"Course List",
            path:"/home/courses/add/categories/list",
            icon:<IoIcons.IoIosPaper style={{color:"gray"}}/>
        },
    ],
    },
    {
        title:"Instructors",
        path:"/home/instructors",
        icon:<BsIcons.BsPersonFill style={{color:"gray"}}/>,
        iconClosed:<RiIcons.RiArrowDownFill style={{color:"gray"}}/>,
        iconOpened:<RiIcons.RiArrowUpSFill style={{color:"gray"}}/>,

    subNav:[
        {
            title:"Overview",
            path:"/home/instructors/overview",
            icon:<AiIcons.AiOutlineFundView style={{color:"gray"}}/>,
            cName:"sub-nav",
        },
        {
            title:"Instructor List",
            path:"/home/instructors/overview/list",
            icon:<BsIcons.BsCardList style={{color:"gray"}}/>,
            cName:"sub-nav",
        },
        {
            title:"Instructor Details",
            path:"/home/instructors/overview/list/details",
            icon:<ImIcons.ImProfile style={{color:"gray"}}/>,
        },
    ],
    },
    {
        title:"Adminprofile",
        path:"/home/adminprofile",
        icon:<BsIcons.BsPersonFillGear style={{color:"gray"}}/>,
    },
    {
        title:"Students",
        path:"/home/student",
        icon:<BsIcons.BsPeopleFill style={{color:"gray"}}/>,
        iconClosed:<RiIcons.RiArrowDropDownFill style={{color:"gray"}}/>,
        iconOpened:<RiIcons.RiArrowUpSFill style={{color:"gray"}}/>,

        subNav:[
            {
                title:"Enroll History",
                path:"/home/student/history",
                icon:<RiIcons.RiFileHistoryFill style={{color:"gray"}}/>
            },
            {
                title:"Enroll a Student",
                path:"/home/student/enroll",
                icon:<BsIcons.BsPersonFillAdd style={{color:"gray"}}/>
            },
        ],
    },
    {
        title:"Schedule",
        path:"/home/schedule",
        icon:<AiIcons.AiFillSchedule style={{color:"gray"}}/>,
    },
    {
        title:"Signup",
        path:"/home/signup/instructors",
        icon:<FaIcons.FaRegIdCard style={{color:"gray"}}/>,
        iconClosed:<RiIcons.RiArrowDropDownFill style={{color:"gray"}}/>,
        iconOpened:<RiIcons.RiArrowUpSFill style={{color:"gray"}}/>,

        subNav:[
            // {
            //     title:"For Instructors",
            //     path:"/home/signup/instructors",
            //     icon:<FaIcons.FaRegIdCard style={{color:"gray"}}/>
            // },
            {
                title:"For Students",
                path:"/home/signup/instructors/student",
                icon:<FaIcons.FaRegIdCard style={{color:"gray"}}/>
            },
        ],
    },
    {
        title:"Assesments",
        path:"/home/assesment",
        icon:<FaIcons.FaBookReader style={{color:"gray"}}/>,
    },
];