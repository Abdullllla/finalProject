import React, { useState } from "react";
import styles from "./Register.module.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

const Register = () => {

  let navigate = useNavigate ()
  const[errorMessage, setErrorMessage] = useState("")
  const[isLoading, setIsLoading] = useState (false) 


  async function callRegister(reqBody) {
    console.log(reqBody);
    setErrorMessage("")
    setIsLoading(true)
    let {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signup`, reqBody)
    .catch(err => setErrorMessage(err.response.data.message))
    console.log(data ); 

    if (data.message === "success"){
      navigate('/login')
    }

  }



  const validationSchema = Yup.object({
    name: Yup.string().min(3,"Name is too short").max(10,"name is too long").required("name is required"),
    email: Yup.string().email('email not valied').required("email is required"),
    password: Yup.string().matches(/^[A-Z][a-z0-9]{3,8}$/,"invalied password").required("password required "),
    rePassword: Yup.string().oneOf([Yup.ref('password')],"password and repassword must much  ").required("Password required "),
    phone:Yup.string().matches(/^01[0125][0-9]{8}$/,"invalied phone").required("phone required "),
    age: Yup.number().min(10)
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

  const registerFrom = useFormik({
    initialValues: {
      name: "Abdalla",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },

    validationSchema, 
    //validate: bl7,
    onSubmit: callRegister
  });
  return (
    <>

       <Helmet>
        <title>Register page</title>
      </Helmet>

      <div className="w-50 mx-auto my-5">
        <h2 className="mb-3">Register Now :</h2>
        {errorMessage ? <div className="alert alert-danger">{errorMessage}</div> : null  }
        
        <form onSubmit={registerFrom.handleSubmit}>
          <div className="form-groupe mb-2">
            <label htmlFor="fullName" className="mb-1">
              FullName
            </label>
            <input
              type="text"
              name="name"
              id="fullName"
              className="form-control"
              value={registerFrom.values.name}
              onChange={registerFrom.handleChange}
              onBlur={registerFrom.handleBlur}

            />
            {registerFrom.errors.name && registerFrom.touched.name ? (
              <div className="alert alert-danger">
                {registerFrom.errors.name}
              </div>
            ) : null}
          </div>
          <div className="form-groupe mb-2">
            <label htmlFor="Email" className="mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="Email"
              className="form-control"
              value={registerFrom.values.email}
              onChange={registerFrom.handleChange}
               onBlur={registerFrom.handleBlur}

            />
            {registerFrom.errors.email && registerFrom.touched.email? (
              <div className="alert alert-danger">
                {registerFrom.errors.email}
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
              value={registerFrom.values.password}
              onChange={registerFrom.handleChange}
              onBlur={registerFrom.handleBlur}

            />
            {registerFrom.errors.password && registerFrom.touched.password ? (
              <div className="alert alert-danger">
                {registerFrom.errors.password}
              </div>
            ) : null}
          </div>
          <div className="form-groupe mb-2">
            <label htmlFor="Repassword" className="mb-1">
              RePasssword
            </label>
            <input
              type="password"
              name="rePassword"
              id="Repassword"
              className="form-control"
              value={registerFrom.values.rePassword}
              onChange={registerFrom.handleChange}
              onBlur={registerFrom.handleBlur}

            />
            {registerFrom.errors.rePassword && registerFrom.touched.rePassword? (
              <div className="alert alert-danger">
                {registerFrom.errors.rePassword}
              </div>
            ) : null}
          </div>
          <div className="form-groupe mb-2">
            <label htmlFor="Phone" className="mb-1">
              Phone
            </label>
            <input
              type="tel"
              name="phone"
              id="Phone"
              className="form-control"
              value={registerFrom.values.phone}
              onChange={registerFrom.handleChange}
              onBlur={registerFrom.handleBlur}
            />
            {registerFrom.errors.phone && registerFrom.touched.phone? (
              <div className="alert alert-danger">
                {registerFrom.errors.phone}
              </div>
            ) : null}
          </div>
          <button className="btn bg-main text-white d-block ms-auto" disabled={!(registerFrom.isValid && registerFrom.dirty)}>
            {isLoading ?  <i className="fa fa-spinner  fa-spin"> </i>  :  'Register '   }
          </button>
      
        </form>
      </div>
    </>
  );
};

export default Register;
