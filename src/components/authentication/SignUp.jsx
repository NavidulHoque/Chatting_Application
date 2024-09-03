/* eslint-disable react/prop-types */
import { useFormik } from "formik";
import { signUp } from "../../validation/Validation";
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth";
import { Bounce } from "react-toastify";
import { BeatLoader } from "react-spinners";
import { useState } from "react";
import { Link } from "react-router-dom";
import { getDatabase, ref, set } from "firebase/database";
import avatar from "../../assets/avatar.png"

const SignUp = ({ toast }) => {
  const [loading, setLoading] = useState(false);
  const auth = getAuth();
  const db = getDatabase();

  const initialValues = {
    name: "",
    email: "",
    password: "",
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
                  photoURL: user.photoURL || avatar
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
    <form onSubmit={formik.handleSubmit} className="flex flex-col gap-y-4 w-full font-robotoRegular">

      <h2 className="text-[20px] font-robotoBold">Create an Account</h2>

      <input
        type="text"
        placeholder="enter your name"
        className="border-black border-[2px] outline-none px-[5px] py-2 text-[18px] rounded-md"
        value={formik.values.name}
        onChange={formik.handleChange}
        name="name"
      />

      {formik.errors.name && formik.touched.name && (
        <p className="text-red-500">{formik.errors.name}</p>
      )}

      <input
        type="email"
        placeholder="enter your email"
        className="border-black border-[2px] outline-none px-[5px] py-2 text-[18px] rounded-md"
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
        className="border-black border-[2px] outline-none px-[5px] py-2 text-[18px] rounded-md"
        value={formik.values.password}
        onChange={formik.handleChange}
        name="password"
      />

      {formik.errors.password && formik.touched.password && (
        <p className="text-red-500">{formik.errors.password}</p>
      )}

      <button
        type="submit"
        className="hover:bg-black bg-[rgb(50,50,50)] text-white rounded-md py-2"
        disabled={loading}
      >
        {loading ? <BeatLoader color="#fff" size={5} /> : "Sign Up"}
      </button>

      <p className="text-slate-500">Already signed up? <Link to='/login' className="text-blue-600 underline">Sign In</Link></p>

    </form>
  );
};

export default SignUp;