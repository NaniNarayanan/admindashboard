import React from "react";
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup'
import Button from 'react-bootstrap/Button'
import "../../src/Enroll/studentcard.css";
import { studentCardData }  from "../../src/Enroll/studentCardData";

 const StudentCard = () =>{

    

    const renderStudentCard =(info, index) =>{
        return(
        
                <Card style={{ width: '18rem', margin:"35px", boxShadow:"0px 0px 11px -2px #000000" }} key={index}>
                    <Card.Img variant="top" src={info.image}/>
                        <Card.Body>
                            <Card.Title>{info.StudentName}</Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">{info.CourseId}</Card.Subtitle>
                        <Card.Text style={{fontSize:"12px", fontWeight:"600"}}>
                            {info.CourseName}
                        </Card.Text>
                        <ListGroup className="list-group-flush">
                            <ListGroup.Item>{info.MobileNumber}</ListGroup.Item>
                            <ListGroup.Item>{info.Email}</ListGroup.Item>
                            <ListGroup.Item>{info.Status}</ListGroup.Item>
                        </ListGroup>
                            <Button variant="primary">RESUME</Button>
                        </Card.Body>
                        
                </Card>
        );
    };

    return(
        <div className="assesment">
            <div className="studentCardTitle">
                <h1>Student Card List</h1>
            </div>
         <div className="studentCardView" style={{display:"flex", flexWrap:"wrap"}}>
            {studentCardData.map(renderStudentCard)}
            </div>
        </div>
    );
};

export default StudentCard;