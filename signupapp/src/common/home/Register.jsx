import React, { useState } from "react";
import Validation from "./Validate";
import "../../../src/App.css"
import {
    MDBBtn,
    MDBContainer,
    MDBCard,
    MDBCardBody,
    MDBInput,
    MDBCheckbox
  }
  from 'mdb-react-ui-kit';
  import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";

const Register=()=>{

    const [values,setValues]= useState({
      name:'',
      email:'',
      password:''
    })
    const navigate = useNavigate();
    const [errors, setErrors] = useState({})
    const handleInput = (event) =>{
        setValues(prev => ({...prev, [event.target.name]: [event.target.value]}))
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        setErrors(Validation(values));
        if(errors.name === "" && errors.email === "" && errors.password === "") {
            axios.post("http://localhost:8081/signup", values)
            .then(res =>{
                navigate('/')
            })
            .catch(err => console.log(err));
        }
    }
    console.log(values)


    return (
        <div style={{}}>
        <MDBContainer fluid className='d-flex align-items-center justify-content-center bg-image' style={{backgroundImage: 'url(https://mdbcdn.b-cdn.net/img/Photos/new-templates/search-box/img4.webp)',height:"100vh"}}>
      <div className='mask gradient-custom-3'></div>
      <MDBCard className='m-5' style={{maxWidth: '600px'}}>
        <MDBCardBody className='px-5'>
          <h2 className="text-uppercase text-center mb-5">Create an account</h2>



          <MDBInput wrapperClass='mb-4' name="name" onChange={handleInput} label='Your Name' size='lg' id='form1' type='text'/>{errors.name && <span className='text-danger'>{errors.name}</span>}
          <MDBInput wrapperClass='mb-4' name="email" onChange={handleInput} label='Your Email' size='lg' id='form2' type='email'/>{errors.email && <span className='text-danger'>{errors.email}</span>}
          <MDBInput wrapperClass='mb-4' name="password" onChange={handleInput} label='Password' size='lg' id='form3' type='password'/>{errors.password && <span className='text-danger'>{errors.password}</span>}



          <div className='d-flex flex-row justify-content-center mb-4'>
            <MDBCheckbox name='flexCheck' id='flexCheckDefault' label='I agree all statements in Terms of service' />
          </div>




          <MDBBtn className='mb-4 w-100 gradient-custom-4' size='lg' onClick={handleSubmit}>Register</MDBBtn>

          <div className="text-center">
          <nav>
            <Link to="/login">Login</Link>
        </nav>
          </div>
        </MDBCardBody>
      </MDBCard>
    </MDBContainer></div>
      );
}

export default Register;