import React from "react";
// import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as MdIcons from "react-icons/md";
// import * as RiIcons from "react-icons/ri";
import * as BsIcons from "react-icons/bs";
import * as BiIcons from "react-icons/bi";
import * as TfiIcons from "react-icons/tfi";

export const SidebarStudentData = [
    {
        title:"Dashboard",
        path:"/studentdashboard",
        icon:<BsIcons.BsGridFill style={{color:"gray"}}/>,
    },
    {
        title:"My Course",
        path:"/studentdashboard/studentmycourses/:id/:coursename",
        icon:<BiIcons.BiBook style={{color:"gray"}}/>,
        
    },
    {
        title:"Assignment",
        path:"/studentdashboard/studentmycourses/studentassignment/:courseid/:coursename/:moduleid/:modulename",
        icon:<MdIcons.MdAssignment style={{color:"gray"}}/>,
    },
    {
        title:"Test",
        path:"/studentdashboard/studentmycourses/studentassignment/studenttest/:moduleid/:courseid/:coursename/:modulename",
        icon:<TfiIcons.TfiWrite style={{color:"gray"}}/>,
        
    },
    {
        title:"Practice",
        path:"/studentdashboard/studentmycourses/studentassignment/studentpractice/:subtopicid/:courseid/:coursename/:moduleid/:modulename/:subtopicname",
        icon:<BsIcons.BsFileCodeFill style={{color:"gray"}}/>,
    },
    {
        title:"Schedule",
        path:"/studentdashboard/studentschedule",
        icon:<AiIcons.AiFillSchedule style={{color:"gray"}}/>,
    },
    {
        title:"My Profile",
        path:"/studentdashboard/studentprofile",
        icon:<BsIcons.BsFillPersonLinesFill style={{color:"gray"}}/>,
    },
];