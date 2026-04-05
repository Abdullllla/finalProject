import React, {useContext, useState} from 'react';

import styles from './Login.module.css'
import { useNavigate} from 'react-router-dom';
import * as Yup from 'yup'
import axios from 'axios';
import { useFormik } from 'formik';
import { TockenContext } from '../../Context/Token';
import { Helmet } from 'react-helmet';

const Login = () => {
  let navigate = useNavigate ()
  const[errorMessage, setErrorMessage] = useState("")
  const[isLoading, setIsLoading] = useState (false)

  let {setToken} = useContext(TockenContext)

  async function callLogin(reqBody) {

    setErrorMessage("")
    setIsLoading(true)
    let {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signin`, reqBody)
    .catch(err => setErrorMessage(err.response.data.message))
    if (data.message === "success"){
      localStorage.setItem("userToken", data.token)
      setToken(data.token)
      navigate('/home')
    }

  }



  const validationSchema = Yup.object({
    email: Yup.string().email('email not valied').required("email is required"),
    password: Yup.string().matches(/^[A-Z][a-z0-9]{3,8}$/,"invalied password").required("password required "),
  });

  /*function bl7 (values) {
    const errors ={};
    if(!values.name){
      errors.name ="Required"
    } else if (values.name.length < 3 ){
      errors.name ="Name is too short"
    }
       if(!values.email){
        errors.email ="Required" 
       } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email  = "invalied email"
       }
       
       if(!values.password){
        errors.password ="Required"
       } else if (!/^[A-Z][a-z0-9]{3,5}$/.test(values.password)){
        errors.password = "invalied Password"
       }

       if(!values.rePassword) {
        errors.rePassword = "Required"
       } else if (values.password != values.rePassword) {
        errors.rePassword ="password and repassword should much"
       }
       if(!values.phone){
        errors.phone ="Required"
       } else if (!/^01[0125][0-9]{8}$/.test(values.phone)){
        errors.phone = " phone is not valied"
        }

        return errors;
  } */

  const loginFrom = useFormik({
    initialValues: {
      email: "",
      password: ""
    },

    validationSchema, 
    //validate: bl7,
    onSubmit: callLogin
  });
  return (
    <>
       <Helmet>
        <title>login Page</title>
      </Helmet>

      <div className="w-50 mx-auto my-5">
        <h2 className="mb-3">LogIn Now :</h2>
        {errorMessage ? <div className="alert alert-danger">{errorMessage}</div> : null  }
        
        <form onSubmit={loginFrom.handleSubmit}>
          <div className="form-groupe mb-2">
            <label htmlFor="Email" className="mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="Email"
              className="form-control"
              value={loginFrom.values.email}
              onChange={loginFrom.handleChange}
               onBlur={loginFrom.handleBlur}

            />
            {loginFrom.errors.email && loginFrom.touched.email? (
              <div className="alert alert-danger">
                {loginFrom.errors.email}
              </div>
            ) : null}
          </div>
          <div className="form-groupe mb-2">
            <label htmlFor="Password" className="mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="Password"
              className="form-control"
              value={loginFrom.values.password}
              onChange={loginFrom.handleChange}
              onBlur={loginFrom.handleBlur}

            />
            {loginFrom.errors.password && loginFrom.touched.password ? (
              <div className="alert alert-danger">
                {loginFrom.errors.password}
              </div>
            ) : null}
          </div>
          <button className="btn bg-main text-white d-block ms-auto">
            {isLoading ?  <i className="fa fa-spinner  fa-spin"> </i>  :  'LogIn'   }
          </button>
      
        </form>
      </div>
    </>
  );
}

export default Login
