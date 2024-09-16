import { useDispatch, useSelector } from "react-redux"
import FriendList from "../../components/home/friendList/FriendList"
import ChatContainer from "../../components/messages/chat/ChatContainer"
import ChatNavbar from "../../components/messages/ChatNavbar"
import { useEffect, useMemo } from "react"
import { getDatabase } from "firebase/database"
import { removeActiveFriend } from "../../features/slices/singleActiveFriendSlice"
import Animation from "../../components/messages/Animation"
import { Helmet } from "react-helmet-async"

const Messages = () => {
  const activeFriend = useSelector(state => state.activeFriend.activeFriend)
  const friends = useSelector(state => state.friends.friends)
  const db = getDatabase()
  const dispatch = useDispatch()
  const windowInnerWidth = window.innerWidth

  const isFriend = useMemo(() => {

    if (friends.find(friend => friend.friendID === activeFriend?.friendID)) {
      return true
    }

    else {
      return false
    }

  }, [friends, activeFriend?.friendID])

  useEffect(() => {
    if (!isFriend) {
      dispatch(removeActiveFriend())
    }

  }, [db, isFriend, dispatch])

  if (windowInnerWidth >= 900) {
    return (
      <>
        <Helmet>
          <title>Messages</title>
        </Helmet>
        <div className="flex gap-x-5 h-full w-full xl:p-8 px-[10px]">

          <div className="h-full w-[35%] overflow-y-auto shadow-[0_4px_17px_#0000001A] rounded-lg">

            <h3 className="font-semibold text-[30px] text-[#494949] p-[20px]">My Friends</h3>

            <FriendList />

          </div>

          {activeFriend ? (

            <div className="h-full w-[65%] rounded-lg shadow-[0_4px_10px_#00000024] relative">

              <ChatNavbar activeFriend={activeFriend} />

              <ChatContainer activeFriend={activeFriend} />

            </div>

          ) : (

            <Animation />

          )}

        </div>
      </>
    )
  }

  else if (windowInnerWidth < 900) {
    return (
      <>
        <Helmet>
          <title>Messages</title>
        </Helmet>
        {activeFriend ? (

          <div className="h-full w-full relative">

            <ChatNavbar activeFriend={activeFriend} />

            <ChatContainer activeFriend={activeFriend} />

          </div>

        ) : (

          <div className="flex flex-col h-full w-full p-[10px]">

            <h1 className="text-blue-500 text-[30px] text-center font-semibold">Select a Friend to start chatting</h1>

            <div className="w-full h-[98%] overflow-y-auto shadow-[0_4px_17px_#0000001A] rounded-lg">

              <h3 className="font-semibold text-[30px] text-[#494949] p-[20px]">My Friends</h3>

              <FriendList />

            </div>

          </div>

        )}

      </>
    )

  }
}

export default Messages
