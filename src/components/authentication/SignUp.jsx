/* eslint-disable react/prop-types */
import { useFormik } from "formik";
import { signUp } from "../../validation/Validation";
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth";
import { Bounce, toast } from "react-toastify";
import { useState } from "react";
import { getDatabase, ref, set } from "firebase/database";
import InputField from "./common/InputField";
import Button from "./common/Button";
import Redirect from "./common/Redirect";
import Form from "./common/Form";

const SignUp = () => {
  const [loading, setLoading] = useState(false);
  const auth = getAuth();
  const db = getDatabase()

  //style variables
  const textStyle = "text-[#484848] text-[18px]"
  const inputStyle = "md:w-[460px] w-full h-[60px] text-[20px] text-[#484848] px-[10px] border-[2px] border-[#D8D8D8] rounded-md outline-none"
  const divStyle = "flex flex-col gap-y-3"
  const errorTextStyle = "text-red-500"

  const initialValues = {
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  };

  const formik = useFormik({
    initialValues,
    onSubmit: () => createNewUser(),
    validationSchema: signUp,
  });

  function createNewUser() {
    setLoading(true);

    createUserWithEmailAndPassword(
      auth,
      formik.values.email,
      formik.values.password
    )
      .then(({ user }) => {
        // Signed up 
        updateProfile(auth.currentUser, {

          displayName: formik.values.name

        })
          .then(() => {
            // Profile updated!
            sendEmailVerification(auth.currentUser)

              .then(() => {
                // Email verification sent!
                toast.success("Email verification sent", {
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

                //storing the data in realtime database
                set(ref(db, 'users/' + user.uid), {
                  displayName: user.displayName,
                  email: user.email,
                  photoURL: user.photoURL || "https://i.ibb.co/7nqLQ9X/avatar.webp"
                })
              })
              .catch(() => {
                //Email verification sending failed
                toast.error("Email verification sending failed", {
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

                setLoading(false);
              });

          })
          .catch(() => {
            //profile updating failed
            toast.error("Failed to Register", {
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

            setLoading(false);
          })

      })
      .catch(() => {
        //account creation failed
        toast.error("Email already in use", {
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

        setLoading(false);
      });
  }

  return (
    <Form onSubmit={formik.handleSubmit}>

      <InputField
        divStyle={divStyle}
        textStyle={textStyle}
        inputStyle={inputStyle}
        errorTextStyle={errorTextStyle}
        formik={formik}
        label="Enter Name"
        type="text"
        name="name"
      />

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

      <InputField
        divStyle={divStyle}
        textStyle={textStyle}
        inputStyle={inputStyle}
        errorTextStyle={errorTextStyle}
        formik={formik}
        label="Confirm Password"
        type="password"
        name="confirmPassword"
      />

      <Button loading={loading} label="Sign Up" />

      <Redirect label="Already have an account?" link="sign in" path="login" />

    </Form>
  )
}

export default SignUp;