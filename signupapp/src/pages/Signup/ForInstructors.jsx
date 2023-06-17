import { Link } from "react-router-dom";
import Sidebar from "../../../src/components/Sidebar";
import KeyboardDoubleArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';



export const ForInstructors = () =>{
    return(
        <div className="signupuser">
            <Sidebar/>
            <div style={{display:"flex", gap:"10px", position:"absolute", marginLeft:"10px"}}>
            <Link style={{fontSize:"14px", textDecoration:"none"}} to="/home">Home<KeyboardDoubleArrowRightIcon/></Link>
            <Link style={{fontSize:"14px", textDecoration:"none"}} to="/home/signup/instructors">Instructors SignUp</Link>
            </div>
            <div style={{marginTop:"5%"}}>
            <h1>Signup For Instructors</h1>
            </div>
        </div>
    );
};