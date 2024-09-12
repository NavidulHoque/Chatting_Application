/* eslint-disable react/prop-types */
import { useFormik } from "formik";
import { signUp } from "../../validation/Validation";
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth";
import { Bounce, toast } from "react-toastify";
import { BeatLoader } from "react-spinners";
import { useState } from "react";
import { Link } from "react-router-dom";
import { getDatabase, ref, set } from "firebase/database";

const SignUp = () => {
  const [loading, setLoading] = useState(false);
  const auth = getAuth();
  const db = getDatabase()

  //style variables
  const textStyle = "text-[#484848] text-[18px]"
  const inputStyle = "w-[460px] h-[60px] text-[20px] text-[#484848] px-[10px] border-[2px] border-[#D8D8D8] rounded-md outline-none"
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
    <form onSubmit={formik.handleSubmit} className="flex flex-col gap-y-7 w-full font-interRegular">

      <div className={divStyle}>

        <label htmlFor="name" className={textStyle}>Enter Name</label>

        <input
          type="text"
          className={inputStyle}
          value={formik.values.name}
          onChange={formik.handleChange}
          name="name"
          id="name"
        />

        {formik.errors.name && formik.touched.name && (
          <p className={errorTextStyle}>{formik.errors.name}</p>
        )}

      </div>

      <div className={divStyle}>

        <label htmlFor="email" className={textStyle}>Enter Email</label>

        <input
          type="email"
          className={inputStyle}
          value={formik.values.email}
          onChange={formik.handleChange}
          name="email"
          id="email"
        />

        {formik.errors.email && formik.touched.email && (
          <p className={errorTextStyle}>{formik.errors.email}</p>
        )}

      </div>

      <div className={divStyle}>

        <label htmlFor="password" className={textStyle}>Enter Password</label>

        <input
          type="password"
          className={inputStyle}
          value={formik.values.password}
          onChange={formik.handleChange}
          name="password"
          id="password"
        />

        {formik.errors.password && formik.touched.password && (
          <p className={errorTextStyle}>{formik.errors.password}</p>
        )}

      </div>

      <div className={divStyle}>

        <label htmlFor="confirmPassword" className={textStyle}>Confirm Password</label>

        <input
          type="password"
          className={inputStyle}
          value={formik.values.confirmPassword}
          onChange={formik.handleChange}
          name="confirmPassword"
          id="confirmPassword"
        />

        {formik.errors.confirmPassword && formik.touched.confirmPassword && (
          <p className={errorTextStyle}>{formik.errors.confirmPassword}</p>
        )}

      </div>

      <button
        type="submit"
        className="w-[460px] h-[60px] hover:bg-black bg-[#313131] text-white text-[20px] rounded-lg"
        disabled={loading}
      >
        {loading ? <BeatLoader color="#fff" size={10} /> : "Sign Up"}
      </button>

      <p className="text-[16px]">Already have an account please <Link to='/login' className="text-blue-600">sign in</Link></p>

    </form>
  );
};

export default SignUp;