/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo, useState } from "react";
import FriendDetails from "../home/friendList/singleFriend/FriendDetails";
import { removeActiveFriend } from "../../features/slices/singleActiveFriendSlice";
import { motion } from 'framer-motion';

const ChatNavbar = ({ activeFriend }) => {
    const friends = useSelector(state => state.friends.friends)
    const dispatch = useDispatch()
    const [windowInnerWidth, setWindowInnerWidth] = useState(window.innerWidth)

    const friend = useMemo(() => {

        return friends.find(friend => friend.friendID === activeFriend?.friendID)

    }, [friends, activeFriend?.friendID])

    //for window resizing purpose
    useEffect(() => {

        const handleResize = () => {
            setWindowInnerWidth(window.innerWidth)
        };

        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);

    }, [])

    

    return (
        <nav className="bg-[#F9F9F9] h-[13%] w-full flex items-center justify-center px-2 rounded-t-lg">

            <FriendDetails friend={friend} extraStyle="w-[90%]" />

            {windowInnerWidth < 900 && (
                <motion.button
                    className='lg:w-[120px] w-[100px] h-[41px] rounded bg-[#4A81D3] text-white'
                    onClick={() => dispatch(removeActiveFriend())}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{
                        scale: 0.8,
                        rotate: -90,
                        borderRadius: "100%"
                    }}
                >
                    Go Back
                </motion.button>
            )}

        </nav>
    )
}

export default ChatNavbar
