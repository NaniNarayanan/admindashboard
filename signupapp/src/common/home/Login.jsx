import React, { useEffect } from 'react'
import '../../../src/common/home/login.css'
import { useState } from 'react'
import {regexValidator, passwordValidator} from '../../../src/components/regexValidator'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'

const Login = () => {
  // const adminname ="admin@gmail.com"
  // const adminpass = "1234"
  // const [values,setvalues] = useState({
  //   email:'',
  //   password: ''
  // })
  const [input, setInput] = useState({email:"", password:""})
  const navigate = useNavigate()

  const handleChange = (e) =>{
       setInput({...input,[e.target.name]:e.target.value})
  };

  // React.useEffect(() =>{
  //   if(localStorage.getItem('auth')) navigate('/')
  // },[])

//   axios.defaults.withCredentials=true;
//   useEffect(()=>{
//     axios.get('http://localhost:8081/getusername')
//     .then(res=>{
//         if(res.data.valid){
//             navigate('/studentdashboard')
//         }else{
//              navigate('/')
//         }
//     })
//     .catch(err=>console.log(err))
// },[]) 

  React.useEffect(() =>{
    if(localStorage.getItem('auth')) navigate('/')
  },[])

const formSubmitter=(event)=>{
  event.preventDefault();
  if(input.email == 'admin@a.com' && input.password == 'Pass@1234'){
    navigate('/home')
    toast.success("Login Successfully")
    localStorage.setItem('auth',true)
  }else {
    axios.post('http://localhost:8081/login',input)
    .then(res=>{
      if(res.data.Login){
        navigate('/studentdashboard')
        toast.success("Login Successfully")
      }else{
        toast.error("wrong username or password")
      }
    })
    .catch(err=>console.log(err))
  }
}


  // const [input, setInput] = useState({email:"", password:""})

  // const [errorMessage, setErrorMessage] = useState('')
  // const [successMessage, setSuccessMessage] = useState('');

  // const handleChange = (e) =>{
  //   setInput({...input,[e.target.name]:e.target.value})
  // };

  // React.useEffect(() =>{
  //   if(localStorage.getItem('auth')) navigate('/')
  // },[])

  // const formSubmitter = (e) =>{
  //   e.preventDefault()

  //   if(!regexValidator(input.email))
  //   return setErrorMessage('*Please enter valid email id');

  //   if(!passwordValidator(input.password))
  //   return setErrorMessage('*Please enter correct password');

  //   setSuccessMessage('Successfully validate')
  //     if(input.email == 'admin@a.com' && input.password == 'Pass@1234') {
  //       navigate('/dashboard');
  //       localStorage.setItem('auth', true);
  //       // return('Invalid email or password');
          
  //     }else if(input.email == 'student123@gmail.com' && input.password == 'Stud@1234'){
  //       navigate('/studentdashboard');
  //       localStorage.setItem('auth', true);
  //       // return('Invalid email or password');        

  //     }
  // }


  return (
    <>
        <section className="vh-100">
  <div className="container-fluid h-custom">
    <div className="row d-flex justify-content-center align-items-center h-100">
      <div className="col-md-9 col-lg-6 col-xl-5">
        <img src={require("../../../src/Assets/images/Exciting1.jpg")}
          className="img-fluid" alt={"Sample"}/>
      </div>
      <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
        <form className='login' autoComplete='off'>
          <div className="d-flex flex-row align-items-center justify-content-center justify-content-lg-start">
            <p className="lead fw-normal mb-0 me-3">Sign in with</p>
            <button type="button" className="btn btn-primary btn-floating mx-1">
              <i className="fab fa-github"></i>
            </button>

            <button type="button" className="btn btn-primary btn-floating mx-1">
              <i className="fab fa-google"></i>
            </button>

            <button type="button" className="btn btn-primary btn-floating mx-1">
              <i className="fab fa-linkedin-in"></i>
            </button>
          </div>

          <div className="divider d-flex align-items-center my-4">
            <p className="text-center fw-bold mx-3 mb-0">Or</p>
          </div>

          {/* <!-- Email input --> */}
          <div className="form-outline mb-4">
            <input type="email" name='email' id="form3Example3" className="form-control form-control-lg"
              placeholder="Enter a valid email address" onChange={handleChange}/>
            <label className="form-label" for="form3Example3">Email address</label>
          </div>

          {/* <!-- Password input --> */}
          <div className="form-outline mb-3">
            <input type="password" name='password' id="form3Example4" className="form-control form-control-lg"
              placeholder="Enter password" onChange={handleChange}/>
            <label className="form-label" for="form3Example4">Password</label>
          </div>
          {/* {errorMessage.length > 0 &&(
              <div style={{color:"red",marginBottom:"10px", fontSize:"1rem"}}>{errorMessage}</div>
            )} */}
          <div className="d-flex justify-content-between align-items-center">
            {/* <!-- Checkbox --> */}
            <div className="form-check mb-0">
              <input className="form-check-input me-2" type="checkbox" value="" id="form2Example3" />
              <label className="form-check-label" for="form2Example3">
                Remember me
              </label>
            </div>
            <a href="#!" className="text-body">Forgot password?</a>
          </div>

          <div className="text-center text-lg-start mt-4 pt-2">
            <button type="button" className="btn btn-primary btn-lg"
              style={{paddingleft: "2.5rem", paddingRight: "2.5rem"}} onClick={formSubmitter}>Login</button>
            <p className="small fw-bold mt-2 pt-1 mb-0">Don't have an account? <a href="/register"
                className="link-danger">Register</a></p>
          </div>

        </form>
      </div>
    </div>
  </div>
  <div
    class="d-flex flex-column flex-md-row text-center text-md-start justify-content-between py-4 px-5 px-xl-8 bg-primary">
    {/* <!-- Copyright --> */}
    <div class="text-white mb-3 mb-md-0">
      Copyright © 2023. All rights reserved.
    </div>
    {/* <!-- Copyright --> */}

    {/* <!-- Right --> */}
    <div>
      <a href="#!" className="text-white me-4">
        <i className="fab fa-github"></i>
      </a>
      <a href="#!" className="text-white me-4">
        <i className="fab fa-twitter"></i>
      </a>
      <a href="#!" className="text-white me-4">
        <i className="fab fa-google"></i>
      </a>
      <a href="#!" className="text-white">
        <i className="fab fa-linkedin-in"></i>
      </a>
    </div>
  </div>
</section>
    </>
  )
}

export default Login;