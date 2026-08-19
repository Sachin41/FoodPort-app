import React, { useEffect } from 'react'
import "../styles/login.css"
import { Formik } from 'formik';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import * as Yup from "yup";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser } from "../slices/authSlice";


const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleNavigate = async (values, { setSubmitting, setStatus }) => {
    try {
      console.log("login", values)
      await axios.post('http://localhost:8000/api/auth/login', { ...values }).then(res => {
        console.log(res)
        if (res.data && res.data.success === true) {
          localStorage.setItem("token", res.data.token);
          dispatch(loginUser(res.data.user));
          navigate("/");
        }
      })
        .catch(error => {
          if (error.response) {
            switch (error.response.status) {
              case 401:
                setStatus(error.response.data.message)
                break;
              default:
                setStatus(error.response.statusText)
            }

          }
        });
    } catch (error) {
      console.error("Loginerror:", error.message);
    } finally {
      setSubmitting(false);
    }


  }
  const loginSchema = Yup.object({
    email: Yup.string()
      .required("Email is required")
      .email("Invalid email format"),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Too short")
      .max(50, "Too long")
  })
  return (
    <div className="w-full flex justify-center">
      <div className="login-form flex items-center justify-center 
    bg-white shadow-lg rounded-2xl p-8 my-8 w-full max-w-md">
        <Formik
          initialValues={{ email: '', password: '' }}
          onSubmit={handleNavigate}
          validationSchema={loginSchema}
        >
          {({
            isSubmitting,
            errors,
            touched,
            values,
            status,
            handleBlur,
            handleChange,
            handleSubmit
          }) => (
            <form className='w-full' noValidate onSubmit={handleSubmit}>
              <h2 className='text-4xl font-bold text-center text-gray-800 !mb-6'>LOGIN</h2>
              {status && <div className="rounded-lg bg-red-200 text-red-500 font-medium px-4 py-2 mb-2">{status}</div>}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input type="email" name="email" id="email" value={values.email}
                  className='w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                  onChange={handleChange} onBlur={handleBlur} placeholder='Enter your email' />
                <p style={{ color: "red" }}>{touched.email && errors.email}</p>
              </div>
              <div className='my-4'>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <input type="password" name="password" id="password" value={values.password}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  onChange={handleChange} onBlur={handleBlur} placeholder="Enter your password"
                />
                <p style={{ color: "red" }}>{touched.password && errors.password}</p>
              </div>
              <button className='w-full !bg-[#273a6e] hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition duration-200'
                type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Logining..." : "Login"}
              </button>
              <p className='text-md font-semibold mt-4'>
                Don’t have an account?
                <Link to="/signup"> Signup</Link>
              </p>
            </form>
          )}
        </Formik>
      </div>

    </div>
  )
}

export default Login
