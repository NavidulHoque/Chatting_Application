/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { makeFriendActive } from "../../../features/slices/singleActiveFriendSlice";
import { getDatabase, ref, remove } from "firebase/database";
import { Bounce, toast } from "react-toastify";

const SingleFriend = ({friend, unfriendInfo}) => {
    const location = useLocation();
    const activeFriend = useSelector(state => state.activeFriend.activeFriend)
    const dispatch = useDispatch()
    const db = getDatabase()
    const navigate = useNavigate();

    function handleUnfriending(friend) {

        const unfriendID = unfriendInfo.find((info) => info.friendID === friend.friendID).friendshipID
    
        const deleteRef = ref(db, `friends/${unfriendID}`)
    
        remove(deleteRef)
          .then(() => {
            console.log("Data successfully deleted!")
          })
          .catch(() => {
            toast.error("Something went wrong, please try again", {
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

      function handleMakeFriendActive(friend) {
        navigate(`/messages`)
        dispatch(makeFriendActive(friend))
      }
    
    if (location.pathname === "/") {
        return (
            <div
                className="flex justify-between items-center"
            >
                <div className="flex gap-x-2 items-center">

                    <div className="rounded-full w-[45px] h-[45px] overflow-hidden">

                        <img
                            src={friend.friendPhoto}
                            alt="profile pic"
                            className="w-full h-full"
                        />

                    </div>

                    <p>
                        {friend.friendName}
                    </p>

                </div>

                <div className="space-x-2">

                    <button
                        onClick={() => handleMakeFriendActive(friend)}
                        className="w-[75px] h-[29px] rounded bg-[#4A81D3] text-white"
                    >
                        Message
                    </button>

                    <button
                        onClick={() => handleUnfriending(friend)}
                        className="w-[75px] h-[29px] rounded bg-[#4A81D3] text-white"
                    >
                        Unfriend
                    </button>

                </div>

            </div>
        )
    }

    else if (location.pathname === "/messages") {
        return (
            <div
                className={`flex items-center gap-x-3 cursor-pointer ${activeFriend?.friendID === friend.friendID ?
                    "bg-green-600 hover:bg-green-700 text-white px-3 py-[8px] rounded-md"
                    : "bg-white hover:bg-slate-100"}`}
                onClick={() => dispatch(makeFriendActive(friend))}
            >
                <div className="rounded-full w-[45px] h-[45px] overflow-hidden">

                    <img
                        src={friend.friendPhoto}
                        alt="profile pic"
                        className="w-full h-full"
                    />

                </div>

                <p>
                    {friend.friendName}
                </p>

            </div>
        )
    }


}

export default SingleFriend
