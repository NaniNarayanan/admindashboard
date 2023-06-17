import React, { useState } from 'react'
import Sidebar from '../../components/Sidebar';
import KeyboardDoubleArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import '../../../src/pages/instructor/instructorlist.css'
import { DataGrid } from '@mui/x-data-grid';
import  DeleteOutlineIcon  from '@material-ui/icons/DeleteOutline';
import { userRows } from '../../dummyData';
import { Link } from 'react-router-dom';

  const InstructorList = () => {

    const [data, setData] = useState(userRows);

    const handleDelete = (id) =>{
        setData(data.filter((item)=> item.id !== id));
    }

    const columns = [
        { field: 'id', headerName: 'ID', width: 60 },
        { field: 'InstructorName', headerName: 'InstructorName', width: 200, renderCell:(params)=>{
            return (
                <div className='userListUser'>
                    <img className='userListImg' src={params.row.avatar} alt="" />
                    {params.row.InstructorName}
                </div>
            )
        } },
        { field: 'email', headerName: 'Email', width: 200 },
        {
          field: 'Deaprtment',
          headerName: 'Deaprtment',
          width: 140,
        },
        {
            field: 'ActiveCourses',
            headerName: 'ActiveCourses',
            width: 160,
          },
        {
            field: 'Status',
            headerName: 'Status',
            width: 180,
          },
          {
            field: 'action',
            headerName: 'Action',
            width: 150,
            renderCell: (params)=>{
                return (
                    <>
                    <Link to={"/instructors/details/"+params.row.id}>
                    <button className="userListEdit">Edit</button>
                    </Link>
                    <DeleteOutlineIcon className="userListDelete" onClick={()=>handleDelete(params.row.id)}/>
                    </>
                );
            },
          },
      ];

  return (
    <div className="instructor">
            <Sidebar/>
        <div style={{display:"flex", gap:"10px", position:"absolute", marginLeft:"10px"}}>
            <Link style={{fontSize:"14px", textDecoration:"none"}} to="/home">Home<KeyboardDoubleArrowRightIcon/></Link>
            <Link style={{fontSize:"14px", textDecoration:"none"}} to="/home/instructors">Instructors<KeyboardDoubleArrowRightIcon/></Link>
            <Link style={{fontSize:"14px", textDecoration:"none"}} to="/home/instructors/overview">Instructors Overview<KeyboardDoubleArrowRightIcon/></Link>
            <Link style={{fontSize:"14px", textDecoration:"none"}} to="/home/instructors/overview/list">Instructors List</Link>
        </div>
            <Link to="/instructors">
                <button className="instructorListAddButton">Add</button>
                </Link>
         <div className="instList" style={{ height: 450, width: '100%' }}>
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

export default InstructorList;

