import React from "react";
import '../../../src/pages/instructor/instructoroverview.css'
import Sidebar from "../../components/Sidebar";
import KeyboardDoubleArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import { Link } from "react-router-dom";


 const InstrcutorOverivew = () => {
    return (
        <div className="instructor">
            <Sidebar/>
        <div style={{display:"flex", gap:"10px", position:"absolute", marginLeft:"10px"}}>
            <Link style={{fontSize:"14px", textDecoration:"none"}} to="/home">Home<KeyboardDoubleArrowRightIcon/></Link>
            <Link style={{fontSize:"14px", textDecoration:"none"}} to="/home/instructors">Instructors<KeyboardDoubleArrowRightIcon/></Link>
            <Link style={{fontSize:"14px", textDecoration:"none"}} to="/home/instructors/overview">Instructors Overview</Link>
        </div>
        <div style={{marginTop:"10%"}}>
        <h1>Welcome to Service1</h1>
        </div>
        </div>
    );
};

export default InstrcutorOverivew;