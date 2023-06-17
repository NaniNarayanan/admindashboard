import React from "react";
import Sidebar from "../components/Sidebar";
import KeyboardDoubleArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import { Link } from "react-router-dom";
// import EventSchedule from "./Schedule/EventSchedule";

const Schedule = () => {
return (
	<div className="schedule">
		<Sidebar/>
		<div style={{display:"flex", gap:"10px", position:"absolute", marginLeft:"10px"}}>
            <Link style={{fontSize:"14px", textDecoration:"none"}} to="/home">Home<KeyboardDoubleArrowRightIcon/></Link>
            <Link style={{fontSize:"14px", textDecoration:"none"}} to="/home/schedule">Schedule</Link>
        </div>
		<div style={{marginTop:"5%"}}>
			<h1>Welcome to Schedule</h1>
		</div>
		{/* <EventSchedule/> */}
	</div>
);
};

export default Schedule;
