import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from '../components/Sidebar';
import KeyboardDoubleArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { Link, useLocation } from 'react-router-dom';
import Timer from '../StudentAssets/Timer';
import TimerTest from '../StudentAssets/TimerTest';
import Swal from "sweetalert2";

const StudentTest = () => {
  const location = useLocation();
  const moduleid = location.pathname.split('/')[5]
  const courseid =   location.pathname.split('/')[6]
  const coursename =   location.pathname.split('/')[7]
  const modulename =   location.pathname.split('/')[8]

  const course = coursename.replaceAll('%20',' ')
  const module = modulename.replaceAll('%20',' ')

  const [questions, setQuestions] = useState([]);
  const[correctanswers,setcorrectanswers] = useState([]);
  const [answers, setAnswers] = useState([]);
  const correcranswercheck = []
  const stdanswer =[]
  var score;
  console.log(questions);
  const fetchAllbooks = async()=>{
    
    try{
        const res = await axios.get(`http://localhost:8081/api/getmcq/${moduleid}`)
        setQuestions(res.data);
        setcorrectanswers(res.data);
    }catch(err){
      console.log(err)
    }
  }
console.log(questions);

const [name,setname] = useState('')

  useEffect(()=>{
    axios.get('http://localhost:8081/getusername')
    .then(res=>{
        if(res.data.valid){
            setname(res.data.name)
        }
    })
    .catch(err=>console.log(err))
    fetchAllbooks()
},[]);

const handlechange =(e)=>{
  setAnswers(prev=>({...prev,[e.target.name]:e.target.value}))
}

correctanswers.map((item)=>{
  correcranswercheck.push(item.answer)
  console.log(correcranswercheck)
})

var length = correctanswers.length;


const onsubmit=()=>{
 var newscore=0;
       questions.map((item)=>{
         const cx = ('answer'+item.id)
         stdanswer.push(answers[cx])
       })

      for(var i=0;i<=length;i++){
           if(correcranswercheck[i]==stdanswer[i]){
               newscore+=5
           }
          }

          const timer = setTimeout(() => {
            try{
              axios.put(`http://localhost:8081/updatescore/${name}/${newscore}`);
              Swal.fire({
                icon: 'success',
                title: 'Successfully Completed',
                text: 'Your Score is ' + (newscore),
                footer: '<a href="/studentdashboard">Go To Home Page</a>'
              })
              // alert(newscore)
              // alert('done')
            }catch(err){
              Swal.fire({
                icon: 'question',
                title: 'Something Missed Out Questions',
                text: 'Your Score is' + (newscore),
                footer: '<a href="">Re-Test</a>'
              })
            }
          }, 4000);
          return () => clearTimeout(timer);
        }




  var count = 1;
  var total = questions.length

  const handleTimeout = () => {
    // Logic to handle when the timer runs out
    alert('Time is up!');
  };

  var count = 1;
  var total = questions.length

  return (
    <div>
      <Sidebar/>
    <div style={{display:"flex", gap:"10px", position:"absolute", marginLeft:"10px"}}>
    <Link style={{fontSize:"14px", textDecoration:"none"}} to="/studentdashboard">Home<KeyboardDoubleArrowRightIcon/></Link>
    <Link style={{fontSize:"14px", textDecoration:"none"}} to={`/studentdashboard/studentmycourses/${courseid}/${coursename}`}>Course<KeyboardDoubleArrowRightIcon/>{course}<KeyboardDoubleArrowRightIcon/></Link>
    <Link style={{fontSize:"14px", textDecoration:"none"}} to={`/studentdashboard/studentmycourses/studentassignment/${courseid}/${coursename}/${moduleid}/${modulename}`}>Module-{module}<KeyboardDoubleArrowRightIcon/></Link>
    <p style={{fontSize:"14px", textDecoration:"none"}}> {module} Module MCQ</p>
    </div>
      <div className='quiz-container' style={{ width: "800px", height: "500px", marginLeft: "350px", marginTop: "60px" }}>
        <div  style={{ width: "800px",height:"75px",border:"2px solid #1B66C9" ,display:"flex",alignItems:"center",justifyContent:"space-around",color:"white",background:"#1B66C9"}}>
                <p style={{fontSize:"24px",marginLeft:"150px", textAlign:"center"}}>Module Assesment</p>
                <div style={{marginTop:'9px'}}>
                {/* <i class="ri-timer-line">Timing:20MINS</i> */}
                <TimerTest/>
                <p>No.of.Questions:{total}</p>
                </div>
        </div>

      {/* <div style={{display:"flex",gap:"5px",position:"absolute",marginLeft:"-450px",top:"80px"}}>
        <Link style={{fontSize:"16px",textDecoration:"none"}} to="/allcourses">Course-{coursename}<i class="ri-arrow-right-double-line"></i></Link>
        <Link style={{fontSize:"16px",textDecoration:"none"}} to={`/coursemoduleandtopics/${courseid}/${coursename}`}>Module-{modulename}<i class="ri-arrow-right-double-line"></i></Link>
        <p style={{left:"690px",fontSize:"16px",textDecoration:"none"}}>Assesment</p>

        </div> */}
      <div style={{display:"flex", flexDirection:"column", padding:"35px", overflowY:"scroll"}}>
          
        {questions.map((item)=>(
  
           <FormControl >
            <div style={{height:"80px",width:"100%"}}>
           <FormLabel id="demo-row-radio-buttons-group-label">{count++}.{item.questions}</FormLabel>
           <RadioGroup
             row
             aria-labelledby="demo-row-radio-buttons-group-label"
             name="row-radio-buttons-group"
             onChange={handlechange}
           >
             <FormControlLabel name={'answer'+item.id} value={item.optiona} control={<Radio />} label={item.optiona} />
             <FormControlLabel name={'answer'+item.id} value={item.optionb} control={<Radio />} label={item.optionb} />
             <FormControlLabel name={'answer'+item.id} value={item.optionc} control={<Radio />} label={item.optionc} />
             <FormControlLabel name={'answer'+item.id} value={item.optiond} control={<Radio />} label={item.optiond} />
            
           
           
           
           </RadioGroup>
           </div>
         </FormControl>

        ))}
      </div>
      <button className='btn btn-primary' style={{marginTop:"130px",marginLeft:"520px"}} onClick={onsubmit}>Submit</button>
       
      </div>
    </div>
  )
}

export default StudentTest