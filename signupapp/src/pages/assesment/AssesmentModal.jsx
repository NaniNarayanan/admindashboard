import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import HelpIcon from '@material-ui/icons/Help';
import Modal from 'react-bootstrap/Modal';
import "../../../src/pages/assesment/assesmentmodal.css";
import TextEditor from '../../TextEditor/TextEditor';
import { useLocation, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';




const AssesmentModal = (props) => {
  const location = useLocation()
  const courseid = location.pathname.split('/')[2]
  const initialState = ({
    courseid: courseid,
    moduleid: "",
    modulename: "",
    moduleimage: "",
    moduledescription: "",
    moduleduration: ""
  })

  const values = [true];
  const [fullscreen, setFullscreen] = useState(true);
  const [show, setShow] = useState(false);

  const [state, setState] = useState(initialState);

  const { id } = useParams(setState);
  useEffect(() =>{
    axios.get(`http://localhost:8081/api/moduleget/${id}`)
    .then((resp) => setState({...resp.data[0]}));
  },[id]);

  const {  moduleid, modulename, moduleimage, moduledescription, moduleduration } = state;

  const handleSubmit = (e) =>{
    e.preventDefault();
    if(!moduleid || !modulename || !moduleimage || !moduledescription || !moduleduration){
      toast.error("Please provide value into each input field");
      console.log("error")
    }else{
      axios.post("http://localhost:8081/api/modulepost",{
          courseid,
          moduleid,
          modulename,
          moduleimage,
          moduledescription,
          moduleduration
        }).then(()=>{
          setState({ courseid:"", moduleid: "", modulename: "", moduleimage: "", moduledescription: "", moduleduration: ""})
        })
        .catch((err)=> toast.error(err.response.data));
        toast.success("Module Added Successfully")
      }if(!id){
        
        
      }else{
        axios.put(`http://localhost:8081/api/moduleupdate/${id}`,state)
        .catch((err)=> toast.error(err.response.data));
        toast.success("Module Updated Successfully")
      }
  }

  

  function handleShow(breakpoint) {
    setFullscreen(breakpoint);
    setShow(true);
  };

  const handleInputChange = (e) =>{
    const { name, value} = e.target;
    setState({...state, [name]: value});
}

  console.log(state)
  return (
    <>
    
      {values.map((v, idx) => (
        <Button key={idx} variant='info' style={{marginTop:"5px", marginLeft:"10px"}} className="me-2 mb-2" onClick={() => handleShow(v)}>
          Add Module
          {typeof v === 'string' && `below ${v.split('-')[0]}`}
        </Button>
      ))}
    
      <Modal show={show} fullscreen={fullscreen} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>ADD Modules</Modal.Title>
        </Modal.Header>
        
        <Modal.Body>
        <form className="assesmentAddForm" onSubmit={handleSubmit}>
          <Row>
          <Col lg={6} md={6} sm={12} xs={12}>
            <Form.Group className="mb-3">
                <Form.Label htmlFor='courseid'>Course Id
                  <Tooltip title="enter alphanumberic"><IconButton><HelpIcon/></IconButton></Tooltip>
                </Form.Label>
                <Form.Control type="text" id='courseid' name="courseid" value={courseid || ""} placeholder="enter course id" onChange={handleInputChange}/>
            </Form.Group>
            </Col>
            <Col lg={6} md={6} sm={12} xs={12}>
            <Form.Group className="mb-3">
                <Form.Label htmlFor='moduleid'>Module Id
                  <Tooltip title="enter alphanumberic"><IconButton><HelpIcon/></IconButton></Tooltip>
                </Form.Label>
                <Form.Control type="text" id='moduleid' name="moduleid" value={moduleid || ""} placeholder="enter module id" onChange={handleInputChange}/>
            </Form.Group>
            </Col>
            <Col lg={6} md={6} sm={12} xs={12}>
            <Form.Group className="mb-3">
                <Form.Label htmlFor='modulename'>ModuleName
                  <Tooltip title="enter alphanumberic"><IconButton><HelpIcon/></IconButton></Tooltip>
                </Form.Label>
                <Form.Control type="text" id='modulename' name="modulename" value={modulename || ""} placeholder="enter module name" onChange={handleInputChange}/>
            </Form.Group>
            </Col>
            <Col lg={6} md={6} sm={12} xs={12}>
            <Form.Group className="mb-3">
                <Form.Label htmlFor='moduleimage'>Image
                <Tooltip title="only image"><IconButton size="small"><HelpIcon/></IconButton></Tooltip>
                </Form.Label>
                <Form.Control type="text" id='moduleimage' name="moduleimage" value={moduleimage || ""} placeholder="Upload Image..." onChange={handleInputChange}/>
            </Form.Group>
            </Col>
            <Col lg={6} md={6} sm={12} xs={12}>
            <Form.Group className="mb-4">
                <Form.Label htmlFor='moduleduration'>Duration
                <Tooltip title="only months"><IconButton size="small"><HelpIcon/></IconButton></Tooltip>
                </Form.Label>
                <Form.Control type="text" id='moduleduration' name="moduleduration" value={moduleduration || ""} placeholder="durations in month" onChange={handleInputChange}/>
            </Form.Group>
            </Col>
            <Form.Group className="mb-3">
                <Form.Label htmlFor='moduledescription'>Description
                <Tooltip title="about your course identification"><IconButton size="small"><HelpIcon/></IconButton></Tooltip>
                </Form.Label>
                <Form.Control type='textarea' id='moduledescription' name='moduledescription' value={moduledescription || ""} placeholder='Write here...' onChange={handleInputChange}/>
                {/* <TextEditor/> */}
            </Form.Group>
          </Row>
			    <button className="assesmentAddButton" type='submit' value={id? "update" : "save"} >Create</button>
      </form>
        </Modal.Body>
      
      </Modal>
    </>
  );
}

export default AssesmentModal;