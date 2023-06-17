import React, { useState, Fragment, useEffect } from "react";
import '../../../src/pages/courses/addcourse.css';
import Sidebar from "../../../src/components/Sidebar";
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { DataGrid } from '@mui/x-data-grid';
import  DeleteOutlineIcon  from '@material-ui/icons/DeleteOutline';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import KeyboardDoubleArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import HelpIcon from '@material-ui/icons/Help';
import axios from 'axios';
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { MDBCol, MDBIcon } from "mdb-react-ui-kit";



 const AddQuestions = () =>{
    const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const location = useLocation()
  const subtopicid = location.pathname.split('/')[5]
  const moduleid =   location.pathname.split('/')[8]
  const courseid =   location.pathname.split('/')[6]
  const coursename =   location.pathname.split('/')[7]
  const modulename =   location.pathname.split('/')[9]
  const subtopicname =   location.pathname.split('/')[10]

  const course = coursename.replaceAll('%20',' ')
  const module = modulename.replaceAll('%20',' ')
  const topic = subtopicname.replaceAll('%20',' ')

  const initialState = ({
    subtopicid: subtopicid,
    questionid:"",
    questions:"",
    level:"",
    testcase:"",
  })

// server connections
  const navigate = useNavigate;

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

const handleInputChange = (e) =>{
  const { name, value} = e.target;
  setState({...state, [name]: value});
}

//fetch data from mysql
const [data, setData] = useState([]);

const moudleFetch = async() =>{
    
    const res = await axios.get(`http://localhost:8081/getquestion/${subtopicid}`)
    setData(res.data);
    console.log(data)
}
useEffect(()=>{
  moudleFetch()
},[])
  
const deleteModule = (id) =>{

    Swal.fire({
      title: 'Do you want to Delete the Course?',
      showCancelButton: true,
      confirmButtonText: 'Yes',
     
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
  
  
        try{
            axios.delete(`http://localhost:8081/api/questionremove/${id}`);
          window.location.reload()
      }catch(err){
        console.log(err)
      }
        Swal.fire('Deleted Successfully!', '', 'success')
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info')
      }
    })
  
  }

  const [query, setQuery] = useState("");

const search = (data) =>{
  return data.filter((field)=>field.questions.toLowerCase().includes(query) ||
  field.level.toLowerCase().includes(query)
  );
}

  const columns = [
    { field: 'id', headerName: 'ID', width: 60 },
    { field: 'subtopicid', headerName: 'Topic ID', width: 120, },
    { field: 'questionid', headerName: 'Question ID', width: 120, },
    { field: 'questions', headerName: 'Questions', width: 200 },
    { field: 'level', headerName: 'Level', width: 200 },
    { field: 'testcase', headerName: 'TestCase', width: 160, },
    { field: 'action', headerName: 'Action',  width: 240,
        renderCell: (params)=>{
            return (
                <>
                <Link to={"/courses/add/topic/questions/"+params.row.id}>
                <EditOutlinedIcon onClick={handleShow}/>
                </Link>
                <DeleteOutlineIcon className="subtopicslistDelete" onClick={()=>deleteModule(params.row.id)}/>
                </>
            );
        },
      },
  ];

    return(
        <div className="courses">
            <Sidebar/>
            <div style={{display:"flex", gap:"10px", position:"absolute", marginLeft:"10px"}}>
            <Link style={{fontSize:"14px", textDecoration:"none"}} to="/home">Home<KeyboardDoubleArrowRightIcon/></Link>
            <Link style={{fontSize:"14px", textDecoration:"none"}} to="/home/courses">Course<KeyboardDoubleArrowRightIcon/></Link>
            <Link style={{fontSize:"14px", textDecoration:"none"}} to="/home/courses/add">Add Course<KeyboardDoubleArrowRightIcon/></Link>
            <Link style={{fontSize:"14px", textDecoration:"none"}} to="/courses/add">Courses<KeyboardDoubleArrowRightIcon/>{course}<KeyboardDoubleArrowRightIcon/></Link>
            <Link style={{fontSize:"14px", textDecoration:"none"}} to={`/courses/add/module/${courseid}/${coursename}`}>Module-{module}<KeyboardDoubleArrowRightIcon/></Link>
            <Link style={{fontSize:"14px", textDecoration:"none"}} to={`/courses/add/topic/${moduleid}${courseid}/${coursename}/${modulename}`}>Topic-{topic}<KeyboardDoubleArrowRightIcon/></Link>
            <p style={{fontSize:"14px", textDecoration:"none"}}>All {topic} Questions</p>
            </div>

            <div style={{textAlign:"center", marginTop:"5%"}}>
              <h1 style={{letterSpacing:"3px"}}>Practice Questions Management</h1>
              <div style={{width:"800px", borderBottom:"2px solid black", marginLeft:"300px"}}></div>
            </div>
            <Button  className="addButton" variant="primary" onClick={handleShow}>
                    Add Questions
            </Button>
            <MDBCol md="6" className="search">
      <div className="input-group md-form form-sm form-1 pl-0">
        <div className="input-group-prepend">
          <span className="input-group-text btn-primary" id="basic-text1">
            <MDBIcon className="text-white" icon="search" />
          </span>
        </div>
        <input
          className="form-control my-0 py-1"
          type="text"
          placeholder="Search by Question Name"
          onChange={(e)=>setQuery(e.target.value)}
          aria-label="Search"
        />
      </div>
            </MDBCol>
            <div className="container" style={{marginTop:"-10px", marginLeft:"5%"}}>
            <div className="courseList" style={{ height: 450, width: '100%' }}>
         <DataGrid
        rows={search(data)} disableRowSelectionOnClick
        columns={columns}
        pageSize={6}
        initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
        rowsPerPageOptions={[5]}
        // checkboxSelection
      />
        </div>              
          <div style={{width:"1000px"}}>      
    <Modal show={show}  onHide={handleClose} size="xl">
        <Modal.Header  closeButton>
          <Modal.Title>Add Questions</Modal.Title>
        </Modal.Header>
        <form className="assesmentAddForm" onSubmit={handleSubmit}>
        <Modal.Body>
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
        </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" type="submit" value={id ? "update" : "save"} onClick={handleClose}>
                Save
              </Button>
            </Modal.Footer>
            </form>
    </Modal>
    </div>
                
            </div>
        </div>
    );
};

export default AddQuestions;