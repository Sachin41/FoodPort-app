import React, { useEffect } from 'react'
import "../styles/login.css"
import { Formik } from 'formik';
import { useNavigate } from 'react-router-dom';
import * as Yup from "yup";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser } from "../slices/authSlice";
// import { useAuth } from "../utils/AuthContext";
// import { useDispatch, useSelector } from 'react-redux';


const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleNavigate = (values, { setSubmitting }) => {
    try {
      console.log("login", values)
      const savedUsers = JSON.parse(localStorage.getItem("users"));
      if (savedUsers?.length > 0 && savedUsers.some((user) => user.email === values.email && user.password === values.password)) {
        const login_user = savedUsers.filter((user) => user.email === values.email && user.password === values.password);
        console.log("login user", login_user);
        dispatch(loginUser(login_user[0]));
        alert(`Login Success: ${JSON.stringify(values, null, 2)}`);
        navigate("/");
      }
      else {
        alert("Login failed, retry with correct email/password:", values.email);
        setTimeout(() => {
          setSubmitting(false);
        }, 10);
      }
    } catch (error) {
      console.error("Login error:", error);
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
            handleBlur,
            handleChange,
            handleSubmit
          }) => (
            <form className='w-full' noValidate onSubmit={handleSubmit}>
              <h2 className='text-4xl font-bold text-center text-gray-800 !mb-6'>LOGIN</h2>
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
