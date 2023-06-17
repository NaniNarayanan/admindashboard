import React, { useState, Fragment } from "react";
import '../../src/Enroll/enrollstudenthistory.css';
import Button from 'react-bootstrap/Button';
import { DataGrid } from '@mui/x-data-grid';
import  DeleteOutlineIcon  from '@material-ui/icons/DeleteOutline';
import { EnrollData } from "./enrollhistroydata";
import { Link } from 'react-router-dom';


 const EnrollStudentHistory = () =>{
    


  const [data, setData] = useState(EnrollData);

    const handleDelete = (id) =>{
        if(window.confirm('Are you sure to delete this record?'))
        setData(data.filter((item)=> item.id !== id));
    }

    const columns = [
        { field: 'id', headerName: 'ID', width: 60 },
        { field: 'StudentId', headerName: 'StudentId', width: 100 },
        { field: 'FullName', headerName: 'FullName', width: 120 },
        { field: 'MobileNumber', headerName: 'MobileNumber', width: 130 },
        { field: 'Email', headerName: 'Email', width: 180 },
        { field: 'City', headerName: 'City', width: 110 },
        { field: 'PaymentMode', headerName: 'PaymentMode', width: 130 },
        { field: 'action', headerName: 'Action', width: 150,
           renderCell: (params)=>{
                return (
                    <>
                    <Link to={"/student/enroll"+params.row.id}>
                    <button className="userListEdit">Edit</button>
                    </Link>
                    <DeleteOutlineIcon className="userListDelete" 
                    onClick={()=>handleDelete(params.row.id)}/>
                    </>
                );
            },
          },
      ];


    
    return(
        <div className="courses">
          <Link to="/student/enroll">
            <Button  className="addButton" variant="primary">
                    Enroll
                </Button>
          </Link>
            <div className="container" style={{marginTop:"-10px", marginLeft:"5%"}}>
            <div className="courseList" style={{ height: 450, width: '100%' }}>
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
        </div>
    );
};

export default EnrollStudentHistory;