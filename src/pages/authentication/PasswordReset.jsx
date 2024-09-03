/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState } from 'react';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import { Bounce, ToastContainer, toast } from 'react-toastify';
import { BeatLoader } from 'react-spinners';
import { useFormik } from 'formik';
import { Helmet } from 'react-helmet-async';
import { passwordReset } from '../../validation/Validation';

const PasswordReset = () => {
  const [loading, setLoading] = useState(false)
  const auth = getAuth()

  const initialValues = {
    email: ""
  };

  const formik = useFormik({
    initialValues,
    onSubmit: () => handlePasswordReset(),
    validationSchema: passwordReset
  })

  const handlePasswordReset = () => {

    setLoading(true)

    sendPasswordResetEmail(auth, formik.values.email)
      .then(() => {

        toast.success("Password reset email sent!", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Bounce,
        })

        setLoading(false)
      })
      .catch(() => {

        toast.error("Password reset email sending failed, please try again", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Bounce,
        })

        setLoading(false)
      })

  }

  return (
    <>
      <Helmet>
        <title>Password Reset</title>
      </Helmet>

      <ToastContainer />
      
      <div className='flex items-center justify-center h-screen'>

        <form onSubmit={formik.handleSubmit} className="flex flex-col gap-y-4 basis-[300px] font-robotoRegular">

          <h2 className="text-[20px] font-robotoBold">Reset Password</h2>

          <input
            type="email"
            placeholder="Enter your email"
            className="border-black border-[2px] outline-none px-[5px] py-2 text-[18px] rounded-md w-full"
            value={formik.values.email}
            onChange={formik.handleChange}
            name='email'
            autoFocus
          />

          {formik.errors.email && formik.touched.email && (
            <p className="text-red-500">{formik.errors.email}</p>
          )}

          <button
            type="submit"
            className="hover:bg-black bg-[rgb(50,50,50)] text-white rounded-md py-2"
            disabled={loading}
          >
            {loading ? <BeatLoader color="#fff" size={5} /> : "Send Password Reset Email"}
          </button>

        </form>

      </div>
    </>
  )
}

export default PasswordReset;