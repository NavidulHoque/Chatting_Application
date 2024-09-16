import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import MessageIcon from '../../icons/MessageIcon';
import { getAuth, signOut } from "firebase/auth";
import { LogOut } from "../../features/slices/userLoginSlice";
import { Bounce, toast } from "react-toastify";
import { createPortal } from "react-dom";
import { useEffect, useState } from "react";
import UploadImage from "../../modals/UploadImage";
import UploadIcon from "../../icons/UploadIcon";
import HouseIcon from './../../icons/HouseIcon';
import IconButton from "./IconButton";
import LogOutIcon from './../../icons/LogOutIcon';
import { motion } from 'framer-motion';
import { FaBars } from "react-icons/fa6";

const Sidebar = () => {
  const user = useSelector((state) => state.UserLogin.user)
  const navigate = useNavigate()
  const auth = getAuth()
  const dispatch = useDispatch()
  const [open, setOpen] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const location = useLocation()
  const [windowInnerWidth, setWindowInnerWidth] = useState(window.innerWidth)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  //for window resizing purpose
  useEffect(() => {

    const handleResize = () => {
      setWindowInnerWidth(window.innerWidth)
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);

  }, [])

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

      {windowInnerWidth < 640 && (
        <div className="px-5 py-7">
          <FaBars
            className="self-start text-[#5E3493] w-[30px] h-[30px] cursor-pointer"
            onClick={() => setIsSidebarOpen(true)}
          />
        </div>
      )}


      <div className={`bg-[#5E3493] h-full flex flex-col items-center gap-y-5 sm:static fixed top-0 z-20 transition-all duration-200 ${windowInnerWidth < 640 ? (isSidebarOpen ? "translate-x-0" : "-translate-x-full") : ""} px-4 py-6`}>

        {windowInnerWidth < 640 && (
          <FaBars
            className="self-start text-white w-[30px] h-[30px] cursor-pointer"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        <div className="flex flex-col justify-between h-full">

          <motion.div
            className="flex flex-col gap-y-3 items-center"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20
            }}
          >

            <div
              className="w-[106px] h-[106px] flex justify-center items-center overflow-hidden rounded-full relative"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              onClick={() => setOpen(true)}
            >

              <img src={user.photoURL} alt="profile" className={`w-full h-full transition-all duration-200 cursor-pointer ${isHovered ? "blur-sm" : ""}`} />

              <div className={`absolute text-white cursor-pointer ${isHovered ? "inline-block" : "hidden"}`}>

                <UploadIcon />

              </div>

            </div>

            <p className="text-[20px] text-white text-center">{user.displayName}</p>

          </motion.div>

          <div className="flex flex-col gap-y-16 items-center relative">

            <IconButton path="">

              <HouseIcon />

            </IconButton>

            <IconButton path="messages">

              <MessageIcon />

            </IconButton>

            <div className={`bg-white h-[75px] w-[5px] absolute left-[110%] ${location.pathname === "/" ? "top-[-10px]" : "top-[102px]"} transition-all duration-200`}>

            </div>

          </div>

          <motion.button
            onClick={handleLogOut}
            className="text-white text-[20px] flex items-center justify-center gap-x-2"
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

      </div>

      {open && createPortal(<UploadImage setOpen={setOpen} />, document.body)}
    </>
  )
}

export default Sidebar
