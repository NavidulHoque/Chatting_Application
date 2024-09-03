import { useDispatch, useSelector } from "react-redux";
import CameraIcon from "../../icons/CameraIcon";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import FriendsIcon from './../../icons/FriendsIcon';
import MessageIcon from './../../icons/MessageIcon';
import { getAuth, signOut } from "firebase/auth";
import { LogOut } from "../../features/slices/userLoginSlice";
import { Bounce, toast } from "react-toastify";
import { createPortal } from "react-dom";
import { useState } from "react";
import UploadImage from "../../modals/UploadImage";
import avatar from "../../assets/avatar.png"

const Navbar = () => {
  const {friendID} = useParams()
  const user = useSelector((state) => state.UserLogin.user)
  const location = useLocation()
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
      <nav className="bg-[#232323] h-[85px] xl:w-[1250px] w-[95vw]">

        <div className="w-[80%] h-full mx-auto flex justify-between items-center">

          <div className="flex gap-x-3 items-center relative">

            <div className="rounded-full w-[64px] h-[64px] overflow-hidden">

              <img src={user.photoURL || avatar} alt="profilePic" className="w-full h-full" />

            </div>

            <div onClick={() => setOpen(true)} className="absolute bg-white text-[#292D32] rounded-full w-[20px] h-[20px] left-[43px] bottom-0 flex items-center justify-center cursor-pointer">

              <CameraIcon />

            </div>

            <p className="text-[16px] text-white">{user.displayName}</p>

          </div>

          <div className="flex gap-x-3 items-center">

            <button
              onClick={() => navigate("/")}
              className={`w-[40px] h-[40px] rounded-full cursor-pointer flex justify-center items-center ${location.pathname === "/"
                ? "bg-[#6CD0FB] text-white"
                : "bg-[#ECECEC] text-[#292D32]"
                }`}
              disabled={location.pathname === "/"}
            >
              <FriendsIcon />
            </button>

            <button
              onClick={() => navigate("/messages")}
              className={`w-[40px] h-[40px] rounded-full cursor-pointer flex justify-center items-center ${location.pathname === "/messages" || location.pathname === `/messages/${friendID}`
                ? "bg-[#6CD0FB] text-white"
                : "bg-[#ECECEC] text-[#292D32]"
                }`}
              disabled={location.pathname === "/messages"}
            >
              <MessageIcon />
            </button>

          </div>

          <button
            onClick={handleLogOut}
            className="bg-[#3ab1e3] text-white p-[8px] rounded-md"
          >
            Log Out
          </button>

        </div>

      </nav>

      {open && createPortal(<UploadImage setOpen={setOpen} />, document.body)}
    </>
  )
}

export default Navbar
