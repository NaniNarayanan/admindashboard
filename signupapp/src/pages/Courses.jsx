import React from "react";
// import "bootstrap-icons/font/bootstrap-icons.css";
// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/dist/js/bootstrap.bundle.min';
import './courses.css'
import Sidebar from "../../src/components/Sidebar";
import KeyboardDoubleArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import { Link } from "react-router-dom";
// import Button from 'react-bootstrap/Button';
// import 'reactjs-popup/dist/index.css';


 const Courses = () =>{
    return(
        <div className="courses">
            <Sidebar/>
            <div style={{display:"flex", gap:"10px", position:"absolute", marginLeft:"10px"}}>
            <Link style={{fontSize:"14px", textDecoration:"none"}} to="/home">Home<KeyboardDoubleArrowRightIcon/></Link>
            <Link style={{fontSize:"14px", textDecoration:"none"}} to="/home/courses">Course</Link>
            </div>
            <div style={{marginTop:"10%"}}>
                <h1>Welcome to Courses</h1>
            </div>
            
        </div>
    );
};

export default Courses;


