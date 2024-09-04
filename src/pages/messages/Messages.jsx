import { useDispatch, useSelector } from "react-redux"
import FriendList from "../../components/home/friendList/FriendList"
import Chat from "../../components/messages/Chat"
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

  return (
    <>
      <Helmet>
        <title>Messages</title>
      </Helmet>
      <div className="grid grid-cols-[2fr,5fr] h-[615px] bg-white">

        <div className="bg-[#FBFBFB] p-[20px] h-full overflow-y-auto">

          <h3 className="font-semibold">Friends</h3>

          <FriendList />

        </div>

        {activeFriend ? (

          <div className="m-3 rounded-md shadow-[0_4px_19px__rgba(0,0,0,0.1)]">

            <ChatNavbar activeFriend={activeFriend} />

            <Chat activeFriend={activeFriend} />

          </div>

        ) : (

          <Animation />

        )}

      </div>
    </>
  )
}

export default Messages
