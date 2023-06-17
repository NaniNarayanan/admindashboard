import React, { useEffect, useState } from 'react';
import '../../../src/StudentPage/StudentAssets/coursecollapse.css';
import axios from 'axios';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import KeyboardDoubleArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';




// const data = [
//     {
//         module:'Web Designing',
//         subtopic1:'Indroduction HTML',
//         subtopic2:'Formatting Tags',
//         subtopic3:'Formatting Elements',
//         subtopic4:'Forms',
//         subtopic5:'HTML Inputs',
//         subtopic6:'Selectors',
//     },
//     {
//         module:'Web Designing',
//         subtopic1:'Indroduction HTML',
//         subtopic2:'Formatting Tags',
//         subtopic3:'Formatting Elements',
//         subtopic4:'Forms',
//         subtopic5:'HTML Inputs',
//         subtopic6:'Selectors',
//     },
//     {
//         module:'Web Designing',
//         subtopic1:'Indroduction HTML',
//         subtopic2:'Formatting Tags',
//         subtopic3:'Formatting Elements',
//         subtopic4:'Forms',
//         subtopic5:'HTML Inputs',
//         subtopic6:'Selectors',
//     },
//     {
//         module:'Web Designing',
//         subtopic1:'Indroduction HTML',
//         subtopic2:'Formatting Tags',
//         subtopic3:'Formatting Elements',
//         subtopic4:'Forms',
//         subtopic5:'HTML Inputs',
//         subtopic6:'Selectors',
//     },
//     {
//         module:'Web Designing',
//         subtopic1:'Indroduction HTML',
//         subtopic2:'Formatting Tags',
//         subtopic3:'Formatting Elements',
//         subtopic4:'Forms',
//         subtopic5:'HTML Inputs',
//         subtopic6:'Selectors',
//     },
// ]

const CourseCollapse = () => {

    const navigate = useNavigate()
  const location = useLocation()
  const courseid =   location.pathname.split('/')[3]
  const coursename =   location.pathname.split('/')[4]
//   const subtopicid =   location.pathname.split('/')[3]

  const course = coursename.replaceAll('%20',' ')
  const [data, setData] = useState([]);
//   const [state, setState] = useState([]);

  const loadData = async () =>{
    const response = await axios.get(`http://localhost:8081/api/studentget/${courseid}`);
    setData(response.data);
  }

//   const fetchData = async () =>{
//     const res = await axios.get(`http://localhost:8081/api/topicget/${subtopicid}`);
//     setState(res.state);
//   }
  
  useEffect(()=>{
    loadData();
  },[]);

//   useEffect(()=>{
//     fetchData();
//   },[]);

    const [selected, setSelected] = useState(null)

    const toggle = (i) =>{
        if(selected === i){
            return setSelected(null)
        }

        setSelected(i)
    }
    console.log(data)
    // console.log(state)
  return (
    <>
    <div style={{display:"flex", gap:"10px", position:"absolute", marginLeft:"10px"}}>
    <Link style={{fontSize:"14px", textDecoration:"none"}} to="/studentdashboard">Home<KeyboardDoubleArrowRightIcon/></Link>
    <Link style={{fontSize:"14px", textDecoration:"none"}} to={`/studentdashboard/studentmycourses/${courseid}/${coursename}`}>Course<KeyboardDoubleArrowRightIcon/>{course}<KeyboardDoubleArrowRightIcon/></Link>
    <p style={{fontSize:"14px", textDecoration:"none"}}>All {course} modules</p>
    </div>
    <div className="wrapper">
        <div className="accordian">
            {data.map((item, i)=>(
                <div className="item">
                    <div className="title" onClick={()=>toggle(i)}>
                    <img src={item.moduleimage} alt="" style={{objectFit:"fill",height:"8%",width:"32%",}}/>
                    <h5>{item.modulename}</h5>
                        <span>{selected === i ? '-' : '+'}</span>
                    </div><hr />
                    <div className={selected === i ? 'content show' : 'content'}>
                            <h6>{item.moduledescription}</h6>
                            <p>Duration:{item.moduleduration}</p>
                            <Link to={`/studentdashboard/studentmycourses/studentassignment/${courseid}/${coursename}/${item.moduleid}/${item.modulename}`}>Topics</Link>                        
                    </div>
                </div>
            ))}
        </div>
    </div>
    </>
  )
}



export default CourseCollapse