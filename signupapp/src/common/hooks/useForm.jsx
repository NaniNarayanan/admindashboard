import React, { useState } from 'react'

const useForm = (Validate) => {
  const[values,setValues] = useState({
    username:"",
    email:"",
    password:"",
    password2:""
  });

  const[errors,setErrors] = useState({})

  const handleChange = (e) => {
    
    const {name,value} = e.target;

    setValues((preValues) => {
        return{
            ...preValues,
            [name]:value,
        };
    });
  };
  const handleSubmit = (event) =>{
    event.preventDefault();

    setErrors(Validate(values));
    }

  return{handleChange, values, handleSubmit, errors};
};

export default useForm