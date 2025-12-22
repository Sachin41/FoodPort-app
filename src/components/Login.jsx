import React from 'react'
import "../styles/login.css"
import { Formik } from 'formik';
import { useNavigate } from 'react-router-dom';
import * as Yup from "yup";


const Login = () => {
  const navigate = useNavigate();
  const handleNavigate = (values, { setSubmitting }) => {
    console.log(values)
    alert(JSON.stringify(values, null, 2));

    setTimeout(() => {
      setSubmitting(false);
      navigate("/")
    }, 10);
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
                {isSubmitting?"Logining...": "Login"}</button>
          </form>
        )}
      </Formik>
    </div>
          
    </div>
  )
}

export default Login
