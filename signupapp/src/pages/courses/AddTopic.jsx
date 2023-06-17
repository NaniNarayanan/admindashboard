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



 const AddTopic = () =>{
    const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const location = useLocation()
  const moduleid =   location.pathname.split('/')[4]
  const courseid =   location.pathname.split('/')[5]
  const coursename =   location.pathname.split('/')[6]
  const modulename =   location.pathname.split('/')[7]

  const course = coursename.replaceAll('%20',' ')
  const module = modulename.replaceAll('%20',' ')

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

// server connections
  const navigate = useNavigate;

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

const handleInputChange = (e) =>{
  const { name, value} = e.target;
  setState({...state, [name]: value});
}

//fetch data from mysql
const [data, setData] = useState([]);

const moudleFetch = async() =>{
    
    const res = await axios.get(`http://localhost:8081/getsuptopics/${moduleid}`)
    setData(res.data);
    console.log(data)
}
useEffect(()=>{


  moudleFetch()
},[])

const [query, setQuery] = useState("");

const search = (data) =>{
  return data.filter((field)=>field.subtopicname.toLowerCase().includes(query) ||
  field.subtopicdescription.toLowerCase().includes(query) ||
  field.subtopicduration.toLowerCase().includes(query)
  );
}

const deleteModule = (id) =>{

    Swal.fire({
      title: 'Do you want to Delete the Course?',
      showCancelButton: true,
      confirmButtonText: 'Yes',
     
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
  
  
        try{
            axios.delete(`http://localhost:8081/api/subtopiremove/${id}`);
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

  const columns = [
    // { field: 'id', headerName: 'ID', width: 60 },
    { field: 'moduleid', headerName: 'Module ID', width: 120, },
    { field: 'subtopicid', headerName: 'Topic ID', width: 120, },
    { field: 'subtopicname', headerName: 'Topic Name', width: 200 },
    { field: 'subtopicdocument', headerName: 'Topic File', width: 200 },
    { field: 'subtopicimage', headerName: 'Topic Image', width: 200,
    renderCell: (params)=>{
      return(
      <div className='assesmentViewField'>
          <img style={{display:"flex", alignItems:"center", borderRadius:"5px", width:"50%"}} src={params.row.subtopicimage} alt="" />
      </div>
      )
    }
    },
    { field: 'subtopicvideo', headerName: 'Topic Video', width: 200 },
    { field: 'subtopicduration', headerName: 'Duration', width: 100, },
    { field: 'subtopicdescription', headerName: 'Description', width: 160, },
    { field: 'action', headerName: 'Action',  width: 340,
        renderCell: (params)=>{
            return (
                <>
                <Link to={"/courses/add/topic/"+params.row.id+'/'+courseid+'/'+coursename+'/'+modulename+'/'+params.row.subtopicname}>
                <EditOutlinedIcon onClick={handleShow}/>
                </Link>
                <DeleteOutlineIcon className="subtopicslistDelete" onClick={()=>deleteModule(params.row.id)}/>
                <Link to={"/courses/add/topic/subtopic/"+params.row.subtopicid+'/'+moduleid+'/'+courseid+'/'+coursename+'/'+modulename+'/'+params.row.subtopicname}>
                <button className="assesmentViewAdd">Add Lesson</button>
                </Link>
                <Link to={"/courses/add/topic/questions/"+params.row.subtopicid+'/'+courseid+'/'+coursename+'/'+moduleid+'/'+modulename+'/'+params.row.subtopicname}>
                <button className="assesmentViewAdd">Add Practice Question</button>
                </Link>
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
            <p style={{fontSize:"14px", textDecoration:"none"}}>All {module} Topics</p>
            </div>

            <div style={{textAlign:"center", marginTop:"5%"}}>
              <h1 style={{letterSpacing:"3px"}}>Topics Management</h1>
              <div style={{width:"800px", borderBottom:"2px solid black", marginLeft:"300px"}}></div>
            </div>
            <Button  className="addButton" variant="primary" onClick={handleShow}>
                    Add Topics
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
          placeholder="Search by Topic Name"
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
          <Modal.Title>ADD Module</Modal.Title>
        </Modal.Header>
        <form className="form" onSubmit={handleSubmit}>
        <Modal.Body>
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
                <Form.Control as="textarea" rows={3} id='subtopicdescription' name="subtopicdescription" value={subtopicdescription || ""} placeholder="durations in month" onChange={handleInputChange}/>
                {/* <TextEditor/> */}
            </Form.Group>
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

export default AddTopic;