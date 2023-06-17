import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import KeyboardDoubleArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import Card from 'react-bootstrap/Card';
import "../../src/pages/assesment.css";
import AssesmentViewModal from "./assesment/AssesmentViewModal";
// import { courseRow } from "../courseData";
import axios from "axios";
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';


const Assesment = () =>{
    
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [showModal, setShowModal] = useState(false);
  
    function handleClick() {
        setShowModal(true);
    }

    const [data, setData] = useState([]);

    const loadData = async () =>{
        const response = await axios.get("http://localhost:8081/api/get");
        setData(response.data);
    }

    useEffect(()=>{
        loadData();
    },[]);

    const renderAssesment =(info, index) =>{
        return(
        
                <Card style={{ width: '18rem', margin:"35px", boxShadow:"0px 0px 11px -2px #000000" }} key={index}>
                    <Card.Img variant="top" src={info.courseimage}/>
                        <Card.Body>
                            <Card.Title>{info.courseid}</Card.Title>
                        <Card.Text>
                            {info.coursename}
                        </Card.Text>
                        {/* <Link to={`/assesmentViewModal/${info.courseid}`}>
                        <button className="userListEdit" onClick={handleShow}>Add Module</button>
                        </Link> */}
                        <Link to={`/assesmentViewModal/${info.courseid}`}>
                        <button className="btn btn-primary" onClick={handleClick}>Add Module</button>
                            {showModal && <AssesmentViewModal />}
                        </Link>
                        </Card.Body>
                </Card>
        );
    };

    return(
        <div className="assesment">
            <Sidebar/>
            <div style={{display:"flex", gap:"10px", position:"absolute", marginLeft:"10px"}}>
            <Link style={{fontSize:"14px", textDecoration:"none"}} to="/home">Home<KeyboardDoubleArrowRightIcon/></Link>
            <Link style={{fontSize:"14px", textDecoration:"none"}} to="/home/assesment">Assesment</Link>
        </div>
            <div className="assesmentTitle">
                <h1 style={{letterSpacing:"2px"}}>Course and Module Managment</h1>
                <div style={{width:"800px", borderBottom:"2px solid black", marginLeft:"300px"}}></div>
            </div>
         <div className="assesmentView" style={{display:"flex", flexWrap:"wrap"}}>
            {data.map(renderAssesment)}
            </div>
        </div>
    );
};

export default Assesment;