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



function QuestionsModal(props) {
  const values = [true];
  const [fullscreen, setFullscreen] = useState(true);
  const [show, setShow] = useState(false);

  const location = useLocation()
  const subtopicid = location.pathname.split('/')[4]
  // const id = location.pathname.split('/')[5]
  const initialState = ({
    subtopicid: subtopicid,
    questionid:"",
    questions:"",
    level:"",
    testcase:"",
  })

  const [state, setState] = useState(initialState);

  const { id } = useParams(setState);
  useEffect(() =>{
    axios.get(`http://localhost:8081/api/questionsget/${id}`)
    .then((resp) => setState({...resp.data[0]}));
  },[id]);

  const { questionid, questions, level, testcase } = state;

  const handleSubmit = (e) =>{
    e.preventDefault();
    if( !questionid || !questions || !level || !testcase){
      toast.error("Please provide value into each input field");
      console.log("error")
    }else{
      axios.post("http://localhost:8081/api/questionpost",{
        subtopicid,
        questionid,
        questions,
        level,
        testcase
      }).then(()=>{
        setState({ subtopicid:"", questionid:"", questions:"", level:"", testcase:""})
      })
      .catch((err)=> toast.error(err.response.data));
      toast.success("Questions Added Successfully")
    }
    if(!id){
      
    }else{
      try {
        axios.put(`http://localhost:8081/api/questionupdate/${id}`,state)
        toast.success("Questions Updated Successfully")
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
          Add Questions
          {typeof v === 'string' && `below ${v.split('-')[0]}`}
        </Button>
      ))}
    
      <Modal show={show} fullscreen={fullscreen} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Practice Questions</Modal.Title>
        </Modal.Header>
        
        <Modal.Body>
        <form className="assesmentAddForm" onSubmit={handleSubmit}>
          <Row>
            <Col lg={6} md={6} sm={12} xs={12}>
            <Form.Group className="mb-3">
                <Form.Label htmlFor='subtopicid'>Topic Id
                  <Tooltip title="enter alphanumberic"><IconButton><HelpIcon/></IconButton></Tooltip>
                </Form.Label>
                <Form.Control type="text" id='subtopicid' name="subtopicid" value={subtopicid || ""} placeholder="enter module id" onChange={handleInputChange}/>
            </Form.Group>
            </Col>
            <Col lg={6} md={6} sm={12} xs={12}>
            <Form.Group className="mb-3">
                <Form.Label htmlFor='questionid'>Question Id
                  <Tooltip title="enter alphanumberic"><IconButton><HelpIcon/></IconButton></Tooltip>
                </Form.Label>
                <Form.Control type="text" id='questionid' name="questionid" value={questionid || ""} placeholder="enter topic id" onChange={handleInputChange}/>
            </Form.Group>
            </Col>
            <Col lg={6} md={6} sm={12} xs={12}>
            <Form.Group className="mb-3">
                <Form.Label htmlFor='questions'>Questions
                  <Tooltip title="enter alphanumberic"><IconButton><HelpIcon/></IconButton></Tooltip>
                </Form.Label>
                <Form.Control type="text" id='questions' name="questions" value={questions || ""} placeholder="enter topic name" onChange={handleInputChange}/>
            </Form.Group>
            </Col>
            <Col lg={6} md={6} sm={12} xs={12}>
            <Form.Group className="mb-3">
                <Form.Label htmlFor='level'>Level
                <Tooltip title="Choose level"><IconButton size="small"><HelpIcon/></IconButton></Tooltip>
                </Form.Label>
                <Form.Select id='level' name='level' onChange={handleInputChange}>
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                </Form.Select>
            </Form.Group>
            </Col>
            <Col lg={6} md={6} sm={12} xs={12}>
            <Form.Group className="mb-3">
                <Form.Label htmlFor='testcase'>Test Case
                <Tooltip title="only files"><IconButton size="small"><HelpIcon/></IconButton></Tooltip>
                </Form.Label>
                <Form.Control type="text" id='testcase' name="testcase" value={testcase || ""} placeholder="Upload Files..." onChange={handleInputChange}/>
            </Form.Group>
            </Col>
          </Row>
			    <button className="assesmentAddButton" value={id? "save" : "update"}>Create</button>
      </form>
        </Modal.Body>
      
      </Modal>
    </>
  );
}

export default QuestionsModal;