import Sidebar from "../../../src/components/Sidebar";
import '../../../src/pages/Signup/forstudent.css';
import { FaGoogle, FaGithub, FaGooglePlus } from "react-icons/fa";
import KeyboardDoubleArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import { Link } from "react-router-dom";




export const ForStudent = () =>{
    return(
        <div className="signupuser">
            <Sidebar/>
            <div style={{display:"flex", gap:"10px", position:"absolute", marginLeft:"10px"}}>
            <Link style={{fontSize:"14px", textDecoration:"none"}} to="/home">Home<KeyboardDoubleArrowRightIcon/></Link>
            <Link style={{fontSize:"14px", textDecoration:"none"}} to="/home/signup/instructors">Instructors SignUp<KeyboardDoubleArrowRightIcon/></Link>
            <Link style={{fontSize:"14px", textDecoration:"none"}} to="/home/signup/instructors/student">Student SignUp</Link>
            </div>
            <div className="signupStudentHome" style={{marginTop:"3%"}}>
                <div className="signupStudentBackground">
                    <div className="signupStudentShape"></div>
                    <div className="signupStudentShape"></div>
                </div>
                <form className="signupStudentForm" action="">
                    <h3>Sign in</h3>
                    <label className="signupStudentLabel" htmlFor="email">Email</label>
                    <input className="signupStudentInput" type="email" name="email" id="email" placeholder="Enter Email" />
                    <label className="signupStudentLabel" htmlFor="mobilenumber">Mobile Number</label>
                    <input className="signupStudentInput" type="number" name="mobilenumber" id="mobilenumber" />
                    <label className="signupStudentLabel" htmlFor="otp">OTP</label>
                    <input className="signupStudentInput" type="text" name="otp" id="otp" />
                    <button className="signupStudentButton" type="button">Register</button>
                    <div className="signupStudentSocial">
                        <div className="go"><FaGoogle/>Google</div>
                        <div className="Gh"><FaGithub/>GitHub</div>
                        <div className="goplus"><FaGooglePlus/>Google+</div>
                    </div>
                </form>
            </div>
        </div>
    );
};