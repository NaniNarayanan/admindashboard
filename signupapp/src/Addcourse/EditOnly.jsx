import React from 'react';
import '../../src/pages/courses/addcourse.css';

const EditOnly = ({editFormData, handleEditFormChange, handleCancelClick}) => {


  return (
    <tr>
      <td><input type="text" name="CourseName" required="required" value={editFormData.CourseName} placeholder="Enter a Course name" onChange={handleEditFormChange}/></td>
      <td><input type="text" name="CoreSubject" required="required" value={editFormData.CoreSubject} placeholder="Enter a Core name" onChange={handleEditFormChange}/></td>
      <td><input type="text" name="ElectiveSubject" required="required" value={editFormData.ElectiveSubject} placeholder="Enter a Elective name" onChange={handleEditFormChange}/></td>
      <td><input type="text" name="DatabaseSubject" required="required" value={editFormData.DatabaseName} placeholder="Enter a Database name" onChange={handleEditFormChange}/></td>
      <td><input type="text" name="TotalLesson" required="required" value={editFormData.TotalLesson} placeholder="Enter a Total lesson" onChange={handleEditFormChange}/></td>
      <td><input type="text" name="Duration" required="required" value={editFormData.Duration} placeholder="Enter a Duration in month" onChange={handleEditFormChange}/></td>
      <td>
        <button type='submit'>Save</button>
        <button type='submit' onClick={handleCancelClick}>Cancel</button>
      </td>

    </tr>
  )
}

export default EditOnly