import React from 'react';
import '../ViewComponents/studentprofile.css';
import Sidebar from '../components/Sidebar';
import KeyboardDoubleArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import { Link } from 'react-router-dom';

const StudentProfile = () => {
  return (
    <div>
      <Sidebar/>
	  <div style={{display:"flex", gap:"10px", position:"absolute", marginLeft:"10px"}}>
            <Link style={{fontSize:"14px", textDecoration:"none"}} to="/studentdashboard">Home<KeyboardDoubleArrowRightIcon/></Link>
            <Link style={{fontSize:"14px", textDecoration:"none"}} to="/studentdashboard/studentprofile">Student Profile</Link>
        </div>
      <div className="instructorAdd">
		<h1 className="instructorAddTitle">Update Your Profile</h1>
		<form className="instructorAddForm">
			<div className="instructorAddItem">
				<label htmlFor="firstname">First Name</label>
				<input type="text" name="firstname" placeholder="Enter First Name" />
			</div>
			<div className="instructorAddItem">
				<label htmlFor="lastname">Last Name</label>
				<input type="text" name="lastname" placeholder="Enter Last Name" />
			</div>
			<div className="instructorAddItem">
				<label for="dob">Date of Birth</label>
				<input type="date" id="dob" name="dob"  placeholder="01.01.1991" />
			</div>
			<div className="instructorAddItem">
				<label>Marital Status</label>
				<div className="instructorAddStatus">
					<input type="radio" name="marital" id="single" value="single" />
					<label for="single">Single</label>
					<input type="radio" name="marital" id="married" value="married" />
					<label for="married">Married</label>
					<input type="radio" name="marital" id="widow" value="widow" />
					<label for="widow">Widow</label>
				</div>
			</div>
			<div className="instructorAddItem">
				<label>Gender</label>
				<div className="instructorAddGender">
					<input type="radio" name="gender" id="male" value="male" />
					<label for="male">Male</label>
					<input type="radio" name="gender" id="female" value="female" />
					<label for="female">Female</label>
					<input type="radio" name="gender" id="other" value="other" />
					<label for="other">Other</label>
				</div>
			</div>
			<div className="instructorAddItem">
				<label htmlFor="mobilenumber">Mobile Number</label>
				<input type="text" name="mobilenumber"  placeholder="Enter Your Number" />
			</div>
			<div className="instructorAddItem">
				<label htmlFor="email">Email</label>
				<input type="email" name="email"  placeholder="Enter email id" />
			</div>
			<div className="instructorAddItem">
				<label htmlFor="address">Address</label>
				<input type="text" name="address"  placeholder="Enter your address"/>
			</div>
			<div className="instructorAddItem">
				<label htmlFor="city">City</label>
				<input type="text" name="city"  placeholder="Enter City"/>
			</div>
			<div className="instructorAddItem">
				<label htmlFor="state">State</label>
				<input type="text" name="state"  placeholder="Tamil Nadu"/>
			</div>
			<div className="instructorAddItem">
				<label htmlFor="pincode">Pin Code</label>
				<input type="text" name="pincode" placeholder="600020"/>
			</div>
      <form className="instructorAddForm">
        <div className="instructorAddItem">
            <div className="studetnEducation">
              <h6>Qualification Details</h6>
            </div>
            <div className="instructorAddItem">
				      <label>Is Graduate?</label>
              <div className="instructorAddGender">
                <input type="radio" name="qulify" id="yes" value="yes" />
                <label for="male">YES</label>
                <input type="radio" name="qualify" id="no" value="no" />
                <label for="female">NO</label>
              </div>
			</div>
        </div>
      </form>
			<button className="instructorAddButton">Create</button>
		</form>
	</div>
    </div>
  )
}

export default StudentProfile