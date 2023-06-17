import React from 'react'
import Sidebar from '../components/Sidebar';
import KeyboardDoubleArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import { Link } from 'react-router-dom'

const StudentSchedule = () => {
  return (
    <div>
      <Sidebar/>
      <div style={{display:"flex", gap:"10px", position:"absolute", marginLeft:"10px"}}>
            <Link style={{fontSize:"14px", textDecoration:"none"}} to="/studentdashboard">Home<KeyboardDoubleArrowRightIcon/></Link>
            <Link style={{fontSize:"14px", textDecoration:"none"}} to="/studentdashboard/studentschedule">Schedule</Link>
      </div>
    </div>
  )
}

export default StudentSchedule