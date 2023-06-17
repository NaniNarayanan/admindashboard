import React from "react";
import Sidebar from "../components/Sidebar";
// import PeopleIcon from '@mui/icons-material/People';
// import PageHeader from '@material-ui/core';
import EnrollForm from "../../src/Enroll/EnrollForm";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core";
import EnrollStudentHistory from "../../src/Enroll/EnrollStudentHistory";
import StudentCard from "../../src/Enroll/StudentCard";
import KeyboardDoubleArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import { Link } from "react-router-dom";


export const Students = () => {
return (
	<div className="events">
		<Sidebar/>
		<div style={{display:"flex", gap:"10px", position:"absolute", marginLeft:"10px"}}>
            <Link style={{fontSize:"14px", textDecoration:"none"}} to="/home">Home<KeyboardDoubleArrowRightIcon/></Link>
            <Link style={{fontSize:"14px", textDecoration:"none"}} to="/home/student">Student Card</Link>
        </div>
		<StudentCard/>
	</div>
);
};

export const EnrollHistory = () => {
return (
	<div className="events">
		<Sidebar/>
		<div style={{display:"flex", gap:"10px", position:"absolute", marginLeft:"10px"}}>
            <Link style={{fontSize:"14px", textDecoration:"none"}} to="/home">Home<KeyboardDoubleArrowRightIcon/></Link>
            <Link style={{fontSize:"14px", textDecoration:"none"}} to="/home/student">Student Card<KeyboardDoubleArrowRightIcon/></Link>
            <Link style={{fontSize:"14px", textDecoration:"none"}} to="/home/student/history">Student Data</Link>
        </div>
		<EnrollStudentHistory/>
	</div>
);
};


const useStyle = makeStyles(theme =>({
	pageContent:{
		margin: theme.spacing(5),
		padding: theme.spacing(3)
	}
}))

export const Enroll = () => {

	const classes = useStyle();

return (
	<div className="events">
		<Sidebar/>
		<div style={{display:"flex", gap:"10px", position:"absolute", marginLeft:"10px"}}>
            <Link style={{fontSize:"14px", textDecoration:"none"}} to="/home">Home<KeyboardDoubleArrowRightIcon/></Link>
            <Link style={{fontSize:"14px", textDecoration:"none"}} to="/home/student">Student Card<KeyboardDoubleArrowRightIcon/></Link>
            <Link style={{fontSize:"14px", textDecoration:"none"}} to="/home/student/history">Student Data<KeyboardDoubleArrowRightIcon/></Link>
            <Link style={{fontSize:"14px", textDecoration:"none"}} to="/home/student/Enroll">Student Enroll<KeyboardDoubleArrowRightIcon/></Link>
        </div>
	<Paper className={classes.pageContent}>
		<EnrollForm/>
	</Paper>
	</div>
);
};
