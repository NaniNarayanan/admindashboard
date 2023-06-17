import React, { useEffect, useState } from 'react'
import '../../../src/pages/assesment/subtopicslist.css'
import { DataGrid } from '@mui/x-data-grid';
import  DeleteOutlineIcon  from '@material-ui/icons/DeleteOutline';
import { subtopicsData } from '../../../src/pages/assesment/moduleData';
import { Link, useLocation } from 'react-router-dom';
// import AddModal from './Components/AddModal';
import SubContentModal from './Components/SubContentModal';
import axios from 'axios';
import { toast } from 'react-toastify';


  const SubTopicsList = () => {

  const location = useLocation()
  const moduleid =   location.pathname.split('/')[4]

  const [data, setData] = useState([]);

  const moudleFetch = async() =>{
    
      const res = await axios.get(`http://localhost:8081/getsuptopics/${moduleid}`)
      setData(res.data);
      console.log(data)
  }
  useEffect(()=>{


    moudleFetch()
  },[])

  const deleteModule = (id) =>{
    if(
      window.confirm("Are you sure wants to the delete...?")
    ){
      axios.delete(`http://localhost:8081/api/subtopiremove/${id}`);
      toast.success("Deleted Successfully");
      setTimeout(() => moudleFetch(), 500);
    }
  }

    const columns = [
        { field: 'id', headerName: 'ID', width: 60 },
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
        { field: 'subtopicduration', headerName: 'Duration', width: 160, },
        { field: 'subtopicdescription', headerName: 'Duration', width: 160, },
        { field: 'action', headerName: 'Action',  width: 240,
            renderCell: (params)=>{
                return (
                    <>
                    <Link to={"/assesmentViewModal/assesmentSubTopics/subcontentmodal/"+params.row.id}>
                    <button className="subtopicslistEdit">Edit</button>
                    </Link>
                    <DeleteOutlineIcon className="subtopicslistDelete" onClick={()=>deleteModule(params.row.id)}/>
                    <Link to={"/assesment/assesmentsubtopics/practicequestions/"+params.row.subtopicid}>
                    <button className="assesmentViewAdd">Add Practice Question</button>
                    </Link>
                    </>
                );
            },
          },
      ];

  return (
    <div className="subtopicsList">
            <div style={{marginLeft:"80%"}}>
                <SubContentModal moduleid = {moduleid} />
            </div>
         <div className="subtopicsListGrid">
         <DataGrid
        rows={data} disableRowSelectionOnClick
        columns={columns}
        pageSize={5}
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
    </div>
  )
}

export default SubTopicsList;

