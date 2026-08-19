import React from 'react'
import { Formik } from 'formik';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import * as Yup from "yup";
import { Link } from "react-router-dom";
import { useDispatch } from 'react-redux';
const Signup = () => {
  const navigate = useNavigate();

  const handleNavigate = async (values, { setSubmitting, setStatus }) => {
    try {
      console.log(values);
      await axios.post('http://localhost:8000/api/auth/signup', { ...values }).then(res => {
        console.log(res)
        if (res.data && res.data.success === true) {
          navigate("/login");
        }
      })
        .catch(error => {
          if (error.response) {
            switch (error.response.status) {
              case 400: {
                setStatus(error.response.data.message)
              }
                break;
              default: {
                setStatus(error.response.statusText)
              }
            }
          }
        })

    } catch (error) {
      console.error("Signup error:", error);
    } finally {
      setSubmitting(false);
    }
  };

  const signupSchema = Yup.object({
    name: Yup.string()
      .required("User Name is required")
      .min(3, "Username must be at least 3 characters"),
    email: Yup.string()
      .required("Email is required")
      .email("Invalid email format"),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Too short")
      .max(50, "Too long"),
    phone: Yup.string()
      .required("Phone No is rquired")
      .matches(/^[6-9]\d{9}$/, 'Enter a valid mobile number')
  })
  return (
    <div className="w-full flex justify-center">
      <div className="login-form flex items-center justify-center 
    bg-white shadow-lg rounded-2xl p-8 my-8 w-full max-w-md">
        <Formik
          initialValues={{ name: '', email: '', password: '', phone: '' }}
          onSubmit={handleNavigate}
          validationSchema={signupSchema}
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
              <h2 className='text-4xl font-bold text-center text-gray-800 !mb-6'>Signup</h2>
              {status && <div className="rounded-lg bg-red-200 text-red-500 font-medium px-4 py-2 mb-2">{status}</div>}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  User Name
                </label>
                <input type="text" name="name" id="name" value={values.name}
                  className='w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                  onChange={handleChange} onBlur={handleBlur} placeholder='Enter User name' />
                <p style={{ color: "red" }}>{touched.name && errors.name}</p>
              </div>
              <div className='my-2'>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input type="email" name="email" id="email" value={values.email}
                  className='w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                  onChange={handleChange} onBlur={handleBlur} placeholder='Enter your email' />
                <p style={{ color: "red" }}>{touched.email && errors.email}</p>
              </div>
              <div className='my-2'>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <input type="password" name="password" id="password" value={values.password}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  onChange={handleChange} onBlur={handleBlur} placeholder="Enter your password"
                />
                <p style={{ color: "red" }}>{touched.password && errors.password}</p>
              </div>
              <div className='my-2'>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Phone
                </label>
                <input type="tel" name="phone" id="phone" value={values.phone}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  onChange={handleChange} onBlur={handleBlur} placeholder="Enter your phone"
                />
                <p style={{ color: "red" }}>{touched.phone && errors.phone}</p>
              </div>
              <button className='w-full !bg-[#273a6e] hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition duration-200 mt-2'
                type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Registering..." : "Signup"}
              </button>
              <p className='text-md font-semibold mt-4'>
                Already have an account?
                <Link to="/login"> Login</Link>
              </p>
            </form>
          )}
        </Formik>
      </div>

    </div>
  )
}

export default Signup
