import React, { useEffect, useState } from 'react'
// import '../../../src/pages/assesment/subtopicslist.css'
import '../../../../src/pages/assesment/Components/practicequestionslist.css';
import { DataGrid } from '@mui/x-data-grid';
import  DeleteOutlineIcon  from '@material-ui/icons/DeleteOutline';
// import { subtopicsData } from '../../../src/pages/assesment/moduleData';
import { Link, useLocation } from 'react-router-dom';
// import AddModal from './Components/AddModal';
// import SubContentModal from './Components/SubContentModal';
import axios from 'axios';
import { toast } from 'react-toastify';
import QuestionsModal from './QuestionsModal';


  const PracticeQuestionsList = () => {

  const location = useLocation()
  const subtopicid =   location.pathname.split('/')[4]

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
    if(
      window.confirm("Are you sure wants to the delete...?")
    ){
      axios.delete(`http://localhost:8081/api/questionremove/${id}`);
      toast.success("Deleted Successfully");
      setTimeout(() => moudleFetch(), 500);
    }
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
                    <Link to={"/assesment/assesmentsubtopics/practicequestions/questionsmodal/"+params.row.id}>
                    <button className="subtopicslistEdit">Edit</button>
                    </Link>
                    <DeleteOutlineIcon className="subtopicslistDelete" onClick={()=>deleteModule(params.row.id)}/>
                    </>
                );
            },
          },
      ];

  return (
    <div className="subtopicsList">
            <div style={{marginLeft:"80%"}}>
                <QuestionsModal/>
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

export default PracticeQuestionsList;

