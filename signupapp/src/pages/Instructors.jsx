import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import KeyboardDoubleArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import '../../src/pages/instructor.css';
import { toast } from "react-toastify";
import axios from "axios";
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button';
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import HelpIcon from '@material-ui/icons/Help';
import { Link } from "react-router-dom";


const initialState = {
	firstname:"",
	lastname:"",
	dateofbirth:"",
	martialstatus:"",
	gender:"",
	allocatebatch:"",
	active:"",
	contactnumber:"",
	email:"",
	address:"",
	city:"",
	state:"",
	pincode:""
}

const Instructors = () => {

	const [data, setData] = useState(initialState);

	const { firstname, lastname, dateofbirth, martialstatus, gender, allocatebatch, active, contactnumber, email,
	address, city, state, pincode	} = data;

	// axios.defaults.withCredentials=true;

	const handleSubmit = (e) =>{
		e.preventDefault();
		if(!firstname || !lastname || !dateofbirth || !martialstatus || !gender || !allocatebatch || !active || !contactnumber || !email ||
			!address || !city || !state || !pincode){
				toast.error("Please Enter All Input Fields Must");
			}else{
				axios.post("http://localhost:8081/instructor",{
					firstname, lastname, dateofbirth, martialstatus, gender, allocatebatch, active, contactnumber, email,
	address, city, state, pincode
				}).then(()=>{
					setData({firstname:"", lastname:"",dateofbirth:"",martialstatus:"",gender:"",allocatebatch:"",
					active:"",contactnumber:"",email:"",address:"",city:"",state:"",pincode:""});
				})
				.catch((err)=>toast.error(err.response.data));
				toast.success("Successfully Added Instructors Details")
			}
	}

	const handleInputChange = (e) =>{
        const { name, value} = e.target;
        setData({...data, [name]: value});
    }
	console.log(data)

return (
	<div className="instructor">
		<Sidebar/>
        <div style={{display:"flex", gap:"10px", position:"absolute", marginLeft:"10px"}}>
            <Link style={{fontSize:"14px", textDecoration:"none"}} to="/home">Home<KeyboardDoubleArrowRightIcon/></Link>
            <Link style={{fontSize:"14px", textDecoration:"none"}} to="/home/instructors">Instructors</Link>
        </div>
	<div className="instructorAdd">
		<h1 className="instructorAddTitle">New Instructor</h1>
        <form className="instructorAddForm" onSubmit={handleSubmit}>
          <Row>
            <Col lg={6} md={6} sm={12} xs={12}>
            <Form.Group className="mb-3">
                <Form.Label htmlFor='firstname'>First Name
                  <Tooltip title="enter alphanumberic"><IconButton><HelpIcon/></IconButton></Tooltip>
                </Form.Label>
                <Form.Control type="text" id='firstname' name="firstname" value={firstname || ""} placeholder="enter firstname" onChange={handleInputChange}/>
            </Form.Group>
            </Col>
			<Col lg={6} md={6} sm={12} xs={12}>
			<Form.Group className="mb-3">
                <Form.Label htmlFor='lastname'>Last Name
                  <Tooltip title="enter alphanumberic"><IconButton><HelpIcon/></IconButton></Tooltip>
                </Form.Label>
                <Form.Control type="text" id='lastname' name="lastname" value={lastname || ""} placeholder="enter lastname" onChange={handleInputChange}/>
            </Form.Group>
            </Col>
            <Col lg={6} md={6} sm={12} xs={12}>
            <Form.Group className="mb-3">
                <Form.Label htmlFor='dateofbirth'>Date of Birth
                  <Tooltip title="enter alphanumberic"><IconButton><HelpIcon/></IconButton></Tooltip>
                </Form.Label>
                <Form.Control type="date" id='dateofbirth' name="dateofbirth" value={dateofbirth || ""} placeholder="enter topic id" onChange={handleInputChange}/>
            </Form.Group>
            </Col>
            <Col lg={6} md={6} sm={12} xs={12}>
            <Form.Group className="mb-3">
                <Form.Label htmlFor='martialstatus'>Martial Status
                <Tooltip title="Choose level"><IconButton size="small"><HelpIcon/></IconButton></Tooltip>
                </Form.Label>
                <Form.Select id='martialstatus' name='martialstatus' onChange={handleInputChange}>
                    <option value="single">Single</option>
                    <option value="married">Married</option>
                    <option value="widow">Widow</option>
                </Form.Select>
            </Form.Group>
            </Col>
			<Col lg={6} md={6} sm={12} xs={12}>
            <Form.Group className="mb-3">
                <Form.Label htmlFor='gender'>Gender
                <Tooltip title="Choose level"><IconButton size="small"><HelpIcon/></IconButton></Tooltip>
                </Form.Label>
                <Form.Select id='gender' name='gender' onChange={handleInputChange}>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                </Form.Select>
            </Form.Group>
            </Col>
			<Col lg={6} md={6} sm={12} xs={12}>
            <Form.Group className="mb-3">
                <Form.Label htmlFor='allocatebatch'>Allocate Batch
                <Tooltip title="Choose Batch"><IconButton size="small"><HelpIcon/></IconButton></Tooltip>
                </Form.Label>
                <Form.Select id='allocatebatch' name='allocatebatch' onChange={handleInputChange}>
                    <option value="java	">Java</option>
                    <option value="python">Python</option>
                    <option value="mern">MERN</option>
                    <option value="ui/ux">UI/UX Design</option>
                </Form.Select>
            </Form.Group>
            </Col>
			<Col lg={6} md={6} sm={12} xs={12}>
            <Form.Group className="mb-3">
                <Form.Label htmlFor='active'>Active
                <Tooltip title="Choose Batch"><IconButton size="small"><HelpIcon/></IconButton></Tooltip>
                </Form.Label>
                <Form.Select id='active' name='active' onChange={handleInputChange}>
                    <option value="yes	">yes</option>
                    <option value="no">No</option>
                </Form.Select>
            </Form.Group>
            </Col>
			<Col lg={6} md={6} sm={12} xs={12}>
			<Form.Group className="mb-3">
                <Form.Label htmlFor='contactnumber'>Mobile Number
                  <Tooltip title="enter alphanumberic"><IconButton><HelpIcon/></IconButton></Tooltip>
                </Form.Label>
                <Form.Control type="text" id='contactnumber' name="contactnumber" value={contactnumber} placeholder="enter contact number" onChange={handleInputChange}/>
            </Form.Group>
            </Col>
			<Col lg={6} md={6} sm={12} xs={12}>
			<Form.Group className="mb-3">
                <Form.Label htmlFor='email'>Email Id
                  <Tooltip title="enter alphanumberic"><IconButton><HelpIcon/></IconButton></Tooltip>
                </Form.Label>
                <Form.Control type="text" id='email' name="email" value={email} placeholder="enter email" onChange={handleInputChange}/>
            </Form.Group>
            </Col>
			<Col lg={6} md={6} sm={12} xs={12}>
			<Form.Group className="mb-3">
                <Form.Label htmlFor='address'>Address
                  <Tooltip title="enter alphanumberic"><IconButton><HelpIcon/></IconButton></Tooltip>
                </Form.Label>
                <Form.Control type="text" id='address' name="address" value={address} placeholder="enter address" onChange={handleInputChange}/>
            </Form.Group>
            </Col>
			<Col lg={6} md={6} sm={12} xs={12}>
			<Form.Group className="mb-3">
                <Form.Label htmlFor='city'>City
                  <Tooltip title="enter alphanumberic"><IconButton><HelpIcon/></IconButton></Tooltip>
                </Form.Label>
                <Form.Control type="text" id='city' name="city" value={city} placeholder="enter city" onChange={handleInputChange}/>
            </Form.Group>
            </Col>
			<Col lg={6} md={6} sm={12} xs={12}>
			<Form.Group className="mb-3">
                <Form.Label htmlFor='state'>State
                  <Tooltip title="enter alphanumberic"><IconButton><HelpIcon/></IconButton></Tooltip>
                </Form.Label>
                <Form.Control type="text" id='state' name="state" value={state} placeholder="enter state" onChange={handleInputChange}/>
            </Form.Group>
            </Col>
			<Col lg={6} md={6} sm={12} xs={12}>
			<Form.Group className="mb-3">
                <Form.Label htmlFor='pincode'>Pin Code
                  <Tooltip title="enter alphanumberic"><IconButton><HelpIcon/></IconButton></Tooltip>
                </Form.Label>
                <Form.Control type="text" id='pincode' name="pincode" value={pincode} placeholder="enter pincode" onChange={handleInputChange}/>
            </Form.Group>
            </Col>
          </Row>
		  <button className="instructorAddButton" type="submit" value="save">Create</button>
            </form>
	</div>
	</div>
);
};

export default Instructors;





