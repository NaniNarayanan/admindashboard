import React, { useEffect, useState } from 'react';
import '../ViewComponents/studentdashboard.css';
import { ProgressBar } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Sidebar from '../components/Sidebar';
import KeyboardDoubleArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import axios from 'axios';
import { Link, useLocation, useNavigate } from 'react-router-dom';

 const StudentDashboard = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const courseid =   location.pathname.split('/')[2]

  const [data, setData] = useState([]);

  // const loadData = async () =>{
  //   const response = await axios.get(`http://localhost:8081/api/studentget/${courseid}`);
  //   setData(response.data);
  // }

  const loadData = async () =>{
    const response = await axios.get("http://localhost:8081/api/studentget");
    setData(response.data);
  }

  useEffect(()=>{
    loadData();
  },[]);
  console.log(data)
  return (
    <div>
      <Sidebar/>
      <div style={{display:"flex", gap:"10px", position:"absolute", marginLeft:"10px"}}>
            <Link style={{fontSize:"14px", textDecoration:"none"}} to="/studentdashboard">Home<KeyboardDoubleArrowRightIcon/></Link>
            <p style={{fontSize:"14px", textDecoration:"none"}}>List Of Courses</p>
      </div>
      <div className="progressitem">
        <div className="progressFlex">
        <div className="progressBar">
          <ProgressBar className='progressbarstyle' striped variant="success" now={30} label={`Attendance`} style={{margin:"2%", height:"20px"}} />
          <ProgressBar className='progressbarstyle' striped variant="info" now={40} label={`Assesments`} style={{margin:"2%", height:"20px"}}/>
          <ProgressBar className='progressbarstyle' striped variant="warning" now={50} label={`Assignments`} style={{margin:"2%", height:"20px"}}/>
          <ProgressBar className='progressbarstyle' striped variant="danger" now={60} label={`OverAll Progress`} style={{margin:"2%", height:"20px"}}/>
        </div>
        </div>
        <div className="progressFlex">
          <div className="listout">
            <h3>Your Courses</h3> 
            <div className="listoutView">
              <div>{data.map((item,index)=>{
                return(
                  <h5 className='progressBar'>
                  <Link to={'/studentdashboard/studentmycourses/'+item.courseid+'/'+item.coursename}>{item.coursename}</Link>
                  </h5>
                )
              })}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StudentDashboard;