import React from 'react'
import Home from '../Codepen/Home'
import DataProvider from '../Context/DataProvider'
import Sidebar from '../components/Sidebar';
import KeyboardDoubleArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import { Link, useLocation, useNavigate } from 'react-router-dom'

const StudentPractice = () => {

  const navigate = useNavigate()
  const location = useLocation()
  const courseid =   location.pathname.split('/')[6]
  const coursename =   location.pathname.split('/')[7]
  const moduleid =   location.pathname.split('/')[8]
  const modulename =   location.pathname.split('/')[9]
  const subtopicid =   location.pathname.split('/')[5]
  const subtopicname =   location.pathname.split('/')[10]

  const course = coursename.replaceAll('%20',' ')
  const module = modulename.replaceAll('%20',' ')
  const topic = subtopicname.replaceAll('%20',' ')

  return (
    <div>
      <Sidebar/>
    <div style={{display:"flex", gap:"10px", position:"absolute", marginLeft:"10px"}}>
    <Link style={{fontSize:"14px", textDecoration:"none"}} to="/studentdashboard">Home<KeyboardDoubleArrowRightIcon/></Link>
    <Link style={{fontSize:"14px", textDecoration:"none"}} to={`/studentdashboard/studentmycourses/${courseid}/${coursename}`}>Course<KeyboardDoubleArrowRightIcon/>{course}<KeyboardDoubleArrowRightIcon/></Link>
    <Link style={{fontSize:"14px", textDecoration:"none"}} to={`/studentdashboard/studentmycourses/studentassignment/${courseid}/${coursename}/${moduleid}/${modulename}`}>Module-{module}<KeyboardDoubleArrowRightIcon/></Link>
    <Link style={{fontSize:"14px", textDecoration:"none"}} to={`/studentdashboard/studentmycourses/studentassignment/studentpractice/${subtopicid}/${courseid}/${coursename}/${moduleid}/${modulename}/${subtopicname}`}>Topics-{topic}<KeyboardDoubleArrowRightIcon/></Link>
    <p style={{fontSize:"14px", textDecoration:"none"}}>All {topic} Practice</p>
    </div>
    <div style={{marginTop:"4%"}}>
      <DataProvider>
        <Home/>
      </DataProvider>
    </div>
    </div>
  )
}

export default StudentPractice