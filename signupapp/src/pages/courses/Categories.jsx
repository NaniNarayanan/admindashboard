import React from "react";
import Sidebar from "../../../src/components/Sidebar";
import KeyboardDoubleArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import '../../../src/pages/courses/categories.css';
import "bootstrap-icons/font/bootstrap-icons.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom";
// import 'bootstrap/dist/js/bootstrap.bundle.min';

    const Categories = (props) =>{
    
    return(
        <>
        <div className="courses">
        <Sidebar/>
        <div style={{display:"flex", gap:"10px", position:"absolute", marginLeft:"10px"}}>
            <Link style={{fontSize:"14px", textDecoration:"none"}} to="/home">Home<KeyboardDoubleArrowRightIcon/></Link>
            <Link style={{fontSize:"14px", textDecoration:"none"}} to="/home/courses/add">Course<KeyboardDoubleArrowRightIcon/></Link>
            <Link style={{fontSize:"14px", textDecoration:"none"}} to="/home/courses/add/categories">Categories</Link>
        </div>

            <h5>{props.titleOne}</h5>
        </div>
        <div className="tag"><h6>{props.titleTwo}</h6></div>
    <div className="container">
    <div className="card-deck">
        <div className="row"> 
        <div className="col">
            <div class="card" style={{width: "18rem"}}>
                <div class="card-body">
                    <h5 class="card-title">Graphic Design</h5>
                    <h6 class="card-subtitle mb-2 text-muted">4 SubCategories</h6>
                    <p class="card-text">Website Design & Develop the website with web applications.</p>
                    <ul className="d-flex flex-wrap g-1">
                        <li><span className="badge badge-dim bg-primary">Photoshop</span></li>
                        <li><span className="badge badge-dim bg-danger">Adobe</span></li>
                        <li><span className="badge badge-dim bg-info">Logo Design</span></li>
                        <li><span className="badge badge-dim bg-warning">Drawing</span></li>
                        <li><span className="badge badge-dim bg-secondary">Figma</span></li>
                    </ul>
                </div>
            </div>
        </div>
        <div className="col">
            <div class="card" style={{width: "18rem"}}>
                <div class="card-body">
                    <h5 class="card-title">Web Development</h5>
                    <h6 class="card-subtitle mb-2 text-muted">5 SubCategories</h6>
                    <p class="card-text">Website Design & Develop the website with web applications.</p>
                    <ul className="d-flex flex-wrap g-1">
                    <li><span className="badge badge-dim bg-primary">Responsive Design</span></li>
                    <li><span className="badge badge-dim bg-danger">Wordpress</span></li>
                    <li><span className="badge badge-dim bg-info">Theme</span></li>
                    <li><span className="badge badge-dim bg-warning">Bootstrap</span></li>
                    <li><span className="badge badge-dim bg-secondary">HTML & CSS</span></li>
                </ul>
                </div>
            </div>
        </div>
        <div className="col">
            <div class="card" style={{width: "18rem"}}>
                <div class="card-body">
                    <h5 class="card-title">Mobile Application</h5>
                    <h6 class="card-subtitle mb-2 text-muted">4 SubCategories</h6>
                    <p class="card-text">Website Design & Develop the website with web applications.</p>
                    <ul className="d-flex flex-wrap g-1">
                    <li><span className="badge badge-dim bg-primary">Mobile App Design</span></li>
                    <li><span className="badge badge-dim bg-danger">User Interface</span></li>
                    <li><span className="badge badge-dim bg-info">Design Thinking</span></li>
                    <li><span className="badge badge-dim bg-warning">Prototyping</span></li>
                </ul>
                </div>
            </div>
        </div>
        <div className="col">
            <div class="card" style={{width: "18rem"}}>
                <div class="card-body">
                    <h5 class="card-title">Graphic Design</h5>
                    <h6 class="card-subtitle mb-2 text-muted">4 SubCategories</h6>
                    <p class="card-text">Website Design & Develop the website with web applications.</p>
                    <ul className="d-flex flex-wrap g-1">
                        <li><span className="badge badge-dim bg-primary">Photoshop</span></li>
                        <li><span className="badge badge-dim bg-danger">Adobe</span></li>
                        <li><span className="badge badge-dim bg-info">Logo Design</span></li>
                        <li><span className="badge badge-dim bg-warning">Drawing</span></li>
                        <li><span className="badge badge-dim bg-secondary">Figma</span></li>
                    </ul>
                </div>
            </div>
        </div>
        <div className="col">
            <div class="card" style={{width: "18rem"}}>
                <div class="card-body">
                    <h5 class="card-title">Web Development</h5>
                    <h6 class="card-subtitle mb-2 text-muted">5 SubCategories</h6>
                    <p class="card-text">Website Design & Develop the website with web applications.</p>
                    <ul className="d-flex flex-wrap g-1">
                    <li><span className="badge badge-dim bg-primary">Responsive Design</span></li>
                    <li><span className="badge badge-dim bg-danger">Wordpress</span></li>
                    <li><span className="badge badge-dim bg-info">Theme</span></li>
                    <li><span className="badge badge-dim bg-warning">Bootstrap</span></li>
                    <li><span className="badge badge-dim bg-secondary">HTML & CSS</span></li>
                </ul>
                </div>
            </div>
        </div>
        <div className="col">
            <div class="card" style={{width: "18rem"}}>
                <div class="card-body">
                    <h5 class="card-title">Mobile Application</h5>
                    <h6 class="card-subtitle mb-2 text-muted">4 SubCategories</h6>
                    <p class="card-text">Website Design & Develop the website with web applications.</p>
                    <ul className="d-flex flex-wrap g-1">
                    <li><span className="badge badge-dim bg-primary">Mobile App Design</span></li>
                    <li><span className="badge badge-dim bg-danger">User Interface</span></li>
                    <li><span className="badge badge-dim bg-info">Design Thinking</span></li>
                    <li><span className="badge badge-dim bg-warning">Prototyping</span></li>
                </ul>
                </div>
            </div>
        </div>
        <div className="col">
            <div class="card" style={{width: "18rem"}}>
                <div class="card-body">
                    <h5 class="card-title">Graphic Design</h5>
                    <h6 class="card-subtitle mb-2 text-muted">4 SubCategories</h6>
                    <p class="card-text">Website Design & Develop the website with web applications.</p>
                    <ul className="d-flex flex-wrap g-1">
                        <li><span className="badge badge-dim bg-primary">Photoshop</span></li>
                        <li><span className="badge badge-dim bg-danger">Adobe</span></li>
                        <li><span className="badge badge-dim bg-info">Logo Design</span></li>
                        <li><span className="badge badge-dim bg-warning">Drawing</span></li>
                        <li><span className="badge badge-dim bg-secondary">Figma</span></li>
                    </ul>
                </div>
            </div>
        </div>
        <div className="col">
            <div class="card" style={{width: "18rem"}}>
                <div class="card-body">
                    <h5 class="card-title">Web Development</h5>
                    <h6 class="card-subtitle mb-2 text-muted">5 SubCategories</h6>
                    <p class="card-text">Website Design & Develop the website with web applications.</p>
                    <ul className="d-flex flex-wrap g-1">
                    <li><span className="badge badge-dim bg-primary">Responsive Design</span></li>
                    <li><span className="badge badge-dim bg-danger">Wordpress</span></li>
                    <li><span className="badge badge-dim bg-info">Theme</span></li>
                    <li><span className="badge badge-dim bg-warning">Bootstrap</span></li>
                    <li><span className="badge badge-dim bg-secondary">HTML & CSS</span></li>
                </ul>
                </div>
            </div>
        </div>
        <div className="col">
            <div class="card" style={{width: "18rem"}}>
                <div class="card-body">
                    <h5 class="card-title">Mobile Application</h5>
                    <h6 class="card-subtitle mb-2 text-muted">4 SubCategories</h6>
                    <p class="card-text">Website Design & Develop the website with web applications.</p>
                    <ul className="d-flex flex-wrap g-1">
                    <li><span className="badge badge-dim bg-primary">Mobile App Design</span></li>
                    <li><span className="badge badge-dim bg-danger">User Interface</span></li>
                    <li><span className="badge badge-dim bg-info">Design Thinking</span></li>
                    <li><span className="badge badge-dim bg-warning">Prototyping</span></li>
                </ul>
                </div>
            </div>
        </div>
        
        </div>
    </div>
    </div>
        </>
    );
};

export default Categories;