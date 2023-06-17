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
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import HelpIcon from '@material-ui/icons/Help';
import KeyboardDoubleArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import axios from 'axios';
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { MDBCol, MDBIcon } from "mdb-react-ui-kit";



 const AddAssesment = () =>{
    const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const location = useLocation()
  const moduleid = location.pathname.split('/')[5]
  const courseid = location.pathname.split('/')[6]
  const coursename = location.pathname.split('/')[7]
  const modulename = location.pathname.split('/')[8]

  const course = coursename.replaceAll('%20',' ')
  const modules = modulename.replaceAll('%20',' ')

// const initialState = {
//   moduleid:moduleid
// }

const [module, setModule] = useState(moduleid);
const [question, setQuestion] = useState();
const [options, setOptions] = useState(['', '', '', '']);
const [answer, setAnswer] = useState('');

console.log(module);

const handleOptionChange = (index, value) => {
  const updatedOptions = [...options];
  updatedOptions[index] = value;
  setOptions(updatedOptions);
};

const handleSubmit = (e) => {
  e.preventDefault()
  const newQuestion = {
    module,
    question,
    optiona: options[0],
    optionb: options[1],
    optionc: options[2],
    optiond: options[3],
    answer,
  };

  axios.post('http://localhost:8081/api/questions', newQuestion)
    .then(() => {
        toast.success("Course Added Successfully")
    })
    .catch((err)=>toast.error(err.res.data));
};

const [data, setData] = useState([]); 

const moudleFetch = async() =>{
    
    const res = await axios.get(`http://localhost:8081/api/getmcq/${moduleid}`)
    setData(res.data);
    console.log(data)
}
useEffect(()=>{


  moudleFetch()
},[])

const [query, setQuery] = useState("");

const search = (data) =>{
  return data.filter((field)=>field.questions.toLowerCase().includes(query));
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
    { field: 'id', headerName: 'ID', width: 60 },
    { field: 'moduleid', headerName: 'Module ID', width: 120, },
    { field: 'questions', headerName: 'Questions', width: 300 },
    { field: 'optiona', headerName: 'Option A', width: 200 },
    { field: 'optionb', headerName: 'Option B', width: 200 },
    { field: 'optionc', headerName: 'Option C', width: 200 },
    { field: 'optiond', headerName: 'Option D', width: 200 },
    { field: 'answer', headerName: 'answer', width: 200 },
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
            <Link style={{fontSize:"14px", textDecoration:"none"}} to="/home/courses/add">Courses- {course}<KeyboardDoubleArrowRightIcon/></Link>
            <Link style={{fontSize:"14px", textDecoration:"none"}} to="/home/courses/add">Module- {modules}<KeyboardDoubleArrowRightIcon/></Link>
            <p style={{fontSize:"14px", textDecoration:"none"}}>All {modules} Assesments</p>
            </div>
            <div style={{textAlign:"center", marginTop:"5%"}}>
              <h1 style={{letterSpacing:"3px"}}>Assesment Management</h1>
              <div style={{width:"800px", borderBottom:"2px solid black", marginLeft:"300px"}}></div>
            </div>
            <Button  className="addButton" variant="primary" onClick={handleShow}>
                    Add Assesment
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
    <Modal show={show}  onHide={handleClose} size="lg">
        <Modal.Header  closeButton>
          <Modal.Title>Add Assesment Questions</Modal.Title>
        </Modal.Header>
        <form onSubmit={handleSubmit} method="post">
        <div style={{marginLeft:"5%", padding:"2%", margin:"3px"}}> 
        <label htmlFor="question">ModuleId:</label>
        <input
        style={{width:"50%", marginLeft:"5%"}}
        type="text"
        placeholder="Question"
        value={moduleid}
        onChange={(e) => setModule(e.target.value)}
      />
      </div>
         <div style={{marginLeft:"5%", padding:"2%", margin:"3px"}}> 
        <label htmlFor="question">Question:</label>
        <input
        style={{width:"50%", marginLeft:"5%"}}
        type="text"
        placeholder="Question"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      />
      </div>
      
      {options.map((option, index) => (
        <div key={index} style={{marginLeft:"5%", padding:"2%", margin:"3px"}}>
        <label htmlFor={`Option ${index + 1}`}>Option:</label>
        <input
          style={{width:"50%", marginLeft:"7%"}}
          type="text"
          id={`Option ${index + 1}`}
          placeholder={`Option ${index + 1}`}
          value={option}
          onChange={(e) => handleOptionChange(index, e.target.value)}
        />
        </div>
      ))}
      
      <div style={{marginLeft:"5%", padding:"2%", margin:"3px"}}>
        <label htmlFor="answer">Answer:</label>
        <input 
        style={{width:"50%", marginLeft:"6%"}}
        type="text"
        id="answer"
        placeholder="correct answer"
        value={answer} 
        onChange={(e) => setAnswer(e.target.value)}
        />
      </div>
      <button type="submit" className="btn btn-primary" style={{margin:"10px"}} onClick={handleClose}>Submit</button>
    </form>
    </Modal>
    </div>
                
            </div>
        </div>
    );
};

export default AddAssesment;