/* eslint-disable no-unused-vars */
import { useDispatch, useSelector } from "react-redux"
import FriendList from "../../components/home/friendList/FriendList"
import ChatContainer from "../../components/messages/chat/ChatContainer"
import ChatNavbar from "../../components/messages/ChatNavbar"
import { useEffect, useMemo, useState } from "react"
import { getDatabase } from "firebase/database"
import { removeActiveFriend } from "../../features/slices/singleActiveFriendSlice"
import Animation from "../../components/messages/Animation"
import { Helmet } from "react-helmet-async"

const Messages = () => {
  const activeFriend = useSelector(state => state.activeFriend.activeFriend)
  const friends = useSelector(state => state.friends.friends)
  const db = getDatabase()
  const dispatch = useDispatch()
  const [windowInnerWidth, setWindowInnerWidth] = useState(window.innerWidth)

  const isFriend = useMemo(() => {

    if (friends.find(friend => friend.friendID === activeFriend?.friendID)) {
      return true
    }

    else {
      return false
    }

  }, [friends, activeFriend?.friendID])

  //for window resizing purpose
  useEffect(() => {

    const handleResize = () => {
      setWindowInnerWidth(window.innerWidth)
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);

  }, [])

  useEffect(() => {
    if (!isFriend) {
      dispatch(removeActiveFriend())
    }

  }, [db, isFriend, dispatch])


  const renderChatContent = () => (
    <>
      <ChatNavbar activeFriend={activeFriend} />
      <ChatContainer activeFriend={activeFriend} />
    </>
  )

  const renderFriendList = (width) => (

    <div className={`h-full ${width} overflow-y-auto shadow-[0_4px_17px_#0000001A] rounded-lg`}>

      <h3 className="font-semibold text-[30px] text-[#494949] p-[20px]">My Friends</h3>

      <FriendList />

    </div>
  )

  return (
    <>
      <Helmet>
        <title>Messages</title>
      </Helmet>

      {windowInnerWidth >= 900 ? (

        <div className="flex gap-x-5 h-full w-full xl:p-8 px-[10px]">

          {renderFriendList("w-[35%]")}

          {
            activeFriend ? (

              <div className="h-full w-[65%] rounded-lg shadow-[0_4px_10px_#00000024]">
    
                {renderChatContent()}
    
              </div>
    
              ) : (
    
              <Animation />
    
              )
          }

        </div>

      ) : (

        activeFriend ? (

          <div className="h-full w-full">

            {renderChatContent()}

          </div>

        ) : (

          <div className="flex flex-col h-full w-full p-[10px]">

            <h1 className="text-blue-500 text-[30px] text-center font-semibold">Select a Friend to start chatting</h1>

            {renderFriendList("w-full")}

          </div>
        )
      )}

    </>
  )
}

export default Messages
