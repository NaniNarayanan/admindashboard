import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import "../../../src/pages/assesment/assesmentviewmodal.css";
import { DataGrid } from '@mui/x-data-grid';
import  DeleteOutlineIcon  from '@material-ui/icons/DeleteOutline';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
// import { moduleData } from '../../pages/assesment/moduleData';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import AssesmentModal from './AssesmentModal';
import axios from 'axios';
import { toast } from 'react-toastify';
import Swal from "sweetalert2"
import Sidebar from '../../components/Sidebar';


function AssesmentViewModal() {
  const values = [true];
  const [fullscreen, setFullscreen] = useState(true);
  const [show, setShow] = useState(false);

  const navigate = useNavigate()
  const location = useLocation()
  const courseid =   location.pathname.split('/')[2]

  const [data, setData] = useState([]);

  const moudleFetch = async() =>{
    
      const res = await axios.get(`http://localhost:8081/getmodule/${courseid}`)
      setData(res.data);
      console.log(data)
  }
  useEffect(()=>{


    moudleFetch()
  },[])

  

  // const loadData = async () =>{
  //   const response = await axios.get(`http://localhost:8081/api/getmodule/${courseid}`);
  //   setData(response.data);
  // }
  
  // useEffect(()=>{
  //   loadData();
  // },[]);
    // const deleteModule = (id) =>{
    //   if(
    //     window.confirm("Are you sure wants to the delete...?")
    //   ){
    //     axios.delete(`http://localhost:8081/api/moduleRemove/${id}`);
    //     toast.success("Deleted Successfully");
    //     setTimeout(() => moudleFetch(), 500);
    //   }
    // }

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
        { field: 'moduledescription', headerName: 'Description', width: 160, },
        { field: 'moduleduration', headerName: 'Duration', width: 160, },
        { field: 'action', headerName: 'Action', width: 220,
            renderCell: (params)=>{
                return (
                    <>
                    <Link to={"/assesmentmodal/"+params.row.courseid}>
                    <button className="assesmentViewEdit"><EditOutlinedIcon/></button>
                    </Link>
                    <DeleteOutlineIcon className="assesmentViewDelete" onClick={()=>deleteModule(params.row.id)}/>
                    <Link to={"/assesment/assesmentViewModal/assesmentSubTopics/"+params.row.moduleid}>
                    <button className="assesmentViewAdd">Add Sub Topic</button>
                    </Link>
                    </>
                );
            },
          },
      ];

  function handleShow(breakpoint) {
    setFullscreen(breakpoint);
    setShow(true);
  };

  

  return (
    <>
    <Sidebar/>
      {values.map((v, idx) => (
          <Button key={idx} variant='primary' style={{marginTop:"5px", marginLeft:"10px"}} className="me-2 mb-2" onClick={() => handleShow(v)}>
          View Module
          {typeof v === 'string' && `below ${v.split('-')[0]}`}
          </Button>
      ))}
      <Modal show={show} fullscreen={fullscreen} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>ADD Modules</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <h3>List of Modules</h3>
            <div className="assesmentDiv">
                <AssesmentModal courseid = {courseid}/>
            </div>
            <div className="assesmentViewList" style={{ height: 400, width: '100%' }}>
         <DataGrid
        rows={data} disableRowSelectionOnClick
        columns={columns}
        pageSize={7}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        rowsPerPageOptions={[5]}
        checkboxSelection
      />
        </div> 
        </Modal.Body>
      </Modal>
    </>
  );
}

export default AssesmentViewModal;