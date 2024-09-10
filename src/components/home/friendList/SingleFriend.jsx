/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { makeFriendActive } from "../../../features/slices/singleActiveFriendSlice";
import { getDatabase, onValue, push, ref, remove, set } from "firebase/database";
import { Bounce, toast } from "react-toastify";
import { useEffect, useMemo } from "react";
import { storeBlockees } from "../../../features/slices/blockeesSlice";
import { storeBlockers } from "../../../features/slices/blockersSlice";

const SingleFriend = ({ friend, unfriendInfo, loggedInUser }) => {
    const location = useLocation()
    const activeFriend = useSelector(state => state.activeFriend.activeFriend)
    const dispatch = useDispatch()
    const db = getDatabase()
    const navigate = useNavigate()
    const blockees = useSelector(state => state.blockees.blockees)
    const blockers = useSelector(state => state.blockers.blockers)

    const isTheFriendBlockee = useMemo(() => {

        return blockees.some(blockee => blockee?.blockeeID === friend?.friendID)

    }, [blockees, friend])

    const isTheFriendBlocker = useMemo(() => {

        return blockers.some(blocker => blocker?.blockerID === friend?.friendID)

    }, [blockers, friend])


    //fetching blockees of logged in user
    useEffect(() => {

        const blocksRef = ref(db, "blocks/")
        onValue(blocksRef, (snapshot) => {
            const blockInfos = []

            snapshot.forEach((blockInfo) => {
                if (blockInfo.val().blockerID === loggedInUser.id) {
                    blockInfos.push({ blockeeID: blockInfo.val().blockeeID, blockeeName: blockInfo.val().blockeeName, blockID: blockInfo.key })
                }

            })

            dispatch(storeBlockees(blockInfos))
        })

    }, [db, loggedInUser, dispatch])


    //fetching blockers of logged in user
    useEffect(() => {

        const blocksRef = ref(db, "blocks/")
        onValue(blocksRef, (snapshot) => {
            const blockInfos = []

            snapshot.forEach((blockInfo) => {
                if (blockInfo.val().blockeeID === loggedInUser.id) {
                    blockInfos.push({ blockerID: blockInfo.val().blockerID, blockerName: blockInfo.val().blockerName })
                }

            })

            dispatch(storeBlockers(blockInfos))
        })

    }, [db, loggedInUser, dispatch])


    function handleUnfriend(friend) {

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

    function handleBlock(friend) {

        //storing the data in the database
        set(push(ref(db, 'blocks/')), {
            blockerID: loggedInUser.id,
            blockerName: loggedInUser.displayName,
            blockeeID: friend.friendID,
            blockeeName: friend.friendName,
        })

    }

    function handleUnblock(friend) {

        const blockID = blockees.find(blockee => blockee.blockeeID === friend.friendID).blockID

        const deleteRef = ref(db, `blocks/${blockID}`)

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

    if (location.pathname === "/") {
        return (
            <div
                className="flex xl:flex-row flex-col xl:justify-between justify-center items-center gap-1"
            >
                <div className="flex gap-x-2 items-center self-start">

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

                <div className="space-x-2 self-end xl:self-center">

                    <button
                        onClick={() => handleMakeFriendActive(friend)}
                        className="w-[75px] h-[29px] rounded bg-[#4A81D3] text-white"
                    >
                        Message
                    </button>

                    <button
                        onClick={() => handleUnfriend(friend)}
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
            <>
                <div
                    className={`flex justify-between items-center gap-x-3 px-1 cursor-pointer ${activeFriend?.friendID === friend.friendID ?
                        "bg-green-500 text-black py-[8px] rounded-md"
                        : "bg-white hover:bg-slate-100"}`}
                    onClick={() => dispatch(makeFriendActive(friend))}
                >
                    <div className="flex items-center gap-x-2">

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

                    <div className="flex space-x-2">

                        <button
                            onClick={() => handleUnfriend(friend)}
                            className="w-[75px] h-[29px] rounded bg-[#4A81D3] text-white"
                        >
                            Unfriend
                        </button>

                        {isTheFriendBlockee ? (
                            <button
                                onClick={() => handleUnblock(friend)}
                                className="w-[75px] h-[29px] rounded bg-[#4A81D3] text-white"
                            >
                                Unblock
                            </button>
                        )
                            : isTheFriendBlocker ? "" : (
                                <button
                                    onClick={() => handleBlock(friend)}
                                    className="w-[75px] h-[29px] rounded bg-[#4A81D3] text-white"
                                >
                                    Block
                                </button>
                            )}

                    </div>

                </div >

            </>
        )
    }

}

export default SingleFriend
