import { useSelector } from "react-redux";
import UserList from "../../components/home/userList/UserList";
import FriendRequestList from "../../components/home/friendRequestList/FriendRequestList";
import FriendList from "../../components/home/friendList/FriendList";
import { useEffect, useState } from "react";
import { getDatabase, ref, onValue } from "firebase/database";
import { Helmet } from "react-helmet-async";
import RedirectButton from "../../components/home/common/RedirectButton";
import Animation from "../../components/home/animation/Animation";
import { motion } from 'framer-motion';

const Home = () => {
  const user = useSelector((state) => state.UserLogin.user);
  const [friendRequests, setFriendRequests] = useState([])
  const db = getDatabase()
  const [cancelRequests, setCancelRequests] = useState([])
  const headingStyle = "text-[#494949] font-semibold text-[30px]"

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
      <>
        <Helmet>
          <title>Home</title>
        </Helmet>

        <div className="grid lg:grid-cols-[2fr,5fr] h-full w-full bg-white">

          <div className="bg-[#FBFBFB] p-[20px] overflow-y-auto h-[290px] lg:h-full">

            <h3 className={headingStyle}>All Users</h3>

            <UserList friendRequests={friendRequests} setCancelRequests={setCancelRequests} cancelRequests={cancelRequests} />

          </div>

          <div className="grid grid-cols-2 gap-x-4 lg:gap-x-2 xl:gap-x-10 px-[5px] xl:px-[20px] lg:py-[15px]">

            <div className="px-[20px] py-[10px] ml-[10px] lg:ml-0 overflow-y-auto shadow-[0_4px_17px__rgba(0,0,0,0.1)] rounded-md h-[290px] lg:h-full">

              <h3 className={headingStyle}>Friend Requests</h3>

              <FriendRequestList friendRequests={friendRequests} cancelRequests={cancelRequests} />

            </div>

            <div className="px-[20px] py-[10px] mr-[10px] lg:mr-0 overflow-y-auto shadow-[0_4px_17px__rgba(0,0,0,0.1)] rounded-md h-[290px] lg:h-full">

              <h3 className={headingStyle}>Friends</h3>

              <FriendList />

            </div>

          </div>

        </div>

      </>
    )
  }

  else if (!user) {

    return (
      <>
        <Helmet>
          <title>Home</title>
        </Helmet>

        <div className="h-full bg-blue-500 flex flex-col gap-7 p-10">

          <motion.h1
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20
            }}
            className="text-center text-[24px] text-white px-[10px]"
          >

            Welcome To Chat Application

          </motion.h1>

          <div className="h-[500px] flex justify-center items-center gap-x-24">

            <Animation />

            <div className="space-x-3">

              <RedirectButton label="Login" path="login" />

              <RedirectButton label="Register" path="registration" />

            </div>

          </div>

        </div>
      </>
    )
  }
}

export default Home;
