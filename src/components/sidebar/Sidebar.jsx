import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import MessageIcon from '../../icons/MessageIcon';
import { getAuth, signOut } from "firebase/auth";
import { LogOut } from "../../features/slices/userLoginSlice";
import { Bounce, toast } from "react-toastify";
import { createPortal } from "react-dom";
import { useState } from "react";
import UploadImage from "../../modals/UploadImage";
import UploadIcon from "../../icons/UploadIcon";
import HouseIcon from './../../icons/HouseIcon';
import IconButton from "./IconButton";
import LogOutIcon from './../../icons/LogOutIcon';
import { motion } from 'framer-motion';

const Sidebar = () => {
  const user = useSelector((state) => state.UserLogin.user)
  const navigate = useNavigate()
  const auth = getAuth()
  const dispatch = useDispatch()
  const [open, setOpen] = useState(false)

  function handleLogOut() {
    signOut(auth)
      .then(() => {

        dispatch(LogOut())
        navigate("/")

      })
      .catch(() => {

        toast.error("Something went wrong, please try again to log out", {
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
      })
  }

  return (
    <>
      <div className="bg-[#5E3493] h-full flex flex-col justify-between items-center px-4 py-6">

        <motion.div
          className="flex flex-col gap-y-3 items-center relative"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20
          }}
        >

          <div className="w-[106px] h-[106px] overflow-hidden rounded-full">

            <img src={user.photoURL} alt="profile" className="w-full h-full" />

          </div>

          <div onClick={() => setOpen(true)} className="absolute top-[40px] left-[53px] text-white cursor-pointer">

            <UploadIcon />

          </div>

          <p className="text-[20px] text-white text-center">{user.displayName}</p>

        </motion.div>

        <div className="flex flex-col gap-y-16 items-center">

          <IconButton path="">

            <HouseIcon />

          </IconButton>

          <IconButton path="messages">

            <MessageIcon />

          </IconButton>

        </div>

        <motion.button
          onClick={handleLogOut}
          className="text-white text-[20px] flex items-center gap-x-3"
          whileHover={{ scale: 1.2 }}
            whileTap={{
                scale: 0.8,
                rotate: -90,
                borderRadius: "100%"
            }}
        >
          <LogOutIcon /> Log Out
        </motion.button>

      </div>

      {open && createPortal(<UploadImage setOpen={setOpen} />, document.body)}
    </>
  )
}

export default Sidebar
