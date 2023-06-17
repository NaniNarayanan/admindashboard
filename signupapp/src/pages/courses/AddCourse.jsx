import React, { useState, Fragment, useEffect } from "react";
import '../../../src/pages/courses/addcourse.css';
import Sidebar from "../../../src/components/Sidebar";
import KeyboardDoubleArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { DataGrid } from '@mui/x-data-grid';
import  DeleteOutlineIcon  from '@material-ui/icons/DeleteOutline';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import { Link, useNavigate, useParams } from 'react-router-dom';
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import HelpIcon from '@material-ui/icons/Help';
import axios from 'axios';
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { MDBCol, MDBIcon } from "mdb-react-ui-kit";

const initialState = {
  courseid:"",
  coursename:"",
  courseimage:"",
  coursedescription:"",
  courseduration:''
}

 const AddCourse = () =>{
    const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

// server connections
  const navigate = useNavigate;

  const [state, setState] = useState(initialState);

  const { courseid, coursename, courseimage, coursedescription, courseduration } = state;

  const { id } = useParams(setState);

  useEffect(() =>{
    axios.get(`http://localhost:8081/api/get/${id}`)
    .then((resp) => setState({...resp.data[0]}));
  },[id]);

  const handleSubmit = (e) =>{
    e.preventDefault();
    if(!courseid || !coursename || !courseimage || !coursedescription || !courseduration){
        toast.error("Please provide value into each input field");
    }else{
    if(!id){
      axios.post("http://localhost:8081/api/post",{
          courseid,
          coursename,
          courseimage,
          coursedescription,
          courseduration
        }).then(()=>{
            setState({courseid:"",coursename:"",courseimage:"",coursedescription:"",courseduration:""});
        })
        .catch((err)=> toast.error(err.response.data));
        toast.success("Course Added Successfully")
     }else{
      axios.put(`http://localhost:8081/api/update/${id}`,{
          coursename,
          courseimage,
          coursedescription,
          courseduration
        }).then(()=>{
            setState({coursename:"",courseimage:"",coursedescription:"",courseduration:""});
        })
        .catch((err)=> toast.error(err.response.data));
        toast.success("Course Updated Successfully")
      }
      navigate('/assesment')
    }
}

const handleInputChange = (e) =>{
  const { name, value} = e.target;
  setState({...state, [name]: value});
}

//fetch data from mysql
const [data, setData] = useState([]);

const loadData = async () =>{
  const response = await axios.get("http://localhost:8081/api/get");
  setData(response.data);
}

useEffect(()=>{
  loadData();
},[]);

const [query, setQuery] = useState("");

const search = (data) =>{
  return data.filter((field)=>field.coursename.toLowerCase().includes(query) ||
  field.coursename.toLowerCase().includes(query) ||
  field.coursedescription.toLowerCase().includes(query) ||
  field.courseduration.toLowerCase().includes(query)
  );
}
  
const deleteContact = (id) =>{

  Swal.fire({
    title: 'Do you want to Delete the Course?',
    showCancelButton: true,
    confirmButtonText: 'Yes',
   
  }).then((result) => {
    /* Read more about isConfirmed, isDenied below */
    if (result.isConfirmed) {


      try{
        axios.delete(`http://localhost:8081/api/remove/${id}`);
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
        // { field: 'id', headerName:'ID', width: 60},
        { field: 'courseid', headerName: 'CourseId', width: 80 },
        { field: 'coursename', headerName: 'CourseName', width: 220 },
        { field: 'courseimage', headerName: 'CourseImage', width: 140,
        renderCell: (params)=>{
          return(
          <div className='assesmentViewField'>
              <img style={{display:"flex", alignItems:"center", borderRadius:"5px", width:"50%"}} src={params.row.courseimage} alt="" />
          </div>
          )
        }
        },
        { field: 'coursedescription', headerName: 'Description', width: 260 },
        { field: 'courseduration', headerName: 'Duration', width: 130 },
        { field: 'action', headerName: 'Action', width: 150,
           renderCell: (params)=>{
                return (
                    <>
                    <Link to={`/courses/add/update/${params.row.id}`}>
                        <EditOutlinedIcon onClick={handleShow}/>
                    </Link>
                    <DeleteOutlineIcon className="userListDelete"
                    onClick={()=> deleteContact(params.id)}/>
                    <Link to={`/courses/add/module/${params.row.courseid}/${params.row.coursename}`}>ADD MODULE</Link>
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
            </div>

            <div style={{textAlign:"center"}}>
              <h1 style={{letterSpacing:"3px"}}>Course Management</h1>
              <div style={{width:"800px", borderBottom:"2px solid black", marginLeft:"300px"}}></div>
            </div>
            <Button  className="addButton" variant="primary" onClick={handleShow}>
                    Add Course
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
          placeholder="Search by Course Name"
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
                
    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>ADD COURSE</Modal.Title>
        </Modal.Header>
    <form className="form" onSubmit={handleSubmit}>
        <Modal.Body>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label htmlFor="courseid">Course Id
                  <Tooltip title="enter alphanumberic"><IconButton><HelpIcon/></IconButton></Tooltip>
                </Form.Label>
            <Form.Control type="text" name="courseid" placeholder="enter course id"  value={courseid || ""} onChange={handleInputChange}/>    
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label htmlFor="coursename">Course Name
                <Tooltip title="course name"><IconButton size="small"><HelpIcon/></IconButton></Tooltip>
                </Form.Label>
                <Form.Control type="text" name="coursename" placeholder="enter course name" value={coursename || ""} onChange={handleInputChange}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label htmlFor="courseimage">Image
                <Tooltip title="only image"><IconButton size="small"><HelpIcon/></IconButton></Tooltip>
                </Form.Label>
                <Form.Control type="text" name="courseimage" placeholder="Upload Image..." value={courseimage || ""} onChange={handleInputChange}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label htmlFor="coursedescription">Description
                <Tooltip title="about your course identification"><IconButton size="small"><HelpIcon/></IconButton></Tooltip>
                </Form.Label>
                <Form.Control as="textarea" rows={3} name="coursedescription" value={coursedescription || ""} onChange={handleInputChange}/>
            </Form.Group>
            <Form.Group className="mb-4" controlId="formBasicEmail">
                <Form.Label htmlFor="courseduration">Duration
                <Tooltip title="only months"><IconButton size="small"><HelpIcon/></IconButton></Tooltip>
                </Form.Label>
                <Form.Control type="text" name="courseduration" placeholder="durations in month" value={courseduration || ""} onChange={handleInputChange}/>
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
    );
};

export default AddCourse;