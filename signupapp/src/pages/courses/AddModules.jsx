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



 const AddModules = () =>{
    const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const location = useLocation()
  const courseid = location.pathname.split('/')[4]
  const coursename = location.pathname.split('/')[5]
  // const modulename = location.pathname.split('/')[5]
  const course = coursename.replaceAll('%20',' ') 
  const initialState = ({
    courseid: courseid,
    moduleid: "",
    modulename: "",
    moduleimage: "",
    moduledescription: "",
    moduleduration: ""
  })

// server connections
  const navigate = useNavigate;

  const [state, setState] = useState(initialState);

  const {   moduleid, modulename, moduleimage, moduledescription, moduleduration } = state;
  
  const { id } = useParams(setState);
  useEffect(() =>{
    axios.get(`http://localhost:8081/api/moduleget/${id}`)
    .then((resp) => setState({...resp.data[0]}));
  },[id]);

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
        axios.put(`http://localhost:8081/api/moduleupdate/${id}`,{
          courseid,
          moduleid,
          modulename,
          moduleimage,
          moduledescription,
          moduleduration
        }).then(()=>{
            setState({ courseid:"", moduleid: "", modulename: "", moduleimage: "", moduledescription: "", moduleduration: "" });
        })
        .catch((err)=> toast.error(err.response.data));
        toast.success("Module Updated Successfully");
      }
  }

const handleInputChange = (e) =>{
  const { name, value} = e.target;
  setState({...state, [name]: value});
}

//fetch data from mysql
const [data, setData] = useState([]);

const moudleFetch = async() =>{
    
    const res = await axios.get(`http://localhost:8081/getmodule/${courseid}`)
    setData(res.data);
    console.log(data)
}
useEffect(()=>{


  moudleFetch()
},[])

const [query, setQuery] = useState("");

const search = (data) =>{
  return data.filter((field)=>field.modulename.toLowerCase().includes(query) ||
  field.modulename.toLowerCase().includes(query) ||
  field.moduledescription.toLowerCase().includes(query) ||
  field.moduleduration.toLowerCase().includes(query)
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
          axios.delete(`http://localhost:8081/api/moduleRemove/${id}`);
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
    { field: 'courseid', headerName: 'Course ID', width: 90 },
    { field: 'moduleid', headerName: 'Module ID', width: 120, },
    { field: 'modulename', headerName: 'Module Name', width: 200 },
    { field: 'moduleimage', headerName: 'Image', width: 140, renderCell:(params)=>{
        return(
            <div className='assesmentViewField'>
                <img className='assesmentViewImage' src={params.row.moduleimage} alt="" />
            </div>
        )
    }},
    { field: 'moduledescription', headerName: 'Description', width: 200, },
    { field: 'moduleduration', headerName: 'Duration', width: 100, },
    { field: 'action', headerName: 'Action', width: 260,
        renderCell: (params)=>{
            return (
                <>
                <Link to={"/courses/add/module/"+params.row.id+'/'+params.row.modulename}>
                <EditOutlinedIcon onClick={handleShow}/>
                </Link>
                <DeleteOutlineIcon className="assesmentViewDelete" onClick={()=>deleteModule(params.row.id)}/>
                <Link to={"/courses/add/topic/"+params.row.moduleid+'/'+params.row.courseid+'/'+coursename+'/'+params.row.modulename}>
                <button className="assesmentViewAdd">Add Topic</button>
                </Link>
                <Link to={"/courses/add/module/moduleassesment/"+params.row.moduleid+'/'+courseid+'/'+coursename+'/'+params.row.modulename}>
                <button className="assesmentViewAdd">+ Assesment</button>
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
            <Link style={{fontSize:"14px", textDecoration:"none"}} to="/home/courses/add">Courses<KeyboardDoubleArrowRightIcon/>{course}<KeyboardDoubleArrowRightIcon/></Link>
            <p style={{fontSize:"14px", textDecoration:"none"}}>All {course} modules</p>
            </div>

            <div style={{textAlign:"center", marginTop:"5%"}}>
              <h1 style={{letterSpacing:"3px"}}>Module Management</h1>
              <div style={{width:"800px", borderBottom:"2px solid black", marginLeft:"300px"}}></div>
            </div>
            <Button  className="addButton" variant="primary" onClick={handleShow}>
                    Add Module
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
          placeholder="Search by Module Name"
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
    <Modal show={show}  onHide={handleClose} size="lg">
        <Modal.Header  closeButton>
          <Modal.Title>ADD Module</Modal.Title>
        </Modal.Header>
        <form className="form" onSubmit={handleSubmit}>
        <Modal.Body>   
            <Form.Group className="mb-3">
                <Form.Label htmlFor='courseid'>Course Id
                  <Tooltip title="enter alphanumberic"><IconButton><HelpIcon/></IconButton></Tooltip>
                </Form.Label>
                <Form.Control  type="text" id='courseid' name="courseid" value={courseid || ""} placeholder="enter course id" onChange={handleInputChange}/>
            </Form.Group>
            
            
            <Form.Group className="mb-3">
                <Form.Label htmlFor='moduleid'>Module Id
                  <Tooltip title="enter alphanumberic"><IconButton><HelpIcon/></IconButton></Tooltip>
                </Form.Label>
                <Form.Control type="text" id='moduleid' name="moduleid" value={moduleid || ""} placeholder="enter module id" onChange={handleInputChange}/>
            </Form.Group>
            
            
            <Form.Group className="mb-3">
                <Form.Label htmlFor='modulename'>ModuleName
                  <Tooltip title="enter your module in text"><IconButton><HelpIcon/></IconButton></Tooltip>
                </Form.Label>
                <Form.Control type="text" id='modulename' name="modulename" value={modulename || ""} placeholder="enter module name" onChange={handleInputChange}/>
            </Form.Group>
            
            
            <Form.Group className="mb-3">
                <Form.Label htmlFor='moduleimage'>Image
                <Tooltip title="only image"><IconButton size="small"><HelpIcon/></IconButton></Tooltip>
                </Form.Label>
                <Form.Control type="text" id='moduleimage' name="moduleimage" value={moduleimage || ""} placeholder="Upload Image..." onChange={handleInputChange}/>
            </Form.Group>
            
            
            <Form.Group className="mb-4">
                <Form.Label htmlFor='moduleduration'>Duration
                <Tooltip title="only weeks"><IconButton size="small"><HelpIcon/></IconButton></Tooltip>
                </Form.Label>
                <Form.Control type="text" id='moduleduration' name="moduleduration" value={moduleduration || ""} placeholder="durations in month" onChange={handleInputChange}/>
            </Form.Group>
            
            <Form.Group className="mb-3">
                <Form.Label htmlFor='moduledescription'>Description
                <Tooltip title="about your module identification"><IconButton size="small"><HelpIcon/></IconButton></Tooltip>
                </Form.Label>
                <Form.Control as="textarea" rows={3} id='moduledescription' name='moduledescription' value={moduledescription || ""} placeholder='Write here...' onChange={handleInputChange}/>
                {/* <TextEditor/> */}
            </Form.Group>
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

export default AddModules;