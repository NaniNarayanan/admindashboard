import React from 'react'
import '../../src/pages/courses/addcourse.css';
import * as BiIcons from "react-icons/bi";
import * as MdIcons from "react-icons/md"

const ReadOnly = ({detail, handleEditClick, handleDeleteClick}) => {
  return (
    
        <tr>
            <td>{detail.CourseName}</td>
            <td>{detail.CoreSubject}</td>
            <td>{detail.ElectiveSubject}</td>
            <td>{detail.DatabaseSubject}</td>
            <td>{detail.TotalLesson}</td>
            <td>{detail.Duration}</td>
            <td>
              <button type='button' class="btn btn-primary" onClick={(event) => handleEditClick(event, detail)}>Edit</button>
              <button type="submit" class="btn btn-danger" onClick={() => handleDeleteClick(detail.Id)}>Delete</button>
            </td>
        </tr>
    
  )
}

export default ReadOnly