import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import UserLists from "../../components/home/UserLists";
import FriendRequestLists from "../../components/home/friendRequestList/FriendRequestList";
import FriendList from "../../components/home/friendList/FriendList";
import { useEffect, useState } from "react";
import { getDatabase, ref, onValue } from "firebase/database";

const Home = () => {
  const user = useSelector((state) => state.UserLogin.user);
  const navigate = useNavigate();
  const [friendRequests, setFriendRequests] = useState([])
  const db = getDatabase()
  const [cancelRequests, setCancelRequests] = useState([])

  //storing friend request information
  useEffect(() => {

    const friendRequestsRef = ref(db, 'friendRequests/')
    onValue(friendRequestsRef, (snapshot) => {

      const reqArr = []

      snapshot.forEach(friendRequest => {
        reqArr.push(friendRequest.val().senderID + friendRequest.val().receiverID)
      })

      setFriendRequests(reqArr)
    })

  }, [db])

  if (user) {
    return (
      <div className="grid lg:grid-cols-[2fr,5fr] h-[615px] bg-white">

        <div className="bg-[#FBFBFB] p-[20px] overflow-y-auto h-[290px] lg:h-full">

          <h3 className="font-semibold">All Users</h3>

          <UserLists friendRequests={friendRequests} setCancelRequests={setCancelRequests} cancelRequests={cancelRequests} />

        </div>

        <div className="grid grid-cols-2 gap-x-4 lg:gap-x-2 xl:gap-x-10 px-[5px] xl:px-[20px] lg:py-[15px]">

          <div className="px-[20px] py-[10px] ml-[10px] lg:ml-0 overflow-y-auto shadow-[0_4px_17px__rgba(0,0,0,0.1)] rounded-md h-[290px] lg:h-full">

            <h3 className="font-semibold">Friend Requests</h3>

            <FriendRequestLists friendRequests={friendRequests} cancelRequests={cancelRequests} />

          </div>

          <div className="px-[20px] py-[10px] mr-[10px] lg:mr-0 overflow-y-auto shadow-[0_4px_17px__rgba(0,0,0,0.1)] rounded-md h-[290px] lg:h-full">

            <h3 className="font-semibold">Friends</h3>

            <FriendList />

          </div>

        </div>

      </div>
    )
  }

  else if (!user) {

    return (

      <div className="h-full relative flex flex-col items-center justify-center gap-y-3">

        <h1 className="flex absolute top-[20px] text-center items-center justify-center text-[24px] px-[10px]">
          Welcome To Chat Application
        </h1>

        <button
          onClick={() => navigate("/login")}
          className="bg-[rgb(50,50,50)] text-white py-[8px] w-[75px] rounded-md hover:bg-black"
        >
          Login
        </button>

        <button
          onClick={() => navigate("/registration")}
          className="bg-[rgb(50,50,50)] text-white py-[8px] w-[75px] rounded-md hover:bg-black"
        >
          Register
        </button>

      </div>
    )
  }
}

export default Home;
