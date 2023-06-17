import React from "react";
import Categories from "../pages/courses/Categories";


const CourseCategories = () =>{
    const titleOne= "Your Categories";
    const titleTwo= "You have total 9 Categories";


    return(
        <div>
            <Categories titleOne={titleOne} titleTwo={titleTwo}/>
        </div>
    )
}

export default CourseCategories;