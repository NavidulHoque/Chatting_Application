/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { Bounce } from "react-toastify";
import { useDispatch } from "react-redux";
import { LogIn } from "../../features/slices/userLoginSlice";
import { storeID } from "../../features/slices/setTimeOutSlice";
import { signIn } from "../../validation/Validation";
import InputField from "./common/InputField";
import Button from "./common/Button";
import Redirect from "./common/Redirect";

const SignIn = ({ toast }) => {

  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const auth = getAuth()

  //style variables
  const textStyle = "text-[#484848] text-[18px]"
  const inputStyle = "w-[460px] h-[60px] text-[20px] text-[#484848] px-[10px] border-[2px] border-[#D8D8D8] rounded-md outline-none"
  const divStyle = "flex flex-col gap-y-3"
  const errorTextStyle = "text-red-500"

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
      className="flex flex-col gap-y-7 w-full font-interRegular"
    >

      <InputField 
        divStyle={divStyle} 
        textStyle={textStyle} 
        inputStyle={inputStyle} 
        errorTextStyle={errorTextStyle} 
        formik={formik} 
        label="Enter Email" 
        type="email" 
        name="email" 
      />

      <InputField 
        divStyle={divStyle} 
        textStyle={textStyle} 
        inputStyle={inputStyle} 
        errorTextStyle={errorTextStyle} 
        formik={formik} 
        label="Enter Password" 
        type="password" 
        name="password" 
      />

      <Button loading={loading} label="Sign In" />

      <Link
        to='/passwordReset'
        className="text-[#4A4A4A] text-[16px] underline cursor-pointer justify-self-start"
      >
        Forget Password?
      </Link>

      <Redirect label="Don’t have an account?" link="sign up" path="registration" />

    </form>
  )
}

export default SignIn