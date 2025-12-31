import React from 'react'
import { Formik } from 'formik';
import { useNavigate } from 'react-router-dom';
import * as Yup from "yup";
import { Link } from "react-router-dom";
import { useDispatch } from 'react-redux';
const Signup = () => {
  const navigate = useNavigate();
  //   const dispatch = useDispatch();
  
  const checkUserExists = (userName) => {
    const existVal = localStorage.getItem("users");
    const dataArr = existVal ? JSON.parse(existVal) : [];
    return dataArr.some(user => user.userName === userName);
  };

  const handleNavigate = (values, { setSubmitting }) => {
    try {
      console.log(values);
      const existVal = localStorage.getItem("users");
      const dataArr = existVal ? JSON.parse(existVal) : [];
      dataArr.push(values);
      localStorage.setItem('users', JSON.stringify(dataArr));
      console.log("saved user", dataArr);
      // console.log("storage", JSON.parse(localStorage.getItem("users")));
      alert(`Signup Success: ${JSON.stringify(values, null, 2)}`);
      // resetForm();
        navigate("/login");  
    } catch (error) {
      console.error("Signup error:", error);
    } finally {
      setSubmitting(false);
    }
  };

  const signupSchema = Yup.object({
    userName: Yup.string()
      .required("User Name is required")
      .min(3, "Username must be at least 3 characters")
      .test(
        "unique-username",
        "Username already exists",
        function (value) {
          if (!value) return true; // required handles empty
          return !checkUserExists(value);
        }
      ),
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
          initialValues={{ userName: '', email: '', password: '' }}
          onSubmit={handleNavigate}
          validationSchema={signupSchema}
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
              <h2 className='text-4xl font-bold text-center text-gray-800 !mb-6'>Signup</h2>
              <div>
                <label htmlFor="userName" className="block text-sm font-medium text-gray-700 mb-1">
                  User Name
                </label>
                <input type="text" name="userName" id="userName" value={values.userName}
                  className='w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                  onChange={handleChange} onBlur={handleBlur} placeholder='Enter User name' />
                <p style={{ color: "red" }}>{touched.userName && errors.userName}</p>
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
