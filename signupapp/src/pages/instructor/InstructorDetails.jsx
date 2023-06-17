import React from "react";
import '../../../src/pages/instructor/instructordetails.css'
import Sidebar from "../../components/Sidebar";
import KeyboardDoubleArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import PhoneAndroidIcon from '@material-ui/icons/PhoneAndroid';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import LocationSearchingIcon from '@material-ui/icons/LocationSearching';
import PublishIcon from '@material-ui/icons/Publish';
import { Link } from "react-router-dom";

 const InstructorDetails = () => {
    return (
        <div className="instructor">
            <Sidebar/>
        <div style={{display:"flex", gap:"10px", position:"absolute", marginLeft:"10px"}}>
            <Link style={{fontSize:"14px", textDecoration:"none"}} to="/home">Home<KeyboardDoubleArrowRightIcon/></Link>
            <Link style={{fontSize:"14px", textDecoration:"none"}} to="/home/instructors">Instructors<KeyboardDoubleArrowRightIcon/></Link>
            <Link style={{fontSize:"14px", textDecoration:"none"}} to="/home/instructors/overview">Instructors Overview<KeyboardDoubleArrowRightIcon/></Link>
            <Link style={{fontSize:"14px", textDecoration:"none"}} to="/home/instructors/overview/list">Instructors List<KeyboardDoubleArrowRightIcon/></Link>
            <Link style={{fontSize:"14px", textDecoration:"none"}} to="/home/instructors/overview/list/details">Instructors Details</Link>
        </div>
        <div className="instructorDetails">
            <div className="instructorTitleContainer">
                <h1 className="instructorTitle">Instructor Details</h1>
                <Link to="/instructors">
                <button className="instructorDetailAddButton">Add</button>
                </Link>
            </div>
            <div className="instructorContainer">
                <div className="instructorShow">
                    <div className="instructorShowTop">
                        <img src={require("../../Assets/images/womenprof3.jpg")} alt="" className="instructorShowImg" />
                        <div className="instructorShowTopTitle">
                            <span className="instructorShowUsername">Jenifer</span>
                            <span className="instructorShowDepartment">Java Trainer</span>
                        </div>
                    </div>
                    <div className="instructorShowBottom">
                        <span className="instructorShowTitle">Account Details</span>
                        <div className="instructorShowInfo">
                            <PermIdentityIcon className="instructorShowIcon"/>
                            <span className="userShowInfoTitle">LMS01JN</span>
                        </div>
                        <div className="instructorShowInfo">
                            <CalendarTodayIcon className="instructorShowIcon"/>
                            <span className="userShowInfoTitle">10.03.1995</span>
                        </div>
                        <span className="instructorShowTitle">Contact Details</span>
                        <div className="instructorShowInfo">
                            <PhoneAndroidIcon className="instructorShowIcon"/>
                            <span className="userShowInfoTitle">+91 874345 57593</span>
                        </div>
                        <div className="instructorShowInfo">
                            <MailOutlineIcon className="instructorShowIcon"/>
                            <span className="userShowInfoTitle">jenifer@gmail.com</span>
                        </div>
                        <div className="instructorShowInfo">
                            <LocationSearchingIcon className="instructorShowIcon"/>
                            <span className="userShowInfoTitle">Chennai | TamilNadu</span>
                        </div>
                    </div>
                </div>
                <div className="instructorUpdate">
                    <span className="instructorUpdateTitle">Edit</span>
                    <form className="instructorUpdateForm">
                        <div className="instructorUpdateLeft">
                            <div className="instructorUpdateItem">
                                <label>Username</label>
                                <input type="text" placeholder="LMS01JN" className="instructorUpdateInput" />
                            </div>
                            <div className="instructorUpdateItem">
                                <label>Full Name</label>
                                <input type="text" placeholder="Jenifer" className="instructorUpdateInput" />
                            </div>
                            <div className="instructorUpdateItem">
                                <label>Email</label>
                                <input type="text" placeholder="jenifer@gmail.com" className="instructorUpdateInput" />
                            </div>
                            <div className="instructorUpdateItem">
                                <label>Mobile Number</label>
                                <input type="number" placeholder="+91 874345 57593" className="instructorUpdateInput" />
                            </div>
                            <div className="instructorUpdateItem">
                                <label>Address</label>
                                <input type="text" placeholder="Chennai | TamilNadu" className="instructorUpdateInput" />
                            </div>
                        </div>
                        <div className="instructorUpdateRight">
                            <div className="instructorUpdateUpload">
                                <img src={require("../../Assets/images/womenprof3.jpg")} alt="" className="instructorUpdateImg" />
                                <label htmlFor="file"><PublishIcon className="instructorUpdateIcon"/></label>
                                <input type="file" name="" id="file" style={{display:"none"}}/>
                            </div>
                            <button className="instructorUpdateButton">Update</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        </div>
    );
};

export default InstructorDetails;