import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import HelpIcon from '@material-ui/icons/Help';
import Modal from 'react-bootstrap/Modal';
import "../../../../src/pages/assesment/Components/subcontentmodal.css";
import axios from 'axios';
import { toast } from 'react-toastify';
import { useLocation, useParams } from 'react-router-dom';
// import TextEditor from '../../../../src/TextEditor/TextEditor';



function SubContentModal(props) {
  const values = [true];
  const [fullscreen, setFullscreen] = useState(true);
  const [show, setShow] = useState(false);

  const location = useLocation()
  const moduleid = location.pathname.split('/')[4]
  // const id = location.pathname.split('/')[5]
  const initialState = ({
    moduleid: moduleid,
    subtopicid:"",
    subtopicname:"",
    subtopicdocument:"",
    subtopicimage:"",
    subtopicvideo:"",
    subtopicduration:"",
    subtopicdescription:""
  })

  const [state, setState] = useState(initialState);

  const { id } = useParams(setState);
  useEffect(() =>{
    axios.get(`http://localhost:8081/api/subtopicget/${id}`)
    .then((resp) => setState({...resp.data[0]}));
  },[id]);

  const { subtopicid, subtopicname, subtopicdocument, subtopicimage, subtopicvideo, subtopicduration, subtopicdescription } = state;

  const handleSubmit = (e) =>{
    e.preventDefault();
    if( !subtopicid || !subtopicname || !subtopicdocument || !subtopicimage || !subtopicvideo || !subtopicduration || !subtopicdescription){
      toast.error("Please provide value into each input field");
      console.log("error")
    }else{
      axios.post("http://localhost:8081/api/subtopicpost",{
        moduleid,
        subtopicid,
        subtopicname,
        subtopicdocument,
        subtopicimage,
        subtopicvideo,
        subtopicduration,
        subtopicdescription
      }).then(()=>{
        setState({ moduleid:"", subtopicid:"", subtopicname:"", subtopicdocument:"", subtopicimage:"", subtopicvideo:"",
        subtopicduration:"", subtopicdescription:""})
      })
      .catch((err)=> toast.error(err.response.data));
      toast.success("Subtopic Added Successfully")
    }
    if(!id){
      
    }else{
      try {
        axios.put(`http://localhost:8081/api/subtopicupdate/${id}`,state)
        toast.success("Suptopic Updated Successfully")
      } catch(error){
        console.log(error)
      }
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

  return (
    <>
    
      {values.map((v, idx) => (
        <Button key={idx} variant='info' style={{marginTop:"5px", marginLeft:"10px"}} className="me-2 mb-2" onClick={() => handleShow(v)}>
          Add Sub Topics
          {typeof v === 'string' && `below ${v.split('-')[0]}`}
        </Button>
      ))}
    
      <Modal show={show} fullscreen={fullscreen} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>add sub topics</Modal.Title>
        </Modal.Header>
        
        <Modal.Body>
        <form className="assesmentAddForm" onSubmit={handleSubmit}>
          <Row>
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
                <Form.Label htmlFor='subtopicid'>Topic Id
                  <Tooltip title="enter alphanumberic"><IconButton><HelpIcon/></IconButton></Tooltip>
                </Form.Label>
                <Form.Control type="text" id='subtopicid' name="subtopicid" value={subtopicid || ""} placeholder="enter topic id" onChange={handleInputChange}/>
            </Form.Group>
            </Col>
            <Col lg={6} md={6} sm={12} xs={12}>
            <Form.Group className="mb-3">
                <Form.Label htmlFor='subtopicname'>Topic Name
                  <Tooltip title="enter alphanumberic"><IconButton><HelpIcon/></IconButton></Tooltip>
                </Form.Label>
                <Form.Control type="text" id='subtopicname' name="subtopicname" value={subtopicname || ""} placeholder="enter topic name" onChange={handleInputChange}/>
            </Form.Group>
            </Col>
            <Col lg={6} md={6} sm={12} xs={12}>
            <Form.Group className="mb-3">
                <Form.Label htmlFor='subtopicimage'>Topic Image
                <Tooltip title="only image"><IconButton size="small"><HelpIcon/></IconButton></Tooltip>
                </Form.Label>
                <Form.Control type="text" id='subtopicname' name="subtopicimage" value={subtopicimage || ""} placeholder="Upload Image..." onChange={handleInputChange}/>
            </Form.Group>
            </Col>
            <Col lg={6} md={6} sm={12} xs={12}>
            <Form.Group className="mb-3">
                <Form.Label htmlFor='subtopicdocument'>Topic File
                <Tooltip title="only files"><IconButton size="small"><HelpIcon/></IconButton></Tooltip>
                </Form.Label>
                <Form.Control type="text" id='subtopicdocument' name="subtopicdocument" value={subtopicdocument || ""} placeholder="Upload Files..." onChange={handleInputChange}/>
            </Form.Group>
            </Col>
            <Col lg={6} md={6} sm={12} xs={12}>
            <Form.Group className="mb-3">
                <Form.Label htmlFor='subtopicvideo'>Topic Video
                <Tooltip title="only video"><IconButton size="small"><HelpIcon/></IconButton></Tooltip>
                </Form.Label>
                <Form.Control type="text" id='subtopicvideo' name="subtopicvideo" value={subtopicvideo || ""} placeholder="Upload Video..." onChange={handleInputChange}/>
            </Form.Group>
            </Col>
            <Col lg={6} md={6} sm={12} xs={12}>
            <Form.Group className="mb-4">
                <Form.Label htmlFor='subtopicduration'>Duration
                <Tooltip title="only months"><IconButton size="small"><HelpIcon/></IconButton></Tooltip>
                </Form.Label>
                <Form.Control type="text" id='subtopicduration' name="subtopicduration" value={subtopicduration || ""} placeholder="durations in month" onChange={handleInputChange}/>
            </Form.Group>
            </Col>
            <Form.Group className="mb-3">
                <Form.Label htmlFor='subtopicdescription'>Description
                <Tooltip title="about your course identification"><IconButton size="small"><HelpIcon/></IconButton></Tooltip>
                </Form.Label>
                <Form.Control type="textarea" id='subtopicdescription' name="subtopicdescription" value={subtopicdescription || ""} placeholder="durations in month" onChange={handleInputChange}/>
                {/* <TextEditor/> */}
            </Form.Group>
          </Row>
			    <button className="assesmentAddButton" value={id? "save" : "update"}>Create</button>
      </form>
        </Modal.Body>
      
      </Modal>
    </>
  );
}

export default SubContentModal;