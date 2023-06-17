import React, { useEffect, useRef, useState } from 'react';
import './studentassignment.css';
import Sidebar from '../components/Sidebar';
import KeyboardDoubleArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import { Link, useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'
import * as BsIcons from "react-icons/bs";
import {
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsContent,
  MDBTabsPane,
  MDBCol,
  MDBRow
} from 'mdb-react-ui-kit';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
// import { Document, Page } from 'react-pdf/dist/esm/pdf.worker.entry';
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack';
import pdfFile from '../../../src/Assets/pdf/html.pdf';
import 'react-html5video/dist/styles.css';
import { DefaultPlayer as Video } from "react-html5video";
import Videotest from "../../Assets/video/htmlvideo.mp4";
import TapComponent from '../StudentAssets/tapComponent';
import DataProvider from '../Context/DataProvider';
import Home from '../Codepen/Home';
import PracticeQuestions from '../Codepen/PracticeQuestions';
import LessonTest from '../StudentAssets/LessonTest';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Timer from '../StudentAssets/Timer';
import TimerTest from '../StudentAssets/TimerTest';
import Swal from "sweetalert2";
import { idID } from '@mui/material/locale';

const StudentAssignment = () => {

  const [verticalActive, setVerticalActive] = useState('1');

  const handleVerticalClick = (value) => {
    if (value === verticalActive) {
        return;
    }
    setVerticalActive(value);
};

  const navigate = useNavigate()
  const location = useLocation()
  const courseid =   location.pathname.split('/')[4]
  const coursename =   location.pathname.split('/')[5]
  const moduleid =   location.pathname.split('/')[6]
  const modulename =   location.pathname.split('/')[7]

  const course = coursename.replaceAll('%20',' ')
  const module = modulename.replaceAll('%20',' ')
  const [modules, setModules] = useState([]);
  const [topics, setTopics] = useState([]);
  const [questions, setQuestions] = useState([]);
  const[correctanswers,setcorrectanswers] = useState([]);
  const [answers, setAnswers] = useState([]);
  const correcranswercheck = []
  const stdanswer =[]
  var score;
  console.log(questions);

  const fetchAllbooks = async () =>{
    try{
      const response = await axios.get(`http://localhost:8081/api/getstudent/${moduleid}`);
      setModules(response.data);
    } catch(err){
      console.log(err);
    }
  }
  useEffect(()=>{
    fetchAllbooks()
  },[])
  
  const [active, setActive] = useState(false);

  const Topics = async (subtopicid) =>{
    try{
      const response = await axios.get(`http://localhost:8081/api/getstudentlesson/${subtopicid}`);
      setTopics(response.data);
    } catch(err){
      console.log(err);
    }
    console.log(topics)
  }

  useEffect(()=>{
    Topics()
  },[])

  const Lesson = async(lessonid)=>{
    
    try{
        const res = await axios.get(`http://localhost:8081/api/getlessonmcq/${lessonid}`)
        setQuestions(res.data);
        setcorrectanswers(res.data);
    }catch(err){
      console.log(err)
    }
  }
console.log(Lesson);

  
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  const onDocumentLoadSuccess = ({ numPages }) => {
      setNumPages(numPages);
  };

  const goToPrevPage = () =>
      setPageNumber(pageNumber - 1 <= 1 ? 1 : pageNumber - 1);

  const goToNextPage = () =>
      setPageNumber(
          pageNumber + 1 >= numPages ? numPages : pageNumber + 1,
  );

  const [subtopicid,setSubtopicid] = useState("")
  const practicequestion = (subtopicid) =>{
    setSubtopicid(subtopicid)
          console.log(subtopicid)
  }

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

      let result = '';
      if(newscore >=40){
        result = 'High';
      }else if(newscore >=20){
        result = 'Medium'
      }else{
        result = 'Low'
      }

          const timer = setTimeout(() => {
            try{
              axios.put(`http://localhost:8081/updatescore/${name}/${newscore}`);
              Swal.fire({
                icon: 'success',
                title: 'Successfully Completed',
                text: 'Your Score is ' + (result),
                footer: '<a href="/studentdashboard">Go To Home Page</a>'
              })
              // alert(newscore)
              // alert('done')
            }catch(err){
              Swal.fire({
                icon: 'question',
                title: 'Something Missed Out Questions',
                text: 'Your Score is' + (result),
                footer: '<a href="">Re-Test</a>'
              })
            }
          }, 4000);
          return () => clearTimeout(timer);
        }

  var count = 1;
  var total = questions.length

  const [basicActive, gfg1] = useState('2');
  
  const click = (value) => {
      if (value === basicActive) {
          return;
      }

      gfg1(value);
  };

  const buttonRef = useRef(null);

  useEffect(() => {
    if (buttonRef.current) {
      buttonRef.current.click();
      alert("clicked")
    }
  }, []);



  return (
    <div>
      <Sidebar/>
            <div style={{display:"flex", gap:"10px", position:"absolute", marginLeft:"10px"}}>
            <Link style={{fontSize:"14px", textDecoration:"none"}} to="/studentdashboard">Home<KeyboardDoubleArrowRightIcon/></Link>
            <Link style={{fontSize:"14px", textDecoration:"none"}} to={`/studentdashboard/studentmycourses/${courseid}/${coursename}`}>Course<KeyboardDoubleArrowRightIcon/>{course}<KeyboardDoubleArrowRightIcon/></Link>
            <Link style={{fontSize:"14px", textDecoration:"none"}} to={`/studentdashboard/studentmycourses/studentassignment/${courseid}/${coursename}/${moduleid}/${modulename}`}>Module-{module}<KeyboardDoubleArrowRightIcon/></Link>
            <p style={{fontSize:"14px", textDecoration:"none"}}>All {module} Topics</p>
            </div>
      <Tabs defaultIndex={-1}>
        <TabList>
          <div className='studentAssignment'>
            <div className='studentTopic'>
              <div className='studentTopic2'>
                    {modules.map((item) => (
                        <Tab key={item.id} ref={buttonRef} className='studentTopicTitle' id='butt' onClick={() => Topics(item.subtopicid)} style={{ color: "black", letterSpacing: "1px",marginLeft:"20px" }}>{item.subtopicname}</Tab>
                    ))}
              </div>
            </div>
          </div>
        </TabList>
        {modules.map((item)=>(
          <TabPanel style={{ fontSize: '15px', marginTop: "-3px" }}>
            <Tabs defaultIndex={0} style={{ display: "flex", gap: "20px" }}>
            <Link style={{position:"absolute",color:"white", marginTop:"480px",marginLeft:"30px",textDecoration:"none"}} to={`/studentdashboard/studentmycourses/studentassignment/studenttest/${item.moduleid}/${courseid}/${coursename}/${modulename}`}>Take Assesment</Link>

            <TabList className="liststyle">
              {topics.map((item)=>(
                <Tab key={item.id} style={{ color: "black", letterSpacing: "1px" }}  onClick={()=>{practicequestion(item.lessonid);handleVerticalClick('tab1')}}>{item.lessonname}</Tab>
              ))}
            </TabList>
            {topics.map((item)=>(
                <TabPanel style={{width:"700px"}}>
                            <MDBTabs pills className='mb-3'>
                            <MDBTabsItem>
                                <MDBTabsLink className='btn btn-primary' onClick={() => handleVerticalClick('1')} 
                                active={verticalActive === '1'}>
                                    Learning Material
                                </MDBTabsLink>
                            </MDBTabsItem>
                            <MDBTabsItem>
                                <MDBTabsLink className='btn btn-primary' onClick={() => handleVerticalClick('2')} 
                                active={verticalActive === '2'}>
                                    Practice Here
                                </MDBTabsLink>
                            </MDBTabsItem>
                            <MDBTabsItem style={{display:"flex",  flexDirection:"row"}}>
                                  <MDBTabsLink defaultIndex={1} key={idID} className='btn btn-primary' style={{position:"relative"}} onClick={() =>{Lesson(item.lessonid);handleVerticalClick('3')}} 
                                  active={verticalActive === '3'}>
                                        Test Your Skill
                                </MDBTabsLink>
                            </MDBTabsItem>
                            <MDBCol  style={{ position: "absolute", width:"1000px", marginTop:"4%" }}>
                            <MDBTabsContent>
                        <MDBTabsPane show={verticalActive === '1'}>
                            <Tabs>
                                <TabList>
                                    <Tab>PDF</Tab>
                                    <Tab>VIDEO</Tab>
                                </TabList>
                                <TabPanel>
                                    <div>
                                        <nav style={{ position: "absolute", marginTop: "30px" }}>
                                            <div style={{ display: "flex", flexDirection: "row", gap: 354 }}>
                                                <i class="ri-skip-left-line" style={{ fontSize: "50px", cursor: "pointer",color:"#1B66C9" }} onClick={goToPrevPage}></i>
                                                <p style={{marginTop:"-6%"}}> 
                                                    Page {pageNumber} of {numPages}
                                                </p>
                                                <i class="ri-skip-right-line" style={{ fontSize: "50px", marginLeft: "60px", cursor: "pointer",color:"#1B66C9" }} onClick={goToNextPage}></i>
                                            </div>
                                        </nav>
                                        <div style={{ position: "relative", zIndex: "-1", marginTop:"3%", marginLeft:"10%" }}>
                                            {/* <h1>{item.pdf}</h1> */}
                                            <Document
                                                file={pdfFile}
                                                onLoadSuccess={onDocumentLoadSuccess}     
                                            >
                                                <Page pageNumber={pageNumber} />
                                            </Document>
                                        </div>
                                    </div>
                                </TabPanel>
                                <TabPanel>
                                    <div style={{ width: "800px", marginLeft: "50px", marginTop: "30px" }}>
                                        <Video autoPlay loop
                                        >
                                            <source src={Videotest} type='video/webm'></source>
                                        </Video>
                                        <div>
                                            <h5>HTML FULL CONTENTS VIDEOS</h5>
                                            <p>HTML is the standard markup language for creating Web pages. HTML describes the structure of a Web page. HTML consists of a series of elements. HTML elements tell the browser how to display the content. HTML elements label pieces of content such as "this is a heading", "this is a paragraph", "this is a link", etc.</p>
                                        </div>
                                    </div>
                                </TabPanel>
                            </Tabs>
                        </MDBTabsPane>
                        <MDBTabsPane show={verticalActive === '2'}>
                            <div>
                                <div style={{ position: "relative", width:"110%", boxShadow:"0px 0px 11px -2px #000000"}}>
                                <DataProvider>
                                  <Home/>
                                </DataProvider>
                                </div>
                                <div className='practicequestions' style={{ position: "absolute", width:"550px", height:"300px" ,marginTop:"-30%", marginLeft:"55%", border:"1px solid #1B66C9" }}>
                                    <PracticeQuestions subtopicid={subtopicid} />
                                </div>
                            </div>
                        </MDBTabsPane>
                        <MDBTabsPane show={verticalActive === '3'}>
                            <div>
                                <div style={{ position: "relative", width:"110%", boxShadow:"0px 0px 11px -2px #000000"}}>
                                <div>
      <div className='quiz-container' style={{ width: "100%", height: "auto", marginTop: "60px" }}>
        <div  style={{ width: "100%",height:"75px",border:"2px solid rgb(255,206,66)" ,display:"flex",alignItems:"center",justifyContent:"space-around",color:"white",background:"rgb(255,206,66)"}}>
                <p style={{fontSize:"24px", textAlign:"center"}}>{item.lessonname}</p>
                <div style={{marginTop:'9px'}}>
                {/* <i class="ri-timer-line">Timing:20MINS</i> */}
                <p>No.of.Questions:{total}</p>
                </div>
        </div>
      <div style={{display:"flex", flexDirection:"column", padding:"35px", overflowY:"scroll"}}>
          
        {questions.map((item)=>(
  
           <FormControl >
            <div style={{height:"auto",width:"100%"}}>
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
                                </div>
                            </div>
                        </MDBTabsPane>
                    </MDBTabsContent>
                    </MDBCol>
                        </MDBTabs>
                      </TabPanel>
            ))}

            </Tabs>
          </TabPanel>
        ))}
      </Tabs>
    </div>
  )
}

export default StudentAssignment