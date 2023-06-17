import Form from 'react-bootstrap/Form';
import { Pagination } from 'antd';
// import 'antd/dist/antd.min.css';
import {Box,CssBaseline,Container, Card, CardContent} from "@material-ui/core";
import { Grid, Typography } from "antd";
import React, { useEffect, useState } from 'react';
import { useLocation } from "react-router-dom";
import axios from "axios";

const PracticeQuestions = () => {

    const location = useLocation()
    const subtopicid = location.pathname.split('/')[2]

    const[posts,setPosts] = useState([])
    const [total,setTotal] = useState("")
    const [page,setPage] = useState(0);
    const [postperpage,setpostperpage] = useState(1)

    useEffect(()=>{
        const level = 'easy';
        const loadquestions =async () =>{
            const res =  await axios.get(`http://localhost:8081/geteasyquestions/${23111}/${level}`)
            setPosts(res.data)
            setTotal(res.data.length)
        }
        loadquestions();
    },[]);

    const indexoflastpage = page+postperpage; //0+1 =1
    const indexoffirspage = indexoflastpage-postperpage;//1-1=0
    const currentposts = posts.slice(indexoffirspage,indexoflastpage);

    const [courses, setCourses] = useState({ subtopicid:23111, level:""})

    const handleChange = (e) =>{
        setCourses(prev=>({...prev, [e.target.name]:e.target.value}))
    }
    console.log(courses.level)

    const handleClick =()=>{
        console.log(courses.level)
        const level = courses.level;
        const loadquestions =async () =>{
            const res =  await axios.get(`http://localhost:8081/geteasyquestions/${23111}/${level}`)
            setPosts(res.data)
            setTotal(res.data.length)
        }
        loadquestions();
      }
      console.log(courses);
  return (
    <div>
        <div style={{display:"flex"}}>
            <label style={{color:"black", marginLeft:"10%", position:"absolute"}}>Select Level:</label>
            <Form.Select style={{width:"200px",marginLeft:"30px",height:"35px", marginTop:"5%"}} onChange={handleChange} name='level'>
               <option value='easy'>Easy</option>
               <option value='medium'>Medium</option>
               <option value='hard'>Hard</option>
            </Form.Select><br></br>
            <div style={{marginTop:"5%"}}>
                <button onClick={handleClick} className='btn btn-primary'>OK</button>
            </div>
            
            {currentposts.map((post)=>(
            <h5 style={{color:"black", marginTop:"20%", position:"absolute"}} key={post.id}>{post.questions}</h5>
        ))}

            <Pagination
                onChange={(value)=> setPage(value)}
                pageSize={postperpage}
                total={total}
                current={page}
                style={{color:"blue", marginTop:"40%", marginLeft:"15%", position:"absolute"}}
            />

        </div>
    </div>
  )
}

export default PracticeQuestions