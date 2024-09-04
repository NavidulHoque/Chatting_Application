/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { BeatLoader } from "react-spinners";
import { Bounce } from "react-toastify";
import { useDispatch } from "react-redux";
import { LogIn } from "../../features/slices/userLoginSlice";
import { storeID } from "../../features/slices/setTimeOutSlice";
import { signIn } from "../../validation/Validation";

const SignIn = ({ toast }) => {

  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const auth = getAuth()

  const initialValues = {
    name: "",
    email: "",
    password: "",
  };

  const formik = useFormik({
    initialValues,
    onSubmit: () => signInCurrentUser(),
    validationSchema: signIn,
  });

  function signInCurrentUser() {
    setLoading(true)

    signInWithEmailAndPassword(
      auth,
      formik.values.email,
      formik.values.password
    )
      .then(({ user }) => {

        if (user.emailVerified) {

          setLoading(false)

          dispatch(
            LogIn({
              id: user.uid,
              email: user.email,
              displayName: user.displayName,
              photoURL: user.photoURL ? user.photoURL : "https://i.ibb.co/7nqLQ9X/avatar.webp"
            })
          )

          const timeOutID = setTimeout(() => {
            navigate("/")
          }, 1000);

          dispatch(storeID(timeOutID))
        }

        else {
          toast.error("Verify your email first", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "colored",
            transition: Bounce,
          });

          setLoading(false)
        }
      })

      .catch(() => {
        toast.error("Invalid email or password", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Bounce,
        });

        setLoading(false)
      })
  }

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="flex flex-col items-start gap-y-4 w-full font-robotoRegular"
    >
      <h2 className="text-[20px] font-robotoBold">
        Sign In and Explore the Application
      </h2>

      <input
        type="email"
        placeholder="enter your email"
        className="border-black border-[2px] outline-none px-[5px] py-2 text-[18px] rounded-md w-full"
        value={formik.values.email}
        onChange={formik.handleChange}
        name="email"
      />

      {formik.errors.email && formik.touched.email && (
        <p className="text-red-500">{formik.errors.email}</p>
      )}

      <input
        type="password"
        placeholder="enter your password"
        className="border-black border-[2px] outline-none px-[5px] py-2 text-[18px] rounded-md w-full"
        value={formik.values.password}
        onChange={formik.handleChange}
        name="password"
      />

      {formik.errors.password && formik.touched.password && (
        <p className="text-red-500">{formik.errors.password}</p>
      )}

      <Link
        to='/passwordReset'
        className="text-blue-600 underline cursor-pointer justify-self-start"
      >
        Forget Password?
      </Link>

      <button
        type="submit"
        className="hover:bg-black bg-[rgb(50,50,50)] text-white rounded-md py-2 w-full"
        disabled={loading}
      >
        {loading ? <BeatLoader color="#fff" size={5} /> : "Sign In"}
      </button>

      <p className="text-slate-500">
        Don't have an account?
        <Link to="/registration" className="text-blue-600 underline">
          Sign Up
        </Link>
      </p>

    </form>
  );
};

export default SignIn;