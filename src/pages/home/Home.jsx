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
import ListContainer from "../../components/home/common/ListContainer";

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

        <div className="grid xl:grid-cols-[2fr,5fr] xl:gap-x-8 md:gap-y-5 h-full w-full md:p-8">

          <ListContainer shadow="md:shadow-[0_4px_11px_#00000021]">

            <h3 className={headingStyle}>All Users</h3>

            <UserList friendRequests={friendRequests} setCancelRequests={setCancelRequests} cancelRequests={cancelRequests} />

          </ListContainer>

          <div className="grid md:grid-cols-2 gap-x-5 xl:gap-x-8">

            <ListContainer shadow="md:shadow-[0_4px_17px_#0000001A]">

              <h3 className={headingStyle}>Friend Requests</h3>

              <FriendRequestList friendRequests={friendRequests} cancelRequests={cancelRequests} />

            </ListContainer>

            <ListContainer shadow="md:shadow-[0_4px_17px_#0000001A]">

              <h3 className={headingStyle}>My Friends</h3>

              <FriendList />

            </ListContainer>

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

        <div className="h-full w-full bg-blue-500 flex flex-col gap-7 p-10">

          <motion.h1
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20
            }}
            className="text-center text-[36px] text-white px-[10px]"
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

export default Home
