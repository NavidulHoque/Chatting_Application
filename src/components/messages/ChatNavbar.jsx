/* eslint-disable react/prop-types */
import { useSelector } from "react-redux";
import { useMemo } from "react";

const ChatNavbar = ({activeFriend}) => {
    const friends = useSelector(state => state.friends.friends)
    
    const friend = useMemo(() => {

        return friends.find(friend => friend.friendID === activeFriend?.friendID)

    }, [friends, activeFriend?.friendID])

    return (
        <nav className="bg-[rgb(50,50,50)] h-[100px] w-full flex items-center justify-center">

            <div className="flex items-center gap-x-3 w-[90%]">

                <div className="rounded-full w-[82px] h-[82px] overflow-hidden">

                    <img src={friend?.friendPhoto} alt="profilePic" 
                        className="w-full h-full"
                    />

                </div>

                <p className="text-white text-[20px]">{friend?.friendName}</p>

            </div>

        </nav>
    )
}

export default ChatNavbar
